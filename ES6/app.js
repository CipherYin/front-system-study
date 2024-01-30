// var babel = require("babel-core");

// console.log(babel)

// var arr = []
// for(let i = 0;i<10;i++){
//     arr[i] = ((i)=>{
//         console.log(i)
//     })(i)
// }

// var obj = new Map();
// console.log(obj);

// var a = 1;
// var a = 2;
// // 变量污染,a覆盖

// let a = 1;
// let a = 2;
//无法重新声明块范围变量“a”。ts(2451)
//let 块级作用域

// function test(){
//     let a = 1;
//     let a = 2;
// }
// 不能同时声明两个相同的变量


// let a= 20
// function test(a){
//     let a = 10;
//     console.log(a)
// }
// test(a)
// 重复声明



// let a= 20
// function test(a){
//     {
//         let a = 10;
//         //10
//         console.log(a)
//     }
//     //20
//     console.log(a)
// }
// test(a)


//let 在同一作用域下不可重复声明
// var 会提升 var a = undifine在全局
// let 不会提升，会产生一个暂时性死区
// let 只会在当前块级作用域下生效
// let本质是为了给js增加一个块级作用域；
//  不建议在块级作用域当中   函数声明的方式 来声明函数， 而用函数表达式
// function test(){
//     console.log(a)
//     let a = 10;
// }
// test();

// let b =b;
// 暂时性死区
// function test(x = y,y=2){
//     console.log(y)
// }
// test()


// 不在同一个作用域
// {
//     let a = 2;
// }


// console.log(a)

//  


//const // 一旦定义必须赋值，值不能更改
// 有块级作用域，不能提升，有暂时性死区
// 与let 一样不能重复声明；
// const a = 12;
// a=13


// const obj = {};
// obj.name = 'zhangsan';

// console.log(obj)


//顶层对象 




