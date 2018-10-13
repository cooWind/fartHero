/// <reference path="../../libs/keydown/keydown_event.d.ts"/>
/* 
    平台类
**/
class Flat extends egret.Sprite{
    // 刚体世界　
    public world:p2.World
    private sh = GameConfig.height / 50
    private sw = GameConfig.height / 50
    
    public constructor(parent){
        super()
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.addFlat,this);
    }
  
    private async addFlat(){
        this.addBack()
        this.createWorld()
        this.controlKey()
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
    private createWorld() {
        var wrd: p2.World = new p2.World();
        wrd.sleepMode = p2.World.BODY_SLEEPING;
        wrd.gravity = [0, -10];
        this.world = wrd;
        const factor = 50
        //创建地面       
        var gshape: p2.Plane = new p2.Plane();
        var gbody: p2.Body = new p2.Body({
                position:[0,-this.sh/2],
                mass: 0
            });
        gbody.addShape(gshape);
        this.world.addBody(gbody)
        //显示对象
        var ground: egret.DisplayObject = this.createGround();
        gbody.displays = [ground];
        this.addChild(ground);
        
        
        //添加长方形刚体
        var boxShape: p2.Shape = new p2.Box({
            width: 1,
            height: 1
        });
        var boxBody: p2.Body = new p2.Body({ mass: 1,position: [this.sw / 2,0],angularVelocity: 3 });
        boxBody.addShape(boxShape);
        this.world.addBody(boxBody);
        //添加长方形刚体的显示对象   
        var display: egret.DisplayObject = this.createSprite();
        display.width = (<p2.Box>boxShape).width * factor;
        display.height = (<p2.Box>boxShape).height * factor;
        display.anchorOffsetX = display.width / 2
        display.anchorOffsetY = display.height / 2;
        this.display = display
        this.boxBody = boxBody
        //同步egret对象和p2对象
        boxBody.displays = [display];
        this.addChild(display)

        // 创建平台
        var plat: p2.Box = new p2.Box({
            width: 1,
            height: 1
        });
        var pbody: p2.Body = new p2.Body({
                position:[0,-2],
                mass: 5
            });
        pbody.addShape(plat);
        this.world.addBody(pbody)
        //显示对象
        var ground2: egret.DisplayObject = this.createPlat();

        ground2.width = (<p2.Box>plat).width * factor;
        ground2.height = (<p2.Box>plat).height * factor;
        ground2.anchorOffsetX = ground2.width / 2
        ground2.anchorOffsetY = ground2.height / 2;
        pbody.displays = [ground2];
        this.addChild(ground2);
        this.world.addBody(pbody)
        //添加帧事件侦听
        egret.Ticker.getInstance().register((dt) => {
            //使世界时间向后运动
            this.world.step(dt / 1000);
            // 这里更新坐标
            this.boxBody.position[0] += this.boxX
            ground.x = gbody.position[0] * factor;
            ground.y = this.sh - gbody.position[1] * factor;
            display.x = boxBody.position[0] * factor;
            display.y = this.sh - boxBody.position[1] * factor;
            ground2.x = pbody.position[0] * factor;
            ground2.y = this.sh - pbody.position[1] * factor;
        },this);
    }
    private addPlat() {
        
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
        var result: egret.Sprite = new egret.Sprite();
        result.graphics.beginFill(0x2d78f4);
        result.graphics.drawRect(0,0,GameConfig.width,40);
        result.graphics.endFill();
        return result;
    } 
    private createPlat(): egret.Sprite {
        var result: egret.Sprite = new egret.Sprite();
        result.graphics.beginFill(0x0084ff);
        result.graphics.drawRect(0,0,200,40);
        result.graphics.endFill();
        return result;
    } 
    private createSprite(): egret.Sprite {
        var result: egret.Sprite = new egret.Sprite();
        result.graphics.beginFill(0x37827A);
        result.graphics.drawRect(0,0,80,40);
        result.graphics.endFill();
        return result;
    }
    
}