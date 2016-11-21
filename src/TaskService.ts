class TaskService implements EventEmitter{


    //全局变量，一个模块最多一个（任务系统等）
    private static instance : TaskService;
    private static count = 0;

    public taskList : Task[] = [];
    public observerList : Observer[] = [];


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

        //为传入函数增加了参数
        return rule(clone);

    }


    public addTask(task : Task){

        this.taskList.push(task);
    }


    public addObserver(observer : Observer){

        this.observerList.push(observer);
    }


    public removeObserver(observer : Observer){

        //排序
        //.....
        this.observerList.pop;
    }

    //public removeObserver(observer : Observer){}
    public removeTask(task : Task){

        this.taskList.pop;
    }


    //将任务发送给所有观察者,并让观察者进行相应的处理
    //只能内部调用
    public notify(task : Task){

        for(var i = 0; i < this.observerList.length; i++){

            this.observerList[i].onChange(task);
        }
    
    }
}