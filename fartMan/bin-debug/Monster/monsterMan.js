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
/**
 * 这是一个公怪物，继承自怪物基类，如果你想有其他怪物，也应该继承自怪物基类
 */
var MonsterMan = (function (_super) {
    __extends(MonsterMan, _super);
    function MonsterMan() {
        var _this = _super.call(this) || this;
        _this.width = 1;
        _this.height = 2.2;
        _this.position = [6, 3];
        _this.addMonster();
        return _this;
    }
    MonsterMan.prototype.addMonster = function () {
        this.movieName = 'hero';
        this.movieArray = ['stand', 'walk', 'jump'];
    };
    return MonsterMan;
}(MonBasic));
__reflect(MonsterMan.prototype, "MonsterMan");
