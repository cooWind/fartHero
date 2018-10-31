var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ManBasic = (function () {
    function ManBasic() {
    }
    /**
     * 可以创建一个英雄对象，内置了白鹭的创建形状的方法,
     * 你无需关注它是如何实现的，你只要将接口中的参数传给它就行
     */
    ManBasic.prototype.drawMan = function (createBoxConfig) {
        var width = createBoxConfig.width, height = createBoxConfig.height, position = createBoxConfig.position;
        var boxShape = new p2.Box({
            width: width,
            height: height
        });
        var boxBody = new p2.Body({
            mass: 1,
            position: position,
            fixedRotation: true
        });
        boxBody.addShape(boxShape);
        //添加长方形刚体的显示对象   
        var display = this.createSprite(boxShape.width * 50, boxShape.height * 50);
        console.log(display);
        //同步egret对象和p2对象     
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
}());
__reflect(ManBasic.prototype, "ManBasic");
