/**
 * 这是怪物基类，继承自上帝类
 */
class MonBasic extends Manager{
    public x;
    public y;
    public v = .2;
    public position  = [0, 0]
    constructor (){
        super()
    }
     /**
     * 可以创建一个怪物对象，内置了白鹭的创建形状的方法,
     * 你无需关注它是如何实现的，你只要将接口中的参数传给它就行
     */
    public drawMonster() {
        const width = this.width
        const height = this.height
        const position = this.position
        const boxShape: p2.Shape = new p2.Box({
            width: width,
            height: height
        });
        boxShape.material = GameConfig.manMaterial
        const boxBody: p2.Body = new p2.Body({ 
            mass: 1,
            position:position,
            fixedRotation: true,
            allowSleep: false,
            ccdIterations: 40
        });
        boxBody.addShape(boxShape);
        //添加长方形刚体的显示对象   
        var display: egret.DisplayObject = this.createSprite((<p2.Box>boxShape).width*50, (<p2.Box>boxShape).height*50);
        console.log(display)
        
        display.addEventListener(egret.Event.ADDED_TO_STAGE,() => {
            // 如果设置了帧动画
            if(this.movieName) {
                this.addMovieClip(display)
            }
        },this);
        //同步egret对象和p2对象     
        boxBody.displays = [display];
        return {
            boxBody: boxBody,
            display
        }
    }
    private createSprite(width, height): egret.Sprite {
        var result: egret.Sprite = new egret.Sprite();
        result.graphics.beginFill(0x37827A);
        result.graphics.drawRect(0,0,width,height);
        result.graphics.endFill();
        result.anchorOffsetX = width / 2;
        result.anchorOffsetY = height / 2;
        return result;
    }
}