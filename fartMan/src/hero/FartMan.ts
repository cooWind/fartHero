/* 
    放屁超人
**/
class FartMan extends egret.Sprite{
    public constructor(parent){
        super()
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.addMan,this);
    }
  
    private async addFlat(){
        this.addMan()
    }
    // 画一张#333的背景图
    private addMan() {
        var body:p2.Body = new p2.Body();
    }
}