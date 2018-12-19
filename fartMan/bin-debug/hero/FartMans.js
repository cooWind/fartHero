var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var FartMan = (function (_super) {
    __extends(FartMan, _super);
    function FartMan() {
        var _this = _super.call(this) || this;
        _this.v = .1;
        _this.width = .5 * 2;
        _this.height = 1.28 * 2;
        _this.position = [10, 3];
        // 跳跃次数
        _this.jumpNum = 1;
        // 移动累加值
        _this.moveX = 0;
        _this.addHero();
        _this.controlKey();
        return _this;
    }
    FartMan.prototype.addHero = function () {
        this.movieName = 'lady';
        this.movieScale = .5;
        this.movieArray = ['stand', 'walk', 'stand'];
    };
    FartMan.prototype.addJumpNum = function () {
        if (this.jumpNum <= 0) {
            this.jumpNum++;
        }
        console.log(this.jumpNum);
    };
    //键盘监听
    FartMan.prototype.controlKey = function () {
        var _this = this;
        var upEvent = function (ev) {
            // this.changeState(StandState.instance) 
            // this.moveX = 0
        };
        function upSelfEvent() {
        }
        keydown_event(37, function () {
            if (_this.state === JumpState.instance) {
                console.log('向右跳');
                _this.changeState(jumpLeftState.instance);
            }
            else {
                _this.changeState(WorkLeftState.instance);
            }
        }, upEvent, function () {
            _this.changeState(StandState.instance);
        });
        keydown_event(39, function () {
            console.log('向右跳');
            if (_this.state === jumpRightState.instance) {
                _this.changeState(jumpRightState.instance);
            }
            else {
                _this.changeState(WorkRightState.instance);
            }
        }, upEvent, function () {
            _this.changeState(StandState.instance);
        });
        keydown_event(38, function () {
            // if(this.jumpNum <= 0) {
            //     return
            // }
            if (_this.mCurrentMap.checkIfCanJump()) {
                _this.changeState(JumpState.instance);
            }
        }, upEvent, upSelfEvent);
        keydown_event(67, function () {
            // this.boxBody.velocity[1] = 12;
        });
        keydown_event(40, function () {
            _this.changeState(WorkLeftState.instance);
        }, upEvent, upSelfEvent);
    };
    FartMan.prototype.Update = function (dt) {
        // TEMP 移动全部是临时方案
        if (this.moveX != 0.0) {
            this.boxBody.position[0] += this.moveX;
        }
        var camera = this.mCurrentMap.GetMapCamera();
        this.boxBody.displays[0].x = this.x - camera.x;
        this.boxBody.displays[0].y = this.y - camera.y;
        //console.log(this.boxBody.position[0], this.boxBody.position[1], this.x, this.y);
    };
    return FartMan;
}(ManBasic));
__reflect(FartMan.prototype, "FartMan");
