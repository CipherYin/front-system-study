var wait = function(){
    var task = function(){
        console.log("执行完成");
        //新增需求，如果在这添加特别复杂的操作，代码可能会很多，而且可能分为好几个阶段
    }
    setTimeout(task,2000);
}

wait();

function waitHandle(){
    //创建一个deferred对象;
    var dtd = $.Deferred();

    var wait = function(dtd){
        console.log(dtd);
        var task = function(){
            console.log('执行完成');
            dtd.resolve(); //表示异步任务已经完成
            //dtd.reject() 表示异步任务失败或出错；打印失败的回调；
        }
        setTimeout(task,2000);
        return dtd //里层函数  返回deferred对象
        //return dtd.promise(); //注意，这里返回的是promise 而不是直接返回deferred
    }

    // 外层函数返回，里层函数的执行结果
    return wait(dtd)
}