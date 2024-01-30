$("#swiper").sliderImg({
    image: ['./assets/1.jpg','./assets/2.jpg'],
    interval: 2000
})

// 展示与隐藏
$(".cate_menu_item").hover(function(){
    $('.JS_popCtn').css('display','block')

    index = $(this).attr("data-index")
    $('#cate_item'+index).css('display','block')
},function(){
    $('.JS_popCtn').css('display','none')
    $('#cate_item'+index).css('display','none')
})

$('.services-entry .row-first').hover(function(){
    $('.services-entry').slideUp();
    $('.services-content').slideDown();
    var id = $(this).attr('id');
    $('.'+id+'-tab').addClass('tab-active');
    $('.'+id+'-content').show()
})

$('.services-content .header span').hover(function(){
    
})

