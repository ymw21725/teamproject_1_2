jQuery(document).ready(function($){
    var slider_home;
    var userControl = false;
    var scrollpane = '';
    var desktop = true;
    var hMod =  1.1; //height for all section
    var sMod =  0.88; //height for first carousel


    $('.container-slider .slider-home li .video_controls .btn-mute').on('click',function(){
        if(!$(this).hasClass('muted')){
            $(this).addClass('muted');
            $(this).parent().parent().find('video').get(0).volume = 0;
        } else {
            $(this).removeClass('muted');
            $(this).parent().parent().find('video').get(0).volume = 1;
        }

        return false;
    });

    $('.container-slider .slider-home li .video_controls .btn-play').on('click',function(){
        try {
            video = $(this).closest('li.active').find('video')[0];
            if (video.webkitSupportsFullscreen){
                video.webkitEnterFullscreen();
            }
        }
        catch(e) {}
        userControl = true;
        $(this).parent().parent().find('video').get(0).play();

        return false;
    });


    var $image = false;
    // On vérifie s'il y a au moins une image
    $('.container-news .views-row').find('img').each(function(){
        $image = $(this);
    });
    
    $(window).load(function(){
      // Si on a au moins une image
      if ($image){
        // Lorsque l'image est chargée
        if( $image[0].complete) {
            load_slider(timer_collections);
        } else {
            $image.load(function() {
                load_slider(timer_collections);
            });
        }
      } else {
        load_slider(timer_collections);
      }
      $('.nav-scroll').addClass('bounce');
    });

    // Fonction height slider home
    function f_height_slider_home(){

      var $sliderHome = $('.slider-home');
      $sliderHome.find('li .text').css('line-height','');

      //height_content2 = $(window).height() - ($('.header-site').outerHeight() +  $('#footer').outerHeight());

      height_content2 = $(window).height();
      height_content = $(window).width()/16*9;

      if(height_content2<height_content){
        height_content = height_content2;
      }

      /* slider home */
      if($(window).width() < width_tablet_portrait){
          height_slider = 'auto';
          height_slider = height_content2;
          $('.slider-home').find('li .text').css('line-height', height_slider+'px');
      }else{
          height_slider = height_content;
          $('.slider-home').find('li .text').css('line-height', height_slider+'px');

          // Gestion centrage push actu home
          hPush = height_content2-height_slider;
      }
      //$sliderHome.find('li').height(height_slider);

      $('.slider-home li').each(function(){
        if($(this).find('video').size()>0){
            marginV = $(this).find('video').height()*-0.5;
            $(this).find('video').css('margin-top',marginV);
        }
      });
    }
    var swipeSlider = false;
    if($(window).width() < 1200){
        swipeSlider = true;
    }

    function load_slider(timer_collections){
        f_height_slider_home();
        var setTime ;

        slider_home = $('.slider-home').bxSlider({
            pagerCustom: ".bullet-slider",
            auto: false,
            preloadImages : 'all',
            pause: timer_collections*1000,
            touchEnabled: swipeSlider,
            onSliderLoad: function(cIndex){
            // Check is video
                isVideo = false;
                var $sliderHomeActiveLi = $('.slider-home li.active');
                if($sliderHomeActiveLi.hasClass('video'))
                    isVideo = true;

                isMobile = false;
                var windowWidth = $(window).width();
                var windowHeight = $(window).height();
                //if($('body').hasClass('mobile') || $('body').hasClass('tablet'))
                if($('html').hasClass('touch') && $('body').width()<=1024)
                    isMobile = true;

                 // is video
                if(isVideo && !isMobile) {
                    timer = $sliderHomeActiveLi.find('video').get(0).duration*1000;
                    $sliderHomeActiveLi.find('video').get(0).volume = 0;
                    $sliderHomeActiveLi.find('video').get(0).play();
                    $('.container-slider').addClass('slider-loaded');
                    $('.slider-home li.active video').on('ended',function(){
                          aw_goToNextSlide();
                    });
                    $('.slider-home li').css({
                      width: windowWidth+'px',
                      height: windowHeight*sMod+'px'
                    });
                    $('.slider-home li .background .desktop img').css({
                      width: windowWidth+'px',
                      height: windowHeight*sMod+'px'
                    });
                } else {
                    timer = timer_collections*1000;
                    $('.slider-home li img').load(function(){
                          $('.container-slider').addClass('slider-loaded');
                    });
                    setTime = setTimeout(function() {
                        aw_goToNextSlide();
                    }, timer);
                }
                //heightSlider();
                startProgressbar();
                
            },
            onSlideBefore : function($slideElement, oldIndex, newIndex){
                userControl = false;
                $('.slider-home li').removeClass('active');
                $slideElement.addClass('active');
                if($('.slider-home li video').size()>0){
                    $('.slider-home li video').get(0).pause();
                }

                isVideo = false;
                if($slideElement.hasClass('video'))
                    isVideo = true;

                isMobile = false;
                //if($('body').hasClass('mobile') || $('body').hasClass('tablet'))
                if($('html').hasClass('touch') && $('body').width()<=1024)
                    isMobile = true;

                clearTimeout(setTime);

                // is video
                if(isVideo && !isMobile){
                    timer = $slideElement.find('video').get(0).duration*1000;
                    $slideElement.find('.btn-mute').addClass('muted');
                    $slideElement.find('video').get(0).volume = 0;
                    if($slideElement.find('video').get(0).readyState==4)
                      $slideElement.find('video').get(0).currentTime = 0;

                    $slideElement.find('video').get(0).play();
                    $('.container-slider').addClass('slider-loaded');
                    $slideElement.find('video').on('ended',function(){
                          aw_goToNextSlide();
                    });
                } else {
                    timer = timer_collections*1000;
                    $('.slider-home li img').load(function(){
                          $('.container-slider').addClass('slider-loaded');
                    });
                    setTime = setTimeout(function() {
                        aw_goToNextSlide();
                    }, timer);
                }
                //heightSlider();
                startProgressbar();
              }
          });
    }

    var time = timer_collections;
    var $circle,
        $sliderRow,
        $actionContent,
        $actionImages,
        $pausePlay,
        $dots,
        isPause,
        tick,
        percentTime;

    function startProgressbar(){
        resetProgressbar()
        percentTime = 156
        isPause = false
        tick = setInterval(interval, timer_collections);
    }

    function interval(){
        if(isPause === false) {
            percentTime -= 1 / (time+0.1);
            $('.bullet-slider li a.active circle.progress').css({
                'stroke-dashoffset': percentTime
            });
            if(percentTime <= 0){
                slider_home.goToNextSlide();
                startProgressbar();
            }
        }
    }
    function resetProgressbar(){
        $('.bullet-slider circle.progress').css({
          'stroke-dashoffset': '156px'
        });
        clearTimeout(tick);
    }
    function aw_goToNextSlide(){
        if(!userControl){
            slider_home.goToNextSlide();
        }
    }

    function heightSlider(){
        var maxHeight= 0;
        var maxHeightTxt= 0;
        $('.slider-home li').each(function(){
            if($(this).height()>maxHeight){
                maxHeight = $(this).height();
            }
            if($(this).find('.text').height()>maxHeightTxt){
                maxHeightTxt = $(this).find('.text').outerHeight();
            }
            $('.container-slider .bx-wrapper .bx-controls-direction a').css('bottom',(maxHeightTxt-(40-maxHeightTxt*0.3))/2)
        }).height(maxHeight).find('.text').height(maxHeightTxt);
    }

    $('.view-home .background .desktop').each(function(){
        $(this).css('background','url("'+$(this).attr('bg')+'")');
    });

    var windowWidth = $(window).width();
    var windowHeight = $(window).height();
    var modHeight = windowHeight*hMod;
    
    function initialize_web(){
        windowWidth = $(window).width();
        windowHeight = $(window).height();
        modHeight = windowHeight*hMod;
        
        $('body').css({
            'width':windowWidth + 'px',
            'height': windowHeight + 'px'
        });
        $('header').css({
            'height':windowWidth*0.062 + 'px',
            'min-height':windowWidth*0.062 + 'px'
        });
        $('.header-site .logo').css('height',windowWidth*0.062 + 'px');
        $('.desktop-slider li').css('width',Math.ceil(windowWidth*0.025)+'px');
        
        if($(window).width() > 800){
            //Home and Actu slider
            var firstSlideHeight = (windowHeight*sMod) - 44;
            $('.view-home').css('height', windowHeight*sMod + 'px');
            $('.view-display-id-block_slider_home').css('height', firstSlideHeight + 'px');
            $('.slider-home li.views-row').css({
                'width':$(window).width() + 'px',
                'height': firstSlideHeight + 'px'});
            $('.slider-home li .background .desktop').css({
                'height': firstSlideHeight + 'px'});
            $('.view-display-id-block_slider_home .bx-viewport').css('height', firstSlideHeight + 'px');
            $('.view-display-id-block_news').css('height', modHeight+'px');
            $('.view-display-id-block_news .actu-mobile-wrapper').css('height', modHeight+'px');
            $('.pane-views-home-block-news').css('height', modHeight+'px');
            //Akamai
            $('.akamai-menu-wrapper').css('height',modHeight + 'px');

            //Timepieces
            var tdOpenH = windowWidth * 0.4;
            if($(window).width() < 1023){
                tdOpenH = windowWidth * 0.48;
            }else if($(window).width() < 1360){
                tdOpenH = windowWidth * 0.42;
            }else{
                tdOpenH = windowWidth * 0.4;
            }
            $('.td-open-text').css('height','initial');
            $('.timepieces-details-wrapper').css('height',windowWidth*0.06+'px');
            $('.timepieces-details-wrapper.td-open').css('height',tdOpenH+'px');
            
            tdHW = Math.ceil(windowWidth*0.016);
            $('.timepieces-circles .td').css({
                'width':tdHW+'px',
                'height':tdHW+'px',
                'line-height':tdHW+'px'});
            $('.homepage-section-footer').css('height',windowWidth*0.27 + 'px');
            
            if($(window).width() < 1300){    
                var rMod = 0.85; // responsive height
                if(windowHeight < 680){
                    rMod = 1; // responsive height
                }
                var rHeight = windowHeight * rMod;
                $('.homepage-section').css({
                    'height':'initial',
                    'min-height': rHeight + 'px'
                });
                $('.hs-menu-wrapper').css({
                    'height':'initial',
                    'min-height': rHeight + 'px'
                });
                $('.home-collections-wrapper.desktop').css('height', windowWidth * 0.535 + 'px');
                $('.view-display-id-home_collections_desktop').css('height', windowWidth * 0.535 + 'px');
            }else{
                $('.view-home-collections').css('height', modHeight + 'px');
                $('.home-collections-wrapper.desktop').css('height', modHeight + 'px');
                $('.homepage-section').css({
                    'height':'initial',
                    'min-height':modHeight + 'px'
                });
                $('.hs-menu-wrapper').css({
                    'height':'initial',
                    'min-height': modHeight + 'px'
                });
            }
        }else{
            $('.hs-menu-wrapper').css('height','initial');
            $('.homepage-section-footer').css('height','290px');
            
            var windowHeight = window.screen.height;
            var headerHeight = $('.header-site').height();
            var h = 0;
            if(windowWidth > windowHeight){
                h = windowWidth;
            }else{
                h = windowHeight;
            }
            $('.view-home').css('height',h + 'px');
            $('.view-display-id-block_slider_home').css('height',(h - headerHeight*1.5) + 'px');
            $('.container-slider .slider-home li .background .mobile').css('min-height',(h - headerHeight*1.5) + 'px');
            $('.container-slider .bx-wrapper .bx-viewport').css('height',(h - headerHeight*1.5) + 'px');
            $('.slidehome-text-wrapper').css('height', h*0.45 +'px');
            $('.homepage-section').css({
                'height':'initial',
                'min-height':h + 'px'
            });
            if(windowHeight*0.45 > 300){
                $('.bullet-slider').css({'bottom':'7%'});
                $('.actu-slider-mobile').css({'bottom':'7%'});
            }else{
                $('.bullet-slider').css({'bottom':'3%'});
                $('.actu-slider-mobile').css({'bottom':'3%'});
            }
            
            //Akamai
            $('.akamai-menu-wrapper').css('height',h + 'px');
            
            //Timepieces
            $('.td-open-text').css('height',h + 'px');
            tdHW = Math.ceil(windowWidth*0.045);
            $('.timepieces-circles .td').css({
                'width':tdHW+'px',
                'height':tdHW+'px',
                'line-height':tdHW+'px'});
            if($('.timepieces-details-wrapper').hasClass('td-open')){
                $('.timepieces-details-wrapper').removeClass('td-open');
                $('.timepieces-details-wrapper').css('height','70px');
                $('.td-close-text').removeClass('hide');
                $('.td-open-text').removeClass('show');
                $('.td-open-text .content').removeClass('show');
            }
            $('.cm-overlay').removeClass('open');
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
            if(slider_home){
                f_height_slider_home();
            }
            initialize_web();
        }
    });

    initialize_web();
    
    $('.container-slider .slider-home li').each(function(index){
        var idx = index + 1;
        var title = $(this).find('.links-slide a').text();
        
        $(this).find('.links-slide a').attr('title',title);
    });
    
    $('.view-home .background .mobile').each(function(){
        $(this).css('background','url("'+$(this).attr('bg')+'")');
    });
    $('.desktop-slider li').mouseover(function() {
        $(this).find('.dot').attr('r','3');
      })
      .mouseout(function() {
        $(this).find('.dot').attr('r','2');
      });
    
    //Home Collections
    $('.panel-hc-mobile .view-home-collections .collection-mobile-bg').each(function(){
        $(this).parent().parent().css('background','url("'+$(this).attr('bg')+'")');
    });
   
    var $homeCollectionsBgDesktop = $('.panel-hc-desktop .view-home-collections .home-collections-bg.desktop');
    $homeCollectionsBgDesktop.find('.views-row-1 img').addClass('active');
    $('.panel-hc-desktop .view-home-collections .list-collections li').hover(function(e) {
        var i = parseInt($(this).attr('class').replace(/[^0-9.]/g, ""));
        $('.panel-hc-desktop .view-home-collections .desktop .home-collections-button a').attr('href',$(this).attr('href'));
        $('.list-collections li').removeClass('hover');
        $(this).addClass('hover');
        
        if(!$homeCollectionsBgDesktop.find('.views-row-'+i+' img').hasClass('active')){
            e.preventDefault();
            e.stopImmediatePropagation();
            $homeCollectionsBgDesktop.find('img.active').removeClass('active');
            $homeCollectionsBgDesktop.find('.views-row-'+i+' img').addClass('active');
         
            if($homeCollectionsBgDesktop.find('.views-row-'+i+' img').attr('loaded') == 0){
                $homeCollectionsBgDesktop.find('.views-row-'+i+' img').css('background','url('+$homeCollectionsBgDesktop.find('.views-row-'+i+' img').attr('data-src')+')');
            }
        }
    });

    //Timepieces
    $('.timepieces-circles .td').click(function(){
        var id = $(this).attr('id');
        if(!$('.td-close-text').hasClass('hide')){
            $('.td-close-text').addClass('hide');
        }
        $('.timepieces-circles .td').removeClass('active');
        $('.td-open-text .content').removeClass('show');
        $('.td-open-text').addClass('show');
        $(this).addClass('active');
        $('.'+id+'.content').addClass('show');
        
        var tdOpenH = windowWidth * 0.4;
        if($(window).width() < 1023){
            tdOpenH = windowWidth * 0.48;
        }else if($(window).width() < 1360){
            tdOpenH = windowWidth * 0.42;
        }else{
            tdOpenH = windowWidth * 0.4;
        }
        if(!$('.td-close-text').hasClass('td-open')){
            $('.timepieces-details-wrapper').addClass('td-open');
            $('.timepieces-details-wrapper').css('height',tdOpenH + 'px');
        }
    });
    $('.td-close').click(function(){
        $('.timepieces-circles .td').removeClass('active');
        if($('.timepieces-details-wrapper').hasClass('td-open')){
            $('.timepieces-details-wrapper').removeClass('td-open');
            if($(window).width() > 800){
                $('.timepieces-details-wrapper').css('height',windowWidth*0.06 + 'px');
            }else{
                $('.timepieces-details-wrapper').css('height','70px');
            }
        }
        if($('.td-close-text').hasClass('hide')){
            $('.td-close-text').removeClass('hide');
            $('.td-open-text').removeClass('show');
            $('.td-open-text .content').removeClass('show');
        }
    });
    
    //Store locator
    var totalBgDesktop = $('.store-locator-bg.desktop img').length;
    var totalBgMobile = $('.store-locator-bg.mobile img').length;
    var bgIdxDesktop = 1;
    var bgIdxMobile = 1;
    storeBg();
    
    function storeBg(){
        $('.store-locator-bg.desktop img').css('opacity',0);
        $('.store-locator-bg.desktop .store-locator-bg-item:nth-child('+bgIdxDesktop+') img').css('opacity',1);
        $('.store-locator-bg.mobile img').css('opacity',0);
        $('.store-locator-bg.mobile .store-locator-bg-item:nth-child('+bgIdxMobile+') img').css('opacity',1);
        if(bgIdxDesktop < totalBgDesktop){
            bgIdxDesktop = bgIdxDesktop + 1;
        }else{
            bgIdxDesktop = 1;
        }
        if(bgIdxMobile < totalBgMobile){
            bgIdxMobile = bgIdxMobile + 1;
        }else{
            bgIdxMobile = 1;
        }
        setTimeout(storeBg, timer_collections*1000);
    }
    
    //Section Menu
    $('.hob-menu li a').hover(function() {
        $('.hob-title').text($(this).attr('name'));
        $('.hob-description').text($(this).attr('title'));
    });
    $('.services-menu li a').hover(function() {
        $('.services-title').text($(this).attr('name'));
        $('.services-description').text($(this).attr('title'));
    });
    $('.hs-menu-wrapper li').hover(function() {
        $('.timepieces-menu li').removeClass('hover');
        $('.hob-menu li').removeClass('hover');
        $('.house-menu li').removeClass('hover');
        $('.services-menu li').removeClass('hover');
        $(this).addClass('hover');
    });
    
    //popup language
    var $menu = $('.site-cm-box');
    $('.block-languages .block-button').on("click", function (e) {
        e.cancelBubble = true;
        e.preventDefault();
        if($(window).width() > 1023){
            $menu.show();
            $('.cm-overlay').addClass('open');
        }else{
            $menu.css('display','block');
            setTimeout(function() {
                $menu.addClass('popup-open');
            }, 500);
        }
    });
    $(".close-mbox").on("click", function () {
        if($(window).width() > 1023){
            $menu.hide(); 
            $('.cm-overlay').removeClass('open');
         }else{
            $menu.css('display','block');
            $menu.removeClass('popup-open');
            setTimeout(function() {
                $menu.hide(); 
            }, 1000);
        }
    });
    $('.cm-overlay').on("click", function () {
        if($(window).width() > 1023){
            $menu.hide(); 
            $('.cm-overlay').removeClass('open');
         }
    });
    $(".mobile-menu a").on("click", function () {
        $headerSiteSectionHeader = $(".front .header-site .section-inside.section-header");
        if(!$headerSiteSectionHeader.hasClass('open')){
            $('body').css('transition','all .5s');
            $headerSiteSectionHeader.addClass('open');
        }else{
            $headerSiteSectionHeader.removeClass('open');    
            $('body').css('transition','initial');
        }
    });
    
    /* remove custom scrollbar
    if(result.device.type != 'tablet' && result.device.type != 'mobile'){
        if($(window).width() > 1024){
            scrollpane = $("body").jScrollPane({
                verticalGutter: 250,
                animateDuration: 450,
                animateScroll: true,
                animateEase:'easeInQuad'
            });
            $('.nav-scroll').bind(
                'click',
                function()
                {
                    scrollpane.data('jsp').scrollTo(parseInt(0), parseInt($('.container-news').offset().top));
                    return false;
                }
            );
            var win = $(window);
            // Full body scroll
            var isResizing = false;
            win.bind(
                'resize',
                function()
                {
                    if (!isResizing) {
                        isResizing = true;
                        var container = $('body');
                        var rMod = 0.85, rHeight = windowHeight*rMod;
                        if(windowWidth < 950){
                            $('.pane-views-home-block-news').css({
                                'height': rHeight + 'px'
                            });
                            $('.view-display-id-block_news').css({
                                'height': rHeight + 'px'
                            });
                        }else if(windowWidth < 1150){
                            if(windowHeight < 680){ 
                                rMod = 1; 
                            }
                            rHeight = windowHeight * rMod;
                            $('.pane-views-home-block-news').css({
                                'height': rHeight + 'px'
                            });
                            $('.view-display-id-block_news').css({
                                'height': rHeight + 'px'
                            });
                        } 

                        container.css(
                            {
                                'width': 1,
                                'height': 1
                            }
                        );
                        // Now make it the size of the window...
                        container.css(
                            {
                                'width': win.width(),
                                'height': win.height()
                            }
                        );
                        isResizing = false;
                        container.jScrollPane(
                            {
                                verticalGutter: 250,
                                animateScroll: true,
                                animateDuration: 450,
                                animateEase:'easeInQuad'
                            }
                        );
                    }
                }
            ).trigger('resize');

            if ($('body').width() != win.width()) {
                win.trigger('resize');
            }
            // Internal scrollpanes
            $('.scroll-pane').jScrollPane({showArrows: true,animateScroll: true});
        }
    }
    */
});
