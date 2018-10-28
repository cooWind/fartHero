/// <reference path="../../libs/keydown/keydown_event.d.ts"/>
/* 
    平台类
**/

interface createBoxConfig {
        width: number;
        height: number;
        position: Object;
        type?: any;
}
class Flat extends gameMap{
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
        //this.debugDraw = new p2DebugDraw(this.world);
        var sprite: egret.Sprite = new egret.Sprite();
        this.addChild(sprite);
        this.debugDraw.setSprite(sprite);
    }
    private async addFlat(){
        await this.loadMap()
        //this.addBack()
        this.createWorld()
        this.createPlane()
        // this.createMan()
        this.createBar()
        this.controlKey()
        this.createText()
        // this.createDebug()
    }
    // 创建世界
    private createWorld() {
        this.world = new p2.World({
            gravity: [0,-9.9]
        });
        // this.world.sleepMode = p2.World.NO_SLEEPING;
        // 这玩意儿是求解器
        this.world.solver = new p2.GSSolver() 
        this.world.solver['iterations'] = 50
        this.world.solver['tolerance'] = 0.01
        // 设置摩擦力
        this.world.defaultContactMaterial.friction = 10;
        // 设置刚度，很硬的那种
        this.world.setGlobalStiffness(99999);
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
        const factor = 50
        //创建地面       
        var gshape: p2.Plane = new p2.Plane();
        var gbody: p2.Body = new p2.Body({
                position:[GameConfig.width/100, 2],
                mass: 0
            });
        gbody.addShape(gshape);
        this.world.addBody(gbody)
        //显示对象
        var ground: egret.DisplayObject = this.createSprite(GameConfig.width, 10);
        gbody.displays = [ground];
        this.addChild(ground);
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
         // 创建平台
        var plat: p2.Box = new p2.Box({
            width: 1,
            height: 1
        });
        var pbody: p2.Body = new p2.Body({
                position:[GameConfig.width/25,GameConfig.height/25 - 100/50],
                mass: 5
            });
        pbody.addShape(plat);
        this.world.addBody(pbody)
        //显示对象
        var ground2: egret.DisplayObject = this.createPlat();

        ground2.width = (<p2.Box>plat).width * 59;
        ground2.height = (<p2.Box>plat).height * 50;
        ground2.anchorOffsetX = ground2.width / 2
        ground2.anchorOffsetY = ground2.height / 2;
        pbody.displays = [ground2];
        this.addChild(ground2);
        this.world.addBody(pbody)
    }    
    private createText() {
        this.boxBody = this.createBox({
            width: 1,
            height: 1,
            position: [100/ 50,100/ 50]
        })
        this.bindP2Map()
        // this.createBox({
        //     width: 1,
        //     height: 1,
        //     position: [200/ 50,100/ 50],
        //     type: p2.Body.STATIC
        // })
    }
    private loop(): void {
        const factor = 50;
        if(!this.world || !this.boxBody)
            return;
        this.world.step(60 / 1000);
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
                this.boxX = -.3; 
        },upEvent,upSelfEvent)
        keydown_event(39,()=>{
            console.log(39)
                this.boxX = .3;
        },upEvent,upSelfEvent)
        keydown_event(38,()=>{
            console.log(38)
        },upEvent,upSelfEvent)
        keydown_event(40,()=>{
            console.log(40)
        },upEvent,upSelfEvent);
        keydown_event(67,()=>{  //c 
            this.boxBody.velocity[1] = 5;
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
    /**
     * 可以创建一个刚体对象，内置了白鹭的创建形状的方法,
     * 你无需关注它是如何实现的，你只要将接口中的参数传给它就行
     */
    private createBox(createBoxConfig: createBoxConfig): p2.Body {
        // const text:tiled.TMXLayer = this.tmxtileMap.getLayers()[4]
        // const layers = this.tmxtileMap.getLayers()
        // var hero;
        // for(let i = 0, len = layers.length; i < len; i++) {
        //     if(layers[i].name === 'hero') {
        //         hero = layers[i]
        //     }
        // }
        // const display:tiled.TMXLayer = hero.$children[0]
        // display.anchorOffsetX = display.width / 2
        // display.anchorOffsetY = display.height / 2
        const {
            width,
            height,
            position
        } = createBoxConfig
        // const position = [
        //     display.x / 50,
        //     display.y / 50
        // ]
        // const factor = 50
        const boxShape: p2.Shape = new p2.Box({
            width: width,
            height: height
        });
        const boxBody: p2.Body = new p2.Body({ 
            mass: 1,
            position:position,
            fixedRotation: true,
            collisionResponse: true
        });
        boxBody.addShape(boxShape);
        this.world.addBody(boxBody);
        //添加长方形刚体的显示对象   
        
        var display: egret.DisplayObject = this.createSprite((<p2.Box>boxShape).width*50, (<p2.Box>boxShape).height*50);
        this.addChild(display)
        console.log(display)
        //同步egret对象和p2对象     
        boxBody.displays = [display];
        return boxBody
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