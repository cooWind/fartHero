/// <reference path="../../libs/keydown/keydown_event.d.ts"/>
/* 
    平台类
    http://www.dwenzhao.cn/profession/netbuild/egretp2.html
**/
class Flat extends gameMap{
    // 刚体世界　
    public world:p2.World
    private timeOnEnterFrame
    private fartMan:FartMan
    private camerabase:CameraBase;
    public gameLayers:Array<tiled.TMXLayer>;
    // p2 引擎单位是 m 1m = 50px
    private factor = 50
    private sh = GameConfig.height / 50
    private sw = GameConfig.height / 50
    private monBasic:MonBasic
    public constructor(parent){
        super()
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.addFlat,this);
        this.addEventListener(egret.Event.ENTER_FRAME, this.loop, this); 
        this.timeOnEnterFrame = egret.getTimer();
    }
    private async addFlat(){
        await this.loadMap()
        this.createWorld()
        this.bindP2Map()
        this.fartMan = new FartMan()
        //this.camerabase = new CameraBase(this.fartMan, this)
        // 创建一个怪物
        this.monBasic = new MonsterMan()
        this.createMonster()
        // 主角
        this.createHero()
    }
    // 创建物理世界
    private createWorld() {
        this.world = new p2.World({
            gravity: [0,-9]
        });
        // this.world.sleepMode = p2.World.NO_SLEEPING;
        // 这玩意儿是求解器
        this.world.solver = new p2.GSSolver() 
        this.world.solver['iterations'] = 10
        this.world.solver['tolerance'] = 0
        // 设置摩擦力
        this.world.defaultContactMaterial.friction = 1;
        // 设置刚度，很硬的那种
        this.world.defaultContactMaterial.stiffness = 1000000;
        this.world.defaultContactMaterial.relaxation = 4;
        this.world.defaultContactMaterial.restitution = 0;
        // let ContactMaterial = new p2.ContactMaterial(GameConfig.manMaterial, GameConfig.wallMaterial, <p2.ContactMaterialOptions>{
        //     friction : 1,
        //     stiffness: 9999999999999999999999,
        //     relaxation: 2
        // });
        // this.world.addContactMaterial(ContactMaterial)
        this.world.on('postBroadphase',(ev) => {
            const pairs = ev.pairs;
            pairs.forEach((val:p2.Body) => {
                
            })
        })
        // 碰撞检测回调
        this.world.on('beginContact',(ev)=>{
            const id = this.fartMan.bodyId
            const {
                bodyA,
                bodyB
            } = ev
            let bindBody, fartBody
            if(bodyA.id === id) {
                bindBody = bodyB
                fartBody = bodyA
            } else {
                bindBody = bodyA
                fartBody = bodyB
            }
            this.getPlayerContactPos()
        })
    }
     private getPlayerContactPos():void{
        const id = this.fartMan.bodyId

        for(var i = 0;i < this.world.narrowphase.contactEquations.length;i++) {
            let c: p2.ContactEquation = this.world.narrowphase.contactEquations[i];
            console.log(c)
            let pt: Array<number>, contactPos: Array<number>
            console.log(c.bodyA.id, c.bodyB.id)
            console.log(id)
            if(c.bodyA.id ==id || c.bodyB.id == id) {
                console.log('碰撞')
            }
            if(c.bodyA.id == id) {
                pt = c.contactPointA;//pointA delta向量，上次使用contactPointB貌似没用对，用contactPointA就对了
                contactPos = [c.bodyA.position[0] + pt[0],c.bodyA.position[1] + pt[1]];
            }
            if(c.bodyB.id == id) {
                pt = c.contactPointB;//pointA delta向量，上次使用contactPointB貌似没用对，用contactPointA就对了
                contactPos = [c.bodyB.position[0] + pt[0],c.bodyB.position[1] + pt[1]];
            }
            if(!contactPos) {
                return
            }
            let x = contactPos[0] * 50
            let y = contactPos[1] * 50
            console.log(x, y)
        }
    }
    private createHero() {
        const {
            boxBody,
            display
        } = this.fartMan.drawMan()
        this.addChild(display)
        this.world.addBody(boxBody)
        this.bindFartMan()
    }
    private createMonster() {
        const {
            boxBody,
            display
        } = this.monBasic.drawMonster()
        this.addChild(display)
        this.world.addBody(boxBody)
    }
    // 绑定fartMan的坐标
    private bindFartMan() {
        this.fartMan.x = this.fartMan.boxBody.position[0] * this.factor
        this.fartMan.y = this.fartMan.boxBody.position[1] * this.factor
        this.camerabase.moveCamera()
    }
    private loop(event): void {
        let now = egret.getTimer();
        let pass = now - this.timeOnEnterFrame;
        let dt:number = 1000 / pass;
        this.timeOnEnterFrame = egret.getTimer();
        if(!this.world || !this.fartMan.boxBody)
            return;
        this.world.step(1/80, dt/1000, 30);
        var len:number = this.world.bodies.length;
        this.fartMan.boxBody.position[0] += this.fartMan.moveX / 2
        for(var i: number = 0;i < len;i++) {
            var body: p2.Body = this.world.bodies[i];
            if(!body) return;
            var display: egret.DisplayObject = body.displays[0];
            display.x = body.position[0] * this.factor;                      //同步刚体和egret显示对象的位置和旋转角度
            display.y = GameConfig.height - body.position[1] * this.factor;
            
            display.rotation = body.angle  * 180 / Math.PI;
            const ground = this.world.bodies[0].position
        }
        this.bindFartMan()
    }
    /**
     * 将地图里面的地板砖和p2绑定在一起
     */
    private bindP2Map() {
        const layers = this.tmxtileMap.getLayers()
        let blocks:tiled.TMXLayer;
        this.gameLayers = layers
        for(let i = 0, len = layers.length; i < len; i++) {
            if(layers[i].name === 'hero') {
                blocks = layers[i]
            }
        }
        console.log(blocks.rows, blocks.rows)
        for(let i = 0; i < blocks.rows; i++) {
            for(let j = 0; j<blocks.cols; j++) {
                // 根据像素获取到 TMXTile 对象
                const block:tiled.TMXTile = blocks.getTile(j * blocks.tilewidth, i * blocks.tileheight)
                // blocks.clearTile(j, i)
                if(block && block.bitmap) {
                    const body = this.createBlockBox(block.bitmap)
                }
            }
        }
        return;
    }
    public createBlockBox(display) {
        const boxShape: p2.Shape = new p2.Box({
            width: display.width / this.factor,
            height: display.height / this.factor
        });
        boxShape.material = GameConfig.wallMaterial
        display.anchorOffsetX = display.width / 2
        display.anchorOffsetY = display.height / 2;
        const position = [
            (display.x)/ this.factor,
            (GameConfig.height-display.y) / this.factor]
        const boxBody: p2.Body = new p2.Body({ 
            mass: 0,
            position:position,
            fixedRotation: true,
            collisionResponse: true,
            type: p2.Body.KINEMATIC,
            allowSleep: false
        });
        boxBody.addShape(boxShape);
        this.world.addBody(boxBody);
        boxBody.displays = [display];
        return boxBody
    }

    private hashTiles = {}
    private renderWidth = 90;
    public renderGameMap() {
        let blocks:tiled.TMXLayer
        for(let i = 0, len = this.gameLayers.length; i < len; i++) {
            if(this.gameLayers[i].name === 'hero') {
                blocks = this.gameLayers[i]
            }
        }
        // 渲染相关值
        const x = this.fartMan.x + GameConfig.width
        const y = 0
        const width = this.renderWidth
        const height = GameConfig.height
        const rectangle =new egret.Rectangle(x, 0, width, height);
        blocks.draw(rectangle)
        const {
            tilewidth,
            tileheight,
        } = blocks
        const row = Math.floor((x + this.renderWidth) / tilewidth)
        const col = Math.floor(height / tileheight)
        const start = 0
        for(let i = 0; i < blocks.rows; i++) {
            for(let j = start; j< row; j++) {
                if(j >= 120)
                    return;
                const block:tiled.TMXTile = blocks.getTile(j * blocks.tilewidth, i * blocks.tileheight)
                //　还没有绑定刚体的给它绑定上
                if(block && block.bitmap && !this.hashTiles[`${i}_${j}`]) {
                    const body = this.createBlockBox(block.bitmap)
                    this.hashTiles[`${i}_${j}`] = {
                        block,
                        body
                    }
                }
            }
        }
        //回收刚体
        Object.keys(this.hashTiles).forEach((val) => {
            let body:p2.Body = this.hashTiles[val].body
            let TMXTile:tiled.TMXTile = this.hashTiles[val].block.bitmap
            const x = TMXTile.x
            const y = TMXTile.y
            if(body && x + this.x < 0) {
                if(TMXTile.parent) {
                    TMXTile.parent.removeChild(TMXTile)
                }
                this.world.removeBody(body)
                delete this.hashTiles[val]
            }
        })
    }
}