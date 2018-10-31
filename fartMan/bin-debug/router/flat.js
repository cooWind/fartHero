var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
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
/// <reference path="../../libs/keydown/keydown_event.d.ts"/>
/*
    平台类
    http://www.dwenzhao.cn/profession/netbuild/egretp2.html
**/
var Flat = (function (_super) {
    __extends(Flat, _super);
    function Flat(parent) {
        var _this = _super.call(this) || this;
        _this.boxX = 0;
        _this.boxY = 0;
        // p2 引擎单位是 m 1m = 50px
        _this.factor = 50;
        _this.sh = GameConfig.height / 50;
        _this.sw = GameConfig.height / 50;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.addFlat, _this);
        _this.addEventListener(egret.Event.ENTER_FRAME, _this.loop, _this);
        _this.timeOnEnterFrame = egret.getTimer();
        return _this;
    }
    Flat.prototype.addFlat = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.fartMan = new FartMan();
                        return [4 /*yield*/, this.loadMap()];
                    case 1:
                        _a.sent();
                        this.createWorld();
                        this.controlKey();
                        this.createText();
                        this.bindP2Map();
                        return [2 /*return*/];
                }
            });
        });
    };
    // 创建物理世界
    Flat.prototype.createWorld = function () {
        this.world = new p2.World({
            gravity: [0, -29.9]
        });
        // this.world.sleepMode = p2.World.NO_SLEEPING;
        // 这玩意儿是求解器
        this.world.solver = new p2.GSSolver();
        this.world.solver['iterations'] = 10;
        this.world.solver['tolerance'] = 0;
        // 设置摩擦力
        this.world.defaultContactMaterial.friction = 10;
        // 设置刚度，很硬的那种
        this.world.defaultContactMaterial.stiffness = 999998888888888888889999;
        this.world.defaultContactMaterial.relaxation = 2;
        this.world.defaultContactMaterial.restitution = 0;
    };
    Flat.prototype.createText = function () {
        var _a = this.fartMan.drawMan({
            width: 1,
            height: 1,
            position: [100 / this.factor, 150 / this.factor]
        }), boxBody = _a.boxBody, display = _a.display;
        this.addChild(display);
        this.world.addBody(boxBody);
        this.boxBody = boxBody;
    };
    Flat.prototype.loop = function (event) {
        // const fixedTimeStep = 60 / 1000
        var now = egret.getTimer();
        var pass = now - this.timeOnEnterFrame;
        var dt = 1000 / pass;
        this.timeOnEnterFrame = egret.getTimer();
        if (!this.world || !this.boxBody)
            return;
        this.boxBody.position[0] += this.boxX;
        this.world.step(1 / 60, dt / 1000, 30);
        var len = this.world.bodies.length;
        for (var i = 0; i < len; i++) {
            var body = this.world.bodies[i];
            if (!body)
                return;
            var display = body.displays[0];
            display.x = body.position[0] * this.factor; //同步刚体和egret显示对象的位置和旋转角度
            display.y = GameConfig.height - body.position[1] * this.factor;
            display.rotation = body.angle * 180 / Math.PI;
            var ground = this.world.bodies[0].position;
        }
    };
    //键盘监听
    Flat.prototype.controlKey = function () {
        var _this = this;
        var upEvent = function (ev) {
            _this.boxX = 0;
        };
        function upSelfEvent() {
            console.log('各自回调');
        }
        keydown_event(37, function () {
            console.log(37);
            _this.boxX = -.1;
        }, upEvent, upSelfEvent);
        keydown_event(39, function () {
            console.log(39);
            _this.boxX = .1;
        }, upEvent, upSelfEvent);
        keydown_event(38, function () {
            _this.boxBody.velocity[1] = 12;
        }, upEvent, upSelfEvent);
        keydown_event(40, function () {
            console.log(40);
        }, upEvent, upSelfEvent);
        keydown_event(67, function () {
            _this.boxBody.velocity[1] = 12;
        });
        // keydown_event(88,()=>{  // x
        //     this.armature.animation.gotoAndPlay(this.animateArr[5],0,0,1);
        // });
        // keydown_event(90,()=>{  // z
        //     this.armature.animation.gotoAndPlay(this.animateArr[6],0,0,1);
        // });
        // keydown_event(65,()=>{  // a
        //     this.armature.animation.gotoAndPlay(this.animateArr[7],0,0,1);
        // });
    };
    /**
     * 将地图里面的地板砖和p2绑定在一起
     */
    Flat.prototype.bindP2Map = function () {
        var layers = this.tmxtileMap.getLayers();
        var blocks;
        for (var i = 0, len = layers.length; i < len; i++) {
            if (layers[i].name === 'hero') {
                blocks = layers[i];
            }
        }
        console.log(blocks);
        for (var i = 0; i < blocks.rows; i++) {
            for (var j = 0; j < blocks.cols; j++) {
                // 根据像素获取到 TMXTile 对象
                var block = blocks.getTile(j * blocks.tilewidth, i * blocks.tileheight);
                if (block) {
                    console.log(block.bitmap);
                    this.createBlockBox(block.bitmap);
                }
            }
        }
        return;
        // blocks.$children[0].$children.map(val => {
        //     console.log('map1')
        //     console.log(val)
        //     this.createBlockBox(val)
        // })
    };
    Flat.prototype.createBlockBox = function (display) {
        var boxShape = new p2.Box({
            width: display.width / this.factor,
            height: display.height / this.factor
        });
        display.anchorOffsetX = display.width / 2;
        display.anchorOffsetY = display.height / 2;
        var position = [
            display.x / this.factor,
            (GameConfig.height - display.y) / this.factor
        ];
        var boxBody = new p2.Body({
            mass: 1,
            position: position,
            fixedRotation: true,
            collisionResponse: true,
            type: p2.Body.STATIC
        });
        boxBody.addShape(boxShape);
        this.world.addBody(boxBody);
        boxBody.displays = [display];
    };
    return Flat;
}(gameMap));
__reflect(Flat.prototype, "Flat");
