var initCommentModule = (function(doc){
    var oCommentEditBoard = doc.getElementsByClassName('J_commentEditBoard')[0],
        oStartItems = doc.getElementsByClassName('fa-star'),
        oStartTip = doc.getElementsByClassName('J_startTip')[0],
        oTxtCount = doc.getElementsByClassName('J_txtCount'[0]),
        oSubmitBtn = doc.getElementsByClassName('J_submitBtn')[0],
        oEditTxt = doc.getElementsByClassName('J_editTxt')[0],
        oRadioTabItems  = doc.getElementsByClassName('tab-radio')[0],
        oLoading = doc.getElementsByClassName("J_loading")[0],
        warningTip = doc.getElementById('J_warningTip').innerHTML,
        oCommentList = doc.getElementsByClassName('J_commentList')[0],
        starNum = 5,
        fieldId = 0,
        delayTime = 500,
        pageNum = 0,
        t = null;

    var APIs = {
        submitComment: 'http://localhost/api_for_test/Comment/submitComment',
        getComments: 'http://localhost/api_for_test/Comment/getComments'
    }
    return {
       openBoard: function(){
        oCommentEditBoard.style.display = 'block';
       },
       closeBoard: function(){
        oCommentEditBoard.style.display = 'none';
       },
       startsHover: function(e){
        var e = e || window.event,
            tar = e.target || e.srcElement,
            tagName = tar.tagName.toLowerCase();

            
            if(tagName === 'i'){
                var thisIdx = [].indexOf.call(oStartItems,tar),
                    len = oStartItems.length,
                    thisStartItem = oStartItems[thisIdx],
                    item;
                oStartTip.innerHTML = thisStartItem.getAttribute('data-title');
                starNum = thisStartItem.getAttribute('data-count');
                for(var i=0;i<len;i++){
                    item = oStartItems[i];
                    i<=thisIdx ? item.className+= ' active'
                                : item.className = 'fa fa-star';
                }
            }
       },
       editInput: function(){
            var val = trimSpace(this.value),
                valLen = val.length;
                oTxtCount.innerHTML = valLen;
            if(valLen >= 15 && valLen<=1000){
                this.submitBtnStatusChange(true)
            }else{
                this.submitBtnStatusChange(false)
            }
       },
       getComments: function(fieldId,pageNum){
        var _self = this;
            $.ajax({
                url: APIs.getComments,
                type: 'POST',
                data: {
                    field: fieldId,
                    page: pageNum
                },
                success: function(data){
                    var num = data.num,
                        data = data.res,
                        len = data.length ;
                    oLoading.style.display = 'block';
                    t = setTimeout(function(){
                        _self.setTabStarNum(num);
                        oLoading.style.display = 'none';
                        if(len <=0 ){
                            _self.setWarningTip('暂无评论');
                            return;
                        }
                        oCommentList.innerHTML = '';
                        clearTimeout(t);
                    },delayTime);
                }
            })
       },
       radioTabClick: function(e){
            var e = e || window.event,
                tar = e.target || e.srcElement,
                className = tar.className;
            if(className == 'radio-txt' || className == 'radio-icon'){
                var oParent = tar.parentNode,
                    len = oRadioTabItems.length,
                    item;
                fieldId = oParent.getAttribute('data-id');

                for(var i=0;i<len;i++){
                    item = oRadioTabItems[i];
                    item.className = 'tab-radio';
                }

                oParent.className += ' cur';
                this.getComments(fieldId,pageNum);
            }
       },
       submitComment: function(userId){
            var val = oEditTxt.value,
                len = trimSpace(val).length,
                _self = this;

            if(len >= 15 && len <= 1000){
                $.ajax({
                    url: APIs.submitComment,
                    type: 'POST',
                    data: {
                        userId: userId,
                        starNum: starNum,
                        comment: val
                    },
                    success: function(data){
                        var errorCode = data.error_code;
                        _self.submitBtnTxtChange(true);
                        t = setTimeout(function(){
                            _self.submitBtnTxtChange(false);

                            if(errorCode === '10010'){
                                alert('您已对该课程做了评价，感谢您。')
                                return;
                            }
                            _self.setTabStarNum(data.num);
                            _self.restoreBoardStatus();
                            
                            clearTimeout(t);
                        },delayTime);
                    }
                })
            }
       },
       restoreBoardStatus: function(){
        oEditTxt.value = '';
        oTxtCount.innerHTML = '0';
        oSubmitBtn.innerHTML = '提交评论';
        this.submitBtnStatusChange(false);
        this.closeBoard();
       },
       submitBtnTxtChange: function(isChange){
            if(isChange){
                oSubmitBtn.innerHTML = '<i class="fa fa-spinner fa-spin"><i>'
                this.submitBtnStatusChange(false)
            }else{
                oSubmitBtn.innerHTML = '提交评论'
                this.submitBtnStatusChange(true)
            }
       },
       submitBtnStatusChange: function(isChange){
        if(isChange){
            oSubmitBtn.className = 'comment-btn submit J_submitBtn'
            oSubmitBtn.removeAttribute('disabled');
        }else{
            oSubmitBtn.className += ' disabled';
            oSubmitBtn.setAttribute('disabled','disabled');
        }
       },
       setTabStarNum: function(arr){
        var oRadioCount = null;
        arr.forEach(function(elem,idx){
           oRadioCount = oRadioTabItems[idx].getElementsByClassName('radio-count')[0];
           oRadioCount.innerHTML = elem;
        })
       },
       setWarningTip: function(text){
         oCommentList.innerHTML = warningTip.replace(/{{.*?}}/gim,'text');
       }

    }

})(document);