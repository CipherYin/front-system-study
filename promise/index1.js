//fs 是node中读写模块
let fs = require('fs');

// 异步读取文件 path,编码,回调函数
// 回调递域
fs.readFile('./name.txt','utf-8',(error,data)=>{
    console.log(data)
    if(data){
        fs.readFile(data,'utf-8',(err,data)=>{
            console.log(data);
            fs.readFile(data,'utf-8',(error,data)=>{
                console.log(data)
            })
        })
    }
});

