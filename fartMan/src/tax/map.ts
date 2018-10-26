 class gameMap extends egret.Sprite {
    public tmxtileMap:tiled.TMXTilemap
    public constructor() {
        super();
        // var self = this;
        // var url: string = "resource/cute.tmx";
        // var urlLoader:egret.URLLoader = new egret.URLLoader();
        // urlLoader.dataFormat = egret.URLLoaderDataFormat.TEXT;
        // urlLoader.load(new egret.URLRequest(url));
        // urlLoader.addEventListener(egret.Event.COMPLETE, function (event:egret.Event):void {
        //         var data:any = egret.XML.parse(event.target.data);
        //         self.tmxtileMap = new tiled.TMXTilemap(2000, 2000, data, url);
        //         self.tmxtileMap.render();
        //         console.log(self.tmxtileMap)
        //         self.addChild(self.tmxtileMap);
        //         console.log(self.tmxtileMap.getObjects())
        //         console.log(self.tmxtileMap.getLayers()[4].getChildAt(0))
        //     }, url);
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
                self.tmxtileMap = new tiled.TMXTilemap(2000, 2000, data, url);
                self.tmxtileMap.render();
                console.log('ok')
                resolve()               
                console.log(self.tmxtileMap)
                self.addChild(self.tmxtileMap);
                console.log(self.tmxtileMap.getObjects())
            }, url);
        })
    }
}