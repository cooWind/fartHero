class FartMan extends ManBasic {
    public v = .1;
    public width = .5 * 2
    public height = 1.28 * 2
    public position = [10,3]
    // 跳跃次数
    public jumpNum = 1
    // 移动累加值
    public moveX = 0
    public left = 0
    public right = 0
    public speed = 5
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
                this.changeState(WorkLeftState.instance)
        },upEvent, ()=>{
            // this.changeState(StandState.instance) 
            this.left = 0
        })
        keydown_event(39,()=>{
            
                this.changeState(WorkRightState.instance)
        },upEvent, ()=>{
            // this.changeState(StandState.instance) 
            this.right = 0
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
           // this.boxBody.position[0] += this.moveX;
        }

        const camera = this.mCurrentMap.GetMapCamera();
        this.boxBody.velocity[0] = this.speed * (this.right - this.left);
        this.boxBody.displays[0].x = this.x - camera.x;
        this.boxBody.displays[0].y = this.y - camera.y;
        console.log(this.left, this.right)
        //console.log(this.boxBody.position[0], this.boxBody.position[1], this.x, this.y);
    }
}