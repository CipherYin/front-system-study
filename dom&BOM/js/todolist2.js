(function(node){
 var TodoList=function(){
    this.node = node;
    this.dConfig = {
        "plusBtn": "j-plus-btn",
        "inputArea":"input-wrap",
        "addBtn":"j-add-item",
        "list":"item-list",
        "itemClass":"item"
    }
    this.config = this.getConfig();
    for(key in this.dConfig){
        if(!this.config.hasOwnProperty(key)){
            return;
        }
    }
 }

 TodoList.prototype = {
    getConfig: function(){
       return JSON.parse(this.node.getAttribute("data-config")) 
    }
 }

 window.TodoList =  new TodoList();
})(document.getElementsByClassName("todo-wrap")[0])