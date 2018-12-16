

// extends sprite ???
class GameInstance extends egret.Sprite
{
    private mCurrentMap:GameMap;
    private mNextMap:GameMap;
    private mIsMapStarted:Boolean = false;
    
    private mTimeOnEnterFrame;

    public constructor() {
        super()
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.AddGameToStage,this);
        this.addEventListener(egret.Event.ENTER_FRAME, this.Update, this); 
        this.mTimeOnEnterFrame = egret.getTimer();
    }

    private async AddGameToStage(){
        await this.SetCurrentMap("resource/cute.tmx");
    }

    private Update(){
        let now = egret.getTimer();
        let pass = now - this.mTimeOnEnterFrame;
        //let dt:number = 1000 / pass;
        let dt:number = pass;
        this.mTimeOnEnterFrame = egret.getTimer();
      
        this.UpdateMapTransition();

        if (this.mCurrentMap != null) {
            this.mCurrentMap.Update(dt);
            this.mCurrentMap.Draw();
        }        
    }

    private UpdateMapTransition(){
        if (this.mNextMap != null)
        {
            if (this.mCurrentMap == null){
                this.mCurrentMap = this.mNextMap;
                this.mNextMap = null;
            }
            else
            {
                this.mCurrentMap.Stop();
                // 需要考虑卸载地图该放的位置
                this.mCurrentMap.UnLoad();

                this.mCurrentMap = this.mNextMap;
                this.mNextMap = null;
            }

            this.mCurrentMap.Start();
        }
    }

    public async SetCurrentMap(mapID:string) {
        // TODO 可能会出问题
        if (this.mCurrentMap == null || this.mCurrentMap.GetMapID() != mapID)
        {
            this.mNextMap = new GameMap(mapID);
            this.mNextMap.Load(this);
        }
    }

}





