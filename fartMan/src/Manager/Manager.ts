/**
 * 这是上帝类，封装了引擎的一些方法，比如帧动画、加载图片。
 * 游戏里的一些元素，比如主角、怪物等都继承自这个上帝类
 */
class Manager extends egret.Sprite {
    // 当前状态
    public state: State;
    // 上一状态
    public lastState: State;
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

    public async handleState(){
        if(this.state){
            await this.state.handle(this);
        }
        // console.log('nextState')
        // console.log(this.state)
        // if(this.state.nextState) {
        //     this.changeState(this.state.nextState)
        //     this.handleState()
        // }
    }
    public async changeState(state: State) {
        this.lastState = this.state
        this.state = state
        await this.handleState()
    }
    public addMovieClip(parent) {
        this.load(this.movieClip, parent)
    }
    private load(callback:Function, parent):void {
        let count:number = 0;
        this.spriteParent = parent
        var self = this;
        var check = async function () {
            count++;
            if (count == 2) {
                await callback.call(self, {});
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

    public async movieClip(res) {
        let {
            movieName,
            playTime,
            callback,
            frameRate,
            skewX,
            skewY,
            scaleX,
            scaleY
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
        if(scaleX) {
            this.movie.scaleX = scaleX
        } else {
            this.movie.scaleX =  this.spriteParent.width / this.movie.width 
        }
        if(scaleY) {
            this.movie.scaleY =  scaleY
        } else {
            this.movie.scaleY =  this.spriteParent.height / this.movie.height
        }
        
        this.movie.frameRate = frameRate ? frameRate : this.frameRate;
        this.movie.anchorOffsetX = 0;
        this.movie.anchorOffsetY = 0;
        this.movie.skewX = skewX ? skewX : 0
        this.movie.skewY = skewY ? skewY : 0
        this.movie.x = this.movie.skewY ? this.spriteParent.width : 0
        this.spriteParent.addChild(this.movie);
        await this.playMovie(playTime, callback)
    }
    /**
     * 播放次数
     */
    public playMovie(playTime, callback) {
        
        if(playTime) {
            this.movie.gotoAndPlay(0, playTime)
        } else {
            this.movie.gotoAndPlay(0, -1);
        }
        return new Promise((resolve)=>{
            this.movie.addEventListener(egret.Event.COMPLETE,  (e:egret.Event) => {
                resolve && resolve()
            }, this);
        })
    }
}