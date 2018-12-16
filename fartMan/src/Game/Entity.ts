/* 
*   游戏单位实体类
**/
class Entity extends Manager{
    public x;
    public y;
    public width = 0;
    public height = 0;
    public position = [0, 0]
    public boxBody: p2.Body

    public mCurrentMap:GameMap;

    public constructor(){
        super()
    }

    public GetCenterPos(){
        const cx = this.width / 2  + this.x;
        const cy = this.height / 2 + this.y;
        return [cx, cy];
    }

    public Update(dt:number) {
    }

    public SetMap(gameMap:GameMap) {
        this.mCurrentMap = gameMap;
    }
}