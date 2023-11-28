var $ = {
    ajax: function(opt){
        var url = opt.url;
        console.log(url)
    },
    post: function(){

    },
    get: function(){

    },

}

$.ajax({
    url: 'http://www/baidu.com',
});

//----------
var $ = (function(){
    var o = window.XMLHttpRequest ?
            new XMLHttpRequest :
            new ActiveXObject('Microsoft.XMLHTTP')
    if(!o){
        throw new Error('您的浏览器不支持异步发起HTTP请求')
    }

    function _doAjax(opt){
        var opt = opt || {},
            type = (opt.type || 'GET').toUpperCase(),
            async = opt.async || true,
            url = opt.url,
            data = opt.data || null,
            error = opt.error || function(){},
            success = opt.success || function(){},
            complete = opt.complete || function(){};
        if(!url){
            throw new Error('您没有填写URL');
        }
        o.open(type,url,async);
        type === 'POST' && o.setRequestHeader('Content-type','application/x-www-form-urlencoded');
        o.send(type==='GET'?null : formatDatas(data))

        o.onreadystatechange = function(){
            if(o.readyState === 4 && o.status === 200){
                success(JSON.parse(o.responseText));
                // 必须执行           
            }
            if(o.status === 404){
                error();
            }
            complete();
        }
    }

    function formatDatas(obj){
        var str = '';
        for(var key in obj){
            str += key +'=' + obj[key] +'&';
        }
        return str.replace(/&$/,'');
    }

    return {
        ajax: function(opt){
            _doAjax(opt);
        },
        post: function(url,data,callback){
            _doAjax({
                type: 'POST',
                url: url,
                data: data,
                success: callback
            });
        },
        get: function(url,callback){
            _doAjax({
                type: 'GET',
                url: url,
                success: callback
            });
        },
    }
})

$.ajax({
    type: 'POST',
    url: 'http://localhost:8080/text/calss7/server',
    data: {
        status: 1,
        flag: 2
    },
    success: function(data){
        console.log(data)
    },
    data: {
        status: 1,
        flag: 2
    },
    success: function(data){
        console.log(data)
    }
})