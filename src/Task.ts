class Task implements TaskConditionContext{


    private id : String;

    private name : string;

    private desc : String;

    private status : TaskStatus;

    private fromNpcId : String;

    private toNpcId : String;

    public current : number = 0;

    public total : number = -1;

    public condition : TaskCondition;


    constructor(id : String, name : string, status : TaskStatus, fromNpcId : String, toNpcId : String, condition : TaskCondition){

        this.id = id;
        this.name = name;
        this.status = status;
        this.fromNpcId = fromNpcId;
        this.toNpcId = toNpcId;
        this.condition = condition;

    }


    public getId() : String{

        return this.id;
    }

    public getName() : string{

        return this.name;
    }

    public getStatus() : TaskStatus{

        return this.status;
    }

    public getFromNpcId() : String{

        return this.fromNpcId;
    }

    public getToNpcId() : String{

        return this.toNpcId;
    }

    public setStatus(taskStatus : TaskStatus) : void{

        this.status = taskStatus;
    }

    public setCurrent(){

        this.current++;
        this.checkStatus();
    }

    public getCurrent(){

        return this.current;
    }

    
    //检测进行中到可提交
    private checkStatus(){

        if(this.status == TaskStatus.DURING && this.current >= this.total){

            this.status = TaskStatus.CANSUBMIT;
        }
        TaskService.getInstance().notify(this);
    }


}    


enum TaskStatus{

    UNACCEPTABLE = 0,

    ACCEPTABLE = 1,

    DURING = 2,

    CANSUBMIT = 3,

    SUBMITTED = 4

}



interface TaskCondition{

    onAccept(task : Task);

    onSubmit();

}


class NPCTalkTaskCondition implements TaskCondition{

    
    //Task与TaskConditionContext的区别
    //不想让NPCTalkTaskCondition得到task的所有信息
    onAccept(context : TaskConditionContext){

        context.setCurrent();
    }

    onSubmit(){
        
    }
}

class KillMonsterTaskCondition implements TaskCondition{

    onAccept(context : TaskConditionContext){

        context.setCurrent();
    }

    onSubmit(){
        
    }


}


interface TaskConditionContext{

    getCurrent();

    setCurrent();
}




enum ErrorCode{

    SUCCESS,

    MISSING_TASK

}

















