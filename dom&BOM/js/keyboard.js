window.onload = function(){
    initGame();
}

var initGame = (function(){
    var Snake = function(){
        this.bodyArr=[
            {x:0,y:0},
            {x:0,y:20},
            {x:0,y:20},
            {x:0,y:40},
            {x:0,y:60},
            {x:0,y:80},
            {x:0,y:100}
        ];
        this.dir = 'DOWN';
    },
        wrap = document.getElementsByClassName('wrap')[0],
        t=null;
    Snake.prototype = {
        init: function(){
            this.initSnake();
            this.run();
            this.bindEvent();
        },
        bindEvent: function(){
            var _self = this;
            addEvent(document,'keydown',function(){
                _self.changeDir();
            })
        },
        initSnake: function(){
            var arr = this.bodyArr,
                len = arr.length,
                //frag在循环创建对象的时候，用于接受对象；这个碎片不在dom出现；
                frag = document.createDocumentFragment(),
                item=null;
            for(var i=0;i<len;i++){
                item = arr[i];
                var round = document.createElement('i');
                round.className = i === len-1?'round head'
                                                :'round';
                round.style.left = item.x + 'px';
                round.style.top = item.y + 'px';
                frag.appendChild(round);
            }
            wrap.appendChild(frag)
        },
        run: function(){
            var _self = this;
            t = setInterval(function(){
                _self.move();
            }, 500);
        },
        move: function(){
            var arr = this.bodyArr,
                len = arr.length,
                head = arr[len-1];
            
            for(var i=0;i<len;i++){
                if (i===len-1){
                    //先向下走
                    switch(this.dir){
                        case 'LEFT':
                            head.x -=20;
                            break;
                        case 'RIGHT':
                            head.x+=20;
                            break;
                        case 'UP':
                            head.y -=20;
                            break;
                        case 'DOWN':
                            head.y+=20;
                            break;
                        default:
                            break;

                    }
                }else{
                    arr[i].x = arr[i+1].x;
                    arr[i].y = arr[i+1].y;
                }
            }
            this.removeSnake();
            this.initSnake();
        },
        removeSnake: function(){
            var bodys = document.getElementsByClassName('round');
            while(bodys.length>0){
                bodys[0].remove();
            }
        },
        changeDir: function(e){
            var e = e || window.event,
                code = e.keyCode;
            this.setDir(code);
        },
        setDir: function(code){
            console.log(code)
            switch(code){
                case 37:
                    if(this.dir !== 'RIGHT' && this.dir !=='LEFT'){
                        this.dir = 'LEFT';
                    }
                    break;
                case 39:
                    if(this.dir !== 'RIGHT' && this.dir !=='LEFT'){
                        this.dir = 'RIGHT';
                    }
                    break;
                case 38:
                    if(this.dir !== 'UP' && this.dir !=='DOWN'){
                        this.dir = 'UP';
                    }
                    break;
                case 40:
                    if(this.dir !== 'UP' && this.dir !=='DOWN'){
                        this.dir = 'DOWN';
                    }
                    break;
                default:
                        break;
            }
                
        }

    }
    return new Snake().init();
});

