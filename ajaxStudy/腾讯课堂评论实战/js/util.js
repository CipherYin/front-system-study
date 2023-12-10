function trimSpace(str){
    return str.replace(/s+/gim,'');
}

function getTarget(e,mark){
    var e = e||window.event,
        tar = e.target || e.srcElement;
    
    mark = mark == 'className'? tar.className
                                : tar.tagName.toLowerCase();
    return {
        tar: tar,
        mark: mark
    }
}