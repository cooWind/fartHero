var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *  刚体世界封装
 */
var BodyWorldConfig = (function () {
    function BodyWorldConfig() {
        this.mGravity = -18.0;
        this.mFactor = 50;
    }
    return BodyWorldConfig;
}());
__reflect(BodyWorldConfig.prototype, "BodyWorldConfig");
var BodyWorld = (function () {
    function BodyWorld(gameMap, config) {
        this.mHashTileBodies = {};
        this.mCurrentMap = gameMap;
        this.mConfig = config;
        this.mAllEntityBodies = new Array();
        // create body world
        this.mWorld = new p2.World({
            gravity: [0, config.mGravity]
        });
        // 这玩意儿是求解器
        this.mWorld.solver = new p2.GSSolver();
        this.mWorld.solver['iterations'] = 10;
        this.mWorld.solver['tolerance'] = 2;
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
        this.mWorld.on('postBroadphase', function (ev) {
            var pairs = ev.pairs;
            pairs.forEach(function (val) {
                // console.log(val.position)
            });
        });
    }
    BodyWorld.prototype.Update = function (dt) {
        this.mWorld.step(1 / 60, dt / 1000, 30);
        var factor = this.mConfig.mFactor;
        this.mAllEntityBodies.forEach(function (entity) {
            var body = entity.boxBody;
            if (body != null) {
                entity.x = body.position[0] * factor;
                entity.y = GameConfig.height - body.position[1] * factor;
            }
        });
    };
    BodyWorld.prototype.BindEntityBody = function (entity) {
        this.mWorld.addBody(entity.boxBody);
        this.mAllEntityBodies.push(entity);
    };
    BodyWorld.prototype.BindP2Map = function (tmxTileMap) {
        var _this = this;
        // delete body
        var camera = this.mCurrentMap.GetMapCamera();
        Object.keys(this.mHashTileBodies).forEach(function (val) {
            var body = _this.mHashTileBodies[val];
            if (body != null) {
                var display = body.displays[0];
                var width = display.width * 2;
                var height = display.height * 2;
                var x = body.position[0] * _this.mConfig.mFactor - camera.x;
                var y = (GameConfig.height - body.position[1] * _this.mConfig.mFactor) - camera.y;
                if (x < -width ||
                    y < -height ||
                    x > (GameConfig.width + width) ||
                    y > (GameConfig.height + height)) {
                    _this.mWorld.removeBody(body);
                    delete _this.mHashTileBodies[val];
                    console.log("Delete Body", x, y);
                }
            }
        });
        var layers = tmxTileMap.getLayers();
        var blocks;
        for (var i = 0, len = layers.length; i < len; i++) {
            if (layers[i].name === 'hero') {
                blocks = layers[i];
            }
        }
        var hashTiles = {};
        var staticContainer = blocks.staticContainer;
        var childCount = staticContainer.numChildren;
        for (var i = 0; i < childCount; i++) {
            var block = staticContainer.getChildAt(i);
            var hashKey = block.x + "_" + block.y;
            if (this.mHashTileBodies[hashKey] == null) {
                hashTiles[hashKey] = block;
            }
        }
        var checkTile = function (x, y) {
            var hashKey = x + "_" + y;
            return (hashTiles[hashKey] != null);
        };
        Object.keys(hashTiles).forEach(function (val) {
            var block = hashTiles[val];
            var notCreateBody = true;
            var x = block.x;
            var y = block.y;
            var tileWidth = GameConfig.tileWidth;
            var tileHeight = GameConfig.tileHeight;
            if (notCreateBody && !checkTile(x + tileWidth, y)) {
                notCreateBody = false;
            }
            if (notCreateBody && !checkTile(x - tileWidth, y)) {
                notCreateBody = false;
            }
            if (notCreateBody && !checkTile(x, y + tileHeight)) {
                notCreateBody = false;
            }
            if (notCreateBody && !checkTile(x, y - tileHeight)) {
                notCreateBody = false;
            }
            if (notCreateBody == false) {
                _this.createBlockBox(block);
            }
        });
    };
    BodyWorld.prototype.createBlockBox = function (display) {
        var factor = this.mConfig.mFactor;
        var boxShape = new p2.Box({
            width: display.width / factor,
            height: display.height / factor
        });
        boxShape.material = GameConfig.wallMaterial;
        display.anchorOffsetX = 0; //display.width / 2
        display.anchorOffsetY = 0; //display.height / 2;
        var position = [
            (display.x + display.width / 2) / factor,
            (GameConfig.height - (display.y + display.height / 2)) / factor
        ];
        var boxBody = new p2.Body({
            mass: 0,
            position: position,
            fixedRotation: true,
            collisionResponse: true,
            type: p2.Body.KINEMATIC,
            allowSleep: false
        });
        boxBody.addShape(boxShape);
        this.mWorld.addBody(boxBody);
        boxBody.displays = [display];
        var hashKey = display.x + "_" + display.y;
        this.mHashTileBodies[hashKey] = boxBody;
        console.log("Binding Body", display.x, display.y, display.width, display.height);
        return boxBody;
    };
    return BodyWorld;
}());
__reflect(BodyWorld.prototype, "BodyWorld");
