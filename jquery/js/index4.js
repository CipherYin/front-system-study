$('.item').offset({'top':100,'left':100})
console.log($(".item").offset()); // 相对于整个文档的距离
console.log($('.item').position())//  相当于父级元素

console.log($(window).scrollTop())// 滚动条滚动距离 
console.log($(window).scrollLeft())

console.log($(".container").width()) // width
console.log($('.container').innerWidth())//padding; width+左右的padding
console.log($(".container").outerWidth(true))// 边框；150+20+20+20=210；outerWidth(); outerWidth(true):310 210+100=310 加上外边距离； border

//each() 遍历




