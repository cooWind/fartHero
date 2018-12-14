
/**
 *  刚体世界封装
 */

class BodyWorldConfig
{
    public mGravity = -9.0;
}

class BodyWorld
{
    private mWorld:p2.World
    private mCurrentMap:GameMap;
    private mConfig:BodyWorldConfig;

    public constructor(gameMap:GameMap, config:BodyWorldConfig)
    {
        this.mCurrentMap = gameMap;
        this.mConfig = config;

        // create body world
        this.mWorld = new p2.World({
            gravity: [0, config.mGravity]
        });

          // 这玩意儿是求解器
        this.mWorld.solver = new p2.GSSolver() 
        this.mWorld.solver['iterations'] = 10
        this.mWorld.solver['tolerance'] = 2
        // 设置摩擦力
        this.mWorld.defaultContactMaterial.friction = 1;
        // 设置刚度，很硬的那种
        this.mWorld.defaultContactMaterial.stiffness = 9999999999999999999999;
        this.mWorld.defaultContactMaterial.relaxation = 4;
        this.mWorld.defaultContactMaterial.restitution = 0;
        let ContactMaterial = new p2.ContactMaterial(GameConfig.manMaterial, GameConfig.wallMaterial, <p2.ContactMaterialOptions>{
            friction : 1,
            stiffness: 9999999999999999999999,
            relaxation: 2
        });
        this.mWorld.addContactMaterial(ContactMaterial)
        this.mWorld.on('postBroadphase',(ev) => {
            const pairs = ev.pairs;
            pairs.forEach((val:p2.Body) => {
                // console.log(val.position)
            })
        })
    }

    
}