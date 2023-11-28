var test = (function(){
    var test1 = function(){
        console.log('test1');
    },
    test2 = function(){
        console.log('test2');
    },
    test3 = function(){
        console.log(test3);
    }
    return {
        test1: test1,
        test2: test2,
        test3: test3
    }

})();
//方法集合模块化



//----------------------------------

var mod1 = (function(){
    var test1 = function(){
        console.log('test1');
    },
        test2 = function(){
            console.log('test2');
        },
        test3 = function(){
            console.log('test3');
        }
        return {
            test1: test1,
            test2: test2,
            test3: test3
        }
})();

// 模块之间不要直接使用；
var mod2 = (function(){
    var test4 = function(){
        mod1.test1();
    },
        test5 = function(){
           mod1.test2()
        },
        test6 = function(){
        mod1.test3()
        }
        return {
            test4: test4,
            test5: test5,
            test6: test6
        }
})();
// 可以用模块注入的方式，传参使用
var mod2 = (function(mod){
    var test4 = function(){
        mod.test1();
    },
        test5 = function(){
            mod.test2()
        },
        test6 = function(){
            mod.test3()
        }
        return {
            test4: test4,
            test5: test5,
            test6: test6
        }
})(mod1);
// 模块化的放大模式

//-----------------------
var mod = {}
mod = (function(module){
    module.a = 1;
    module.test1 = function(){
        console.log('test1');
    }
    return module;
})(mod); 
// 多人开发一个模块; 给同一个模块增加属性，都是一个引用
// /mod||{} 宽放大模式