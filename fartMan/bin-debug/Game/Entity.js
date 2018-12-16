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
/*
*   游戏单位实体类
**/
var Entity = (function (_super) {
    __extends(Entity, _super);
    function Entity() {
        var _this = _super.call(this) || this;
        _this.width = 0;
        _this.height = 0;
        _this.position = [0, 0];
        return _this;
    }
    Entity.prototype.GetCenterPos = function () {
        var cx = this.width / 2 + this.x;
        var cy = this.height / 2 + this.y;
        return [cx, cy];
    };
    Entity.prototype.Update = function (dt) {
    };
    Entity.prototype.SetMap = function (gameMap) {
        this.mCurrentMap = gameMap;
    };
    return Entity;
}(Manager));
__reflect(Entity.prototype, "Entity");
