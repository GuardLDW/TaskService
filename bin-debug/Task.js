var Task = (function () {
    function Task(id, name, status, fromNpcId, toNpcId, condition) {
        this.current = 0;
        this.total = -1;
        this.id = id;
        this.name = name;
        this.status = status;
        this.fromNpcId = fromNpcId;
        this.toNpcId = toNpcId;
        this.condition = condition;
    }
    var d = __define,c=Task,p=c.prototype;
    p.getId = function () {
        return this.id;
    };
    p.getName = function () {
        return this.name;
    };
    p.getStatus = function () {
        return this.status;
    };
    p.getFromNpcId = function () {
        return this.fromNpcId;
    };
    p.getToNpcId = function () {
        return this.toNpcId;
    };
    p.setStatus = function (taskStatus) {
        this.status = taskStatus;
    };
    p.setCurrent = function () {
        this.current++;
        this.checkStatus();
    };
    p.getCurrent = function () {
        return this.current;
    };
    //检测进行中到可提交
    p.checkStatus = function () {
        if (this.status == TaskStatus.DURING && this.current >= this.total) {
            this.status = TaskStatus.CANSUBMIT;
        }
        TaskService.getInstance().notify(this);
    };
    return Task;
}());
egret.registerClass(Task,'Task',["TaskConditionContext"]);
var TaskStatus;
(function (TaskStatus) {
    TaskStatus[TaskStatus["UNACCEPTABLE"] = 0] = "UNACCEPTABLE";
    TaskStatus[TaskStatus["ACCEPTABLE"] = 1] = "ACCEPTABLE";
    TaskStatus[TaskStatus["DURING"] = 2] = "DURING";
    TaskStatus[TaskStatus["CANSUBMIT"] = 3] = "CANSUBMIT";
    TaskStatus[TaskStatus["SUBMITTED"] = 4] = "SUBMITTED";
})(TaskStatus || (TaskStatus = {}));
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
var ErrorCode;
(function (ErrorCode) {
    ErrorCode[ErrorCode["SUCCESS"] = 0] = "SUCCESS";
    ErrorCode[ErrorCode["MISSING_TASK"] = 1] = "MISSING_TASK";
})(ErrorCode || (ErrorCode = {}));
//# sourceMappingURL=Task.js.map