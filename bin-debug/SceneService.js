var SceneService = (function () {
    function SceneService() {
        this.observerList = [];
        SceneService.count++;
        if (SceneService.count > 1) {
            throw 'singleton!!!';
        }
    }
    var d = __define,c=SceneService,p=c.prototype;
    //获取TaskService的实例
    SceneService.getInstance = function () {
        if (SceneService.instance == null) {
            SceneService.instance = new SceneService();
        }
        return SceneService.instance;
    };
    p.addObserver = function (observer) {
        this.observerList.push(observer);
    };
    p.notify = function () {
        for (var i = 0; i < this.observerList.length; i++) {
            this.observerList[i].onChange(1);
        }
    };
    SceneService.count = 0;
    return SceneService;
}());
egret.registerClass(SceneService,'SceneService');
//# sourceMappingURL=SceneService.js.map