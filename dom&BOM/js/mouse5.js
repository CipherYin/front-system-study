window.onload = function(){
    init();
}

function init(){
    initMagnifier();
}

var initMagnifier = (function(){
    var oImgWrap = document.getElementsByClassName('img-wrap')[0],
        oMagWrap = document.getElementsByClassName('mag-wrap')[0],
        oMagImg = document.getElementsByClassName('mag-img')[0],
        magWidth = getStyles(oMagWrap,'width'),
        magHeight = getStyles(oMagWrap,'height'),
        imgX = oImgWrap.offsetLeft,
        imgY = oImgWrap.offsetTop;
    addEvent(oImgWrap,'mouseover',function(e){
        
        addEvent(document,'mousemove',mouseMove);
    });
    
    addEvent(oImgWrap,'mouseout',mouseOut);

    function mouseMove(e){
        var e =e || window.event,
            x = pagePos(e).X  -imgX - magWidth /2,
            y = pagePos(e).Y  -imgY - magWidth /2,
            mouseX = pagePos(e).X - imgX,
            mouseY = pagePos(e).Y - imgY;
        oMagWrap.style.left = x +'px';
        oMagWrap.style.top = y+'px';
        oMagImg.style.left = -x+'px';
        oMagImg.style.top = -y+'px';
        oMagWrap.className += ' show';

        if(mouseX < 0 || mouseX > getStyles(oImgWrap,'width') ||
        mouseY < 0 || mouseY > getStyles(oImgWrap,'height')){
            oMagWrap.className = 'mag-wrap'
        }

    }

    function mouseOut(e){
        removeEvent(document,'mousemove',mouseMove);
    }
});