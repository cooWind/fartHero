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
    这是主角基类
**/
var ManBasic = (function (_super) {
    __extends(ManBasic, _super);
    function ManBasic() {
        var _this = _super.call(this) || this;
        _this.position = [0, 0];
        return _this;
    }
    /**
     * 可以创建一个英雄对象，内置了白鹭的创建形状的方法,
     * 你无需关注它是如何实现的，你只要将接口中的参数传给它就行
     */
    ManBasic.prototype.drawMan = function () {
        var _this = this;
        var width = this.width;
        var height = this.height;
        var position = this.position;
        var boxShape = new p2.Box({
            width: width,
            height: height
        });
        boxShape.material = GameConfig.manMaterial;
        var boxBody = new p2.Body({
            mass: 10,
            position: position,
            fixedRotation: true,
            allowSleep: false,
            ccdIterations: 40,
            ccdSpeedThreshold: 0,
        });
        boxBody.addShape(boxShape);
        this.boxBody = boxBody;
        this.bodyId = boxBody.id;
        //添加长方形刚体的显示对象   
        var display = this.createSprite(boxShape.width * 50, boxShape.height * 50);
        display.addEventListener(egret.Event.ADDED_TO_STAGE, function () {
            console.log('执行了一次');
            // 如果设置了帧动画
            if (_this.movieName) {
                _this.addMovieClip(display);
            }
        }, this);
        console.log(display);
        //同步egret对象和p2对象   
        display.x = this.x;
        display.y = this.y;
        boxBody.position[0] = this.x / 50;
        boxBody.position[1] = (GameConfig.height - this.y) / 50;
        boxBody.displays = [display];
        return {
            boxBody: boxBody,
            display: display
        };
    };
    ManBasic.prototype.createSprite = function (width, height) {
        var result = new egret.Sprite();
        result.graphics.beginFill(0x37827A);
        result.graphics.drawRect(0, 0, width, height);
        result.graphics.endFill();
        result.anchorOffsetX = width / 2;
        result.anchorOffsetY = height / 2;
        return result;
    };
    return ManBasic;
}(Entity));
__reflect(ManBasic.prototype, "ManBasic");
