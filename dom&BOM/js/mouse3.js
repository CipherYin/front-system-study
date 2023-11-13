;(function(doc){
    var oList = doc.getElementsByClassName('list')[0],
        oItems = doc.getElementsByClassName('list-item'),
        curIndex = 0;

    var init = function(){
        bindEvent();
    }

    function bindEvent(){
        addEvent(oList,'mouseover',function(){
            addEvent(document,'mousemove',slide);
        });
    }

    function slide(ev){
        var e = ev || window.event,
            tar = e.target || e.srcElement,
            oParent = getParent(tar,'li')
            thisIdx = Array.prototype.indexOf.call(oItems,oParent);
        if(curIndex!=thisIdx){
            oItems[curIndex].className = 'list-item';
            oItems[thisIdx].className ='list-item active';
            curIndex = thisIdx;
        }
    }

    function getParent(target,element){
        while(target.tagName.toLowerCase() !== element){
            target = target.parentNode;
        }
        return target;
    }
    // function bindEvent(){
    //     for(var i=0;i<oItems.length;i++){
    //         addEvent(oItems[i],'mouseover',function(){
    //             oItems[curIndex].className = 'list-item';
    //             curIndex = Array.prototype.indexOf.call(oItems,this);
    //             oItems[curIndex].className ='list-item active';
    //         })
    //     }
    // }

    init();


})(document);
