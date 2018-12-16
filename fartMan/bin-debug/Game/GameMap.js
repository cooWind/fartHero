/**
 *  GameMap
 */
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
// Extend Sprite???
var GameMap = (function () {
    function GameMap(mapID) {
        this.mIsLoaded = false;
        this.mIsStarted = false;
        this.mMapID = "";
        this.mMapWidth = 0;
        this.mMapHeight = 0;
        this.mMinLayer = 0;
        this.mMaxLayer = 0;
        this.mMapID = mapID;
    }
    GameMap.prototype.Load = function (gameInstance) {
        return __awaiter(this, void 0, void 0, function () {
            var mapLoader, bodyWorldConfig;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.mGameInstance = gameInstance;
                        mapLoader = new MapLoader;
                        return [4 /*yield*/, mapLoader.LoadMap("resource/cute.tmx")];
                    case 1:
                        _a.sent();
                        gameInstance.addChild(mapLoader.GetTemxTileMap());
                        this.mMapWidth = mapLoader.GetWidth();
                        this.mMapHeight = mapLoader.GetHeight();
                        this.mMinLayer = mapLoader.GetMinLayer();
                        this.mMaxLayer = mapLoader.GetMaxLayer();
                        this.mTmxtileMap = mapLoader.GetTemxTileMap();
                        console.log("Map Info.", this.mMapWidth, this.mMapHeight, this.mMinLayer, this.mMaxLayer);
                        bodyWorldConfig = new BodyWorldConfig;
                        this.mBodyWorld = new BodyWorld(this, bodyWorldConfig);
                        // 初始化实体集合类
                        this.mEntities = new Entities(this);
                        // Testing
                        this.mFartMan = new FartMan();
                        this.mFartMan.SetMap(this);
                        this.CreateHero();
                        // 初始化相机(之后可能移动到Entities中)
                        this.mCamera = new TracingCamera(this);
                        this.mCamera.SetMap(this);
                        this.mCamera.SetTracingEntity(this.mFartMan);
                        this.mBodyWorld.BindEntityBody(this.mFartMan);
                        this.mBodyWorld.BindP2Map(this.mTmxtileMap);
                        this.mIsLoaded = true;
                        return [2 /*return*/];
                }
            });
        });
    };
    GameMap.prototype.UnLoad = function () {
        console.log("Map Unloaded.");
        this.mIsLoaded = false;
    };
    GameMap.prototype.Start = function () {
        console.log("Map Started.");
        this.mIsStarted = true;
    };
    GameMap.prototype.Stop = function () {
        console.log("Map Stoped.");
        this.mIsStarted = false;
    };
    GameMap.prototype.Update = function (dt) {
        if (this.mIsLoaded == false || this.mIsStarted == false) {
            return;
        }
        // 先更新所有游戏单位，再更新刚体世界
        this.mBodyWorld.Update(dt);
        this.mEntities.Update(dt);
        this.mFartMan.Update(dt);
        this.mCamera.Update(dt);
    };
    GameMap.prototype.Draw = function () {
        if (this.mIsLoaded == false || this.mIsStarted == false) {
            return;
        }
        // NEED TODO
        if (this.CheckStaticMapDirty() == true) {
            var gameLayers = this.mTmxtileMap.getLayers();
            for (var i = 0, len = gameLayers.length; i < len; i++) {
                var blocks = gameLayers[i];
                blocks.staticContainer.removeChildAt(0);
                blocks.staticContainer.x = -this.mCamera.x;
                blocks.staticContainer.y = -this.mCamera.y;
                var x = this.mCamera.x;
                var y = this.mCamera.y;
                var width = this.mCamera.width;
                var height = this.mCamera.height;
                var rectangle = new egret.Rectangle(x, y, width, height);
                blocks.draw(rectangle);
            }
            this.mBodyWorld.BindP2Map(this.mTmxtileMap);
        }
    };
    // Member Setter/Getter
    GameMap.prototype.GetMapID = function () {
        return this.mMapID;
    };
    GameMap.prototype.CheckStaticMapDirty = function () {
        return true;
    };
    GameMap.prototype.GetMapSize = function () {
        return [this.mMapWidth, this.mMapHeight];
    };
    GameMap.prototype.GetMapCamera = function () {
        return this.mCamera;
    };
    // TEMP 
    GameMap.prototype.CreateHero = function () {
        this.mFartMan.x = 600;
        this.mFartMan.y = 0;
        var _a = this.mFartMan.drawMan(), boxBody = _a.boxBody, display = _a.display;
        this.mGameInstance.addChild(display);
    };
    return GameMap;
}());
__reflect(GameMap.prototype, "GameMap");
