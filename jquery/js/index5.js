// $.extend({
//     min: function(a,b){
//         return a<b?a:b;
//     }

// });//extend方法添加对象；实现扩展方法

// console.log($.min(1,10))

// 同步任务 和 异步任务
//同步任务 -> 进入主线程
//异步任务->event table  注册函数
//event queue 任务队列
console.log(1);

setTimeout(function(){
    console.log(2);
},3000);// 到了3000秒后，这个function会进入event queue，主线程执行完同步任务后就会这些这个
//异步任务是： 讲要执行的函数放入event table中执行，然后返回的回调函数会放入event queue,主线程会执行这些回调函数
console.log(3)
// 回调函数
var cb = $.Callbacks()
//回调函数只能执行一次
var cb = $.Callbacks('once')
var cb = $.Callbacks('memory')// fire()后，加入的新function也会执行
var cb = $.Callbacks('unique')//不会重复加入function
var cb= $.Callbacks('stopOnFalse')//回调函数返回false，是不会执行的
function test(something){
    console.log("回调函数执行了 ",something)
}
//添加回调函数
cb.add(test);
//执行回调函数,传入参数
cb.fire('一个参数');
cb.fire('一个参数');


var defer = $.Deferred();
console.log(defer)
// ajax的回调函数就根据这里的done和fail
defer.done(function(){
    console.log('成功')
})

defer.fail(function(){
    console.log('失败')
})

defer.progress(function(){
    console.log('正在进行中')
})

setTimeout(function(){
    var number = Math.random()*10;
    console.log(number)
    if(number>6){
        defer.resolve();
    }else if(number<2){
        defer.reject();
    }else{
        //progress
        defer.notify()
    }
},1000)





