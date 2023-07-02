jQuery(document).ready(function ($) {
  width_tablet = 1024;
  width_tablet_portrait = 768;
  height_content = $(window).height() - ($('#header').height() + $('#footer').height());

  height_inner_content = $(window).height() - ($('#header').height() + $('.header-content').height() + $('#footer').height());
  ratio_menu = 0.9;

  /*** Structure ***/
  var width_search;
  var height_menu;

  search_form_width();
  //init_menu_mobile();

  // Window resize
  //prevent browser url mobile bug
  var resize = true;
  var parser = '';
  var result = '';
  var tempWidth = '';

  if ($('body.front').length > 0) {
    parser = new UAParser();
    result = parser.getResult();
    tempWidth = $(window).width();
    resize = false;
  }
  $(window).resize(function () {

    if ($('body.front').length > 0) {
      if (result.device.type == 'mobile') {
        if (tempWidth != $(window).width()) {
          resize = true;
          tempWidth = $(window).width();
        } else {
          resize = false;
        }
      } else {
        resize = true;
      }
    }


    if (resize) {
      search_form_width(); // on recalcule la largeur du formulaire de recherche
      //init_menu_mobile(); // on recalcule l'affichage du menu (mobile ou desktop)
      height_content = $(window).height() - ($('#header').height() + $('#footer').height());

      height_inner_content = $(window).height() - ($('#header').height() + $('.header-content').height() + $('#footer').height());

      if (window.innerWidth > width_tablet_portrait) {
        if (!$('body').hasClass('front')) {
          $('.header-site').removeClass('fixed');
        }
      }
    }

  });
  var old_scroll = 0;
  var old_scroll_memory = 0;
  $(window).scroll(function () {
    if (!$('body').hasClass('front') && $('body').css('overflow') != 'hidden' && !$('.mobile-menu a').hasClass('open')) {
      if (window.innerWidth < width_tablet_portrait) {


        var direction_top = old_scroll > $(window).scrollTop();

        if (direction_top && $(window).scrollTop() > 100) {
          if (old_scroll_memory - 100 >= $(window).scrollTop())
            $('.header-site').addClass('show');
        }
        else if ($(window).scrollTop() > 160) {
          old_scroll_memory = $(window).scrollTop();
          $('.header-site').addClass('fixed');
          if ($(window).scrollTop() >= 160)
            $('.header-site').removeClass('show');
          else
            $('.header-site').addClass('show');
        }


        else {
          $('.header-site').removeClass('fixed').removeClass('show');
        }
      }
    }
    old_scroll = $(window).scrollTop();
  });

  $(document).keydown(function (e) {
    // Flèche gauche
    if (e.which == 37) {
      $('.bx-prev').trigger('click');
    }
    // Flèche droite
    else if (e.which == 39) {
      $('.bx-next').trigger('click');
    }
  });
  // Au click sur les block-button
  $('.block .block-button').on('click', function (e) {
    var button = $(this);
    // On ferme au click à l'extérieur du block
    $('body').one('click', function (e) {
      if (!button.parents('.block').hasClass('block-search')) {
        $('.block.open .block-button').not($(this)).parents('.block').removeClass('open').find('.block-content').fadeOut(400);
      }
    });

    $('body').one('touchstart', function (e) {
      if (!button.parents('.block').hasClass('block-search'))
        $('.block.open .block-button').not($(this)).parents('.block').removeClass('open').find('.block-content').fadeOut(400);
    });

    if (!$(this).find('.number-favorites').length) {
      e.stopPropagation();
      e.preventDefault();
    }

    // On caches les autres blocks ouverts, hormis celui clické
    $('.block.open .block-button').not($(this)).parent().removeClass('open').find('.block-content').fadeOut(400);

    // Si le block est fermé
    if (!$(this).parents('.block').hasClass('open')) {

      // On affiche le contenu du block
      $(this).parents('.block').addClass('open').find('.block-content').fadeIn(400);

      // S'il y a une champ text dans le contenu, on lui donne le focus
      if ($(this).parent().find('input[type="text"]').size() > 0) {
        $(this).parent().find('input[type="text"]').first().trigger('focus');
      }

    }
    // on cache le block cliqué
    else {
      $(this).parents('.block').removeClass('open').find('.block-content').fadeOut(400);
    }
  });

  //Click
  $('.desktop .social-network li a.btn-wechat').on('click', function (e) {
    $('footer .region-footer-right .block-wechat').fadeToggle();
    return false;
  });


  // Au hover sur la liste des langues, on modifie la position de la barre grise
  $('footer').find('.list-lang li').hover(function () {
    $('.over-lang').stop().animate({ bottom: $(this).parent().height() - $(this).position().top - $(this).height() }, 200);
  });

  // Ouvrir/fermer sous menu footer
  $('footer').find('.region-footer-left ul>li.expanded>a').click(function () {
    if ($(this).parent().hasClass('submenu-isOpen'))
      $(this).parent().removeClass('submenu-isOpen').children('ul').stop().fadeOut();
    else
      $(this).parent().addClass('submenu-isOpen').children('ul').stop().fadeIn();
    return false;
  });

  // Gestion Header

  if ($('body').hasClass('header-content-fixed')) {
    headerContent_height = $('#main-wrapper .header-content').outerHeight();
    $('#main-wrapper #main #content').css('padding-top', headerContent_height);
    $(window).resize(function () {

      if ($('body.front').length > 0) {
        if (result.device.type == 'mobile') {
          if (tempWidth != $(window).width()) {
            resize = true;
            tempWidth = $(window).width();
          } else {
            resize = false;
          }
        } else {
          resize = true;
        }
      }
      if (resize) {
        headerContent_height = $('#main-wrapper .header-content').outerHeight();
        $('#main-wrapper #main #content').css('padding-top', headerContent_height);
      }
    });
  }

  // QR Code popup.
  $('.desktop .social-share a.btn-wechat').click(function () {
    $('.qr_code').fadeIn().click(function () {
      $(this).fadeOut();
    });
    return false;
  });

  $('.tablet .social-share a.btn-wechat,.mobile .social-share a.btn-wechat').click(function () {
    $('.popup.wechat_mobile').fadeIn();
    $('footer .region-footer-right .block-wechat').hide();
  });

  $('.popup.wechat_mobile i').click(function () {
    $('.popup.wechat_mobile').fadeOut();
    $('footer .region-footer-right .block-wechat').fadeOut();
  });

  // Au click sur le mobile menu
  $('.mobile-menu a').click(function (e) {
    this_menu = $(this);
    width_content = window.innerWidth;

    $('body').toggleClass('open-menu');

    return false;
  });

  // Désactivation pour ipad
  $('.container-main-menu .menu > li > a').on('touchstart', function (e) {
    if (!$(this).parent().hasClass('parent-hover') && $(this).parent().find('.container-submenu').size() > 0 && $(window).width() >= width_tablet) {
      $('.container-main-menu .menu li').removeClass('parent-hover');
      $(this).parent().addClass('parent-hover');
      return false;
    }

    window.location.href = $(this).attr('href');
  });

  $('html').on('touchstart', function (e) {
    if ($('.container-main-menu .menu li').hasClass('parent-hover'))
      $('.container-main-menu .menu li').removeClass('parent-hover');
  });
  $(".container-main-menu").on('touchstart', function (e) {
    e.stopPropagation();
  });

  $('.container-main-menu .menu > li ').hover(function () {

    if ($(this).find('.container-submenu').size() > 0 && $(window).width() >= width_tablet) $(this).addClass('parent-hover');
  }, function () {
    $(this).removeClass('parent-hover');
  });

  // Au hover sur la liste des collections dans le menu étendu
  var container_submenu;
  var list;
  //var views_collections_menu = container_submenu.find('.views-collections');
  var bg_thumbnail;
  /* container_submenu.find('.thumbnail-block .bg-image').css({opacity: 1});
          container_submenu.find('.thumbnail-block .bg-image').css({
              backgroundColor: '#f2f2f2',
              backgroundImage: 'url('+views_collections_menu.find('li').first().find('.thumbnail-collection img').attr('src')+')' ,
          });*/
  var list;
  $('.container-submenu').each(function () {
    if ($(this).find('.views-collections').size() > 0) {
      list = $(this).find('.views-collections');
    }
    else {
      list = $(this).find('.menu');
    }
    $(this).find('.thumbnail-block .bg-image').css({ opacity: 1 });
    $(this).find('.thumbnail-block .bg-image').css({
      backgroundColor: '#f2f2f2',
      backgroundImage: 'url(' + list.find('li').first().find('.thumbnail-menu img').attr('src') + ')',
    });
    list.find('li').first().addClass('over-actif');
  });

  /*  $('.container-submenu .views-collections').find('li').hover(function(){
        container_submenu = $(this).parents('.container-submenu');
        var this_li = $(this);

        // On modifie le visuel de prévisualition, on change la couleur de fond en fonction de l'item survolé (noir si nouveautés, sinon gris)
        bg_thumbnail = $(this).hasClass('nouveautes') ? '#000000' : '#f2f2f2';

            container_submenu.find('.thumbnail-block .bg-image').stop().animate({opacity: 1}, 500);
            container_submenu.find('.thumbnail-block .bg-image').css({
                backgroundColor: bg_thumbnail,
                backgroundImage: 'url('+this_li.find('.thumbnail-collection img').attr('src')+')' ,
            });

    });
  */
  $('.container-submenu.default-submenu .menu, .container-submenu .views-collections').find('li').hover(function () {
    container_submenu = $(this).parents('.container-submenu');
    var this_li = $(this);
    if (!$(this).hasClass('over-actif')) {
      // On modifie le visuel de prévisualition, on change la couleur de fond en fonction de l'item survolé (noir si nouveautés, sinon gris)
      container_submenu.find('.thumbnail-block .bg-image').css('opacity', 0);
      container_submenu.find('.thumbnail-block .bg-image').stop().animate({ opacity: 1 }, 500);
      container_submenu.find('.thumbnail-block .bg-image').css({
        backgroundImage: 'url(' + this_li.find('.thumbnail-menu img').attr('src') + ')',
      });
      $(this).parents('.container-submenu').find('li').removeClass('over-actif');
      $(this).addClass('over-actif');
    }


  }, function () {
    //$(this).parents('.container-submenu').find('.thumbnail-block .bg-image').stop().animate({opacity: 0}, 500)
  });


  /**** Function ****/
  // Calcule la largeur du formulaire de recherche du menu pour qu'il s'arrête toujours au center de la page.
  function search_form_width() {
    if ($(window).width() < width_tablet) {
      width_search = $(window).width() - parseInt($('.nav-right').find('.block-search .block-content').css('padding-left')) - parseInt($('.nav-right').find('.block-search .block-content').css('padding-right'));
      $('.nav-right').find('.block-search .block-content').width(width_search);
    }
    else {
      width_search = $('.container-main-menu').find('.section-inside').width() / 2 - $('.block-favorites').width();
      $('.nav-right').find('.block-search .block-content').width(width_search);
    }
  }

  // Calcule la position top pour cacher le menu mobile + la hauteur de ligne pour center le menu en version mobile
  function init_menu_mobile() {
    width_content = window.innerWidth;
    height_menu = window.innerHeight;
    // tablet portrait + mobile
    if (window.innerWidth < width_tablet) {
      //  $('body').addClass('mobile'); // TODO: a supprimer dans drupal
      if (!$('#block-system-main-menu').hasClass('open')) {
        $('#block-system-main-menu').css('right', -width_content * ratio_menu);
        $('#block-system-main-menu').find('.menu').css('opacity', 0);
      }
      else {
        //     $('.main-menu').css({top:0});
        $('#block-system-main-menu').find('.menu').css({ opacity: 1 });
      }

      $('#block-system-main-menu').css({
        lineHeight: height_menu + 'px',
        height: height_menu + 'px',
      });
    }
    else {
      //    $('body').removeClass('mobile');// TODO: a supprimer dans drupal
      $('#block-system-main-menu').css({
        lineHeight: '',
        height: '',
        right: ''
      });
      $('#block-system-main-menu').find('.menu').css('opacity', '');
      $('#main, .header-site .section-inside').removeAttr('style');
    }
  }

  disableScroll = false;

  $.disableScrolling = function disableScrolling() { disableScroll = true; };

  $.enableScrolling = function enableScrolling() { disableScroll = false; }

  document.ontouchmove = function (e) {
    if (disableScroll) {
      e.stopPropagation();
      e.preventDefault();
    }
  };


  // Back button.
  $('a.btn-return').click(function (event) {
    event.preventDefault();
    history.back();
  });


  if ($('body').hasClass('page-chronologie')) {

    var chrono_height_inner_content = height_content - $('.header-content').outerHeight();
    var chrono_height_sidebar;

    $('.left-block').css({
      height: height_inner_content
    });

    if ($(window).width() <= 768) {
      $('.left-block').css({
        position: '',
        top: '',
        height: 'auto'
      });
    }

    $(window).resize(function () {

      if ($('body.front').length > 0) {
        if (result.device.type == 'mobile') {
          if (tempWidth != $(window).width()) {
            resize = true;
            tempWidth = $(window).width();
          } else {
            resize = false;
          }
        } else {
          resize = true;
        }
      }

      if (resize) {
        if ($(window).scrollTop() >= $('.header-content').outerHeight()) {
          height_sidebar = height_content;
        }
        else {
          height_sidebar = height_content - $('.header-content').outerHeight();
        }

        $('.left-block').css({
          height: chrono_height_sidebar
        });
        if ($(window).width() <= 768) {
          $('.left-block').css({
            position: '',
            top: '',
            height: 'auto'
          });
        }
      }
    });

    $(window).scroll(function () {
      if ($(window).width() > 768) {
        if ($(this).scrollTop() >= $('.header-content').outerHeight()) {
          $('.left-block').css({
            position: 'fixed',
            top: $('header').height(),
            height: height_content
          });
        }
        else {
          $('.left-block').css({
            position: '',
            top: '',
            height: height_inner_content
          });
        }
      } else {
        $('.left-block').css({
          position: '',
          top: '',
          height: 'auto'
        });
      }
    });

    if ($('.history-landing').size() >= 1) {
      $('.history-landing').height(height_inner_content).find('.periods li a').on("mouseover", function () {
        var id_visu = $(this).attr('id');
        $('.history-bg li').removeClass('show');
        $('.history-bg').find('#' + id_visu).addClass('show');
      });
      $('.history-bg').css('top', $('.history-landing').offset().top).css('height', $('.history-landing').outerHeight());
      $(window).resize(function () {
        $('.history-bg').css('top', $('.history-landing').offset().top).css('height', $('.history-landing').outerHeight());
      });
    }

    $('.page-chronologie .history .top-block .chronologie-content.disabled,.page-chronologie .history .top-block .chronologie-content.disabled, .page-chronologie .history .top-block .content-filter li a.disabled,.page-chronologie .history .filters ul li.disabled a').on('click', function () {
      return false;
    });

    $('.page-chronologie .history .left-block').css('min-height', height_content - 84);


    $('.page-chronologie .history .left-block .select-date').on("mouseenter mouseleave starttouch", function () {
      $(this).find('.ctools-collapsible-handle').trigger('click');
    });

    $('.page-chronologie .history .left-block .date-metadata .date-metadata-title').on('click', function () {
      $('.page-chronologie .history .top-block .chronologie-content .view').slideUp();
      $('.page-chronologie .history .top-block .chronologie-content').removeClass('active');
      $(this).parent('.date-metadata').toggleClass('active').find('.period-content').slideToggle();
    });
    $('.page-chronologie .history .top-block .chronologie-content:not(.disabled) .date-tax-title').on('click', function () {
      if ($(this).parent('.chronologie-content').hasClass('active')) {

        $('.page-chronologie .history .top-block .chronologie-content .view,.page-chronologie .history .left-block .date-metadata .period-content').slideUp();
        $('.page-chronologie .history .top-block .chronologie-content,.page-chronologie .history .left-block .date-metadata').removeClass('active');
      } else {
        $('.page-chronologie .history .top-block .chronologie-content .view,.page-chronologie .history .left-block .date-metadata .period-content').slideUp();
        $('.page-chronologie .history .top-block .chronologie-content,.page-chronologie .history .left-block .date-metadata').removeClass('active');
        $(this).parent('.chronologie-content').addClass('active').find('.view').slideDown();
      }
    });


    // VARIABLES
    max = 1;
    step = 0.1;
    var panzoom_fullscreen;

    /********************************************************************************************/
    /**********************************  Zoom fullscreen  ***************************************/
    /********************************************************************************************/
    $('.page-chronologie .history .left-block .period-content .period-content-img a').on('click', function (e) {
      if ($(window).width() >= 768) {
        $('html,body').css('overflow', 'hidden');
        e.preventDefault();
        $.disableScrolling();

        $('#zoom-image .copyright').html($(this).attr('data-copyright'));
        $('#zoom-image .zoom-inside img').attr('src', $(this).attr('href'));

        $('.header-site').addClass('fixed');
        $('#zoom-image').css({ display: 'block', top: $('.header-site').outerHeight() }).animate({ opacity: 1 }, 500).addClass('open');
        $('.zoom-inside img').load(function () {
          step = 0.1;
          $(this).css({
            marginTop: -this.height / 2,
            marginLeft: -this.width / 2
          });

          if (!$('body').hasClass('mobile')) {
            min_fullscreen = $('#zoom-image').outerHeight() / this.height;
            if (min_fullscreen < 1) {
              settings_panzoom_fullscreen = {
                $zoomIn: $('#zoom-image .zoom-step').find(".zoom-in"),
                $zoomOut: $('#zoom-image .zoom-step').find(".zoom-out"),
                increment: step,
                minScale: min_fullscreen,
                maxScale: max,
              };

              settings_slider_zoom_fullscreen = {
                orientation: "vertical",
                range: "min",
                min: min_fullscreen,
                max: max,
                step: step,
                animate: 'fast',
                value: min_fullscreen,
                slide: function (event, ui) {
                  panzoom_fullscreen.panzoom('zoom', ui.value, { animate: true });

                }
              };
              panzoom_fullscreen = $('.zoom-inside img').panzoom(settings_panzoom_fullscreen);
              panzoom_fullscreen.panzoom('zoom', min_fullscreen);

              slider_zoom_fullscreen = $("#zoom-slider-vertical-fullscreen").slider(settings_slider_zoom_fullscreen);
            } else {
              $('#zoom-image .zoom-step').removeClass('active');
            }
          }
          else {
            $('#zoom-image .zoom-step').removeClass('active');
          }

        });

        if (!$('body').hasClass('mobile')) {


          $('#zoom-image').on('mousewheel', function (event) {
            if (event.deltaY > 0)
              $('#zoom-image .zoom-step').find('.zoom-in').trigger('click');
            else
              $('#zoom-image .zoom-step').find('.zoom-out').trigger('click');
          });

          // Click zoom +
          $('#zoom-image .zoom-step').find('.zoom-in').on('click', function (e) {
            e.preventDefault();
            slider_zoom_fullscreen.slider('value', slider_zoom_fullscreen.slider('value') + step);
          });

          // Click zoom -
          $('#zoom-image .zoom-step').find('.zoom-out').on('click', function (e) {
            e.preventDefault();
            slider_zoom_fullscreen.slider('value', slider_zoom_fullscreen.slider('value') - step);
          });
        }
      } else {
        return false;
      }
    });

    // Close fullscreen
    $('#zoom-image .btn-close').on('click', function () {
      $.enableScrolling();
      $('html,body').css('overflow', '');
      if ($(window).scrollTop() < 10) $('.header-site').addClass('fixed');
      $('#zoom-image ').animate({ opacity: 0 }, 500, function () {
        $(this).hide().removeClass('open');
      });
    });

  }

  //hide social media for ru
  if ($('#footer .is-ru').length > 0) {
    $('#footer .is-ru .a2a_button_facebook').remove();
    $('#footer .is-ru .social-network .btn-social.btn-facebook').parent().remove();
    $('#footer .is-ru .social-network .btn-social.btn-instagram').parent().remove();
  }
});