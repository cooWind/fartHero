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
        _this.width = 1;
        _this.height = 2.38;
        _this.position = [10, 3];
        // 移动累加值
        _this.moveX = 0;
        _this.addHero();
        _this.controlKey();
        return _this;
    }
    FartMan.prototype.addHero = function () {
        this.movieName = 'hero';
        this.movieScale = .5;
        this.movieArray = ['stand', 'walk', 'jump'];
    };
    //键盘监听
    FartMan.prototype.controlKey = function () {
        var _this = this;
        var upEvent = function (ev) {
            _this.moveX = 0;
        };
        function upSelfEvent() {
        }
        keydown_event(37, function () {
            _this.moveX = -_this.v;
        }, upEvent, upSelfEvent);
        keydown_event(39, function () {
            _this.moveX = _this.v;
        }, upEvent, upSelfEvent);
        keydown_event(38, function () {
            _this.boxBody.velocity[1] = 12;
            _this.movieClip({
                movieName: _this.movieArray[2],
                playTime: 1,
                frameRate: 30,
                callback: function () {
                    console.log('callback');
                    _this.movieClip({
                        movieName: _this.movieArray[0]
                    });
                }
            });
        }, upEvent, upSelfEvent);
        keydown_event(40, function () {
        }, upEvent, upSelfEvent);
        keydown_event(67, function () {
            _this.boxBody.velocity[1] = 12;
        });
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
