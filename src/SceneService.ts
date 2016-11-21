class SceneService implements EventEmitter{

    private static instance : SceneService;
    private static count = 0;

    public observerList : Observer[] = [];


    constructor(){

        SceneService.count++;
        if(SceneService.count > 1){

            throw 'singleton!!!';
        }
    }


    //获取TaskService的实例
    public static getInstance(){

        if(SceneService.instance == null){

            SceneService.instance = new SceneService();
        }

        return SceneService.instance;
    }

    public addObserver(observer : Observer){

        this.observerList.push(observer);
    }

    public removeObserver(observer : Observer){

        //排序
        //.....
        this.observerList.pop;
    }


    public notify(){

        for(var i = 0; i < this.observerList.length; i++){

            this.observerList[i].onChange(1);
        }
    
    }
    
}