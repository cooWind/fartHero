var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 相机基类
 */
var CameraBase = (function () {
    function CameraBase(fartMan, gameScene) {
        // 跟随偏移量
        this.offsetX = 200;
        this.offsetY = 140;
        // 渲染相关值
        this.renderWidth = 100;
        this.renderOffsetX = 200;
        // 相机移动速度
        this.v = 1;
        this.hashTiles = {};
        this.fartMan = fartMan;
        // Flat
        this.gameScene = gameScene;
        this.gameLayers = this.gameScene.gameLayers;
    }
    CameraBase.prototype.moveCamera = function () {
        this.gameScene.x = (-this.fartMan.x + this.offsetX) * this.v;
        // this.gameScene.y = - this.fartMan.y + this.offsetY
        this.renderGameMap();
    };
    CameraBase.prototype.renderGameMap = function () {
        var blocks;
        for (var i = 0, len = this.gameLayers.length; i < len; i++) {
            if (this.gameLayers[i].name === 'hero') {
                blocks = this.gameLayers[i];
            }
        }
        // 渲染相关值
        var x = this.fartMan.x + GameConfig.width;
        var y = 0;
        var width = this.renderWidth;
        var height = GameConfig.height;
        var rectangle = new egret.Rectangle(x, 0, width, height);
        blocks.draw(rectangle);
        var tilewidth = blocks.tilewidth, tileheight = blocks.tileheight;
        var row = Math.floor((x + this.renderWidth) / tilewidth);
        var col = Math.floor(height / tileheight);
        var start = Math.floor(x / tilewidth);
        for (var i = 0; i < blocks.rows; i++) {
            for (var j = start; j < row; j++) {
                var block = blocks.getTile(j * blocks.tilewidth, i * blocks.tileheight);
                //　还没有绑定刚体的给它绑定上
                if (block && block.bitmap && !this.hashTiles[i + "_" + j]) {
                    var body = this.gameScene.createBlockBox(block.bitmap);
                    this.hashTiles[i + "_" + j] = {
                        block: block,
                        body: body
                    };
                }
                // 回收刚体以及渲染　
            }
        }
    };
    return CameraBase;
}());
__reflect(CameraBase.prototype, "CameraBase");
