// 站立
class StandState implements State {
    static readonly instance = new StandState()
    name = 'stand'
    async handle(fartMan: FartMan) {
        fartMan.moveX = 0;
        const movieName = 'stand'
        let skewY = 0
        if(fartMan.lastState.name === 'workLeft') {
            skewY = 180
        
        } else {
            skewY = 0
        }
        await fartMan.movieClip({
            movieName,
            frameRate: 1,
            skewY
        })
    }
}
// 跳
class JumpState implements State{
    static readonly instance = new JumpState();
    name = 'jump'
    nextState = StandState.instance
    async handle(fartMan: FartMan){
        fartMan.jumpNum--
        const movieName = 'jump'
        // 跳逻辑
        fartMan.boxBody.velocity[1] = 12;
        await fartMan.movieClip({
            movieName,
            playTime: 1,
            frameRate: 10
        })
        fartMan.changeState(StandState.instance)
    }
}
// 走右边
class WorkRightState implements State {
    static readonly instance = new WorkRightState()
    name = 'workRight'
    nextState = StandState.instance
    async handle(fartMan: FartMan) {
        const movieName = 'walk'        
        fartMan.moveX = fartMan.v;
        fartMan.right++
        await fartMan.movieClip({
            movieName,
            frameRate: 10
        })
    }
}
// 跳右边
class jumpRightState implements State {
    static readonly instance = new jumpRightState()
    name = 'jumpRight'
    nextState = StandState.instance
    async handle(fartMan: FartMan) {
        fartMan.moveX = fartMan.v;
    }
}
// 跳右边
class jumpLeftState implements State {
    static readonly instance = new jumpLeftState()
    name = 'jumpRight'
    async handle(fartMan: FartMan) {
        fartMan.moveX = -fartMan.v;
    }
}
// 走左边
class WorkLeftState implements State {
    static readonly instance = new WorkLeftState()
    name = 'workLeft'
    nextState = StandState.instance
    async handle(fartMan: FartMan) {
        const movieName = 'walk'        
        fartMan.moveX = -fartMan.v;
        fartMan.left++
        await fartMan.movieClip({
            movieName,
            frameRate: 10,
            skewY: 180
        })
    }
}