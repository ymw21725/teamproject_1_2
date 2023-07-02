jQuery(document).ready(function($){
    var slider_col;
    var userControl = false;

    var windowWidth = $(window).width();
    var windowHeight = $(window).height();
    var $homeCollectionWrapperMobile = $('.home-collections-wrapper.mobile');
    
    function resize_collection(){

        windowWidth = $(window).width();
        windowHeight = $(window).height();
        h = windowHeight;
        if(windowWidth > windowHeight){
            h = windowWidth;
        }
        $homeCollectionWrapperMobile.width(windowWidth);
        $homeCollectionWrapperMobile.height(h);
        $homeCollectionWrapperMobile.find('li').css({
            'width':windowWidth*1.02+'px',
            'height':h+'px'
        });
        $homeCollectionWrapperMobile.find('.bx-viewport').css({
            'width':windowWidth*1.02+'px',
            'height':h+'px'
        });
    }
    
    //prevent browser url mobile bug
    var parser = new UAParser();
    var result = parser.getResult();
    var tempWidth = $(window).width();
    var resize = false;
    
    $(window).resize(function(){
        if(result.device.type == 'mobile'){
            if(tempWidth != $(window).width()){
                resize = true; 
                tempWidth = $(window).width();
            }else{
                resize = false;
            }
        }else{
            resize = true;
        }
        
        if(resize){
            resize_collection();
        }
    });
    
    slider_col = $('.list-collections-mobile').bxSlider({
            pagerCustom: ".hc-slider",
            auto: false,
            mode: 'fade',
            easing: 'swing',
            preloadImages : 'all',
            pause: timer_collections*1000,
            touchEnabled: true,
            onSliderLoad: function(cIndex){
                
                timer = timer_collections*1000;
                setTime = setTimeout(function() {
                    sc_goToNextSlide();
                }, timer);
                startProgressbar_col();
            },
            onSlideBefore : function($slideElement, oldIndex, newIndex){
                $('.home-collection-wrapper.mobile .list-collections-mobile li').removeClass('active');
                $slideElement.addClass('active');

                clearTimeout(setTime);
                timer = timer_collections*1000;
                
                //set actualite view background base on active actualite slide
                
                windowWidth = $(window).width();
                windowHeight = $(window).height();
                h = windowHeight;
                if(windowWidth > windowHeight){
                    h = windowWidth;
                }
                $homeCollectionWrapperMobile.width($(window).width());
                $homeCollectionWrapperMobile.height(h);

                setTime = setTimeout(function() {
                    sc_goToNextSlide();
                }, timer);
                
                startProgressbar_col();
              }
            });
    
    var isPause_col, tick_col, percentTime_col;
        
    function startProgressbar_col(){
        resetProgressbar_col()
        percentTime_col = 156
        isPause_col = false
        tick_col = setInterval(interval_col, timer_collections);
    }

    function interval_col(){
        if(isPause_col === false) {
            percentTime_col -= 1 / (6+0.1);
            $('.hc-slider li a.active circle.progress').css({
               'stroke-dashoffset': percentTime_col
            });
            if(percentTime_col <= 0){
                slider_col.goToNextSlide();
                startProgressbar_col();
            }
        }
    }
    function resetProgressbar_col(){
        $('.hc-slider circle.progress').css({
          'stroke-dashoffset': '156px' 
        });
        clearTimeout(tick_col);
    }
    function sc_goToNextSlide(){
        slider_col.goToNextSlide();
    }
    
    resize_collection();
});
