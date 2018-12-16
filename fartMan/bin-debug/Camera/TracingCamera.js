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
 * 相机类, 目前直接定义为追踪主角的相机类
 */
var TracingCamera = (function (_super) {
    __extends(TracingCamera, _super);
    function TracingCamera(gameMap) {
        var _this = _super.call(this) || this;
        _this.mCurrentMap = gameMap;
        _this.width = GameConfig.width;
        _this.height = GameConfig.height;
        return _this;
    }
    TracingCamera.prototype.Update = function (dt) {
        if (this.mTracingEntity != null) {
            var _a = this.mTracingEntity.GetCenterPos(), cx = _a[0], cy = _a[1];
            this.x = cx - this.width / 2;
            this.y = cy - this.height / 2;
        }
        this.AdaptMapBound();
    };
    TracingCamera.prototype.SetTracingEntity = function (entity) {
        this.mTracingEntity = entity;
    };
    TracingCamera.prototype.AdaptMapBound = function () {
        var _a = this.mCurrentMap.GetMapSize(), mapWidth = _a[0], mapHeight = _a[1];
        var viewWidth = this.width;
        var viewHeight = this.height;
        var adaptSizeAxis = function (viewSize, mapSize, camPos) {
            if (mapSize <= viewSize) {
                return (mapSize - viewSize) / 2;
            }
            else {
                return Math.min(mapSize - viewSize, Math.max(camPos, 0));
            }
        };
        this.x = adaptSizeAxis(viewWidth, mapWidth, this.x);
        this.y = adaptSizeAxis(viewHeight, mapHeight, this.y);
    };
    return TracingCamera;
}(Entity));
__reflect(TracingCamera.prototype, "TracingCamera");
