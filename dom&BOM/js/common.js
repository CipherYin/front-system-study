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

function elemChildren(node){
    var temp = {
        'length': 0,
        'splice': Array.prototype.splice
    },
        len = node.childNodes.length;
    for(var i=0;i<len;i++){
        var childItem = node.childNodes[i];

        if(childItem.nodeType===1){
            temp[temp.length] = childItem;
            temp['length']++;
        }
    }
    return temp;
}
function getScrollOffset(){
    if (window.pageXOffset) {
        return {
            left: window.pageXOffset,
            top: window.pageYOffset
        }
    } else {
        return {
            left: document.body.scrollLeft + document.documentElement.scrollLeft,
            top: document.body.scrollTop + document.documentElement.scrollTop
        }
    }
    
}


function getStyles(elem, prop) {
    if (window.getComputedStyle) {
        if (prop) {
            return parseInt(window.getComputedStyle(elem, null)[prop]);
        } else {
            return window.getComputedStyle(elem, null);
        }
    } else if (elem.currentStyle) {
        if (prop) {
            return parseInt(elem.currentStyle[prop]);
        } else {
            return elem.currentStyle;
        }
    }
    return null;
}

function pagePos(e){
    var sLeft = getScrollOffset().left,
        sTop = getScrollOffset().top,
        cLeft = document.documentElement.clientLeft || 0,
        cTop = document.documentElement.clientTop || 0;
    return {
        X: e.clientX + sLeft - cLeft,
        Y: e.clientY + sTop - cTop,
    }
}
function removeEvent(elem,type,fn){
    if(elem.addEventListener){
        elem.removeEventListener(type,fn,false);
    }else if (elem.attachEvent){
        elem.detachEvent('on'+type,fn)
    }else{
        elem['on'+type] = null
    }
}

function cancelBubble(e){
    var e = e||window.event;
    if(e.stopPropagation){
        e.stopPropagation();
    }else{
        e.cancelBubble = true;
    }
}

function preventDefaultEvent(e){
    var e = e || window.event;
    if(e.preventDefaultEvent){
        e.preventDefault();
    }else{
        e.returnValue = false;
    }
}


function elemDrag(elem){
    var x,
        y;
    addEvent(elem,'mousedown',function(e){
        var e = e|| window.event;
        x = pagePos(e).X - getStyles(elem,'left')
        y = pagePos(e).Y - getStyles(elem,'top')

        addEvent(document,'mousemove',mouseMove);
        addEvent(document,'mouseup',mouseUp);
        cancelBubble(e)
        preventDefaultEvent(e);
    });

    function mouseMove(e){
        var e = e||window.event;

        elem.style.left = pagePos(e).X - x+'px';
        elem.style.top = pagePos(e).Y - y +'px';
    }

    function mouseUp(e){
        var e = e || window.event;
        
        removeEvent(document,'mousemove',mouseMove);
        removeEvent(document,'mouseUp',mouseUp);
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

function getParent(target,element){
    while(target.tagName.toLowerCase() !== element){
        target = target.parentNode;
    }
    return target;
}


function vec(a,b){
    return {
        x: b.x - a.x,
        y: b.y - a.y
    }
}

function vecProduct(v1,v2){
    return v1.x * v2.y - v2.x*v1.y
}

function sameSymbols(a,b){
    return (a^b)>0;
}

function pointInTriangle(p,a,b,c){
    var PA = vec(p,a),
        PB = vec(p,b),
        PC = vec(p,c),
        R1 = vecProduct(PA,PB),
        R2 = vecProduct(PB,PC),
        R3 = vecProduct(PC,PA);
    return sameSymbols(R1,R2)  &&  sameSymbols(R2,R3)
}