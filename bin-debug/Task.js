var Task = (function () {
    function Task(id, name, status, comefromNPC, goforNPC) {
        this.id = id;
        this.name = name;
        this.status = status;
        this.comefromNPC = comefromNPC;
        this.goforNPC = goforNPC;
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
    p.getComefromNPC = function () {
        return this.comefromNPC;
    };
    p.getGoforNPC = function () {
        return this.goforNPC;
    };
    p.setStatus = function (taskStatus) {
        this.status = taskStatus;
    };
    return Task;
}());
egret.registerClass(Task,'Task');
var TaskStatus;
(function (TaskStatus) {
    TaskStatus[TaskStatus["UNACCEPTED"] = 0] = "UNACCEPTED";
    TaskStatus[TaskStatus["CANACCEPTED"] = 1] = "CANACCEPTED";
    TaskStatus[TaskStatus["DURING"] = 2] = "DURING";
    TaskStatus[TaskStatus["CANCOMPLETE"] = 3] = "CANCOMPLETE";
    TaskStatus[TaskStatus["ALREAYCOMPLETE"] = 4] = "ALREAYCOMPLETE";
})(TaskStatus || (TaskStatus = {}));
var ErrorCode;
(function (ErrorCode) {
    ErrorCode[ErrorCode["SUCCESS"] = 0] = "SUCCESS";
    ErrorCode[ErrorCode["MISSING_TASK"] = 1] = "MISSING_TASK";
})(ErrorCode || (ErrorCode = {}));
var TaskService = (function () {
    function TaskService() {
        this.taskList = [];
        this.observerList = [];
        TaskService.count++;
        if (TaskService.count > 1) {
            throw 'singleton!!!';
        }
    }
    var d = __define,c=TaskService,p=c.prototype;
    //获取TaskService的实例
    TaskService.getInstance = function () {
        if (TaskService.instance == null) {
            TaskService.instance = new TaskService();
        }
        return TaskService.instance;
    };
    //不公开数据，交给调用方处理
    p.getTaskByCustomRule = function (rule) {
        //拷贝数据
        var clone = this.taskList;
        return rule(clone);
    };
    p.addTask = function (task) {
        this.taskList.push(task);
    };
    p.addObserver = function (observer) {
        this.observerList.push(observer);
    };
    //被观察者状态改变时调用
    p.deal = function (task) {
        this.currentTask = task;
        //由任务服务站进行任务状态的改变,不由外部直接改变状态
        //任务状态更加深入
        if (this.currentTask.getStatus() == TaskStatus.UNACCEPTED) {
            this.currentTask.setStatus(TaskStatus.CANACCEPTED);
        }
        else if (this.currentTask.getStatus() == TaskStatus.CANACCEPTED) {
            this.currentTask.setStatus(TaskStatus.DURING);
        }
        else if (this.currentTask.getStatus() == TaskStatus.DURING) {
            this.currentTask.setStatus(TaskStatus.CANCOMPLETE);
        }
        else if (this.currentTask.getStatus() == TaskStatus.CANCOMPLETE) {
            this.currentTask.setStatus(TaskStatus.ALREAYCOMPLETE);
        }
        //被观察者状态改变，通知观察者做改变，即调用各个观察者的onChange方法
        this.notify(this.currentTask);
    };
    //将任务发送给所有观察者,并让观察者进行相应的处理
    //只能内部调用
    p.notify = function (task) {
        for (var i = 0; i < this.observerList.length; i++) {
            this.observerList[i].onChange(task);
        }
    };
    TaskService.count = 0;
    return TaskService;
}());
egret.registerClass(TaskService,'TaskService');
var TaskPanel = (function () {
    function TaskPanel() {
    }
    var d = __define,c=TaskPanel,p=c.prototype;
    p.onChange = function (task) {
        this.currentTask = task;
        //将任务信息显示在面板上
        console.log("id: " + this.currentTask.getId());
        console.log("name: " + this.currentTask.getName());
        console.log("status: " + this.currentTask.getStatus());
        console.log("comefromNPC: " + this.currentTask.getComefromNPC().getId());
        console.log("goforNPC: " + this.currentTask.getGoforNPC().getId());
    };
    return TaskPanel;
}());
egret.registerClass(TaskPanel,'TaskPanel',["Observer"]);
var NPC = (function () {
    function NPC(id) {
        this.id = id;
    }
    var d = __define,c=NPC,p=c.prototype;
    p.getId = function () {
        return this.id;
    };
    //根据变化的任务的相应状态改变NPC头顶的符号
    p.onChange = function (task) {
        if (task.getStatus() == TaskStatus.ALREAYCOMPLETE) {
            console.log("headInfo: ALREAYCOMPLETE");
        }
        else if (task.getStatus() == TaskStatus.CANACCEPTED) {
            console.log("headInfo: !");
        }
        else if (task.getStatus() == TaskStatus.UNACCEPTED) {
            console.log("headInfo: UNACCEPTED");
        }
        else if (task.getStatus() == TaskStatus.DURING) {
            console.log("headInfo: ?(white)");
        }
        else if (task.getStatus() == TaskStatus.CANCOMPLETE) {
            console.log("headInfo: ?(yellow)");
        }
    };
    return NPC;
}());
egret.registerClass(NPC,'NPC',["Observer"]);
//# sourceMappingURL=Task.js.map