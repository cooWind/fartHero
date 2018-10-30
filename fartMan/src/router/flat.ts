/// <reference path="../../libs/keydown/keydown_event.d.ts"/>
/* 
    平台类
    http://www.dwenzhao.cn/profession/netbuild/egretp2.html
**/
class Flat extends gameMap{
    // 刚体世界　
    public world:p2.World
    //debug 库
    private debugDraw
    private sh = GameConfig.height / 50
    private sw = GameConfig.height / 50
    private timeOnEnterFrame
    private fartMan:FartMan
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
    // 创建世界
    private createWorld() {
        this.world = new p2.World({
            gravity: [0,-9.9]
        });
        // this.world.sleepMode = p2.World.NO_SLEEPING;
        // 这玩意儿是求解器
        this.world.solver = new p2.GSSolver() 
        this.world.solver['iterations'] = 10
        this.world.solver['tolerance'] = 0
        // 设置摩擦力
        this.world.defaultContactMaterial.friction = 10;
        // 设置刚度，很硬的那种
        this.world.setGlobalStiffness(99999);
        this.world.setGlobalRelaxation(1.9)
        this.world.defaultContactMaterial.restitution = 0.1;
    }
    private display;
    private boxBody:p2.Body;
    private boxX = 0
    private boxY = 0
    private pbody
    
    private createText() {
        const {
            boxBody,
            display
        } = this.fartMan.drawMan({
            width: 1,
            height: 1,
            position: [100 / 50,150/ 50]
        })
        this.addChild(display)
        this.world.addBody(boxBody)
        this.boxBody = boxBody
    }
    private loop(event): void {
        const factor = 50;
        const fixedTimeStep = 60 / 1000
         let now = egret.getTimer();
        let pass = now - this.timeOnEnterFrame;
        let dt:number = 1000 / pass;
        egret.log("onEnterFrame: ", dt);
        this.timeOnEnterFrame = egret.getTimer();
        if(!this.world || !this.boxBody)
            return;
        this.world.step(1/80, dt/1000, 10);
        //this.debugDraw.drawDebug();
        this.boxBody.position[0] += this.boxX
        // this.boxBody.velocity[0] = this.boxX
        var len:number = this.world.bodies.length;
        for(var i: number = 0;i < len;i++) {
            var body: p2.Body = this.world.bodies[i];
            if(!body) return;
            var display: egret.DisplayObject = body.displays[0];
            display.x = body.position[0] * 50;                      //同步刚体和egret显示对象的位置和旋转角度
            display.y = GameConfig.height-body.position[1] * 50;
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
            console.log(38)
        },upEvent,upSelfEvent)
        keydown_event(40,()=>{
            console.log(40)
        },upEvent,upSelfEvent);
        keydown_event(67,()=>{  //c 
            this.boxBody.velocity[1] = 6;
            //this.boxBody.position[1]+= .5
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
    private createGround(): egret.Sprite {
        var sp:egret.Sprite = new egret.Sprite();
        sp.graphics.lineStyle(30, 0x00ff00);
        sp.graphics.moveTo(0, 0);
        sp.graphics.lineTo(GameConfig.width,0);
        sp.anchorOffsetX = sp.width/2;
        sp.anchorOffsetY = sp.height/2;
        return sp;
    } 
    private createPlat(): egret.Sprite {
        var result: egret.Sprite = new egret.Sprite();
        result.graphics.beginFill(0x0084ff);
        result.graphics.drawRect(0,0,50,50);
        result.graphics.endFill();
        return result;
    } 
    /**
     * 将地图里面的地板砖和p2绑定在一起
     */
    private bindP2Map() {
        const layers = this.tmxtileMap.getLayers()
        let blocks
        for(let i = 0, len = layers.length; i < len; i++) {
            if(layers[i].name === 'hero') {
                blocks = layers[i]
            }
        }
        console.log(blocks)
        blocks.$children[0].$children.map(val => {
            console.log('map1')
            console.log(val)
            this.createBlockBox(val)
        })

    }
    private createBlockBox(display) {

        const factor = 50
        console.log(display.width)
        const boxShape: p2.Shape = new p2.Box({
            width: display.width / 50,
            height: display.height / 50
        });

        display.anchorOffsetX = display.width / 2
        display.anchorOffsetY = display.height / 2;
        console.log(display.x, display.y)
        const position = [
            display.x / 50,
        (GameConfig.height-display.y) / 50
        ]
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
    private createSprite(width, height): egret.Sprite {
        var result: egret.Sprite = new egret.Sprite();
        result.graphics.beginFill(0x37827A);
        result.graphics.drawRect(0,0,width,height);
        result.graphics.endFill();
        result.anchorOffsetX = width / 2;
        result.anchorOffsetY = height / 2;
        return result;
    }
    
}