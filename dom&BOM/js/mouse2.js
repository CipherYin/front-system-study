Element.prototype.dragNclick= (function(elem,elemClick){
    var bTime = 0,
        eTime = 0;
        oPos = []
    drag();
    function drag(){
        var x,
            y;
        addEvent(elem,'mousedown',function(e){
            var e = e|| window.event;
            bTime = new Date().getTime();
            oPos = [getStyles(elem,'left'),getStyles(elem,'top')]
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
            eTime = new Date().getTime();

            if(eTime - bTime < 300){
               elem.style.left = oPos[0]+'px';
               elem.style.top = oPos[1]+'px'
               elemClick();
            }
            removeEvent(document,'mousemove',mouseMove);
            removeEvent(document,'mouseUp',mouseUp);
        }
    }

});

