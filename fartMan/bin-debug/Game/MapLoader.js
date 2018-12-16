var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
// MapLoade 用于加载指定地图，目前直接加载.tmx文件
// 接下来将加载自定义的地图格式
var MapLoader = (function () {
    function MapLoader() {
    }
    MapLoader.prototype.GetTemxTileMap = function () {
        return this.mTmxtileMap;
    };
    MapLoader.prototype.GetHeight = function () {
        return this.mTmxtileMap.$getHeight();
    };
    MapLoader.prototype.GetWidth = function () {
        return this.mTmxtileMap.$getWidth();
    };
    MapLoader.prototype.GetMinLayer = function () {
        return 0;
    };
    MapLoader.prototype.GetMaxLayer = function () {
        return this.mTmxtileMap.getLayers().length;
    };
    MapLoader.prototype.LoadMap = function (url) {
        var self = this;
        var urlLoader = new egret.URLLoader();
        urlLoader.dataFormat = egret.URLLoaderDataFormat.TEXT;
        urlLoader.load(new egret.URLRequest(url));
        return new Promise(function (resolve) {
            //load complete
            urlLoader.addEventListener(egret.Event.COMPLETE, function (event) {
                var data = egret.XML.parse(event.target.data);
                self.mTmxtileMap = new tiled.TMXTilemap(GameConfig.width, GameConfig.height, data, url);
                self.mTmxtileMap.render();
                console.log(self.mTmxtileMap);
                // 延迟一段时间就能得到width
                setTimeout(function () {
                    resolve();
                }, 300);
            }, url);
        });
    };
    return MapLoader;
}());
__reflect(MapLoader.prototype, "MapLoader");
