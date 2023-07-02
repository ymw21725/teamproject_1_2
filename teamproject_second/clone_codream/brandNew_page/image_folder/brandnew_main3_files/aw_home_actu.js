jQuery(document).ready(function($){
    var slider_col,actu_mobile_visuel;
    var loaded = false;

    var windowWidth = $(window).width();
    var windowHeight = $(window).height();
    
    $('.container-news .list-news li').each(function(index){
        var idx = index + 1;
        var title = $(this).find('h3').text();
        
        $('.container-news .actu-visuel .views-row-'+idx+' img').attr('alt',title);
    });
        
    function resize_actu_bg(){

        windowWidth = $(window).width();
        windowHeight = $(window).height();
        h = windowHeight;
        if(windowWidth > windowHeight){
            h = windowWidth;
        }
        $('.container-news .actu-visuel img').css({
            'max-height':h*0.7+'px',
        });
        
        if(windowWidth < 800){
            windowHeight = $(window).outerHeight();
            h = windowHeight;
            if(windowWidth > windowHeight){
                h = windowWidth;
            }
            $('.view-display-id-block_news').css({
                'height':'initial!important',
                'min-height':'initial!important'
            });
            $('.pane-views-home-block-news').css({
                'height':'initial!important',
                'min-height':'initial!important'
            });
            $('.view-display-id-block_news .actu-bg').css({
                'width':windowWidth+'px',
                'height':h*1.4+'px'
            });
            $('.view-display-id-block_news .actu-bg div').css({
                'width':windowWidth+'px',
                'height':h*1.4+'px'
            });
            var $actumobilevisuelH =  $('.actu-mobile-visuel').height() + 50;
            $('.actu-mobile-wrapper .bx-viewport').css({
                'width':windowWidth+'px',
                'height':$actumobilevisuelH+'px'
            });
            var posLeft = '';
            setTimeout(function() {
                if(loaded){
                    $('.actu-mobile-visuel li').css({
                         'width':windowWidth*0.85 + 'px',
                    });
                    posLeft = -($('.actu-mobile-visuel li.active').position().left) + 'px';
                    $('.actu-mobile-visuel').css({
                        'transform': "translate3d("+posLeft+", 0px, 0px)",
                    });
                }
            }, 5);
        }else{
            $('.view-display-id-block_news .actu-bg').css({
                'width':windowWidth+'px',
                'height':h+'px',
                'min-height':'568px'
            });
            $('.view-display-id-block_news .actu-bg div').css({
                'width':windowWidth+'px',
                'height':h+'px',
                'min-height':'568px'
            });
        }
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
            resize_actu_bg();
        }
    });

    actu_visuel = $('.actu-visuel').bxSlider({
            pagerCustom: ".actu-slider",
            auto: false,
            mode: 'fade',
            easing: 'swing',
            preloadImages : 'all',
            pause: timer_news*1000,
            swipeThreshold: 150,
            touchEnabled:false,
            preventDefaultSwipeX:false,
            onSliderLoad: function(cIndex){
                imageUrl = $('.actu-visuel div.active img').attr('src');
                $('.view-display-id-block_news .actu-bg-1').css({'opacity':'1','display':'block'});
                $('ul.list-news li').removeClass('active');
                $('ul.list-news li.views-row-1').addClass('active');
                $('.container-news .actu-visuel img').css({
                    'max-height':windowHeight*0.7+'px',
                });
                timer = timer_news*1000;
                setTime = setTimeout(function() {
                    ac_goToNextSlide();
                }, timer);
                startProgressbar_actu();
            },
            onSlideBefore : function($slideElement, oldIndex, newIndex){
                $('.actu-visuel div').removeClass('active');
                $slideElement.addClass('active');

                windowWidth = $(window).width();
                windowHeight = $(window).height();
                clearTimeout(setTime);
                timer = timer_news*1000;
                
                idx = newIndex + 1;
                //set actualite view background base on active actualite slide
                if($(window).width() > 800){
                    $('.actu-bg div').css({'opacity':'0','display':'none'});
                    $('.actu-bg-'+idx).css('display','block');
                    $('.actu-bg-'+idx).animate({opacity: 0.6}, 500, function() {
                        $(this).animate({opacity: 1});
                    });
                }
                
                //add index to actualite list
                $('ul.list-news li').removeClass('active');
                $('ul.list-news li.views-row-'+idx).addClass('active');
                
                setTime = setTimeout(function() {
                    ac_goToNextSlide();
                }, timer);
                
                startProgressbar_actu();
              }
            });
    
    var isPause_actu,
        tick_actu,
        percentTime_actu,
        resize_trigger = 0;
        
    function startProgressbar_actu(){
        resetProgressbar_actu()
        percentTime_actu = 156
        isPause_actu = false
        tick_actu = setInterval(interval_actu, timer_news);
    }

    function interval_actu(){
        if(isPause_actu === false) {
            percentTime_actu -= 1 / (timer_news+0.1);
            $('.actu-slider li a.active circle.progress').css({
                'stroke-dashoffset': percentTime_actu
            });
            if(percentTime_actu <= 0){
                actu_visuel.goToNextSlide();
                startProgressbar_actu();
            }
        }
    }
    function resetProgressbar_actu(){
        $('.actu-slider circle.progress').css({
          'stroke-dashoffset': '156px' 
        });
        clearTimeout(tick_actu);
    }
    function ac_goToNextSlide(){
        actu_visuel.goToNextSlide();
    }
    
    $(window).load(function(){
        actu_mobile_visuel = $('.actu-mobile-visuel').bxSlider({
                pagerCustom: ".actu-slider-mobile",
                auto: false,    
                preloadImages : 'all',
                pause: timer_news*1000,
                swipeThreshold: 150,
                touchEnabled:true,
                speed: 1000,
                easing: 'swing',
                onSliderLoad: function(cIndex){
                    var windowHeight = window.screen.height;
                    startProgressbar_actu_mobile();
                    var $actumobilevisuelH =  $('.actu-mobile-visuel').height() + 50;
                    $('.actu-mobile-wrapper .bx-viewport').css({
                        'width':windowWidth+'px',
                        'height':$actumobilevisuelH+'px'
                    });
                    $('.actu-mobile-visuel li').css({
                        'width':windowWidth*0.85 + 'px',
                    });
                    $('.actu-mobile-visuel li.views-row-1').addClass('active');
                },
                onSlideBefore : function($slideElement, oldIndex, newIndex){
                    loaded = true;
                    $('.actu-mobile-visuel li').removeClass('active');
                    $slideElement.addClass('active');
                    var windowHeight = window.screen.height;
                    
                    clearTimeout(setTime);
                    timer = timer_news*1000;
                    
                    idx = newIndex + 1;
                    if($(window).width() < 800){
                        $('.actu-bg div').css({'opacity':'0','display':'none'});
                        $('.actu-bg-'+idx).css('display','block');
                        $('.actu-bg-'+idx).animate({opacity: 0.6}, 500, function() {
                            $(this).animate({opacity: 1});
                        });
                        
                       if(resize_trigger < 3){
                           $(window).trigger('resize');
                            resize_trigger += 1;
                        }
                    }
                    var $actumobilevisuelH =  $('.actu-mobile-visuel').height() + 50;
                    $('.actu-mobile-wrapper .bx-viewport').css({
                        'width':windowWidth+'px',
                        'height':$actumobilevisuelH+'px'
                    });
                    $('.actu-mobile-visuel li').css({
                        'width':windowWidth*0.85 + 'px',
                    });
                    $('.actu-mobile-visuel').css({
                        'margin-left':'4%',
                    });
                    setTime = setTimeout(function() {
                        ac_mobile_goToNextSlide();
                    }, timer);
                    
                    startProgressbar_actu_mobile();
                  }
                });
        
        var isPause_actu_mobile,
            tick_actu_mobile,
            percentTime_actu_mobile;
            
        function startProgressbar_actu_mobile(){
            resetProgressbar_actu_mobile();
            percentTime_actu_mobile = 156;
            isPause_actu_mobile = false;
            tick_actu_mobile = setInterval(interval_actu_mobile, timer_news);
        }

        function interval_actu_mobile(){
            if(isPause_actu_mobile === false) {
                percentTime_actu_mobile -= 1 / (timer_news+0.1);
                $('.actu-slider-mobile li a.active circle.progress').css({
                    'stroke-dashoffset': percentTime_actu_mobile
                });
                if(percentTime_actu_mobile <= 0){
                    actu_mobile_visuel.goToNextSlide();
                    startProgressbar_actu_mobile();
                }
            }
        }
        function resetProgressbar_actu_mobile(){
            $('.actu-slider-mobile circle.progress').css({
              'stroke-dashoffset': '156px' 
            });
            clearTimeout(tick_actu_mobile);
        }
        function ac_mobile_goToNextSlide(){
            actu_mobile_visuel.goToNextSlide();
        }
        resize_actu_bg();
    });
    resize_actu_bg();
});