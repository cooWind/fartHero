
/**
 *  刚体世界封装
 */
class BodyWorldConfig
{
    public mGravity = -18.0;
    public mFactor = 50;
}

class BodyWorld
{
    public mWorld:p2.World
    private mCurrentMap:GameMap;
    private mConfig:BodyWorldConfig;
    private mHashTileBodies = {};
    private mAllEntityBodies:Array<Entity>;

    public constructor(gameMap:GameMap, config:BodyWorldConfig)
    {
        this.mCurrentMap = gameMap;
        this.mConfig = config;
        this.mAllEntityBodies = new Array<Entity>();

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
        this.mWorld.defaultContactMaterial.stiffness = 1000000;
        this.mWorld.defaultContactMaterial.relaxation = 4;
        this.mWorld.defaultContactMaterial.restitution = 0;
        // let ContactMaterial = new p2.ContactMaterial(GameConfig.manMaterial, GameConfig.wallMaterial, <p2.ContactMaterialOptions>{
        //     friction : 1,
        //     restitution: 0,
        //     stiffness: Number.MAX_VALUE
        // });
        // this.mWorld.addContactMaterial(ContactMaterial)
        this.mWorld.on('postBroadphase',(ev) => {
            const pairs = ev.pairs;
            pairs.forEach((val:p2.Body) => {
                // console.log(val.position)
            })
        })
    }
    
    public Update(dt:number): void
    {
        this.mWorld.step(1/60, dt/1000, 30);
        const factor = this.mConfig.mFactor;
        this.mAllEntityBodies.forEach(entity => {
            let body = entity.boxBody;
            if (body != null) {
                entity.x = body.position[0] * factor;                      
                entity.y = GameConfig.height - body.position[1] * factor;
            }
        });
    }

    public BindEntityBody(entity:Entity)
    {
        this.mWorld.addBody(entity.boxBody);
        this.mAllEntityBodies.push(entity);
    }

    public BindP2Map(tmxTileMap:tiled.TMXTilemap)
    {
        // delete body
        const camera = this.mCurrentMap.GetMapCamera();
        Object.keys(this.mHashTileBodies).forEach((val) => {
            let body:p2.Body = this.mHashTileBodies[val];
            if (body != null)
            {   
                const display = body.displays[0];
                const width = display.width * 2;
                const height= display.height * 2;

                const x = body.position[0] * this.mConfig.mFactor - camera.x;
                const y = (GameConfig.height - body.position[1] * this.mConfig.mFactor) - camera.y;
                if (x < -width || 
                    y < -height || 
                    x > (GameConfig.width + width) || 
                    y > (GameConfig.height + height))
                {
                    this.mWorld.removeBody(body);
                    delete this.mHashTileBodies[val];
                    console.log("Delete Body", x, y);
                }
            }
        });

        const layers = tmxTileMap.getLayers()
        let blocks:tiled.TMXLayer;
        for(let i = 0, len = layers.length; i < len; i++) {
            if(layers[i].name === 'hero') {
                blocks = layers[i]
            }
        }

        let hashTiles = {}
        const staticContainer = blocks.staticContainer;
        const childCount = staticContainer.numChildren;
        for (let i = 0; i < childCount; i++)
        {
            const block:egret.DisplayObject = staticContainer.getChildAt(i);
            const hashKey = `${block.x}_${block.y}`;
            if (this.mHashTileBodies[hashKey] == null){
                hashTiles[hashKey] = block;
            }
        }

        let checkTile = (x:number, y:number):boolean => {
             const hashKey = `${x}_${y}`;
             return (hashTiles[hashKey] != null);
        }
        Object.keys(hashTiles).forEach((val) => {
            let block:egret.DisplayObject = hashTiles[val];
            let notCreateBody:boolean = true;
            const x = block.x;
            const y = block.y;
            const tileWidth = GameConfig.tileWidth;
            const tileHeight = GameConfig.tileHeight;

            if (notCreateBody && !checkTile(x + tileWidth, y)){notCreateBody = false;}
            if (notCreateBody && !checkTile(x - tileWidth, y)){notCreateBody = false;}
            if (notCreateBody && !checkTile(x, y + tileHeight)){notCreateBody = false;}
            if (notCreateBody && !checkTile(x, y - tileHeight)){notCreateBody = false;}

            if (notCreateBody == false){
                this.createBlockBox(block)
            }
        })
    }

    public createBlockBox(display:egret.DisplayObject) {
        const factor = this.mConfig.mFactor;
        const boxShape: p2.Shape = new p2.Box({
            width: display.width / factor,
            height: display.height / factor
        });
        boxShape.material = GameConfig.wallMaterial
        display.anchorOffsetX = 0; //display.width / 2
        display.anchorOffsetY = 0; //display.height / 2;
        const position = [
            (display.x + display.width / 2)/ factor,
            (GameConfig.height - (display.y + display.height/2)) / factor]
        const boxBody: p2.Body = new p2.Body({ 
            mass: 0,
            position:position,
            fixedRotation: true,
            collisionResponse: true,
            type: p2.Body.KINEMATIC,
            allowSleep: false
        });
        boxBody.addShape(boxShape);
        this.mWorld.addBody(boxBody);
        boxBody.displays = [display];

        const hashKey = `${display.x}_${display.y}`;
        this.mHashTileBodies[hashKey] = boxBody;

        console.log("Binding Body", display.x, display.y, display.width, display.height);
        return boxBody
    }
}