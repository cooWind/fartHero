class FartMan extends ManBasic {
    public v = .2;
    public width = 1
    public height = 2.38
    public position = [10,3]
    // 移动累加值
    public moveX = 0
    public constructor(){
        super()
        this.addHero()
        this.controlKey()
    }
    private addHero() {
        this.movieName = 'hero'
        this.movieScale = .5
        this.movieArray = ['stand', 'walk', 'jump']
    }
    //键盘监听
    public controlKey(){
        let upEvent = (ev)=> {
            this.moveX = 0           
        }
        function upSelfEvent() {
        }
        keydown_event(37,()=>{
                this.moveX = -this.v;
        },upEvent,upSelfEvent)
        keydown_event(39,()=>{
                this.moveX = this.v;
        },upEvent,upSelfEvent)
        keydown_event(38,()=>{
            this.boxBody.velocity[1] = 12;
            this.movieClip({
                movieName: this.movieArray[2],
                playTime: 1,
                frameRate: 30,
                callback:() => {
                    console.log('callback')
                    this.movieClip({
                        movieName: this.movieArray[0]
                    })
                }
            })
        },upEvent,upSelfEvent)
        keydown_event(40,()=>{

        },upEvent,upSelfEvent);
        keydown_event(67,()=>{
            this.boxBody.velocity[1] = 12;
        });
    }
}