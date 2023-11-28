var initCourseTab = (function(doc){
    var oCourseTabLks = doc.getElementsByClassName('course-tab-lk'),
        oCourseCardList = doc.getElementsByClassName('js-course-card-list')[0];
        courseData = JSON.parse(doc.getElementById('js-course-data').innerHTML),
        cardItemTpl = doc.getElementById('J_cardItemTpl').innerHTML,
        oSearchInput = doc.getElementById('js-search-input'),
        oCourseTabLksLen = oCourseTabLks.length;
    return {
        searchCourse: function(){
            var val = oSearchInput.value;
            if(val.length>0){
                oCourseCardList.innerHTML = this.makeList(this.searchData(courseData,val));
            }else{
                this.restoreList();
            }
        },
        tabClick: function(e){
            var e = e ||window.event,
                tar = e.target || e.srcElement,
                className = tar.className,
                item;
            if(className === 'course-tab-lk'){
                var field = tar.getAttribute("data-field");
               for(var i=0;i<oCourseTabLksLen;i++){
                    item = oCourseTabLks[i];
                    item.className = 'course-tab-lk';
               }
               tar.className +=' current';
               oCourseCardList.innerHTML  = this.makeList(this.filterData(field,courseData));

            }
        },
        initCourseList: function(){
            oCourseCardList.innerHTML  = this.makeList(courseData);
        },
        makeList: function(data){
            var list = '';

            data.forEach(function(elem){
                list += cardItemTpl.replace(/{{(.*?)}}/g,function(node,key){
                    return {
                        img: elem.img,
                        courseName: elem.course,
                        isFree: elem.is_free === '1'?'free':'vip',
                        price: elem.is_free === '1'?'免费':('¥'+elem.price+'.00'),
                        hours: elem.classes
                    }[key];
                });
            });
            return list
        },
        restoreList: function(){
            var item;
            oCourseCardList.innerHTML = this.makeList(courseData);
            for(var i=0;i<oCourseTabLksLen;i++){
                item = oCourseTabLks[i];
                item.className = 'course-tab-lk';
           }
           oCourseTabLks[0].className+=' current';
        },
        filterData: function(field,data){
            return data.filter(function(elem){
                switch(field){
                    case "all":  return true; break;
                    case "free": return elem.is_free === '1'; break;
                    case "vip": return elem.is_free=='0';break;
                    default:
                        return true;
                }
            });
        },
        searchData: function(data,keyword){
            return data.reduce(function(prev,elem){
                var res = elem.course.indexOf(keyword);
                if(res!=-1){
                    prev.push(elem)
                }
                return prev;
            },[])
        }
    }
})(document);


;(function(doc){
    var oSearchInput = doc.getElementById('js-search-input'),
        oTabList = doc.getElementsByClassName('js-course-tab-list')[0];
    var init = function(){
        initCourseTab.initCourseList();
        bindEVent();
    }
    function bindEVent(){
        oSearchInput.addEventListener('input',initCourseTab.searchCourse.bind(initCourseTab),false);
        oTabList.addEventListener('click',initCourseTab.tabClick.bind(initCourseTab),false);
    }
    init();
})(document);