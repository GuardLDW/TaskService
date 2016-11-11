class Task{


    private id : String;

    private name : String;

    private status : TaskStatus;

    private comefromNPC : NPC;

    private goforNPC : NPC;


    constructor(id : String, name : String, status : TaskStatus, comefromNPC : NPC, goforNPC : NPC){

        this.id = id;
        this.name = name;
        this.status = status;
        this.comefromNPC = comefromNPC;
        this.goforNPC = goforNPC;

    }


    public getId() : String{

        return this.id;
    }

    public getName() : String{

        return this.name;
    }

    public getStatus() : TaskStatus{

        return this.status;
    }

    public getComefromNPC() : NPC{

        return this.comefromNPC;
    }

    public getGoforNPC() : NPC{

        return this.goforNPC;
    }

    public setStatus(taskStatus : TaskStatus) : void{

        this.status = taskStatus;
    }


}    


enum TaskStatus{

    UNACCEPTED,

    CANACCEPTED,

    DURING,

    CANCOMPLETE,

    ALREAYCOMPLETE

}


enum ErrorCode{

    SUCCESS,

    MISSING_TASK

}



class TaskService{


    //全局变量，一个模块最多一个（任务系统等）
    private static instance : TaskService;
    private static count = 0;

    private taskList : Task[] = [];
    private observerList : Observer[] = [];

    private currentTask : Task;


    constructor(){

        TaskService.count++;
        if(TaskService.count > 1){

            throw 'singleton!!!';
        }
    }


    //获取TaskService的实例
    public static getInstance(){

        if(TaskService.instance == null){

            TaskService.instance = new TaskService();
        }

        return TaskService.instance;
    }



    //不公开数据，交给调用方处理
    public getTaskByCustomRule(rule : Function) : Task{

        //拷贝数据
        var clone = this.taskList;
        return rule(clone);

    }


    public addTask(task : Task){

        this.taskList.push(task);
    }


    public addObserver(observer : Observer){

        this.observerList.push(observer);
    }


    //被观察者状态改变时调用
    deal(task : Task) : void{

        this.currentTask = task;
        

        //由任务服务站进行任务状态的改变,不由外部直接改变状态
        //任务状态更加深入
        if(this.currentTask.getStatus() == TaskStatus.UNACCEPTED){

            this.currentTask.setStatus(TaskStatus.CANACCEPTED);
            
        }else if(this.currentTask.getStatus() == TaskStatus.CANACCEPTED){

            this.currentTask.setStatus(TaskStatus.DURING);

        }else if(this.currentTask.getStatus() == TaskStatus.DURING){

            this.currentTask.setStatus(TaskStatus.CANCOMPLETE);

        }else if(this.currentTask.getStatus() == TaskStatus.CANCOMPLETE){

            this.currentTask.setStatus(TaskStatus.ALREAYCOMPLETE);

        }

        //被观察者状态改变，通知观察者做改变，即调用各个观察者的onChange方法
        this.notify(this.currentTask);
    }

    
    //将任务发送给所有观察者,并让观察者进行相应的处理
    //只能内部调用
    private notify(task : Task){

        for(var i = 0; i < this.observerList.length; i++){

            this.observerList[i].onChange(task);
        }
    
    }
}



class TaskPanel implements Observer{

    private currentTask : Task;


    onChange(task : Task){

        this.currentTask = task;

        //将任务信息显示在面板上
        console.log("id: " + this.currentTask.getId());
        console.log("name: " + this.currentTask.getName());
        console.log("status: " + this.currentTask.getStatus());
        console.log("comefromNPC: " + this.currentTask.getComefromNPC().getId());
        console.log("goforNPC: " + this.currentTask.getGoforNPC().getId());
        

    }
}


class NPC implements Observer{

    private id : String;
    
    //头顶的提示任务状态的符号
    private headInfo : String;

    constructor(id : String){

        this.id = id;
    }

    public getId() : String{

        return this.id;
    }


    //根据变化的任务的相应状态改变NPC头顶的符号
    onChange(task : Task){

        if(task.getStatus() == TaskStatus.ALREAYCOMPLETE){

            console.log("headInfo: ALREAYCOMPLETE");

        }else if(task.getStatus() == TaskStatus.CANACCEPTED){

            console.log("headInfo: !");

        }else if(task.getStatus() == TaskStatus.UNACCEPTED){

            console.log("headInfo: UNACCEPTED");

        }else if(task.getStatus() == TaskStatus.DURING){

            console.log("headInfo: ?(white)");

        }else if(task.getStatus() == TaskStatus.CANCOMPLETE){

            console.log("headInfo: ?(yellow)")
        }

    }




}

interface Observer{

    //接受到信息后进行相应的处理，信息作为参数可以是任意事物，如task等
    onChange(object : any);
}