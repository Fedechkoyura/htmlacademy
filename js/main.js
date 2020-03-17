(function () {
  function allScript() {
    jQuery(document).ready(function ($) {
      var windowWidth = $(window).width(); // Выключаем ссылки с #

      $("a[href='#']").click(function (event) {
        event.preventDefault();
      });
      $('.lang').click(function (event) {
        $(this).toggleClass('open');
      }); // Моб меню

      function popUpCall() {
        $('.header__left-tel .icon-tel').click(function (event) {
          $('.mob-call').addClass('open');
          $('.header').removeClass('header--menu');
          $('.header').addClass('header--call');
          $('.mob-menu').removeClass('open');
          $('body').css('overflow', 'hidden');
        });
      }

      ;

      function popUpMenu() {
        $('.header__right-menu .icon-menu').click(function (event) {
          $('.mob-menu').addClass('open');
          $('.header').removeClass('header--call');
          $('.header').addClass('header--menu');
          $('.mob-call').removeClass('open');
          $('body').css('overflow', 'hidden');
          $('.popUp-shop').removeClass('open');
          mobMenuBoolean = true;
        });
      }

      ;

      function popUpClose() {
        $('.popUp').removeClass('open');
        $('.header').removeClass('header--menu');
        $('.header').removeClass('header--call');
        $('body').css('overflow', 'auto');
        mobMenuBoolean = false;
      }

      ;
      $('.header .icon-cancel').click(function (e) {
        e.preventDefault();
        popUpClose();
      });
      popUpCall();
      popUpMenu(); // Конец Моб меню
      // МЕНЮ МАГАЗИНА

      var mobMenuBoolean = false;
      var windowResizeWidth = window.innerWidth;

      function shopIconsHeaderMob() {
        $('.header-shop__icons > div').on('click', '.popUp-shop__icon', function (event) {
          if (windowResizeWidth < 992) {
            event.preventDefault();
            var myThis = $(this);

            if (mobMenuBoolean == true) {
              $('.mob-menu').removeClass('open');
              popUpClose();
              setTimeout(function () {
                mobMenuBoolean = false;
                setTimeout(function () {
                  myThis.siblings('.popUp-shop').addClass('open');
                }, 200);
              }, 200);
            } else {
              if ($(this).siblings('.popUp-shop').hasClass('open')) {
                $(this).siblings('.popUp-shop').removeClass('open');
              } else {
                $('.popUp-shop').removeClass('open');
                setTimeout(function () {
                  myThis.siblings('.popUp-shop').addClass('open');
                }, 200);
              }
            }

            $('body').click(function (event) {
              if (!$(event.target).closest('.popUp-shop').length) {
                $('.popUp-shop').removeClass('open');
              }
            });
          } else {
            event.preventDefault();
          }

          $('.popUp-shop > .icon-cancel').click(function (event) {
            $('.popUp-shop').removeClass('open');
            mobMenuBoolean = false;
          });
        });
      }

      ;

      function shopIconsHeader() {
        if (windowResizeWidth > 991) {
          $('.popUp-shop > .icon-cancel').click(function (event) {
            var myThis = $(this);
            $('.popUp-shop').addClass('close');
            setTimeout(function () {
              $('.popUp-shop').removeClass('close');
            }, 300);
          });
        }
      }

      shopIconsHeader();
      shopIconsHeaderMob();
      window.addEventListener('resize', function (e) {
        windowResizeWidth = window.innerWidth;

        if (window.innerWidth > 991) {
          shopIconsHeader();
        }

        if (windowWidth < 992) {
          shopIconsHeaderMob();
        }
      }); // МЕНЮ МАГАЗИНА КОНЕЦ
      // Вызов окна галлереи

      if ($('.image-link').length) {
        $('.image-link').magnificPopup({
          type: 'image',
          gallery: {
            enabled: true
          }
        });
      }

      ; // Swiper Slider CATEGORIES

      if (document.querySelector('.swiper-container')) {
        var breakpoint = window.matchMedia('(min-width:768px)');
        var mySwiper;

        var breakpointChecker = function () {
          // if larger viewport and multi-row layout needed
          if (breakpoint.matches === true) {
            // clean up old instances and inline styles when available
            if (mySwiper !== undefined) mySwiper.destroy(true, true); // or/and do nothing

            return; // else if a small viewport and single column layout needed
          } else if (breakpoint.matches === false) {
            // fire small viewport version of swiper
            return enableSwiper();
          }
        };

        var enableSwiper = function () {
          mySwiper = new Swiper('.swiper-container', {
            slidesPerView: 1,
            spaceBetween: 5,
            freeMode: true,
            slidesPerView: 'auto',
            grabCursor: true
          });
        };

        breakpoint.addListener(breakpointChecker);
        breakpointChecker();
      } // ENS Swiper Slider CATEGORIES
      // Слайдер в О-нас


      function slider() {
        if ($('.about-us__slider').length) {
          $('#tab-1 .about-us__slider-wrapper').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            variableWidth: true,
            arrows: false,
            infinite: false,
            mobileFirst: true,
            responsive: [{
              breakpoint: 767,
              settings: {
                infinite: true,
                slidesToShow: 1,
                arrows: true,
                prevArrow: $('.about-us__slider-arrows--1 .about-us__slider-arrows-prev'),
                nextArrow: $('.about-us__slider-arrows--1 .about-us__slider-arrows-next')
              }
            }]
          });
          $('#tab-2 .about-us__slider-wrapper').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            variableWidth: true,
            arrows: false,
            infinite: false,
            mobileFirst: true,
            prevArrow: $('.about-us__slider-arrows--2 .about-us__slider-arrows-prev'),
            nextArrow: $('.about-us__slider-arrows--2 .about-us__slider-arrows-next'),
            responsive: [{
              breakpoint: 767,
              settings: {
                infinite: true,
                slidesToShow: 1,
                arrows: true
              }
            }]
          });
          $(window).on('resize orientationchange', function () {
            $('#tab-1 .about-us__slider-wrapper').slick('resize');
            $('#tab-2 .about-us__slider-wrapper').slick('resize');
          });
        }
      } // Табы в О нас


      function tabs() {
        $('ul.about-us__tabs li a').click(function () {
          var tab_id = $(this).attr('data-tab');
          $('ul.about-us__tabs li a').removeClass('current');
          $('.about-us__slider').removeClass('current');
          $(this).addClass('current');
          $("#" + tab_id).addClass('current');
        });
      }

      slider();
      tabs(); // Видео в О нас и в Франшиза

      function removeShowreal() {
        $('.about-us__video-fullscreen-iframe').html('');
        $('.about-us__video-fullscreen').removeClass('open');
      }

      removeShowreal();

      function addShowreal() {
        $('.about-us__video-fullscreen').addClass('open');
        $('.about-us__video-fullscreen-iframe').html('<iframe src="https://player.vimeo.com/video/204854116?autoplay=1&color=ffffff" style="position:absolute;top:0;left:0;width:100%;height:100%;" frameborder="0" autoplay allow="autoplay; fullscreen" allowfullscreen></iframe>');
      }

      $('.about-us__video-btn').click(function (event) {
        addShowreal();
      });
      $('.about-us__video-fullscreen-close').click(function (event) {
        removeShowreal();
      }); // Открытие формы

      $('.franchise__btn').click(function (e) {
        e.preventDefault();
        $('.call-back').addClass('open');
        $('.overlay').addClass('open');
      });

      function callBackClose(btn) {
        $(btn).click(function (e) {
          e.preventDefault();
          $('.call-back').removeClass('open');
          setTimeout(function () {
            $('.overlay').removeClass('open');
          }, 800);
        });
      }

      ;
      callBackClose('.call-back__header-close');
      callBackClose('.overlay'); // Icons categories page product

      $('.product-icon__img').click(function (event) {
        var myThis = $(this);

        if (myThis.siblings('.product-icon__popup').hasClass('open')) {
          $('.product-icon__popup').removeClass('open');
          myThis.removeClass('open');
        } else {
          $('.product-icon__popup').removeClass('open');
          myThis.removeClass('open');
          setTimeout(function () {
            myThis.addClass('open');
            myThis.siblings('.product-icon__popup').addClass('open');
          }, 100);
        }
      });
      $('.product-icon__img').mouseenter(function (event) {
        var myThis = $(this);

        if (myThis.siblings('.product-icon__popup').hasClass('open')) {
          $('.product-icon__popup').removeClass('open');
        } else {
          $('.product-icon__popup').removeClass('open');
          setTimeout(function () {
            myThis.siblings('.product-icon__popup').addClass('open');
          }, 100);
        }
      });
      $('.product-icon__img').mouseleave(function (event) {
        $('.product-icon__popup').removeClass('open');
      }); // Icons categories page product - END
      // CONTACT FORM 7

      document.addEventListener('wpcf7invalid', function (event) {
        if (event.detail.contactFormId == "402") {
          // 1322 это id формы для отслеживания
          $('.header__call-form form').addClass('error');
          setTimeout(function () {
            $('.header__call-form form').removeClass('error');
          }, 1500);
        }
      }, false);
      document.addEventListener('wpcf7spam', function (event) {
        if (event.detail.contactFormId == "402") {
          // 1322 это id формы для отслеживания
          $('.header__call-form form').addClass('error');
          setTimeout(function () {
            $('.header__call-form form').removeClass('error');
          }, 1500);
        }
      }, false);
      document.addEventListener('wpcf7mailfailed', function (event) {
        if (event.detail.contactFormId == "402") {
          // 1322 это id формы для отслеживания
          $('.header__call-form form').addClass('error');
          setTimeout(function () {
            $('.header__call-form form').removeClass('error');
          }, 1500);
        }
      }, false);
      document.addEventListener('wpcf7mailsent', function (event) {
        if (event.detail.contactFormId == "402") {
          // 32 это id формы для отслеживания
          $('.header__call-form form').removeClass('error');
          $('.header__call-form').addClass('success');
          setTimeout(function () {
            $('.header__call-form').removeClass('success');
          }, 5000);
        }
      }, false);
      $("input.wpcf7-form-control").focus(function (event) {
        this.removeAttribute('readonly');
      }); // CONTACT FORM 7 - END
      // Анимация появления

      function animate(item, myOffset) {
        jQuery(item).viewportChecker({
          classToAdd: 'animate',
          offset: myOffset
        });
      }

      ;

      if (windowWidth >= 768) {
        animate('.about-us__content', 250);
        animate('.about-us__gallery', 250);
        animate('.franchise__info', 250);
        animate('.franchise__packet-item', 250);
      } else {
        animate('.about-us__content', 250);
        animate('.franchise__info', 250);
        animate('.franchise__packet-item', 250);
        animate('.about-us__gallery', 250);
      }

      ;

      var delay = function () {
        var timer = 0;
        return function (callback, ms) {
          clearTimeout(timer);
          timer = setTimeout(callback, ms);
        };
      }();

      var windowWidth2 = $(window).width();
      $(window).resize(function () {
        if ($(window).width() != windowWidth2) {
          //DO RESIZE
          windowWidth2 = $(window).width();
          delay(function () {
            shopIconsHeader();
          }, 500);

          if (windowWidth2 < 768) {
            delay(function () {
              slider();
            }, 500);
          } else {
            delay(function () {}, 500);
          }
        }
      });
    });

    if ($('#home-video').length) {
      setTimeout(function () {// $('#home-video').get(0).play();
      }, 700);
    }

    if ($('#payment_method_bacs').length) {
      $('body').append('<input id="checkout_provider_checkout_paypal" type="radio" class="input-radio" name="payment_method" value="hidden" checked="checked" data-order_button_text="">');

      function orderFormPaymentRemoveDefault() {
        document.getElementById('payment_method_bacs').checked = false;
        document.getElementById('payment_method_bacs').autocomplete = "off";
        $("#checkout_provider_checkout_paypal").trigger("click");
        $("#uniform-checkout_provider_checkout_paypal span").addClass("checked");
      }

      ;
      orderFormPaymentRemoveDefault();
      $(document).ajaxComplete(function (event, request, settings) {
        orderFormPaymentRemoveDefault();
      });
    }

    ;
  }

  ;

  function hidden(item) {
    $(item).addClass('hidden');
  }

  ;
  hidden('.about-us__content');
  hidden('.about-us__gallery');
  hidden('.franchise__info-content');
  hidden('.franchise__info-img');
  hidden('.franchise__packet-item-img');
  hidden('.franchise__packet-item-info');
  $(window).on('load', function () {
    setTimeout(function () {
      allScript();
    }, 900);
  });
})();