
(function(){
    var data = [
        {title: "具惠善发声", number: 1821, prevNumber: 1777},
        {title: "埃航焦土代替遗体", number: 1146, prevNumber: 1200},
        {title: "茅台股价再创新高", number: 1076, prevNumber: 1100},
        {title: "李敖去世一周年", number: 985, prevNumber: 888},
        {title: "315点名714高炮", number: 979, prevNumber: 777},
        {title: "火箭单节10三分", number: 849, prevNumber: 547},
        {title: "胜利否认性招待", number: 849, prevNumber: 300},
        {title: "山西临汾楼房垮塌", number: 838, prevNumber: 368},
        {title: "粉丝摔碎许凯手机", number: 761, prevNumber: 781},
        {title: "张紫妍案证人发声", number: 736, prevNumber: 700},
        {title: "曝张紫妍自杀真相", number: 644, prevNumber: 555},
        {title: "喻恩泰配音丘吉尔", number: 643, prevNumber: 312},
        {title: "詹姆斯绝杀被盖", number: 614, prevNumber: 478},
        {title: "首批拟IPO名单", number: 563, prevNumber: 234},
        {title: "西贝莜面村致歉", number: 549, prevNumber: 532},
        {title: "潘长江直播再回应", number: 548, prevNumber: 547},
        {title: "埃航焦土代替遗体", number: 541, prevNumber: 123},
        {title: "鲜榨果汁输入静脉", number: 538, prevNumber: 345},
        {title: "蒂姆夺大师赛冠军", number: 538, prevNumber: 234},
        {title: "教师寒假打牌被拘", number: 525, prevNumber: 346},
        {title: "上汽调整合资股比", number: 456, prevNumber: 236},
        {title: "沈腾不满最帅第21", number: 412, prevNumber: 346},
        {title: "京东白条回应漏洞", number: 400, prevNumber: 123},
        {title: "315晚会点名电子烟", number: 389, prevNumber: 231},
        {title: "极限挑战第五季", number: 312, prevNumber: 645},
        {title: "特朗普行使否决权", number: 223, prevNumber: 123},
        {title: "郑容和ins评论", number: 219, prevNumber: 124},
        {title: "苹果回应反垄断", number: 210, prevNumber: 612},
        {title: "地铁喝咖啡被罚", number: 166, prevNumber: 111},
        {title: "崔钟勋涉嫌偷拍", number: 123, prevNumber: 110}
      ]
    var idx=0,
        $Containter = $(".container"),
        $ContentList = $('.news-list'),
        bgColorArr=['#f54545','#ff8547','#ffac38'],
        total = data.length /10;

    function init(){
        bindEvent();
        renderData(data);
    }

    function bindEvent(){
        $Containter.find('.changeBtn').on('click',function(){
            idx = (idx+1)%total;
            renderData(data)
        })
    }

    //渲染数据
    function renderData(data){

        $ContentList.find('.data-item').remove()
        var len = (data.length-idx*10)>=10 ? 10:(data.length-idx*10);
        for(var i=0;i<len;i++){
            var $CloneDOM = $Containter.find('.tpl').clone().removeClass('tpl').addClass('data-item'),
                elem = data[i+idx*10];
            
            $CloneDOM.find("div").eq(0).text(i+1+idx*10)
            .css('backgroundColor',idx==0 && bgColorArr[i])
            .next().text(elem.title).next().find('span').text(elem.number+"万")
            .addClass(elem.number > elem.prevNumber ? "up":"down")
            $ContentList.append($CloneDOM)
        }
    }
    init()
})();