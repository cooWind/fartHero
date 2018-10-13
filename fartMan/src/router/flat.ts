/* 
    游戏信息面板
**/
class Flat extends egret.Sprite{
    public constructor(parent){
        super()
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.addFlat,this);
    }
  
    private async addFlat(){
        this.addBack()
    }
    // 画一张#333的背景图
    private addBack() {
        let shp:egret.Shape = new egret.Shape();
        shp.graphics.beginFill( 0x333333, 1);
        shp.graphics.drawRect( 0, 0, GameConfig.width, GameConfig.height );
        shp.graphics.endFill();
        this.addChild( shp );
    }
}