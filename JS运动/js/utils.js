function getStyles(elem,prop){
    //iE9以上的版本
    if(window.getComputedStyle){
        if(prop){
            //null 是伪元素
            return window.getComputedStyle(elem,null)[prop];
        }else{
            return  window.getComputedStyle(elem,null);
        }
    }else{
        if(prop){
            return elem.currentStyle[prop];
        }else{
            return elem.currentStyle;
        }
    }
}

function addEvent(el,type,fn){
    if(el.addEventListener){
        el.addEventListener(type,fn,false);
    }else if(el.attachEvent){
        el.attachEvent('on'+type,function(){
            fn.call(el);
        })
    }else{
        el['on'+type] = fn;
    }
}

function getViewportSize(){
    if(window.innerWidth){
        return {
            width: window.innerWidth,
            height: window.innerHeight
        }
    }else{
        if(document.compatMode === 'BackCompat'){
            return {
                width: document.body.clientWidth,
                height: document.body.clientHeight
            }
        }else{
            return {
                width: document.documentElement.clientWidth,
                height: document.documentElement.clientHeight
            }
        }
    }
}


function startMove(dom,attrObj,callback){
    var iSpeed = null;
    var iCur = null;
    var allStop = true;
    clearInterval(dom.timer);

    dom.timer = setInterval(function(){
        for(var attr in attrObj){
            if(attr === 'opacity'){
                iCur = parseFloat(getStyles(dom,sttr)*100);
            }else{
                iCur = parseInt(getStyles(dom,attr));
            }
            iSpeed = (attrObj[attr]-iCur) / 7;
            iSpeed = iSpeed>0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
            
            if(iCur!==attrObj[attr]){
                allStop=false;
            }

            if(attr === 'opacity'){
                dom.style[attr] = (iCur+iSpeed) / 100;
            }else{
                dom.style[attr] = (iCur+iSpeed)+'px';
            }

            if(allStop){
                clearInterval(dom.timer);
            }
        }
    },30);
    typeof callback === 'function'&& callback();

}