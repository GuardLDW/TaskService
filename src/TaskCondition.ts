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