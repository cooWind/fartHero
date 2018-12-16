
// MapLoade 用于加载指定地图，目前直接加载.tmx文件
// 接下来将加载自定义的地图格式
class MapLoader {
    public mTmxtileMap:tiled.TMXTilemap
    public constructor() {
    }

    public GetTemxTileMap():tiled.TMXTilemap {
        return this.mTmxtileMap;
    }

    public GetHeight():number {
        return this.mTmxtileMap.$getHeight();
    }

    public GetWidth():number {
        return this.mTmxtileMap.$getWidth();
    }

    public GetMinLayer():number {
        return 0;
    }

    public GetMaxLayer():number {
        return this.mTmxtileMap.getLayers().length;
    }

    public LoadMap(url:string) {
        var self = this;

        var urlLoader:egret.URLLoader = new egret.URLLoader();
        urlLoader.dataFormat = egret.URLLoaderDataFormat.TEXT;
        urlLoader.load(new egret.URLRequest(url));
        return new Promise((resolve)=>{
                //load complete
            urlLoader.addEventListener(egret.Event.COMPLETE, function (event:egret.Event):void {
                var data:any = egret.XML.parse(event.target.data);
                self.mTmxtileMap = new tiled.TMXTilemap(GameConfig.width, GameConfig.height, data, url);
                self.mTmxtileMap.render();
                console.log(self.mTmxtileMap)
                
                // 延迟一段时间就能得到width
                setTimeout(()=>{
                    resolve()
                }, 300)
            }, url);
        })
    }
    }