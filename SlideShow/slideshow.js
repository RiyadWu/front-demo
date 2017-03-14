var e = function(selector){
    return document.querySelector(selector)
}

var es = function(selector){
    return document.querySelectorAll(selector)
}

var bindAll = function(className, actionName, callback){
    var s = '.' + className
    var elements = es(s)
    for (var i = 0; i < elements.length; i++) {
        elements[i].addEventListener(actionName, callback)
    }
}
var clearClassAll = function(className){
    var s = '.' + className
    var elements = es(s)
    for (var i = 0; i < elements.length; i++) {
        elements[i].classList.remove(className)
    }
}

var nextIndex = function(button){
    // 1.获取总图片数
    var slide = button.parentElement
    var numberOfImgs = parseInt(slide.dataset.images)
    // 2.获取当前显示index
    var activeIndex = parseInt(slide.dataset.active)
    // 3.计算下一张要显示的图片index
    var offset = parseInt(button.dataset.next)
    var nextIndex = (numberOfImgs + activeIndex + offset) % numberOfImgs
    return nextIndex
}

var showImage = function(index){
    var activeClass = 'wu-slide-img-active'
    // 1.清除当前展示图片
    clearClassAll(activeClass)
    // 2.展示下一张图片
    var s = '#wu-slide-img-' + index
    var img = e(s)
    img.classList.add(activeClass)
}

var showIndicator = function(index){
    var activeClass = 'wu-slide-indi-active'
    clearClassAll(activeClass)
    var s = '#wu-slide-indi-' + index
    var indi = e(s)
    indi.classList.add(activeClass)
}

var updateSlideActive = function(index){
    var s = '.slide'
    var slide = e(s)
    slide.dataset.active = index
}

var bindEventSlide = function(){
    bindAll('wu-slide-button', 'click', function(event){
        var btn = event.target
        // 2.计算出下一张要展示的图片
        var index = nextIndex(btn)
        // 3.展示图片
        showImage(index)
        // 4.切换indicatiors
        showIndicator(index)
        // 5.更新slide的active
        updateSlideActive(index)
    })
}

var bindEventIndi = function()
{
    bindAll('wu-slide-indi', 'mouseenter', function(event){
        var indi = event.target
        // 1.找到要显示的index
        var index = indi.dataset.index
        // 2.显示指定index的图片
        showImage(index)
        // 3.切换indicatiors
        showIndicator(index)
        // 4.更新slide的active
        updateSlideActive(index)
    })
}

var intervalShow = function(){
    var btn = e('.wu-slide-button.wu-right')
    setInterval(function(){
        btn.click()
    },3000)
}

bindEventSlide()
bindEventIndi()
//自动轮播
intervalShow()
