/**
 * 相机基类
 */
class CameraBase {
    // 游戏图层数组，相机移动时渲染
    public gameLayers:Array<tiled.TMXLayer>;
    // 主角
    public fartMan:FartMan;
    // 游戏上帝容器
    public gameScene:Flat;
    public width;
    public height;
    public x;
    public y;
    // 跟随偏移量
    private offsetX = 200;
    private offsetY = 140;
    // 渲染相关值
    private renderWidth = 100;
    private renderOffsetX = 200;
    // 相机移动速度
    private v = 1;
    private bindBodys:Array<p2.Body>;
    private hashTiles = {}
    public camerSprite:egret.Sprite
    constructor(fartMan:FartMan, gameScene:Flat) {
        this.fartMan = fartMan
        // Flat
        this.gameScene = gameScene
        this.gameLayers = this.gameScene.gameLayers
        this.camerSprite = this.createCamerMask(200, 300)
        this.gameScene.parent.addChild(this.camerSprite)
        this.gameScene.mask = this.camerSprite
    }
    public moveCamera() {
        this.gameScene.x =  (-this.fartMan.x + this.offsetX) * this.v
        // this.gameScene.y = - this.fartMan.y + this.offsetY
        this.gameScene.renderGameMap()
    }
    public createCamerMask(width, height) {
        var result: egret.Sprite = new egret.Sprite();
        result.graphics.beginFill(0x37827A);
        result.graphics.drawRect(20,0,GameConfig.width - 40,GameConfig.height);
        result.graphics.endFill();
        result.anchorOffsetX = 0
        result.anchorOffsetY = 0
        return result;
    }
    // public renderGameMap() {
    //     let blocks:tiled.TMXLayer
    //     for(let i = 0, len = this.gameLayers.length; i < len; i++) {
    //         if(this.gameLayers[i].name === 'hero') {
    //             blocks = this.gameLayers[i]
    //         }
    //     }
    //     // 渲染相关值
    //     const x = this.fartMan.x + GameConfig.width
    //     const y = 0
    //     const width = this.renderWidth
    //     const height = GameConfig.height
    //     const rectangle =new egret.Rectangle(x, 0, width, height);
    //     blocks.draw(rectangle)
    //     const {
    //         tilewidth,
    //         tileheight,
    //     } = blocks
    //     const row = Math.floor((x + this.renderWidth) / tilewidth)
    //     const col = Math.floor(height / tileheight)
    //     const start = Math.floor(x / tilewidth)
    //     for(let i = 0; i < blocks.rows; i++) {
    //         for(let j = start; j< row; j++) {
    //             console.log(j, i)
    //             if(j >= 120)
    //                 return;
    //             const block:tiled.TMXTile = blocks.getTile((j + 1) * blocks.tilewidth, (i+1) * blocks.tileheight)
    //             //　还没有绑定刚体的给它绑定上
    //             if(block && block.bitmap && !this.hashTiles[`${i}_${j}`]) {
    //                 const body = this.gameScene.createBlockBox(block.bitmap)
    //                 this.hashTiles[`${i}_${j}`] = {
    //                     block,
    //                     body
    //                 }
    //             }
    //         }
    //     }
    //     //回收刚体
    //     Object.keys(this.hashTiles).forEach((val) => {
    //         let body:p2.Body = this.hashTiles[val].body
    //         let block:egret.Sprite = this.hashTiles[val].block
    //         console.log(block)
    //         const x = body.position[0] * 50
    //         const y = body.position[1] * 50
    //         if(body && x + this.gameScene.x < 0) {
    //             this.gameScene.world.removeBody(body)
    //             if(block.parent) {
    //                 block.parent.removeChild(block)
    //             }
    //             delete this.hashTiles[val]
    //         }
    //     })
    // }
}

           
               