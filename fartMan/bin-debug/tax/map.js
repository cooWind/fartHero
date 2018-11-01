var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var gameMap = (function (_super) {
    __extends(gameMap, _super);
    function gameMap() {
        return _super.call(this) || this;
    }
    gameMap.prototype.loadMap = function () {
        var self = this;
        var url = "resource/cute.tmx";
        var urlLoader = new egret.URLLoader();
        urlLoader.dataFormat = egret.URLLoaderDataFormat.TEXT;
        urlLoader.load(new egret.URLRequest(url));
        return new Promise(function (resolve) {
            //load complete
            urlLoader.addEventListener(egret.Event.COMPLETE, function (event) {
                var data = egret.XML.parse(event.target.data);
                self.tmxtileMap = new tiled.TMXTilemap(4000, 768, data, url);
                self.tmxtileMap.render();
                console.log('ok');
                console.log(self.tmxtileMap);
                self.addChild(self.tmxtileMap);
                var layers = self.tmxtileMap.getLayers();
                // 延迟一段时间就能得到width
                setTimeout(function () {
                    resolve();
                }, 300);
            }, url);
        });
    };
    return gameMap;
}(egret.Sprite));
__reflect(gameMap.prototype, "gameMap");
