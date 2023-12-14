;(function(doc,Comment){
    var oOpenBtn = doc.getElementsByClassName('J_openBtn')[0],
        oCloseBtn = doc.getElementsByClassName('J_closeBtn')[0],
        oStars = doc.getElementsByClassName('J_starts')[0],
        oEditTxt = doc.getElementsByClassName('J_editTxt')[0],
        oSubmitBtn = doc.getElementsByClassName('J_submitBtn')[0],
        oRadioTabs = doc.getElementsByClassName('J_radioTabs')[0]
        ;

    var userId = 1;
    
    var init = function(){
        Comment.getComments(0,0);
        bindEvent();

    }

    function bindEvent(){
        oOpenBtn.addEventListener('click',Comment.openBoard,false);
        oCloseBtn.addEventListener('click',Comment.closeBoard,false);
        oStars.addEventListener('mouseover',Comment.startsHover,false);
        oEditTxt.addEventListener('input',Comment.editInput,false);
        oSubmitBtn.addEventListener('click',Comment.submitComment.bind(Comment,userId),false)
        oRadioTabs.addEventListener('click',Comment.radioTabClick.bind(Comment),false);
    }
    init();
    return {
        
    }
    
    // 全局变量注入
})(document,initCommentModule);

//如果一个模块有很多子模块；
//index.js是主模块，modules/index 存放其的子模块