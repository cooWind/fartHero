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
    constructor(fartMan:FartMan, gameScene:Flat) {
        this.fartMan = fartMan
        // Flat
        this.gameScene = gameScene
        this.gameLayers = this.gameScene.gameLayers
    }
    public moveCamera() {
        this.gameScene.x =  (-this.fartMan.x + this.offsetX) * this.v
        // this.gameScene.y = - this.fartMan.y + this.offsetY
        this.renderGameMap()
    }
    public renderGameMap() {
        let blocks:tiled.TMXLayer
        for(let i = 0, len = this.gameLayers.length; i < len; i++) {
            if(this.gameLayers[i].name === 'hero') {
                blocks = this.gameLayers[i]
            }
        }
        // 渲染相关值
        const x = this.fartMan.x + GameConfig.width
        const y = 0
        const width = this.renderWidth
        const height = GameConfig.height
        const rectangle =new egret.Rectangle(x, 0, width, height);
        blocks.draw(rectangle)
        const {
            tilewidth,
            tileheight,
        } = blocks
        const row = Math.floor((x + this.renderWidth) / tilewidth)
        const col = Math.floor(height / tileheight)
        const start = Math.floor(x / tilewidth)
        for(let i = 0; i < blocks.rows; i++) {
            for(let j = start; j< row; j++) {
                const block:tiled.TMXTile = blocks.getTile(j * blocks.tilewidth, i * blocks.tileheight)
                //　还没有绑定刚体的给它绑定上
                if(block && block.bitmap && !this.hashTiles[`${i}_${j}`]) {
                    const body = this.gameScene.createBlockBox(block.bitmap)
                    this.hashTiles[`${i}_${j}`] = {
                        block,
                        body
                    }
                }
                // 回收刚体以及渲染　
            }
        }
    }
}

           
               