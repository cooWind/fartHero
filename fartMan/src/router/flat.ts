/// <reference path="../../libs/keydown/keydown_event.d.ts"/>
/* 
    平台类
**/
class Flat extends egret.Sprite{
    // 刚体世界　
    public world:p2.World
    //debug 库
    private debugDraw
    private sh = GameConfig.height / 50
    private sw = GameConfig.height / 50
    
    public constructor(parent){
        super()
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.addFlat,this);
        this.addEventListener(egret.Event.ENTER_FRAME, this.loop, this);
    }
    private createDebug(): void {
        //创建调试试图
        this.debugDraw = new p2DebugDraw(this.world);
        var sprite: egret.Sprite = new egret.Sprite();
        this.addChild(sprite);
        this.debugDraw.setSprite(sprite);
    }
    private async addFlat(){
        this.addBack()
        this.createWorld()
        this.createPlane()
        this.createMan()
        this.createBar()
        this.controlKey()
        this.createDebug()
    }
    // 创建世界
    private createWorld() {
        this.world = new p2.World();
        this.world.sleepMode = p2.World.NO_SLEEPING;
        // 这玩意儿是求解器
        this.world.solver = new p2.GSSolver() 
        this.world.solver['iterations'] = 5
        this.world.solver['tolerance'] = 0.01

        this.world.gravity = [0, 100];
        // 设置摩擦力
        this.world.defaultContactMaterial.friction = 10;
        // 设置刚度，很硬的那种
        this.world.setGlobalStiffness(999999900000);
        this.world.setGlobalRelaxation(1.8)
        this.world.defaultContactMaterial.restitution = 0;
        // var iceMaterial = new p2.Material(2);
        // var steelMaterial = new p2.Material(2);
        // const factor = 50
        // // 摩擦配置
        // var iceSteelContactMaterial: p2.ContactMaterial = new p2.ContactMaterial(iceMaterial,steelMaterial,<p2.ContactMaterialOptions>{surfaceVelocity: 0,restitution:0,friction: .6});
        // this.world.addContactMaterial(iceSteelContactMaterial);
        // //添加帧事件侦听
        // egret.Ticker.getInstance().register((dt) => {
        //     //使世界时间向后运动
        //     this.world.step(dt / 1000);
        //     // 这里更新坐标
        //     var l = this.world.bodies.length;
        //     for (var i:number = 0; i < l; i++) {
        //         var boxBody:p2.Body = this.world.bodies[i];
        //         var box:egret.DisplayObject = boxBody.displays[0];
        //         if (box) { 
        //                 box.x = boxBody.position[0] * factor;
        //             box.y = -boxBody.position[1] * factor;
        //         }
        //     }
        //     console.log(this.boxX)
        //     this.boxBody.position[0] += this.boxX
        // },this);
    }
    // 画一张#333的背景图
    private addBack() {
        let shp:egret.Shape = new egret.Shape();
        shp.graphics.beginFill( 0x333333, 1);
        shp.graphics.drawRect( 0, 0, GameConfig.width, GameConfig.height );
        shp.graphics.endFill();
        this.addChild( shp );
    }
    private display;
    private boxBody:p2.Body;
    private boxX = 0
    private boxY = 0
    private pbody
    // 创建地面
    private createPlane() {
        //创建地面       

        var stageHeight: number = egret.MainContext.instance.stage.stageHeight;
        var groundShape: p2.Plane = new p2.Plane();
        var groundBody: p2.Body = new p2.Body({
            collisionResponse: true
        });
        groundBody.position[1] = stageHeight -100;
        groundBody.angle = Math.PI;
        groundBody.addShape(groundShape);

        this.world.addBody(groundBody);
    }
    // 创建人物
    private createMan() {
        var boxShape: p2.Shape = new p2.Box({
            width: 100, 
            height: 50, 
            material: new p2.Material(1)
        });
        var boxBody: p2.Body = new p2.Body({ 
            mass: 1, 
            position: [200, GameConfig.height -125],
            type: p2.Body.DYNAMIC,
            fixedRotation: true
        });
        boxBody.addShape(boxShape);
        this.world.addBody(boxBody);
        this.boxBody = boxBody
    }
    // 创建障碍物
    private createBar() {
        var boxShape: p2.Shape = new p2.Box({
            width: 350, 
            height: 50
        });
        var boxBody: p2.Body = new p2.Body({ 
            mass: 0, 
            position: [400, GameConfig.height -125],
            type: p2.Body.STATIC,
            collisionResponse: true
        });
        boxBody.addShape(boxShape);
        this.world.addBody(boxBody);
    }    
    private loop(): void {
        this.world.step(60 / 1000);
        this.debugDraw.drawDebug();
        this.boxBody.position[0] += this.boxX * 100
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
            this.boxBody.velocity[1] = -100;
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
        var result: egret.Sprite = new egret.Sprite();
        result.graphics.beginFill(0x2d78f4);
        result.graphics.drawRect(0,0,GameConfig.width,40);
        result.graphics.endFill();
        return result;
    } 
    private createPlat(): egret.Sprite {
        var result: egret.Sprite = new egret.Sprite();
        result.graphics.beginFill(0x0084ff);
        result.graphics.drawRect(0,0,0,0);
        result.graphics.endFill();
        return result;
    } 
    private createSprite(): egret.Sprite {
        var result: egret.Sprite = new egret.Sprite();
        result.graphics.beginFill(0x37827A);
        result.graphics.drawRect(0,0,0,0);
        result.graphics.endFill();
        return result;
    }
    
}