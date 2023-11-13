window.onload = function(){
    init();
}

function init(){
    initMenu();
}

var initMenu = (function(){
    var oMenu = document.getElementsByClassName('menu-wrap')[0],
        oMenuItems = oMenu.getElementsByClassName('main-item'),
        oSub = oMenu.getElementsByClassName('sub')[0]
        oSubItems = oSub.getElementsByClassName('sub-item'),
        menuLen = oMenuItems.length,
        menuItem = null,
        subItem = null,
        subLen = oSubItems.length,
        isInSub = false;
        t = null,
        isFirst = true,
        mousePosses = [],
        count = 0;;

    for(var i=0;i<menuLen;i++){
        menuItem = oMenuItems[i];
        addEvent(menuItem,'mouseenter',menuItemMouseEnter);
    }

    addEvent(oSub,'mouseenter',function(){
        isInSub = true;
    })
    addEvent(oSub,'mouseleave',function(){
        isInSub = false;
    })

    addEvent(oMenu,'mouseenter',function(){
        addEvent(oMenu,'mousemove',menuMouseMove)
    })

    addEvent(oMenu,'mouseleave',menuMouseOut)

    function menuItemMouseEnter(e){
        var e = e||window.event,
            tar = e.target||e.srcElement,
            thisIdx = Array.prototype.indexOf.call(oMenuItems,tar),
            lastPos = mousePosses[mousePosses.length-2] || {x:0,y:0},
            curPos = mousePosses[moveTo.length-1]||{x:0,y:0},
            toDelay = doTimeout();
        oSub.className = 'sub';

        if(t){
            clearInterval(t);
        }
        if(!isFirst){
            if(toDelay){
                t = setTimeout(function(){
                    if(isInSub){
                        return;
                    }
                    addActive(thisIdx);
                },300);
               }else{
                addActive(thisIdx);
               }
        }else{
            addActive(thisIdx);
            isFirst= false;
        }
       
     
    }

    function addActive(thisIdx){
        removeAllActive()
        oMenuItems[thisIdx].className+=' active';
        oSubItems[thisIdx].className+=' active';
    }
    function removeAllActive(){
        for(var i=0;i<menuLen;i++){
            menuItem = oMenuItems[i];
            menuItem.className = 'main-item';
        }
        for(var i=0;i<subLen;i++){
            subItem = oSubItems[i];
            subItem.className = 'sub-item';
        }
    }

    function menuMouseMove(e){
        var e = e || window.event;

        mousePosses.push({
                x: pagePos(e).X,
                y:  pagePos(e).Y
            });
            count++;
        if(mousePosses.length>3){
            mousePosses.shift();
        }
       console.log(mousePosses)
    }
    function menuMouseOut(){
        oSub.className = 'sub hide';
        removeAllActive();
        removeEvent(document,'mousemove',menuMouseMove)
    }
    function doTimeout(lastPos,curPos){
        var topLeft = {
            x: getStyles(oMenu,'width')+getStyles(oMenu,'margin-left'),
            y: getStyles(oMenu,'margin-top')
        }
        var bottomLeft = {
            x: getStyles(oMenu,'width')+getStyles(oMenu,'margin-left'),
            y: getStyles(oMenu,'margin-top')+getStyles(oSub,'height')
        }
        // return pointInTriangle(curPos,lastPos,topLeft,bottomLeft);
        return false;
    }
});