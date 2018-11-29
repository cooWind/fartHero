var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
// 站立
var StandState = (function () {
    function StandState() {
    }
    StandState.prototype.handle = function (fartMan) {
        console.log('dont move');
        fartMan.moveX = 0;
    };
    StandState.instance = new StandState();
    return StandState;
}());
__reflect(StandState.prototype, "StandState", ["State"]);
// 跳
var JumpState = (function () {
    function JumpState() {
    }
    JumpState.prototype.handle = function (fartMan) {
        var movieName = 'jump';
        // 跳逻辑
        fartMan.boxBody.velocity[1] = 12;
        fartMan.movieClip({
            movieName: movieName,
            playTime: 1,
            frameRate: 30,
            callback: function () {
                fartMan.movieClip({
                    movieName: fartMan.movieArray[0]
                });
            }
        });
    };
    JumpState.instance = new JumpState();
    return JumpState;
}());
__reflect(JumpState.prototype, "JumpState", ["State"]);
// 走右边
var WorkRightState = (function () {
    function WorkRightState() {
    }
    WorkRightState.prototype.handle = function (fartMan) {
        fartMan.moveX = fartMan.v;
    };
    WorkRightState.instance = new WorkRightState();
    return WorkRightState;
}());
__reflect(WorkRightState.prototype, "WorkRightState", ["State"]);
// 走左边
var WorkLeftState = (function () {
    function WorkLeftState() {
    }
    WorkLeftState.prototype.handle = function (fartMan) {
        fartMan.moveX = -fartMan.v;
    };
    WorkLeftState.instance = new WorkLeftState();
    return WorkLeftState;
}());
__reflect(WorkLeftState.prototype, "WorkLeftState", ["State"]);
