var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 相机基类
 */
var CameraBase = (function () {
    function CameraBase(fartMan, gameScene) {
        // 跟随偏移量
        this.offsetX = 700;
        this.offsetY = 140;
        // 渲染相关值
        this.renderWidth = 100;
        this.renderOffsetX = 200;
        // 相机移动速度
        this.v = 400;
        this.hashTiles = {};
        this.fartMan = fartMan;
        // Flat
        this.gameScene = gameScene;
        this.camerSprite = this.createCamerMask(GameConfig.width, GameConfig.height);
        this.gameScene.parent.addChild(this.camerSprite);
        this.gameScene.mask = this.camerSprite;
    }
    CameraBase.prototype.moveCamera = function () {
        // this.gameScene.x =
        var x = (-this.fartMan.x + this.offsetX);
        if (x > 0)
            return;
        egret.Tween.get(this.gameScene).to({ x: x }, this.v, egret.Ease.quadIn);
        this.gameScene.x = -600;
        //this.gameScene.renderGameMap()
    };
    CameraBase.prototype.createCamerMask = function (width, height) {
        var result = new egret.Sprite();
        result.graphics.beginFill(0x37827A);
        result.graphics.drawRect(0, 0, GameConfig.width, GameConfig.height);
        result.graphics.endFill();
        result.anchorOffsetX = 0;
        result.anchorOffsetY = 0;
        return result;
    };
    return CameraBase;
}());
__reflect(CameraBase.prototype, "CameraBase");
