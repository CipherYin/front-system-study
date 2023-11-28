;(function(win,doc){
    var oImgList = doc.getElementsByClassName('J_imgList')[0],
        data = JSON.parse(doc.getElementById('J_data').innerHTML),
        imgTpl = doc.getElementById('J_imgTpl').innerHTML,
        oImg = doc.getElementsByClassName('list-img');

    var init = function(){
        bindEvent();
        oImgList.innerHTML =  renderList(data);
    }
    function bindEvent(){
        //throttle 函数节流，防抖
        window.onload = window.onscroll = throttle(imgLazyload(oImg),500);
        // function(){
        //     imgLazyload(oImg)();
        // }
    }
    function renderList(data){
        var list = '';
        data.forEach(function(elem){
            list+= imgTpl.replace(/{{(.*?)}}/g,function(node,key){
                return {
                    img: elem.img,
                    name: elem.name
                }[key]
            });
        });
        return list;
    }
    init();
})(window,document);

// 可视区域
function imgLazyload(image){
    var imgLen = image.length,
        n=0;
    return function(){
        var cHeight = document.documentElement.clientHeight,
            sTop = document.documentElement.scrollTop || document.body.scrollTop,
            imgItem;
        for(var i=n;i<imgLen;i++){
            imgItem = image[i];
            if(imgItem.offsetTop < cHeight + sTop){
                // 出现在可视区域之类
                imgItem.src = imgItem.getAttribute('data-src');
                imgItem.removeAttribute('data-src');
                n++;
            }
        }    
    }
}