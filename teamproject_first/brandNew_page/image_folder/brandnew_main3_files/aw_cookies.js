jQuery(document).ready(function ($) {
  let cookies = getCookie('cookie_management');
  
  if(cookies != '' && cookies.length > 0){
      $('.section.cookies-compliance').hide(); 
  }else{
      $('.section.cookies-compliance').show();
  }
 
  $('#edit-categories .form-type-checkbox .fa').on('click', function (e) {
    if (!$(e.target).hasClass('ios-switch')) {
      $('.cookies-desc').not($(this).parents('.form-type-checkbox').next()).slideUp();
      $('#edit-categories .form-type-checkbox .fa').not($(this).parents('.form-type-checkbox')).removeClass('open');
      $(this).parents('.form-type-checkbox').toggleClass('open');
      $(this).parents('.form-type-checkbox').next().slideToggle();
    }
  });

  $('.update-settings').on('click', function () {
    $('.cookies-form').slideDown();
  });

  $('.aw-cookies .btn-close').on('click', function (e) {
    $('.aw-cookies').slideUp();
  });


  $('#aw-cookie-front-form').on('change', '.ios-switch', function (e) {
    var acceptPerformance = '';
    var acceptSocial = '';
    $('#aw-cookie-front-form .ios-switch').each(function (e) {

      if ($(this).is(":checked")) {
        if($(this).attr('cookietype') == 'statistics'){
            acceptPerformance = 'true';
        }else if($(this).attr('cookietype') == 'social'){
            acceptSocial = 'true';
        }
      }
      else {
        if($(this).attr('cookietype') == 'statistics'){
            acceptPerformance = 'false';
        }else if($(this).attr('cookietype') == 'social'){
            acceptSocial = 'false';
        }
      }
      
    });
    createCookie('cookie_management', 'acceptPerformanceTracking='+acceptPerformance+'&acceptSocialMediaTracking='+acceptSocial+'&display=true&customize=true' , 395);
  });


  $('#block-aw-cookies-cookies-compliance').on('click', '.btn-close', function (e) {
    var acceptPerformance = '';
    var acceptSocial = '';
    $('#aw-cookie-front-form .ios-switch').each(function (e) {
      if ($(this).is(":checked")) {
        if($(this).attr('cookietype') == 'statistics'){
            acceptPerformance = 'true';
        }else if($(this).attr('cookietype') == 'social'){
            acceptSocial = 'true';
        }
      }
      else {
        if($(this).attr('cookietype') == 'statistics'){
            acceptPerformance = 'false';
        }else if($(this).attr('cookietype') == 'social'){
            acceptSocial = 'false';
        }
      }
    });
    createCookie('cookie_management', 'acceptPerformanceTracking='+acceptPerformance+'&acceptSocialMediaTracking='+acceptSocial+'&display=false&customize=true' , 395);
  });

  function createCookie(name, value, days) {
    if (days) {
      var date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      var expires = "; expires=" + date.toUTCString();
    }
    else var expires = "";
    document.cookie = name + "=" + value + expires + "; path=/";
  }
  
  function getCookie(cname) {
    let name = cname + "=";
    let resCookies = [];
    let name_value = "";
    let ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        let tempCookie = c.substring(name.length, c.length);
        if(tempCookie.includes('&')){
            let temp = tempCookie.split('&');
            let obj = {};
            for (var j = 0; j < temp.length; j++) {
                name_value = temp[j].split('=');
                obj[name_value[0]] = name_value[1];
            }
            
            resCookies.push(obj);
            return resCookies;
        }else{
            return c.substring(name.length, c.length);
        }
      }
    }
    return "";
  }
});
