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

    private boxBody:p2.Body;
    private boxX = 0
    private boxY = 0
    // p2 引擎单位是 m 1m = 50px
    private factor = 50
    private sh = GameConfig.height / 50
    private sw = GameConfig.height / 50
    public constructor(parent){
        super()
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.addFlat,this);
        this.addEventListener(egret.Event.ENTER_FRAME, this.loop, this); 
        this.timeOnEnterFrame = egret.getTimer();
    }
    private async addFlat(){
        this.fartMan = new FartMan()
        await this.loadMap()
        this.createWorld()
        this.controlKey()
        this.createText()
        this.bindP2Map()
    }
    // 创建物理世界
    private createWorld() {
        this.world = new p2.World({
            gravity: [0,-29.9]
        });
        // this.world.sleepMode = p2.World.NO_SLEEPING;
        // 这玩意儿是求解器
        this.world.solver = new p2.GSSolver() 
        this.world.solver['iterations'] = 10
        this.world.solver['tolerance'] = 0
        // 设置摩擦力
        this.world.defaultContactMaterial.friction = 10;
        // 设置刚度，很硬的那种
        this.world.defaultContactMaterial.stiffness = 999998888888888888889999;
        this.world.defaultContactMaterial.relaxation = 2;
        this.world.defaultContactMaterial.restitution = 0;
    }
    
    private createText() {
        const {
            boxBody,
            display
        } = this.fartMan.drawMan({
            width: 1,
            height: 1,
            position: [100 / this.factor,150/ this.factor]
        })
        this.addChild(display)
        this.world.addBody(boxBody)
        this.boxBody = boxBody
    }
    private loop(event): void {
        // const fixedTimeStep = 60 / 1000
         let now = egret.getTimer();
        let pass = now - this.timeOnEnterFrame;
        let dt:number = 1000 / pass;
        this.timeOnEnterFrame = egret.getTimer();
        if(!this.world || !this.boxBody)
            return;
        this.boxBody.position[0] += this.boxX
        this.world.step(1/60, dt/1000, 30);
        var len:number = this.world.bodies.length;
        for(var i: number = 0;i < len;i++) {
            var body: p2.Body = this.world.bodies[i];
            if(!body) return;
            var display: egret.DisplayObject = body.displays[0];
            display.x = body.position[0] * this.factor;                      //同步刚体和egret显示对象的位置和旋转角度
            display.y = GameConfig.height - body.position[1] * this.factor;
            display.rotation = body.angle  * 180 / Math.PI;
            const ground = this.world.bodies[0].position
        }
    }
    //键盘监听
    public controlKey(){
        let upEvent = (ev)=> {
            this.boxX = 0           
        }
        function upSelfEvent() {
            console.log('各自回调')
        }
        keydown_event(37,()=>{
            console.log(37)
                this.boxX = -.1; 
        },upEvent,upSelfEvent)
        keydown_event(39,()=>{
            console.log(39)
                this.boxX = .1;
        },upEvent,upSelfEvent)
        keydown_event(38,()=>{
            this.boxBody.velocity[1] = 12;
        },upEvent,upSelfEvent)
        keydown_event(40,()=>{
            console.log(40)
        },upEvent,upSelfEvent);
        keydown_event(67,()=>{
            this.boxBody.velocity[1] = 12;
        });
        // keydown_event(88,()=>{  // x
        //     this.armature.animation.gotoAndPlay(this.animateArr[5],0,0,1);
        // });
        
        // keydown_event(90,()=>{  // z
        //     this.armature.animation.gotoAndPlay(this.animateArr[6],0,0,1);
        // });
        // keydown_event(65,()=>{  // a
        //     this.armature.animation.gotoAndPlay(this.animateArr[7],0,0,1);
        // });
    }
    /**
     * 将地图里面的地板砖和p2绑定在一起
     */
    private bindP2Map() {
        const layers = this.tmxtileMap.getLayers()
        let blocks:tiled.TMXLayer;
        for(let i = 0, len = layers.length; i < len; i++) {
            if(layers[i].name === 'hero') {
                blocks = layers[i]
            }
        }
                console.log(blocks)
        
        for(let i = 0; i < blocks.rows; i++) {
            for(let j = 0; j<blocks.cols; j++) {
                // 根据像素获取到 TMXTile 对象
                const block:tiled.TMXTile = blocks.getTile(j * blocks.tilewidth, i * blocks.tileheight)
                if(block) {
                    console.log(block.bitmap)
                    this.createBlockBox(block.bitmap)
                }
            }
        }
        return;

        // blocks.$children[0].$children.map(val => {
        //     console.log('map1')
        //     console.log(val)
        //     this.createBlockBox(val)
        // })

    }
    private createBlockBox(display) {
        const boxShape: p2.Shape = new p2.Box({
            width: display.width / this.factor,
            height: display.height / this.factor
        });

        display.anchorOffsetX = display.width / 2
        display.anchorOffsetY = display.height / 2;
        const position = [
            display.x / this.factor,
            (GameConfig.height-display.y) / this.factor]
        const boxBody: p2.Body = new p2.Body({ 
            mass: 1,
            position:position,
            fixedRotation: true,
            collisionResponse: true,
            type: p2.Body.STATIC
        });
        boxBody.addShape(boxShape);
        this.world.addBody(boxBody);
        boxBody.displays = [display];
    }
}