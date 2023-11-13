Element.prototype.dragNclick= (function(oMenu,elemClick){
    var bTime = 0,
        eTime = 0;
        oPos = [],
        cbTime = 0,
        ceTime = 0,
        counter = 0,
        t = null,
        wWidth = getViewportSize().width,
        wHeight = getViewportSize().height,
        eleWidth = getStyles(this,'width'),
        eleHeight = getStyles(this,'height'),
        mWidth = getStyles(oMenu,'width'),
        mHeight = getStyles(oMenu,'height');
    drag.call(this)
    function drag(){
        var x,
            y,
            _self = this;
        
        addEvent(this,'mousedown',function(e){
            var e = e|| window.event,
                btnCode = e.button;
            if (btnCode === 2){
                // 右键
                var mLeft = pagePos(e).X,
                    mTop = pagePos(e).Y;
                if(mLeft<=0){
                    mLeft = 0;
                }else if(mLeft>=wWidth - mWidth){
                    mLeft = pagePos(e).X - mWidth;
                }
                if(mTop<=0){
                    mTop=0;
                }else if(mTop>=wHeight - mHeight){
                    mTop = pagePos(e).Y - mHeight;
                }
                oMenu.style.left =mLeft +'px';
                oMenu.style.top = mTop+'px';
                oMenu.style.display = 'block';
            }else if(btnCode === 0){
                //左键
                bTime = new Date().getTime();
                oPos = [getStyles(_self,'left'),getStyles(_self,'top')]
                oMenu.style.display = 'none';
                x = pagePos(e).X - getStyles(_self,'left')
                y = pagePos(e).Y - getStyles(_self,'top')
                addEvent(document,'mousemove',mouseMove);
                addEvent(document,'mouseup',mouseUp);
                cancelBubble(e)
                preventDefaultEvent(e);
            }         
        });
        addEvent(document,'contextmenu',function(e){
            var e = e||window.event;
            preventDefaultEvent(e)
        })
        addEvent(document,'click',function(e){
            var e = e||window.event;
            oMenu.style.display = 'none'
        })
        addEvent(oMenu,'click',function(e){
            var e = e ||window.event;
            cancelBubble(e);
        })
        function mouseMove(e){
            var e = e||window.event,
                eleLeft = pagePos(e).X - x;
                eleTop = pagePos(e).Y - y;
            if(eleLeft<0){
                eleLeft = 0;
            }else if(eleLeft>=wWidth-eleWidth){
                    eleLeft = wWidth - eleWidth;
            }
            if(eleTop<0){
                eleTop = 0;
            }else if(eleTop>=wHeight-eleHeight){
                eleTop = wHeight - eleHeight;
            }
            _self.style.left = eleLeft+'px';
            _self.style.top = eleTop+'px';
        }

        function mouseUp(e){
            var e = e || window.event;
            console.log(1)
            eTime = new Date().getTime();

            if(eTime - bTime < 100){
                _self.style.left = oPos[0]+'px';
                _self.style.top = oPos[1]+'px';
                counter++;
                if(counter == 1){
                    cbTime = new Date().getTime();
                }
                if(counter == 2){
                    ceTime = new Date().getTime();
                }
                if(cbTime && ceTime && (ceTime - cbTime <200)){
                    elemClick();
                    cbTime = 0;
                    ceTime = 0;
                    counter = 0;
                }
                t = setTimeout(function(){
                    cbTime = 0;
                    ceTime = 0;
                    counter = 0;
                    clearTimeout(t)
                },300);
                
            }
            removeEvent(document,'mousemove',mouseMove);
            removeEvent(document,'mouseUp',mouseUp);
        }
    }

});

// onmouse; 鼠标左中右； 0 1 2 
// document.onmouseup = function(e){
//     console.log(e)
// }