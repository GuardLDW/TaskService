var NPCTalkTaskCondition = (function () {
    function NPCTalkTaskCondition() {
    }
    var d = __define,c=NPCTalkTaskCondition,p=c.prototype;
    //Task与TaskConditionContext的区别
    //不想让NPCTalkTaskCondition得到task的所有信息
    p.onAccept = function (context) {
        context.setCurrent();
    };
    p.onSubmit = function () {
    };
    return NPCTalkTaskCondition;
}());
egret.registerClass(NPCTalkTaskCondition,'NPCTalkTaskCondition',["TaskCondition"]);
var KillMonsterTaskCondition = (function () {
    function KillMonsterTaskCondition() {
    }
    var d = __define,c=KillMonsterTaskCondition,p=c.prototype;
    p.onAccept = function (context) {
        context.setCurrent();
    };
    p.onSubmit = function () {
    };
    return KillMonsterTaskCondition;
}());
egret.registerClass(KillMonsterTaskCondition,'KillMonsterTaskCondition',["TaskCondition"]);
//# sourceMappingURL=TaskCondition.js.map