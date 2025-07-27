$(document).ready(function() {
    // Header scroll effect
    let lastScroll = 0;
    $(window).scroll(function() {
        const currentScroll = $(this).scrollTop();
        
        if (currentScroll > 50) {
            $('#header').addClass('scrolled');
        } else {
            $('#header').removeClass('scrolled');
        }
        
        lastScroll = currentScroll;
    });
    
    // Mobile menu toggle
    $('#mobileMenuToggle').click(function() {
        $(this).toggleClass('active');
        $('#mobileMenu').toggleClass('active');
        $('body').toggleClass('menu-open');
    });
    
    // Mobile submenu toggle
    $('.mobile-nav .has-submenu > a').click(function(e) {
        e.preventDefault();
        $(this).parent().toggleClass('active');
    });
    
    // Main visual slider
    const mainVisualSlider = new Swiper('.main-visual-slider', {
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        effect: 'fade',
        fadeEffect: {
            crossFade: true
        }
    });
    
    // Features carousel
    const featuresCarousel = new Swiper('.features-carousel', {
        slidesPerView: 4,
        spaceBetween: 30,
        loop: false,
        navigation: {
            nextEl: '.features-carousel-next',
            prevEl: '.features-carousel-prev',
        },
        breakpoints: {
            960: {
                slidesPerView: 4,
                spaceBetween: 30,
            },
            767: {
                slidesPerView: 3,
                spaceBetween: 20,
            },
            599: {
                slidesPerView: 2,
                spaceBetween: 15,
            },
            0: {
                slidesPerView: 1.2,
                spaceBetween: 10,
                centeredSlides: false,
            }
        }
    });
    
    // Sticky footer banner
    let bannerShown = false;
    const showBannerCookie = getCookie('hideFooterBanner');
    
    if (!showBannerCookie) {
        $(window).scroll(function() {
            if ($(window).scrollTop() > 300 && !bannerShown) {
                $('#stickyFooterBanner').addClass('show');
                bannerShown = true;
            }
        });
    }
    
    // Close banner
    $('#bannerClose').click(function() {
        $('#stickyFooterBanner').removeClass('show');
        setCookie('hideFooterBanner', 'true', 7);
    });
    
    // Exit intent popup
    let popupShown = false;
    const showPopupCookie = getCookie('hideExitPopup');
    
    if (!showPopupCookie) {
        // Show popup on mouse leave
        $(document).mouseleave(function(e) {
            if (e.clientY < 0 && !popupShown) {
                showExitPopup();
            }
        });
        
        // Show popup after 10 seconds
        setTimeout(function() {
            if (!popupShown) {
                showExitPopup();
            }
        }, 10000);
    }
    
    function showExitPopup() {
        $('#exitPopup').addClass('show');
        popupShown = true;
        setCookie('hideExitPopup', 'true', 1);
    }
    
    // Close popup
    $('#popupClose, #exitPopup').click(function(e) {
        if (e.target === this) {
            $('#exitPopup').removeClass('show');
        }
    });
    
    // Cookie functions
    function setCookie(name, value, days) {
        const expires = new Date();
        expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
        document.cookie = name + '=' + value + ';expires=' + expires.toUTCString() + ';path=/';
    }
    
    function getCookie(name) {
        const nameEQ = name + '=';
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }
    
    // Smooth scroll for anchor links
    $('a[href^="#"]').click(function(e) {
        const href = $(this).attr('href');
        if (href !== '#' && $(href).length) {
            e.preventDefault();
            const headerHeight = $('#header').outerHeight();
            const targetOffset = $(href).offset().top - headerHeight - 20;
            
            $('html, body').animate({
                scrollTop: targetOffset
            }, 500);
        }
    });
    
    // Lazy loading for images
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback for browsers that don't support IntersectionObserver
        lazyImages.forEach(img => {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
        });
    }
});