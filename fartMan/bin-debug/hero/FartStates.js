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
// 站立
var StandState = (function () {
    function StandState() {
        this.name = 'stand';
    }
    StandState.prototype.handle = function (fartMan) {
        return __awaiter(this, void 0, void 0, function () {
            var movieName, skewY;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        fartMan.moveX = 0;
                        movieName = 'stand';
                        skewY = 0;
                        if (fartMan.lastState.name === 'workLeft') {
                            skewY = 180;
                        }
                        else {
                            skewY = 0;
                        }
                        return [4 /*yield*/, fartMan.movieClip({
                                movieName: movieName,
                                frameRate: 10,
                                skewY: skewY
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    StandState.instance = new StandState();
    return StandState;
}());
__reflect(StandState.prototype, "StandState", ["State"]);
// 跳
var JumpState = (function () {
    function JumpState() {
        this.name = 'jump';
        this.nextState = StandState.instance;
    }
    JumpState.prototype.handle = function (fartMan) {
        return __awaiter(this, void 0, void 0, function () {
            var movieName;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        fartMan.jumpNum--;
                        movieName = 'stand';
                        // 跳逻辑
                        fartMan.boxBody.velocity[1] = 12;
                        return [4 /*yield*/, fartMan.movieClip({
                                movieName: movieName,
                                playTime: 1,
                                frameRate: 10
                            })];
                    case 1:
                        _a.sent();
                        fartMan.changeState(StandState.instance);
                        return [2 /*return*/];
                }
            });
        });
    };
    JumpState.instance = new JumpState();
    return JumpState;
}());
__reflect(JumpState.prototype, "JumpState", ["State"]);
// 走右边
var WorkRightState = (function () {
    function WorkRightState() {
        this.name = 'workRight';
        this.nextState = StandState.instance;
    }
    WorkRightState.prototype.handle = function (fartMan) {
        return __awaiter(this, void 0, void 0, function () {
            var movieName;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        movieName = 'walk';
                        fartMan.moveX = fartMan.v;
                        fartMan.right++;
                        return [4 /*yield*/, fartMan.movieClip({
                                movieName: movieName,
                                frameRate: 10
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    WorkRightState.instance = new WorkRightState();
    return WorkRightState;
}());
__reflect(WorkRightState.prototype, "WorkRightState", ["State"]);
// 跳右边
var jumpRightState = (function () {
    function jumpRightState() {
        this.name = 'jumpRight';
        this.nextState = StandState.instance;
    }
    jumpRightState.prototype.handle = function (fartMan) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                fartMan.moveX = fartMan.v;
                return [2 /*return*/];
            });
        });
    };
    jumpRightState.instance = new jumpRightState();
    return jumpRightState;
}());
__reflect(jumpRightState.prototype, "jumpRightState", ["State"]);
// 跳右边
var jumpLeftState = (function () {
    function jumpLeftState() {
        this.name = 'jumpRight';
    }
    jumpLeftState.prototype.handle = function (fartMan) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                fartMan.moveX = -fartMan.v;
                return [2 /*return*/];
            });
        });
    };
    jumpLeftState.instance = new jumpLeftState();
    return jumpLeftState;
}());
__reflect(jumpLeftState.prototype, "jumpLeftState", ["State"]);
// 走左边
var WorkLeftState = (function () {
    function WorkLeftState() {
        this.name = 'workLeft';
        this.nextState = StandState.instance;
    }
    WorkLeftState.prototype.handle = function (fartMan) {
        return __awaiter(this, void 0, void 0, function () {
            var movieName;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        movieName = 'walk';
                        fartMan.moveX = -fartMan.v;
                        fartMan.left++;
                        return [4 /*yield*/, fartMan.movieClip({
                                movieName: movieName,
                                frameRate: 10,
                                skewY: 180
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    WorkLeftState.instance = new WorkLeftState();
    return WorkLeftState;
}());
__reflect(WorkLeftState.prototype, "WorkLeftState", ["State"]);
