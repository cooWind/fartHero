class FartMan extends ManBasic {
    public v = .1;
    public width = .5 * 2
    public height = 1.28 * 2
    public position = [10,3]
    // 跳跃次数
    public jumpNum = 1
    // 移动累加值
    public moveX = 0
    public constructor(){
        super()
        this.addHero()
        this.controlKey()
    }
    private addHero() {
        this.movieName = 'lady'
        this.movieScale = .5
        this.movieArray = ['stand', 'walk', 'stand']
    }
    public addJumpNum():void {
        if(this.jumpNum <= 0) {
            this.jumpNum++
        }
        console.log(this.jumpNum)
    }
    //键盘监听
    public controlKey(){
        let upEvent = (ev)=> {
            // this.changeState(StandState.instance) 
            // this.moveX = 0
        }
        function upSelfEvent() {
        }
        keydown_event(37,()=>{
            if(this.state === JumpState.instance) {
                console.log('向右跳')
                this.changeState(jumpLeftState.instance)
            } else {
                this.changeState(WorkLeftState.instance)
            }
        },upEvent, ()=>{
            this.changeState(StandState.instance) 
        })
        keydown_event(39,()=>{
                console.log('向右跳')
            if(this.state === jumpRightState.instance) {
                this.changeState(jumpRightState.instance)
            } else {
                this.changeState(WorkRightState.instance)
            }
        },upEvent, ()=>{
            this.changeState(StandState.instance) 
        })
        keydown_event(38,()=>{
            // if(this.jumpNum <= 0) {
            //     return
            // }
            if(this.mCurrentMap.checkIfCanJump()) {
                this.changeState(JumpState.instance)
            }
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