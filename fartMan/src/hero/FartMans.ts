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
            this.changeState(StandState.instance) 
        }
        function upSelfEvent() {
        }
        keydown_event(37,()=>{
             this.changeState(WorkLeftState.instance)
        },upEvent, upSelfEvent)
        keydown_event(39,()=>{
            this.changeState(WorkRightState.instance)
        },upEvent, upSelfEvent)
        keydown_event(38,()=>{
            this.changeState(JumpState.instance)
        }, upEvent, upSelfEvent)
        keydown_event(67,()=>{
            // this.boxBody.velocity[1] = 12;
        });
        keydown_event(40,()=>{
            this.changeState(WorkLeftState.instance)
        },upEvent, upSelfEvent)
    }

    public Update(dt:number) {
        // TEMP 移动全部是临时方案
        if (this.moveX != 0.0)
        {
            this.boxBody.position[0] += this.moveX;
        }

        const camera = this.mCurrentMap.GetMapCamera();
        this.boxBody.displays[0].x = this.x - camera.x;
        this.boxBody.displays[0].y = this.y - camera.y;
        //console.log(this.boxBody.position[0], this.boxBody.position[1], this.x, this.y);
    }
}