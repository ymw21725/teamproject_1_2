jQuery(document).ready(function($){
  $(window).scroll(function(){
    if($('body').hasClass('left-fixed-on-scroll'))    {
      if($(this).scrollTop() >= 0){
        $('.img-left').css({
          position: 'fixed',
          top: $('header').height()+$('.header-content').outerHeight(),
          width: $('.col-left .panels-flexible-region-section-inside-left').width()

        });
      }
      else {
        $('.img-left').css({
          position: '',
          top: '',
          width: ''
        });
      }
    }
  });
  $('.img-left').css({width :$('.col-left .panels-flexible-region-section-inside-left').width()});

  $(window).resize(function(){
    if($('body').hasClass('left-fixed-on-scroll'))    {
        $('.img-left').css({width :$('.col-left .panels-flexible-region-section-inside-left').width()});
    }
  });

  /**** Page emplois ***/
  if($('body').hasClass('page-jobs')){

    var settings_accordion_spec = {
      heightStyle: "content",
      active: false,
      collapsible: true,
      event: 'click',
      activate: function(event, ui){
        if( window.innerWidth < width_tablet_portrait ){
          if($(ui.newHeader).offset()) $('html, body').animate({scrollTop: $(ui.newHeader).offset().top - $('.header-site').height()}, 0);
        }
      }
    };

    if($(window).width() < width_tablet ) settings_accordion_spec.active = false;
    if($('.jobs-list').hasClass('no-callpsible'))settings_accordion_spec.collapsible = false;
    $( ".jobs-list" ).accordion(settings_accordion_spec);

    // Append all http strings with <a>
    var url1 = /(^|&lt;|\s)(www\..+?\..+?)(\s|&gt;|$)/g,
      url2 = /(^|&lt;|\s)(((https?|ftp):\/\/|mailto:).+?)(\s|&gt;|$)/g,

      linkifyThis = function () {
        var childNodes = this.childNodes,
          i = childNodes.length;
        while(i--)
        {
          var n = childNodes[i];
          if (n.nodeType == 3) {
            var html = $.trim(n.nodeValue);
            if (html)
            {
              html = html.replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(url1, '$1<a target="_blank" href="http://$2">$2</a>$3')
                .replace(url2, '$1<a target="_blank" href="$2">$2</a>$5');
              $(n).after(html).remove();
            }
          }
          else if (n.nodeType == 1  &&  !/^(a|button|textarea)$/i.test(n.tagName)) {
            linkifyThis.call(n);
          }
        }
      };

    $.fn.linkify = function () {
      return this.each(linkifyThis);
    };
    $('.jobs-list').linkify();
  }

  /**** Page montres volées ****/
  if($('body').hasClass('page-montres-volees')){
    $(".styled-table").tablesorter();
    $('.head-item').on('click', function(){
      var index = $(this).index();
      $('.styled-table').find('thead th').eq(index).trigger('click');
      if($('.head-item').hasClass('headerSortUp')){
        $('.head-item').removeClass('headerSortUp headerSortDown');
        $(this).addClass('headerSortDown');
      }
      else if($('.head-item').hasClass('headerSortDown')){
        $('.head-item').removeClass('headerSortUp headerSortDown');
        $(this).addClass('headerSortUp');
      }
      else{
        $('.head-item').removeClass('headerSortUp headerSortDown');
        $(this).addClass('headerSortDown');
      }
    });

    var scrollbar, scrollbar_api;

    var margin_bottom = 0;

    var setting_scrollbar = {
      hideFocus : true,
      verticalDragMinHeight: 12,
      verticalDragMaxHeight: 12,
    };
    // Mobile
    if(window.innerWidth < width_tablet_portrait){}
    // Tablet + desktop
    else {
      // Desktop
      if(window.innerWidth >= width_tablet){
        $('.stolen-pieces').height(  height_inner_content - parseInt($('.stolen-pieces').css('margin-top')) - $('.header-fixed-div ').height() -margin_bottom )
      }
      //Tablet portrait
      else if (window.innerWidth >= width_tablet_portrait &&  window.innerWidth < width_tablet){
        $('.stolen-pieces').height($('.col-left').height()-margin_bottom);
      }

      // On initialise jscrollpane
      scrollbar = $('.container-table');
      scrollbar.jScrollPane(setting_scrollbar);
      scrollbar_api = scrollbar.data('jsp');

    }

    // Window resize
    $(window).resize(function(){
      // Mobile
      if(window.innerWidth < width_tablet_portrait){
        if(scrollbar_api){

          scrollbar_api.destroy();
          scrollbar_api = '';
          $('.stolen-pieces').height('');
        }
      }
      // Tablet + desktop
      else {
        // Tablet portrait
        if (window.innerWidth >= width_tablet_portrait &&  window.innerWidth < width_tablet){
          $('.stolen-pieces').height($('.col-left').height()-margin_bottom);
        }
        // Desktop
        else{
          $('.stolen-pieces').height(  height_inner_content - parseInt($('.stolen-pieces').css('margin-top')) - $('.header-fixed-div ').height()-margin_bottom);
        }
        // Si jscrollpane est activé, on le réinitialise
        if(scrollbar_api){
          scrollbar_api.reinitialise();
        }
        // Sinon, on l'active
        else{
          scrollbar = $('.container-table');
          scrollbar.jScrollPane(setting_scrollbar);
          scrollbar_api = scrollbar.data('jsp');
        }
      }


    });
  }
});