
/**
 *  GameMap 
 */

// Extend Sprite???
class GameMap
{
    private mGameInstance:GameInstance;

    private mIsLoaded:boolean = false;
    private mIsStarted:boolean = false;
    public mBodyWorld:BodyWorld;
    private mCamera:TracingCamera;
    private mEntities:Entities;

    // 暂时直接使用txmtilemap
    private mTmxtileMap:tiled.TMXTilemap

    private mMapID:string = "";
    private mMapWidth = 0;
    private mMapHeight = 0;
    private mMinLayer = 0;
    private mMaxLayer = 0;

    // Testing
    private mFartMan:FartMan;

    public constructor(mapID:string) {
        this.mMapID = mapID;
    }

    public async Load(gameInstance:GameInstance) {
        this.mGameInstance = gameInstance;

        // 加载地图
        var mapLoader:MapLoader = new MapLoader;
        await mapLoader.LoadMap("resource/cute.tmx");
        gameInstance.addChild(mapLoader.GetTemxTileMap());

        this.mMapWidth = mapLoader.GetWidth();
        this.mMapHeight = mapLoader.GetHeight();
        this.mMinLayer = mapLoader.GetMinLayer();
        this.mMaxLayer = mapLoader.GetMaxLayer();
        this.mTmxtileMap = mapLoader.GetTemxTileMap();
        console.log("Map Info.", this.mMapWidth, this.mMapHeight, this.mMinLayer, this.mMaxLayer);

        // 初始化物理世界
        var bodyWorldConfig:BodyWorldConfig = new BodyWorldConfig;
        this.mBodyWorld = new BodyWorld(this, bodyWorldConfig);

        // 初始化实体集合类
        this.mEntities = new Entities(this);

        // Testing
        this.mFartMan = new FartMan()
        this.mFartMan.SetMap(this);
        this.CreateHero();

        // 初始化相机(之后可能移动到Entities中)
        this.mCamera = new TracingCamera(this);
        this.mCamera.SetMap(this);
        this.mCamera.SetTracingEntity(this.mFartMan);

        this.mBodyWorld.BindEntityBody(this.mFartMan);
        this.mBodyWorld.BindP2Map(this.mTmxtileMap);
        // 主角碰撞检测回调
        this.mBodyWorld.mWorld.on('beginContact',(ev)=>{
            const id = this.mFartMan.bodyId
            const {
                bodyA,
                bodyB
            } = ev
            let bindBody, fartBody
            if(bodyA.id === id) {
                bindBody = bodyB
                fartBody = bodyA
            } else if (bodyB.id === id){
                bindBody = bodyA
                fartBody = bodyB
            } else {
                return
            }
            this.mFartMan.checkHit()
        })
        this.mIsLoaded = true;
    }
    
    /**
     * 主角碰撞检测方法，先写在这里，后面把事件分发出去
     */
    
    public UnLoad() {
         console.log("Map Unloaded.");
        this.mIsLoaded = false;
    }

    public Start() {
        console.log("Map Started.");
        this.mIsStarted = true;
    }

    public Stop() {
        console.log("Map Stoped.");
        this.mIsStarted = false;
    }

    public Update(dt:number){
        if (this.mIsLoaded == false || this.mIsStarted == false){
            return;
        }

        // 先更新所有游戏单位，再更新刚体世界
        this.mBodyWorld.Update(dt);
        this.mEntities.Update(dt);
        this.mFartMan.Update(dt);
        this.mCamera.Update(dt);
    }

    public Draw()
    {     
        if (this.mIsLoaded == false || this.mIsStarted == false){
            return;
        }

        // NEED TODO
        if (this.CheckStaticMapDirty() == true)
        {
            let gameLayers = this.mTmxtileMap.getLayers();
            for(let i = 0, len = gameLayers.length; i < len; i++) {
                let blocks:tiled.TMXLayer = gameLayers[i];
                blocks.staticContainer.removeChildAt(0);
                blocks.staticContainer.x = -this.mCamera.x;
                blocks.staticContainer.y = -this.mCamera.y;
            
                const x = this.mCamera.x;
                const y = this.mCamera.y;
                const width = this.mCamera.width;
                const height = this.mCamera.height;
                const rectangle = new egret.Rectangle(x, y, width, height);
                blocks.draw(rectangle);
                
            }
            this.mBodyWorld.BindP2Map(this.mTmxtileMap);
        }
    }

    // Member Setter/Getter
    public GetMapID() {
        return this.mMapID;
    }

    public CheckStaticMapDirty():boolean {
        return true;
    }

    public GetMapSize() {
        return [this.mMapWidth, this.mMapHeight];
    }

    public GetMapCamera() {
        return this.mCamera;
    }

    // TEMP 
    private CreateHero() {
        this.mFartMan.x = 600;
        this.mFartMan.y = 0;

        const {
            boxBody,
            display
        } = this.mFartMan.drawMan()
        this.mGameInstance.addChild(display);
    }
}