;(function($) {

  $(document).ready(function() {

    /* =========================
       Mobile Drawer Function
    ========================== */

    const mobile_nav_open  = $('.mobile-nav-icon');
    const mobile_sidebar   = $('.mobile-sidebar');
    const mobile_nav_close = $('.menu-close');
    const body_overlay     = $('.body-overlay');

    // Open drawer
    mobile_nav_open.on('click', function () {
      mobile_sidebar.addClass('mobile-menu-active');
      body_overlay.addClass('active');
      $('body').addClass('no-scroll');
    });

    // Close drawer (X button or overlay)
    mobile_nav_close.add(body_overlay).on('click', function () {
      mobile_sidebar.removeClass('mobile-menu-active');
      body_overlay.removeClass('active');
      $('body').removeClass('no-scroll');
    });

    // Close drawer on menu click
    $('.mobile-nav ul li a').on('click', function () {
      mobile_sidebar.removeClass('mobile-menu-active');
      body_overlay.removeClass('active');
      $('body').removeClass('no-scroll');
    });

    /* =========================
       Mobile Menus
    ========================== */

    $('.mobile-nav a').each(function(){
      var href = $(this).attr('href');
      if(href === '#'){
        $(this).addClass('hash-nav');
      } else {
        $(this).removeClass('hash-nav');
      }
    });

    /* =========================
       Mobile Menu Marker
    ========================== */

    $.fn.menumarker = function(options){
      let mobile_menu = $(this),
      settings = $.extend({
        format: "dropdown",
        sticky: false
      }, options);

      return this.each(function(){

        mobile_menu.find('li ul').parent().addClass('has-sub');

        var multiTg = function(){
          mobile_menu.find('.hash-nav').parent().addClass('hash-has-sub');
          mobile_menu.find(".has-sub")
            .prepend('<span class="submenu-button"><em></em></span>');

          mobile_menu.find('.submenu-button').on('click', function(){
            $(this).toggleClass('submenu-opened');

            if ($(this).siblings('ul').hasClass('open-sub')) {
              $(this).siblings('ul').removeClass('open-sub').slideUp();
            } else {
              $(this).siblings('ul').addClass('open-sub').slideDown();
            }
          });
        };

        if (settings.format === 'multitoggle') multiTg();
        else mobile_menu.addClass('dropdown');

        if (settings.sticky === true) {
          mobile_menu.css('position', 'fixed');
        }

        var resizeFix = function () {
          if ($(window).width() > 991) {
            mobile_menu.find('ul').show();
            mobile_menu.find('ul.sub-menu').hide();
          }
        };

        resizeFix();
        return $(window).on('resize', resizeFix);

      });
    };

    $('.mobile-nav').menumarker({
      format: "multitoggle"
    });

  });

})(jQuery);
