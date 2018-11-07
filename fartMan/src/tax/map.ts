 class gameMap extends egret.Sprite {
    public tmxtileMap:tiled.TMXTilemap
    public constructor() {
        super();
    }
    public loadMap() {
        var self = this;
        var url: string = "resource/cute.tmx";
        var urlLoader:egret.URLLoader = new egret.URLLoader();
        urlLoader.dataFormat = egret.URLLoaderDataFormat.TEXT;
        urlLoader.load(new egret.URLRequest(url));
        return new Promise((resolve)=>{
                //load complete
            urlLoader.addEventListener(egret.Event.COMPLETE, function (event:egret.Event):void {
                var data:any = egret.XML.parse(event.target.data);
                self.tmxtileMap = new tiled.TMXTilemap(GameConfig.width, GameConfig.height, data, url);
                self.tmxtileMap.render();
                console.log(self.tmxtileMap)
                self.addChild(self.tmxtileMap);
                const layers = self.tmxtileMap.getLayers()
                // 延迟一段时间就能得到width
                setTimeout(()=>{
                    resolve()
                }, 300)
            }, url);
        })
    }
}