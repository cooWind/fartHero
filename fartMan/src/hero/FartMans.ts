class FartMan extends ManBasic {
    public v = .1;
    public width = 1
    public height = 1
    public position = [10,3]
    // 移动累加值
    public moveX = 0
    public left = 0
    public right = 0
    public speed = 5
    // 是否在跳跃
    public isJump = false
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
            // this.changeState(StandState.instance) 
            // this.moveX = 0
        }
        function upSelfEvent() {
        }
        /**
         * 向左边
         */
        keydown_event(37,()=>{
            if(!this.checkIfCanJump()) {
                this.left = 1
                return
            }
            this.changeState(WorkLeftState.instance)
        },upEvent, ()=>{
            // this.changeState(StandState.instance) 
            this.left = 0
            // 向左向右的速度都为0，并且不是跳跃状态就转换为站立状态
            if(!this.right && this.state != jumpLeftState.instance) {
                this.changeState(StandState.instance)
            }
        })
        /**
         * 向右边
         */
        keydown_event(39,()=>{
            // 不能跳说明在空中，则只改变坐标不转换状态
            if(!this.checkIfCanJump()) {
                this.right = 1
                return
            }
            this.changeState(WorkRightState.instance)
        },upEvent, ()=>{
            // 
            this.right = 0
            // 向左向右的速度都为0，并且不是跳跃状态就转换为站立状态
            if(!this.left && this.state != jumpLeftState.instance) {
                this.changeState(StandState.instance) 
            }
        })
        /**
         * 跳跃
         */
        keydown_event(38,()=>{
            // if(this.jumpNum <= 0) {
            //     return
            // }
            if(this.checkIfCanJump()) {
                this.changeState(JumpState.instance)
            }
        }, upEvent, ()=>{
            // if(this.left) {
            //     this.changeState(WorkLeftState.instance)
            // } else if(this.right) {
            //     this.changeState(WorkRightState.instance)
            // } else {
            //     this.changeState(StandState.instance)
            // }
        })
        keydown_event(67,()=>{
            // this.boxBody.velocity[1] = 12;
        });
        keydown_event(40,()=>{
            console.log('40000')
            // this.changeState(WorkLeftState.instance)
        },upEvent, upSelfEvent)
    }
    /**
     * 判断方向，改变主角方向
     */
    private checkSkew() {
        if(this.left) {
            this.changeState(WorkLeftState.instance)
        } else if(this.right) {
            this.changeState(WorkRightState.instance)
        } else {
            // this.changeState(StandState.instance)
        }
    }
    /**
     * 跳跃检测
     */
    private checkIfCanJump():Boolean {
        const mBodyWorld = this.mCurrentMap.mBodyWorld
        for(var i=0; i<mBodyWorld.mWorld.narrowphase.contactEquations.length; i++){
            var c = mBodyWorld.mWorld.narrowphase.contactEquations[i];
            if(c.bodyA === this.boxBody || c.bodyB === this.boxBody){
            var d = c.normalA[1];
            if(c.bodyA === this.boxBody) d *= -1;
            if(d > 0.5) return true;
            }
        }
        return false;
    }
    // 碰撞检测回调
    public checkHit():void{
        console.log('回调')
        const id = this.bodyId
        const mBodyWorld = this.mCurrentMap.mBodyWorld
        for(var i = 0;i < mBodyWorld.mWorld.narrowphase.contactEquations.length;i++) {
            let c: p2.ContactEquation = mBodyWorld.mWorld.narrowphase.contactEquations[i];
            console.log(c)
            let pt: Array<number>, contactPos: Array<number>
            console.log(c.bodyA.id, c.bodyB.id)
            console.log(id)
            if(c.bodyA.id ==id || c.bodyB.id == id) {
                console.log('碰撞')
            } else {
                return
            }
            if(c.bodyA.id == id) {
                console.log('主角是A')
                pt = c.contactPointA;//pointA delta向量，上次使用contactPointB貌似没用对，用contactPointA就对了
                contactPos = [c.bodyA.position[0] + pt[0],c.bodyA.position[1] + pt[1]];
            }
            if(c.bodyB.id == id) {
                console.log('主角是B')
                pt = c.contactPointB;//pointA delta向量，上次使用contactPointB貌似没用对，用contactPointA就对了
                contactPos = [c.bodyB.position[0] + pt[0],c.bodyB.position[1] + pt[1]];
            }
            if(!contactPos) {
                return
            }
            const x = Math.floor(contactPos[0] * 100)
            const y = Math.floor(contactPos[1] * 100)
            const x1 = Math.floor((this.boxBody.position[0] + this.width / 2) * 100)
            const y1 = Math.floor((this.boxBody.position[1] - this.height / 2) * 100)
            console.log('坐标')
            console.log(y , y1, this.boxBody.velocity[1])
            // 主角的脚碰到地板上了
            if(y >= y1) {
                // 碰撞
                this.checkSkew()
            } 
            
            // console.log(this.mFartMan.width, this.mFartMan.height)
        }
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
        //console.log(this.boxBody.position[0], this.boxBody.position[1], this.x, this.y);
    }
}