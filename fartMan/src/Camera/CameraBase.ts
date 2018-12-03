/**
 * 相机基类
 */
class CameraBase {
    // 游戏图层数组，相机移动时渲染
    public gameLayers:Array<tiled.TMXLayer>;
    // 主角
    public fartMan:FartMan;
    // 游戏上帝容器
    public gameScene:GameInstance;
    public width;
    public height;
    public x;
    public y;
    // 跟随偏移量
    private offsetX = 700;
    private offsetY = 140;
    // 渲染相关值
    private renderWidth = 100;
    private renderOffsetX = 200;
    // 相机移动速度
    private v = 0;
    private bindBodys:Array<p2.Body>;
    private hashTiles = {}
    public camerSprite:egret.Sprite
    constructor(fartMan:FartMan, gameScene:GameInstance) {
        this.fartMan = fartMan
        // Flat
        this.gameScene = gameScene
        this.camerSprite = this.createCamerMask(GameConfig.width, GameConfig.height)
        this.gameScene.parent.addChild(this.camerSprite)
        this.gameScene.mask = this.camerSprite
    }
    public moveCamera() {
        // this.gameScene.x =
        const x = (-this.fartMan.x + this.offsetX)
        if(x > 0)
            return
        egret.Tween.get(this.gameScene).to( {x}, this.v, egret.Ease.quadIn )
        this.gameScene.x = -600;
        //this.gameScene.renderGameMap()
    }
    public createCamerMask(width, height) {
        var result: egret.Sprite = new egret.Sprite();
        result.graphics.beginFill(0x37827A);
        result.graphics.drawRect(0,0,GameConfig.width,GameConfig.height);
        result.graphics.endFill();
        result.anchorOffsetX = 0
        result.anchorOffsetY = 0
        return result;
    }
}

           
               