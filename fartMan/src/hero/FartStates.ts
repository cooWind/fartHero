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
            frameRate: 10,
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
        const movieName = 'jump'
        // 跳逻辑
        fartMan.boxBody.velocity[1] = 8;
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
        await fartMan.movieClip({
            movieName,
            frameRate: 10
        })
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
        await fartMan.movieClip({
            movieName,
            frameRate: 10,
            skewY: 180
        })
    }
}