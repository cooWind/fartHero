// 站立
class StandState implements State {
    static readonly instance = new StandState()
    async handle(fartMan: FartMan) {
        console.log('dont move')
        fartMan.moveX = 0;
        const movieName = 'stand'
        await fartMan.movieClip({
            movieName,
            frameRate: 10
        })
    }
}
// 跳
class JumpState implements State{
    static readonly instance = new JumpState();
    nextState = StandState.instance
    async handle(fartMan: FartMan){
        const movieName = 'jump'
        // 跳逻辑
        fartMan.boxBody.velocity[1] = 8;
        await fartMan.movieClip({
            movieName,
            playTime: 1,
            frameRate: 30
        })
    }
}
// 走右边
class WorkRightState implements State {
    static readonly instance = new WorkRightState()
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
    nextState = StandState.instance
    async handle(fartMan: FartMan) {
        const movieName = 'walk'        
        fartMan.moveX = -fartMan.v;
        await fartMan.movieClip({
            movieName,
            frameRate: 10
        })
    }
}