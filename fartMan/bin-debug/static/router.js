var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/*
 * 页面路由
 *
**/
var PageBus = (function () {
    function PageBus() {
    }
    PageBus.init = function (contain) {
        PageBus.contain = contain;
    };
    /**
     * 在顶级容器页面添加路由配置到静态属性里
     * 传入唯一router值
     * page对象
     */
    PageBus.pushPage = function (Obj) {
        if (PageBus.pages[Obj.router])
            return;
        PageBus.pages[Obj.router] = Obj;
    };
    /**
     * 传入页面对应router值即可跳转
     */
    PageBus.gotoPage = function (router) {
        if (!PageBus.nowPage) {
            PageBus.nowPage = PageBus.pages['index'];
        }
        PageBus.nowPage['page'].removeChildren();
        PageBus.contain.removeChild(PageBus.nowPage['page']);
        PageBus.contain.addChild(PageBus.pages[router]['page']);
        PageBus.nowPage = PageBus.pages[router];
    };
    PageBus.pages = {};
    return PageBus;
}());
__reflect(PageBus.prototype, "PageBus");
