init()


function init(){
    initTodoList;
}


var initTodoList = (function(){
    var showInput = document.getElementsByClassName('j-show-input')[0],
        inputWrap = document.getElementsByClassName('input-wrap')[0],
        addItem = document.getElementsByClassName('j-add-item')[0],
        textInput = document.getElementById("textInput"),
        oList = document.getElementsByClassName('j-list')[0]
        inputShow = false;
        addEvent(showInput,'click',function(){
            if(inputShow){
                inputWrap.style.display = 'none';
                inputShow = false;
            }else{
                inputWrap.style.display = 'block';
                inputShow=true;
            }
    });
        addEvent(addItem,'click',function(){
            var oItems = document.getElementsByClassName('item'),
                val = textInput.value,
                itemLen = oItems.length,
                len = val.length,
                item;
            if(len===0){
                return;
            }
            for(var i=0;i<itemLen;i++){
                item = elemChildren(oItems[i])[0];
                var text = item.innerText;
                console.log(text)
                if (val===text){
                    alert("已存在此项目");
                    return;
                }
                    
            }
            var oli = document.createElement('li');
            oli.className='item';
            oli.innerHTML=itemTpl(val);
            oList.appendChild(oli)
            textInput.value = '';
            inputWrap.style.display='none';
            inputShow=false;
        });
        function itemTpl(text){
            return(
                '<p class="item-content">'+ text +'</p>' +
                '<div class="btn-group">'+
                    '<a href="javascript:;" class="edit-btn fa fa-edit"></a>'+
                    '<a href="javascript:;" class="remove-btn fa fa-times"></a>'
                +
                '</div>'
            )
        }    
})();
