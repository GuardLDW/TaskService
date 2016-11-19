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
        if (condition == "talk") {
            this.total = -1;
        }
        else if (condition == "kill") {
            this.total = 10;
        }
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
            TaskService.getInstance().notify(this);
        }
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
var ErrorCode;
(function (ErrorCode) {
    ErrorCode[ErrorCode["SUCCESS"] = 0] = "SUCCESS";
    ErrorCode[ErrorCode["MISSING_TASK"] = 1] = "MISSING_TASK";
})(ErrorCode || (ErrorCode = {}));
//# sourceMappingURL=Task.js.map