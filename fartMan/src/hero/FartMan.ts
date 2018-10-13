/* 
    放屁超人
**/
class FartMan extends egret.Sprite{
    private parents
    public constructor(parent){
        super()
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.addMan,this);
        this.parents = parent
    }
  
    private async addFlat(){
        this.addMan()
    }
    private addMan() {
        const factor = 50
        const sh = GameConfig.height / 50
        const sw = GameConfig.width / 50
        const world = this.parents.world
         //添加长方形刚体
        var boxShape: p2.Shape = new p2.Box({
            width: 1,
            height: 1
        });
        var boxBody: p2.Body = new p2.Body({ mass: 1,position: [sw / 2,0],angularVelocity: 3 });
        boxBody.addShape(boxShape);
        world.addBody(boxBody);
        //添加长方形刚体的显示对象   
        var display: egret.DisplayObject = this.createSprite();
        display.width = (<p2.Box>boxShape).width * factor;
        display.height = (<p2.Box>boxShape).height * factor;
        display.anchorOffsetX = display.width / 2
        display.anchorOffsetY = display.height / 2;
        //同步egret对象和p2对象
        boxBody.displays = [display];
        this.addChild(display)
    }
    private createSprite(): egret.Sprite {
        var result: egret.Sprite = new egret.Sprite();
        result.graphics.beginFill(0x37827A);
        result.graphics.drawRect(0,0,40,80);
        result.graphics.endFill();
        return result;
    }
}