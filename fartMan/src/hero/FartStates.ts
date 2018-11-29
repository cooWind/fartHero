// 站立
class StandState implements State {
    static readonly instance = new StandState()
    handle(fartMan: FartMan) {
        console.log('dont move')
        fartMan.moveX = 0;
    }
}
// 跳
class JumpState implements State{
    static readonly instance = new JumpState();

    handle(fartMan: FartMan){
        const movieName = 'jump'
        // 跳逻辑
        fartMan.boxBody.velocity[1] = 12;
        fartMan.movieClip({
            movieName,
            playTime: 1,
            frameRate: 30,
            callback:() => {
                fartMan.movieClip({
                    movieName: fartMan.movieArray[0]
                })
            }
        })
    }
}
// 走右边
class WorkRightState implements State {
    static readonly instance = new WorkRightState()
    handle(fartMan: FartMan) {
        fartMan.moveX = fartMan.v;
    }
}
// 走左边
class WorkLeftState implements State {
    static readonly instance = new WorkLeftState()
    handle(fartMan: FartMan) {
        fartMan.moveX = - fartMan.v;
    }
}