/**
 * 这是上帝类，封装了引擎的一些方法，比如帧动画、加载图片。
 * 游戏里的一些元素，比如主角、怪物等都继承自这个上帝类
 */
class Manager extends egret.Sprite {
    private _mcData
    private _mcTexture
    public movie:egret.MovieClip
    public movieName
    private frameRate = 6
    // 主角的容器
    private spriteParent:egret.Sprite
    public movieScale

    public movieArray = []
    constructor() {
        super()
    }
    public addMovieClip(parent) {
        this.load(this.movieClip, parent)
    }
    private load(callback:Function, parent):void {
        let count:number = 0;
        this.spriteParent = parent
        var self = this;
        var check = function () {
            count++;
            if (count == 2) {
                callback.call(self, {});
            }
        }
        
        var loader = new egret.URLLoader();
        loader.addEventListener(egret.Event.COMPLETE, function loadOver(e) {
            var loader = e.currentTarget;
            this._mcTexture = loader.data;
            check();
        }, this);
        loader.dataFormat = egret.URLLoaderDataFormat.TEXTURE;
        console.log(this.movieName)
        var request = new egret.URLRequest("resource/"+this.movieName + '.png');
        loader.load(request);
        
        var loader = new egret.URLLoader();
        loader.addEventListener(egret.Event.COMPLETE, function loadOver(e) {
            var loader = e.currentTarget;
            this._mcData = JSON.parse(loader.data);
            
            check();
        }, this);
        loader.dataFormat = egret.URLLoaderDataFormat.TEXT;
        var request = new egret.URLRequest("resource/"+this.movieName + '.json');
        loader.load(request);
    }

    public movieClip(res):void {
        let {
            movieName,
            playTime,
            callback,
            frameRate
        } = res
        if(!movieName) {
            movieName = this.movieArray[0]
        }
        if(this.movie) {
            this.movie.parent.removeChild(this.movie)
        }
        /*** 本示例关键代码段开始 ***/
        var mcDataFactory = new egret.MovieClipDataFactory(this._mcData, this._mcTexture);
        this.movie =  new egret.MovieClip(mcDataFactory.generateMovieClipData(movieName));
        console.log(this.movie.width)
        // this.movie.width = this.spriteParent.width
        // this.movie.height = this.spriteParent.height
        this.movie.x = 0;
        this.movie.y = 0;
        this.movie.rotation = this.rotation
        // 帧动画只能通过调整缩放来调整大小
        this.movie.scaleX =  this.movie.width / this.spriteParent.width
        this.movie.scaleY =  this.movie.height / this.spriteParent.height
        this.movie.frameRate = frameRate ? frameRate : this.frameRate;
        this.spriteParent.addChild(this.movie);
        this.playMovie(playTime, callback)
    }
    /**
     * 播放次数
     */
    public playMovie(playTime, callback) {
        console.log(playTime)
        if(playTime) {
            this.movie.addEventListener(egret.Event.COMPLETE,  (e:egret.Event) => {
                console.log('callback')
                callback && callback(this.movie)
            }, this);
            this.movie.gotoAndPlay(0, playTime)
            return
        }   
        this.movie.gotoAndPlay(0, -1);
            
    }
}