var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var GameConfig = (function () {
    function GameConfig() {
    }
    // 材料
    GameConfig.manMaterial = new p2.Material(1);
    GameConfig.wallMaterial = new p2.Material(2);
    GameConfig.domainUrl = 'https://cangnanshi.com/bingo/';
    return GameConfig;
}());
__reflect(GameConfig.prototype, "GameConfig");
