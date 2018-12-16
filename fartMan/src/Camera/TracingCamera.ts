/**
 * 相机类, 目前直接定义为追踪主角的相机类
 */
class TracingCamera extends Entity
{
    private mTracingEntity:Entity;
    
    public constructor(gameMap:GameMap){
        super();

        this.mCurrentMap = gameMap;
        this.width = GameConfig.width;
        this.height = GameConfig.height;
    }

    public Update(dt:Number){
        if (this.mTracingEntity != null) {
            const [cx, cy] = this.mTracingEntity.GetCenterPos();
            this.x = cx - this.width / 2;
            this.y = cy - this.height / 2;
        }

        this.AdaptMapBound();
    }

    public SetTracingEntity(entity:Entity){
        this.mTracingEntity = entity;
    }

    private AdaptMapBound() {
        const [mapWidth, mapHeight] = this.mCurrentMap.GetMapSize();
        const viewWidth = this.width;
        const viewHeight = this.height;

        let adaptSizeAxis = (viewSize:number, mapSize:number, camPos:number):number =>{
            if (mapSize <= viewSize) {
                return (mapSize - viewSize) / 2;
            }
            else {
                return Math.min(mapSize - viewSize, Math.max(camPos, 0));
            }
        }

        this.x = adaptSizeAxis(viewWidth, mapWidth, this.x);
        this.y = adaptSizeAxis(viewHeight, mapHeight, this.y);
    }
}

           
               