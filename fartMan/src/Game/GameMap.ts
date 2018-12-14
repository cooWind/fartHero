
/**
 *  GameMap 
 */

// Extend Sprite???
class GameMap extends egret.Sprite
{
    private mGameInstance:GameInstance;

    private mIsLoaded:boolean = false;
    private mBodyWorld:BodyWorld;
    private mCamerabase:CameraBase;
    private mEntities:Entities;

    private mMapID:String = "";
    private mMapWidth = 0;
    private mMapHeight = 0;
    private mMinLayer = 0;
    private mMaxLayer = 0;

    public constructor(parent) {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.AddedToStage,this);
        this.addEventListener(egret.Event.ENTER_FRAME, this.Tick, this); 
    }

    // TEMP Initialize Function
    private async AddedToStage() {
        // 加载地图
        var mapLoader:MapLoader = new MapLoader;
        await mapLoader.LoadMap("resource/cute.tmx");
        this.addChild(mapLoader.GetTemxTileMap());

        this.mMapWidth = mapLoader.GetWidth();

        // 初始化物理世界
        var bodyWorldConfig:BodyWorldConfig = new BodyWorldConfig;
        bodyWorldConfig.mGravity = -10.0;
        this.mBodyWorld = new BodyWorld(this, bodyWorldConfig);
    }

    public Load(gameInstance:GameInstance) {
        console.log("Map Loading.");
        this.mGameInstance = gameInstance;

        // load Map

        // init entities

        // add entities

        // get camera

        this.mIsLoaded = true;
    }

    public UnLoad() {

        this.mIsLoaded = false;
    }

    public Tick(event){

    }

    // TEMP 之后以MapLoader代替
    private LoadMap()
    {

    } 
}