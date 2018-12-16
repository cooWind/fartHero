/**
 *  Entities
 */

class Entities
{
    private mMap:GameMap;
    private mAllEntities:Array<Manager>;
    private mPlayer:ManBasic;
    private mCamerabase:CameraBase;

    public constructor(gameMap:GameMap)
    {
        this.mMap = gameMap;
    }

    public Update(dt:number) {

    }
}