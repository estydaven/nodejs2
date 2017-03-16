var flip = (function () {

    var flipper = document.querySelector(".flipper"),
        btn = document.querySelector(".c-button");

    var _login = function () {
        btn.style.display = "none";
        flipper.style.transform = "rotateY(180deg)";
    };

    var _user = function () {
        btn.style.display = "block";
        flipper.style.transform = "rotateY(0deg)";
    };

    return {

        On: _login,
        Off: _user

    }


})();

var btnOn = document.querySelector(".c-button"),
    btnOff = document.querySelector(".return-btn");

if (btnOn !== null) {
    btnOn.onclick = function () {
        flip.On();
    };

    btnOff.onclick = function () {
        flip.Off();
    };
}


var Validation = (function () {
    var errorField = document.querySelector('.input-error-msg'),
        captchaError = document.querySelector('.welcome__error'),
        formContainer = document.querySelector('.form__container');

    var _init = function (form) {
        var elems = form.elements;

        console.log(elems);
        return _validate(elems) ? true : false;
    };

    function _validate(inputs) {

        for (var i = 0; i < inputs.length; i++) {
            if (inputs[i].tagName === 'BUTTON') continue;

            var elem = inputs[i];

            if (elem.value == '') {
                console.log(elem);
                return _showError(elem)
            }

            if (elem.type === 'checkbox' || elem.type === 'radio') {

                if (elem.checked && elem.value === 'yes') {
                    return true;
                }
                if (!elem.checked) {
                    captchaError.style.display = 'flex';
                }
            }
        }

        return true;

    };

    function _showError(elem) {
        var text = elem.getAttribute('placeholder').toLowerCase();
        var position = elem.parentNode.offsetTop + elem.parentNode.offsetHeight;

        elem.parentNode.classList.add('input-group_error');
        errorField.style.display = 'block';
        errorField.innerText = 'Вы не ввели ' + text;

        // if (position > formContainer.offsetHeight)
        errorField.style.top = position + 'px';
    }

    function _clearError(elem) {
        console.log(elem);
        elem.parentNode.classList.remove('input-group_error');
        errorField.style.display = 'none';
    }


    return {
        init: _init,
        clear: _clearError
    }
})();

// Фуллскрин меню
$(document).ready(function(){
    $('#toggle').click(function() {
        $(this).toggleClass('active');
        $('#overlay').toggleClass('open');

    });

});




// Параллакс в шапке сайта
var headerParallax = (function () {

    var bg = document.querySelector('.bg-parallax');
    var user = document.querySelector('.user__hero-parallax');
    var starsSection = document.querySelector('.stars-parallax');


    var _move = function (block, windowScroll, strafeAmount) {
        var strafe = windowScroll / -strafeAmount + '%';
        var transformString = 'translate3d(0, ' + strafe + ', 0)';

        var style = block.style;
        if (windowScroll < window.innerHeight) {
            style.transform = transformString;
            style.webkitTransform = transformString;
        }
    };

    return{
        init: function (wScroll) {
            _move(bg, wScroll, 45);
            _move(user, wScroll, 7);
            _move(starsSection, wScroll, 30);
        }
    }

})();


function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 13,
        center: {lat: 53.658348, lng: 23.786986},
        disableDefaultUI: true,
        scrollwheel: false,
        styles:[{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#444444"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2f2f2"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":-100},{"lightness":45}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#4369aa"},{"visibility":"on"}]}]
    });

    var marker = new google.maps.Marker({
        icon: 'assets/img/map-contact.png',
        position: {lat: 53.658348, lng: 23.786986},
        map: map,
        title: "Я здесь!",
        animation: google.maps.Animation.BOUNCE
    });
}

var BlogMenu = (function () {
    var sidebar = document.querySelector('.blog__tabs');

    function _fixMenu() {
        var nav = document.querySelector('.blog__tabs-list'),
            navCoords = sidebar.getBoundingClientRect().top;

        if (window.innerWidth >= 780) {
            if (navCoords <= -50) {
                nav.style.position = 'fixed';
                nav.style.top = '20px';
                nav.style.width = '20%';
            } else {
                nav.style.position = 'static';
                nav.style.width = 'auto';
            }
        } else {
            nav.style.position = 'absolute';
            nav.style.top = '';
            nav.style.width = 'auto';
        }

    }

    function _initActive () {
        var posts = document.querySelectorAll('.article__title'),
            postLinks = document.querySelectorAll('.blog-menu__link'),
            activeLink = document.getElementsByClassName('blog-menu__link_active');


        for (var i = 0; i < posts.length; i++) {
            var post = posts[i],
                postTop = post.getBoundingClientRect().top;

            if (postTop <= 100) {
                activeLink[0].classList.remove('blog-menu__link_active');
                postLinks[i].classList.add('blog-menu__link_active');
            }
        }
    }

    var _openMenu = function () {
        sidebar.classList.add('blog__tabs-active');
    };
    var _closeMenu = function () {
        sidebar.classList.remove('blog__tabs-active');
    };

    return {
        init: _fixMenu,
        initActive: _initActive,
        toggle: function () {
            if (!sidebar.classList.contains('blog__tabs-active')) {
                _openMenu();
            }
            else {
                _closeMenu();
            }
        }
    }
})();




// Параллакс на главной
var mainParallax = (function () {
    
    var _show = function () {

        var parallaxContainer = document.getElementById('parallax'),
            layers = parallaxContainer.children;

        window.addEventListener('mousemove', function (e) {
            var pageX = e.pageX,
                pageY = e.pageY,
                initialX = (window.innerWidth / 2) - pageX,
                initialY = (window.innerHeight / 2) - pageY;


            [].slice.call(layers).forEach(function (layer, i) {
                var layerStyle = layer.style,
                    divider = i / 40,
                    bottomPosition = (window.innerHeight / 2) * divider,
                    horizontalPosition = (window.innerWidth / 2) * divider,
                    positionX = initialX * divider,
                    positionY = initialY * divider,
                    transformString = 'translate3d(' + positionX + 'px,' + positionY + 'px, 0)';

                layerStyle.transform = transformString;
                layerStyle.webkitTransform = transformString;
                layerStyle.bottom = '-' + bottomPosition + 'px';
                layerStyle.left = '-' + horizontalPosition + 'px';
                layerStyle.right = '-' + horizontalPosition + 'px';
            })
        });
    };

    return{
        init: _show
    };
})();

    


var preloader = (function(){
    var percentsTotal = 0;
    var preloader = $('.preloader');

    var imgPath = $('*').map(function (ndx, element) {
        var background = $(element).css('background-image');
        var isImg = $(element).is('img');
        var path = '';

        if (background != 'none') {
            path = background.replace('url("', '').replace('")', '');
        }

        if (isImg) {
            path = $(element).attr('src');
        }

        if (path) return path;
    });

    var setPercents = function(total, current) {
        var percents = Math.ceil(current / total * 100);

        $('.preloader__percent').text(percents + '%');

        if (percents >= 100) {
            preloader.fadeOut();
        }
    };

    var loadImages = function(images) {

        if (!images.length) preloader.fadeOut();

        images.forEach(function(img, i, images){
            var fakeImage = $('<img>', {
                attr : {
                    src : img
                }
            });

            fakeImage.on('load error', function(){
                percentsTotal++;
                setPercents(images.length, percentsTotal);
            });
        });

    };

    return {
        init: function () {
            var imgs = imgPath.toArray();

            loadImages(imgs);
        }
    }
}());

$(function () {
    preloader.init();
});

var ScrollPage = (function () {

return {
down: function (elem) {
    var section = elem.parentNode.nextSibling.nextSibling,
    posTop = section.offsetTop;

$('body,html').animate({scrollTop: posTop}, 1500);
},

up: function () {
$('body,html').animate({scrollTop: 0}, 1200);
}
}
})();

// Анимация скиллов
var skillsDraw = (function () {
    var skills = document.querySelectorAll('.skill'),
        circles = document.querySelectorAll('.skills__circle-above'),
        windowHeight = window.innerHeight;

    // вычисление длины окружности
    var circleLength = function (circle) {
        var circleRadius = circle.getAttribute('r'),
            circleLength = 2 * Math.PI * circleRadius;

        return circleLength;
    };

    // применение к окружности свойств по умолчанию
    [].slice.call(circles).forEach(function (circle) {

        circle.style.strokeDashoffset = circleLength(circle);
        circle.style.strokeDasharray = circleLength(circle);

    });

    // анимирование окружности в зависимости от процентов
    var circleAnimation = function (skill) {

        var circleFill = skill.querySelector('.skills__circle-above'),
            skillPercent = skill.getAttribute('data-percent'),
            length = circleLength(circleFill),
            percent = length * (100 - skillPercent) / 100;

        setTimeout(function () {
            circleFill.style.strokeDashoffset = percent;
            circleFill.style.transition = 'all 1s';

            if (skillPercent < 50) {
                skill.style.opacity = 0.4;
                skill.style.transition = 'all 1s';
            }
        }, 500);

    };

    return {
        grow: function () {

            [].slice.call(skills).forEach(function (skill) {

                var circleRect = skill.getBoundingClientRect(),
                    circlePos = circleRect.bottom,
                    startAnimation = circlePos - windowHeight;

                if (startAnimation <= 0) {
                    circleAnimation(skill);
                }

            });
        }
    }

})();


var Slider = (function () {
    var items = $('.work-slider__item', '.work-slider__list_next'),
        index = 1,
        ndx,
        duration = 500,
        title = $('.work__title'),
        skills = $('.work__technology'),
        imgContainer = $('.work__pic');

    function _init() {
        var activeItem = items.eq(index),
            imgSrc = activeItem.find('img').attr('src'),
            activeTitle = activeItem.data('title'),
            activeSlill = activeItem.data('technology');

        imgContainer.attr('src', imgSrc);
        title.text(activeTitle);
        skills.text(activeSlill);

        var nextItem = $('.work-slider__item', '.work-slider__list_next').eq(index + 1);
        nextItem.addClass('work-slider__item_current');
        var prevItem = $('.work-slider__item', '.work-slider__list_prev').eq(index - 1);
        prevItem.addClass('work-slider__item_current');
    }

    function animateSlide(ndx, container, direction) {
        var nextItems = $('.work-slider__item', container),
            currentItem = nextItems.filter('.work-slider__item_current'),
            reqItem = nextItems.eq(ndx);
        direction = direction === 'up' ? -100 : 100;

        currentItem.animate({
            'top': direction + '%'
        }, duration);

        reqItem.animate({
            'top': 0
        }, duration, function () {
            currentItem.removeClass('work-slider__item_current').css('top', -direction + '%');
            reqItem.addClass('work-slider__item_current');
        })
    }

    function _moveNext() {
        var container = $('.work-slider__list_next'),
            direction = 'up';

        if (index == items.length - 1) {
            ndx = 0;
        } else if (index < 0) {
            ndx = items.length - 1;
        } else {
            ndx = index + 1;
        }

        animateSlide(ndx, container, direction);
    }

    function _movePrev() {
        var container = $('.work-slider__list_prev'),
            direction = 'down';

        if (index > items.length - 1) {
            ndx = 0;
        } else if (index <= 0) {
            ndx = items.length - 1;
        } else {
            ndx = index - 1;
        }

        animateSlide(ndx, container, direction);
    }

    function _slideShow() {
        var fadedOut = $.Deferred(),
            loaded = $.Deferred(),
            nextSrc = items.eq(index).find('img').attr('src'),
            nextTitle = items.eq(index).data('title'),
            nextSkills = items.eq(index).data('technology');

        _moveNext();
        _movePrev();

        imgContainer.fadeOut(function () {
            title.slideUp();
            skills.fadeOut();
            fadedOut.resolve();
        });

        fadedOut.done(function () {
            title.text(nextTitle);
            skills.text(nextSkills);
            imgContainer.attr('src', nextSrc).on('load', function () {
                loaded.resolve();
            })
        });

        loaded.done(function () {
            title.slideDown();
            skills.fadeIn();
            imgContainer.fadeIn();
        });
    }

    return {
        init: _init,
        move: function () {

            $('.toggle__link').on('click', function (e) {
                e.preventDefault();

                if ($(this).hasClass('toggle__link_next')) {
                    index++;
                } else if ($(this).hasClass('toggle__link_prev')) {
                    index--;
                }

                if (index > items.length - 1) {
                    index = 0;
                } else if (index < 0) {
                    index = items.length - 1;
                }

                _slideShow();

            })
        }
    }
})
();
const formUpload = document.querySelector('#upload');

function fileUpload(url, data, cb) {
    let xhr = new XMLHttpRequest();
    xhr.open('POST', url, true);

    xhr.onload = function (e) {
        let result = JSON.parse(xhr.responseText);
        cb(result.status);
    };

    xhr.send(data);
}

function prepareSendFile(e) {
    e.preventDefault();
    let resultContainer = document.querySelector('.status');
    let formData = new FormData();
    let file = document
        .querySelector('#file-select')
        .files[0];
    let name = document
        .querySelector('#file-desc')
        .value;

    formData.append('photo', file, file.name);
    formData.append('name', name);

    resultContainer.innerHTML = 'Uploading...';
    fileUpload('/upload', formData, function (data) {
        resultContainer.innerHTML = data;
    });
}

if (formUpload) {
    formUpload.addEventListener('submit', prepareSendFile);
}

//------------ block mail
const formMail = document.querySelector('#mail');

if (formMail) {
    formMail.addEventListener('submit', prepareSendMail);
}

function prepareSendMail(e) {
    e.preventDefault();
    let resultContainer = document.querySelector('.status');
    let data = {
        name: formMail.name.value,
        email: formMail.email.value,
        text: formMail.text.value
    };
    resultContainer.innerHTML = 'Sending...';
    sendAjaxJson('/contact-me', data, function (data) {
        resultContainer.innerHTML = data;
    });
}

function sendAjaxJson(url, data, cb) {
    let xhr = new XMLHttpRequest();
    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function (e) {
        let result = JSON.parse(xhr.responseText);
        cb(result.status);
    };
    xhr.send(JSON.stringify(data));
}

//---- block Blog

const formBlog = document.querySelector('#blog');

if (formBlog) {
    formBlog.addEventListener('submit', prepareSendPost);
}

function prepareSendPost(e) {
    e.preventDefault();
    let resultContainer = document.querySelector('.status');
    let data = {
        title: formBlog.title.value,
        date: formBlog.date.value,
        text: formBlog.text.value
    };
    resultContainer.innerHTML = 'Sending...';
    sendAjaxJson('/addpost', data, function (data) {
        resultContainer.innerHTML = data;
    });
}

//---- block Login

const formLogin = document.querySelector('#login');

if (formLogin) {
    formLogin.addEventListener('submit', prepareAuth);
}

function prepareAuth(e) {
    e.preventDefault();
    let resultContainer = document.querySelector('.status');
    let data = {
        login: formLogin.login.value,
        password: formLogin.password.value
    };
    resultContainer.innerHTML = 'Sending...';
    sendAjaxJson('/', data, function (data) {
        resultContainer.innerHTML = data;
    });
}
var preload = document.querySelector('.preloader');

if (preload !== null) preloader.init();

window.onload = function () {



    //Index Parallax
    var parallax = document.querySelector('#parallax');

    if (parallax !== null) {
        mainParallax.init();
    }

    var slider = document.querySelector('.work__slider');

    if (slider !== null) {
        (function () {
            // Slider.init();
            Slider.init();
            Slider.move();
        })();
    }

    var form = document.querySelector('form');

    if (form !== null) {
        //очистка ошибки
        var inputs = form.elements;
        var closeError = document.querySelector('.input-error-captcha__close');

        for (var i = 0; i < inputs.length; i++) {
            inputs[i].onfocus = function() {
                if (this.parentNode.classList.contains('input-group_error')) {
                    Validation.clear(this);
                }
            }
        }

        if (closeError !== null) {
            closeError.onclick = function() {
                closeError.parentNode.parentNode.style.display = 'none';
            };
        }


        form.addEventListener('submit', function (e) {
            e.preventDefault();

            var valid = Validation.init(form);

            console.log(valid);
        })
    }


    //Parallax header, skills
    var bg = document.querySelector('.bg-parallax'),
        skills = document.querySelector('.skill'),
        blogWrapper = document.querySelector('.blog-container');
    //Функция скролла страницы
    window.onscroll = function () {

        var wScroll = window.pageYOffset;

        if (bg !== null) {
            headerParallax.init(wScroll);
        }
        if (skills !== null) {
            skillsDraw.grow();
        }
        if (blogWrapper !== null) {
            BlogMenu.init();
            BlogMenu.initActive();
        }

    };

    var sideMenu = document.querySelector('.sidemenu-btn');

    if (sideMenu !== null) {
        sideMenu.onclick = function () {
            BlogMenu.toggle();
        }
    }

    window.onresize = function () {
        BlogMenu.init();
    }


    // Скролл на один экран вниз
    var scrollDown = document.querySelector('.arrow');
    var scrollUp = document.querySelector('.arrow-up');

    if (scrollDown !== null) {
        scrollDown.addEventListener('click', function (e) {
            e.preventDefault();

            ScrollPage.down(this);
        })
    }
    if (scrollUp !== null) {
        scrollUp.addEventListener('click', function (e) {
            e.preventDefault();

            ScrollPage.up(this);
        })
    }

};








//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZsaXAuanMiLCJmb3Jtcy5qcyIsImZ1bGxzY3JlZW4tbWVudS5qcyIsImhlYWRlci1wYXJhbGxheC5qcyIsIm1hcC5qcyIsIm1lbnUtYmxvZy5qcyIsInBhcmFsbGF4LmpzIiwicHJlbG9hZGVyLmpzIiwic2Nyb2xsLmpzIiwic2tpbGxzLmpzIiwic2xpZGVyLmpzIiwidXBsb2Fkcy5qcyIsImFwcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN0Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMvREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNaQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDNUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNoRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDN0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDZkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzdEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2pJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQy9HQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIGZsaXAgPSAoZnVuY3Rpb24gKCkge1xyXG5cclxuICAgIHZhciBmbGlwcGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5mbGlwcGVyXCIpLFxyXG4gICAgICAgIGJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYy1idXR0b25cIik7XHJcblxyXG4gICAgdmFyIF9sb2dpbiA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBidG4uc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xyXG4gICAgICAgIGZsaXBwZXIuc3R5bGUudHJhbnNmb3JtID0gXCJyb3RhdGVZKDE4MGRlZylcIjtcclxuICAgIH07XHJcblxyXG4gICAgdmFyIF91c2VyID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGJ0bi5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xyXG4gICAgICAgIGZsaXBwZXIuc3R5bGUudHJhbnNmb3JtID0gXCJyb3RhdGVZKDBkZWcpXCI7XHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybiB7XHJcblxyXG4gICAgICAgIE9uOiBfbG9naW4sXHJcbiAgICAgICAgT2ZmOiBfdXNlclxyXG5cclxuICAgIH1cclxuXHJcblxyXG59KSgpO1xyXG5cclxudmFyIGJ0bk9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jLWJ1dHRvblwiKSxcclxuICAgIGJ0bk9mZiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucmV0dXJuLWJ0blwiKTtcclxuXHJcbmlmIChidG5PbiAhPT0gbnVsbCkge1xyXG4gICAgYnRuT24ub25jbGljayA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBmbGlwLk9uKCk7XHJcbiAgICB9O1xyXG5cclxuICAgIGJ0bk9mZi5vbmNsaWNrID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGZsaXAuT2ZmKCk7XHJcbiAgICB9O1xyXG59XHJcblxyXG4iLCJ2YXIgVmFsaWRhdGlvbiA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgZXJyb3JGaWVsZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5pbnB1dC1lcnJvci1tc2cnKSxcclxuICAgICAgICBjYXB0Y2hhRXJyb3IgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcud2VsY29tZV9fZXJyb3InKSxcclxuICAgICAgICBmb3JtQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZvcm1fX2NvbnRhaW5lcicpO1xyXG5cclxuICAgIHZhciBfaW5pdCA9IGZ1bmN0aW9uIChmb3JtKSB7XHJcbiAgICAgICAgdmFyIGVsZW1zID0gZm9ybS5lbGVtZW50cztcclxuXHJcbiAgICAgICAgY29uc29sZS5sb2coZWxlbXMpO1xyXG4gICAgICAgIHJldHVybiBfdmFsaWRhdGUoZWxlbXMpID8gdHJ1ZSA6IGZhbHNlO1xyXG4gICAgfTtcclxuXHJcbiAgICBmdW5jdGlvbiBfdmFsaWRhdGUoaW5wdXRzKSB7XHJcblxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgaW5wdXRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChpbnB1dHNbaV0udGFnTmFtZSA9PT0gJ0JVVFRPTicpIGNvbnRpbnVlO1xyXG5cclxuICAgICAgICAgICAgdmFyIGVsZW0gPSBpbnB1dHNbaV07XHJcblxyXG4gICAgICAgICAgICBpZiAoZWxlbS52YWx1ZSA9PSAnJykge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZWxlbSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gX3Nob3dFcnJvcihlbGVtKVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoZWxlbS50eXBlID09PSAnY2hlY2tib3gnIHx8IGVsZW0udHlwZSA9PT0gJ3JhZGlvJykge1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChlbGVtLmNoZWNrZWQgJiYgZWxlbS52YWx1ZSA9PT0gJ3llcycpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmICghZWxlbS5jaGVja2VkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGNoYUVycm9yLnN0eWxlLmRpc3BsYXkgPSAnZmxleCc7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgZnVuY3Rpb24gX3Nob3dFcnJvcihlbGVtKSB7XHJcbiAgICAgICAgdmFyIHRleHQgPSBlbGVtLmdldEF0dHJpYnV0ZSgncGxhY2Vob2xkZXInKS50b0xvd2VyQ2FzZSgpO1xyXG4gICAgICAgIHZhciBwb3NpdGlvbiA9IGVsZW0ucGFyZW50Tm9kZS5vZmZzZXRUb3AgKyBlbGVtLnBhcmVudE5vZGUub2Zmc2V0SGVpZ2h0O1xyXG5cclxuICAgICAgICBlbGVtLnBhcmVudE5vZGUuY2xhc3NMaXN0LmFkZCgnaW5wdXQtZ3JvdXBfZXJyb3InKTtcclxuICAgICAgICBlcnJvckZpZWxkLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG4gICAgICAgIGVycm9yRmllbGQuaW5uZXJUZXh0ID0gJ9CS0Ysg0L3QtSDQstCy0LXQu9C4ICcgKyB0ZXh0O1xyXG5cclxuICAgICAgICAvLyBpZiAocG9zaXRpb24gPiBmb3JtQ29udGFpbmVyLm9mZnNldEhlaWdodClcclxuICAgICAgICBlcnJvckZpZWxkLnN0eWxlLnRvcCA9IHBvc2l0aW9uICsgJ3B4JztcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBfY2xlYXJFcnJvcihlbGVtKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coZWxlbSk7XHJcbiAgICAgICAgZWxlbS5wYXJlbnROb2RlLmNsYXNzTGlzdC5yZW1vdmUoJ2lucHV0LWdyb3VwX2Vycm9yJyk7XHJcbiAgICAgICAgZXJyb3JGaWVsZC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGluaXQ6IF9pbml0LFxyXG4gICAgICAgIGNsZWFyOiBfY2xlYXJFcnJvclxyXG4gICAgfVxyXG59KSgpO1xyXG4iLCIvLyDQpNGD0LvQu9GB0LrRgNC40L0g0LzQtdC90Y5cclxuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKXtcclxuICAgICQoJyN0b2dnbGUnKS5jbGljayhmdW5jdGlvbigpIHtcclxuICAgICAgICAkKHRoaXMpLnRvZ2dsZUNsYXNzKCdhY3RpdmUnKTtcclxuICAgICAgICAkKCcjb3ZlcmxheScpLnRvZ2dsZUNsYXNzKCdvcGVuJyk7XHJcblxyXG4gICAgfSk7XHJcblxyXG59KTtcclxuXHJcblxyXG5cclxuIiwiLy8g0J/QsNGA0LDQu9C70LDQutGBINCyINGI0LDQv9C60LUg0YHQsNC50YLQsFxyXG52YXIgaGVhZGVyUGFyYWxsYXggPSAoZnVuY3Rpb24gKCkge1xyXG5cclxuICAgIHZhciBiZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5iZy1wYXJhbGxheCcpO1xyXG4gICAgdmFyIHVzZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudXNlcl9faGVyby1wYXJhbGxheCcpO1xyXG4gICAgdmFyIHN0YXJzU2VjdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zdGFycy1wYXJhbGxheCcpO1xyXG5cclxuXHJcbiAgICB2YXIgX21vdmUgPSBmdW5jdGlvbiAoYmxvY2ssIHdpbmRvd1Njcm9sbCwgc3RyYWZlQW1vdW50KSB7XHJcbiAgICAgICAgdmFyIHN0cmFmZSA9IHdpbmRvd1Njcm9sbCAvIC1zdHJhZmVBbW91bnQgKyAnJSc7XHJcbiAgICAgICAgdmFyIHRyYW5zZm9ybVN0cmluZyA9ICd0cmFuc2xhdGUzZCgwLCAnICsgc3RyYWZlICsgJywgMCknO1xyXG5cclxuICAgICAgICB2YXIgc3R5bGUgPSBibG9jay5zdHlsZTtcclxuICAgICAgICBpZiAod2luZG93U2Nyb2xsIDwgd2luZG93LmlubmVySGVpZ2h0KSB7XHJcbiAgICAgICAgICAgIHN0eWxlLnRyYW5zZm9ybSA9IHRyYW5zZm9ybVN0cmluZztcclxuICAgICAgICAgICAgc3R5bGUud2Via2l0VHJhbnNmb3JtID0gdHJhbnNmb3JtU3RyaW5nO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJue1xyXG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uICh3U2Nyb2xsKSB7XHJcbiAgICAgICAgICAgIF9tb3ZlKGJnLCB3U2Nyb2xsLCA0NSk7XHJcbiAgICAgICAgICAgIF9tb3ZlKHVzZXIsIHdTY3JvbGwsIDcpO1xyXG4gICAgICAgICAgICBfbW92ZShzdGFyc1NlY3Rpb24sIHdTY3JvbGwsIDMwKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG59KSgpO1xyXG4iLCJcclxuZnVuY3Rpb24gaW5pdE1hcCgpIHtcclxuICAgIHZhciBtYXAgPSBuZXcgZ29vZ2xlLm1hcHMuTWFwKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtYXAnKSwge1xyXG4gICAgICAgIHpvb206IDEzLFxyXG4gICAgICAgIGNlbnRlcjoge2xhdDogNTMuNjU4MzQ4LCBsbmc6IDIzLjc4Njk4Nn0sXHJcbiAgICAgICAgZGlzYWJsZURlZmF1bHRVSTogdHJ1ZSxcclxuICAgICAgICBzY3JvbGx3aGVlbDogZmFsc2UsXHJcbiAgICAgICAgc3R5bGVzOlt7XCJmZWF0dXJlVHlwZVwiOlwiYWRtaW5pc3RyYXRpdmVcIixcImVsZW1lbnRUeXBlXCI6XCJsYWJlbHMudGV4dC5maWxsXCIsXCJzdHlsZXJzXCI6W3tcImNvbG9yXCI6XCIjNDQ0NDQ0XCJ9XX0se1wiZmVhdHVyZVR5cGVcIjpcImxhbmRzY2FwZVwiLFwiZWxlbWVudFR5cGVcIjpcImFsbFwiLFwic3R5bGVyc1wiOlt7XCJjb2xvclwiOlwiI2YyZjJmMlwifV19LHtcImZlYXR1cmVUeXBlXCI6XCJwb2lcIixcImVsZW1lbnRUeXBlXCI6XCJhbGxcIixcInN0eWxlcnNcIjpbe1widmlzaWJpbGl0eVwiOlwib2ZmXCJ9XX0se1wiZmVhdHVyZVR5cGVcIjpcInJvYWRcIixcImVsZW1lbnRUeXBlXCI6XCJhbGxcIixcInN0eWxlcnNcIjpbe1wic2F0dXJhdGlvblwiOi0xMDB9LHtcImxpZ2h0bmVzc1wiOjQ1fV19LHtcImZlYXR1cmVUeXBlXCI6XCJyb2FkLmhpZ2h3YXlcIixcImVsZW1lbnRUeXBlXCI6XCJhbGxcIixcInN0eWxlcnNcIjpbe1widmlzaWJpbGl0eVwiOlwic2ltcGxpZmllZFwifV19LHtcImZlYXR1cmVUeXBlXCI6XCJyb2FkLmFydGVyaWFsXCIsXCJlbGVtZW50VHlwZVwiOlwibGFiZWxzLmljb25cIixcInN0eWxlcnNcIjpbe1widmlzaWJpbGl0eVwiOlwib2ZmXCJ9XX0se1wiZmVhdHVyZVR5cGVcIjpcInRyYW5zaXRcIixcImVsZW1lbnRUeXBlXCI6XCJhbGxcIixcInN0eWxlcnNcIjpbe1widmlzaWJpbGl0eVwiOlwib2ZmXCJ9XX0se1wiZmVhdHVyZVR5cGVcIjpcIndhdGVyXCIsXCJlbGVtZW50VHlwZVwiOlwiYWxsXCIsXCJzdHlsZXJzXCI6W3tcImNvbG9yXCI6XCIjNDM2OWFhXCJ9LHtcInZpc2liaWxpdHlcIjpcIm9uXCJ9XX1dXHJcbiAgICB9KTtcclxuXHJcbiAgICB2YXIgbWFya2VyID0gbmV3IGdvb2dsZS5tYXBzLk1hcmtlcih7XHJcbiAgICAgICAgaWNvbjogJ2Fzc2V0cy9pbWcvbWFwLWNvbnRhY3QucG5nJyxcclxuICAgICAgICBwb3NpdGlvbjoge2xhdDogNTMuNjU4MzQ4LCBsbmc6IDIzLjc4Njk4Nn0sXHJcbiAgICAgICAgbWFwOiBtYXAsXHJcbiAgICAgICAgdGl0bGU6IFwi0K8g0LfQtNC10YHRjCFcIixcclxuICAgICAgICBhbmltYXRpb246IGdvb2dsZS5tYXBzLkFuaW1hdGlvbi5CT1VOQ0VcclxuICAgIH0pO1xyXG59XHJcbiIsInZhciBCbG9nTWVudSA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgc2lkZWJhciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ibG9nX190YWJzJyk7XHJcblxyXG4gICAgZnVuY3Rpb24gX2ZpeE1lbnUoKSB7XHJcbiAgICAgICAgdmFyIG5hdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ibG9nX190YWJzLWxpc3QnKSxcclxuICAgICAgICAgICAgbmF2Q29vcmRzID0gc2lkZWJhci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3A7XHJcblxyXG4gICAgICAgIGlmICh3aW5kb3cuaW5uZXJXaWR0aCA+PSA3ODApIHtcclxuICAgICAgICAgICAgaWYgKG5hdkNvb3JkcyA8PSAtNTApIHtcclxuICAgICAgICAgICAgICAgIG5hdi5zdHlsZS5wb3NpdGlvbiA9ICdmaXhlZCc7XHJcbiAgICAgICAgICAgICAgICBuYXYuc3R5bGUudG9wID0gJzIwcHgnO1xyXG4gICAgICAgICAgICAgICAgbmF2LnN0eWxlLndpZHRoID0gJzIwJSc7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBuYXYuc3R5bGUucG9zaXRpb24gPSAnc3RhdGljJztcclxuICAgICAgICAgICAgICAgIG5hdi5zdHlsZS53aWR0aCA9ICdhdXRvJztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIG5hdi5zdHlsZS5wb3NpdGlvbiA9ICdhYnNvbHV0ZSc7XHJcbiAgICAgICAgICAgIG5hdi5zdHlsZS50b3AgPSAnJztcclxuICAgICAgICAgICAgbmF2LnN0eWxlLndpZHRoID0gJ2F1dG8nO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gX2luaXRBY3RpdmUgKCkge1xyXG4gICAgICAgIHZhciBwb3N0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5hcnRpY2xlX190aXRsZScpLFxyXG4gICAgICAgICAgICBwb3N0TGlua3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuYmxvZy1tZW51X19saW5rJyksXHJcbiAgICAgICAgICAgIGFjdGl2ZUxpbmsgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdibG9nLW1lbnVfX2xpbmtfYWN0aXZlJyk7XHJcblxyXG5cclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHBvc3RzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHZhciBwb3N0ID0gcG9zdHNbaV0sXHJcbiAgICAgICAgICAgICAgICBwb3N0VG9wID0gcG9zdC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3A7XHJcblxyXG4gICAgICAgICAgICBpZiAocG9zdFRvcCA8PSAxMDApIHtcclxuICAgICAgICAgICAgICAgIGFjdGl2ZUxpbmtbMF0uY2xhc3NMaXN0LnJlbW92ZSgnYmxvZy1tZW51X19saW5rX2FjdGl2ZScpO1xyXG4gICAgICAgICAgICAgICAgcG9zdExpbmtzW2ldLmNsYXNzTGlzdC5hZGQoJ2Jsb2ctbWVudV9fbGlua19hY3RpdmUnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB2YXIgX29wZW5NZW51ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHNpZGViYXIuY2xhc3NMaXN0LmFkZCgnYmxvZ19fdGFicy1hY3RpdmUnKTtcclxuICAgIH07XHJcbiAgICB2YXIgX2Nsb3NlTWVudSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBzaWRlYmFyLmNsYXNzTGlzdC5yZW1vdmUoJ2Jsb2dfX3RhYnMtYWN0aXZlJyk7XHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgaW5pdDogX2ZpeE1lbnUsXHJcbiAgICAgICAgaW5pdEFjdGl2ZTogX2luaXRBY3RpdmUsXHJcbiAgICAgICAgdG9nZ2xlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmICghc2lkZWJhci5jbGFzc0xpc3QuY29udGFpbnMoJ2Jsb2dfX3RhYnMtYWN0aXZlJykpIHtcclxuICAgICAgICAgICAgICAgIF9vcGVuTWVudSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgX2Nsb3NlTWVudSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59KSgpO1xyXG5cclxuXHJcblxyXG4iLCIvLyDQn9Cw0YDQsNC70LvQsNC60YEg0L3QsCDQs9C70LDQstC90L7QuVxyXG52YXIgbWFpblBhcmFsbGF4ID0gKGZ1bmN0aW9uICgpIHtcclxuICAgIFxyXG4gICAgdmFyIF9zaG93ID0gZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICB2YXIgcGFyYWxsYXhDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGFyYWxsYXgnKSxcclxuICAgICAgICAgICAgbGF5ZXJzID0gcGFyYWxsYXhDb250YWluZXIuY2hpbGRyZW47XHJcblxyXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICB2YXIgcGFnZVggPSBlLnBhZ2VYLFxyXG4gICAgICAgICAgICAgICAgcGFnZVkgPSBlLnBhZ2VZLFxyXG4gICAgICAgICAgICAgICAgaW5pdGlhbFggPSAod2luZG93LmlubmVyV2lkdGggLyAyKSAtIHBhZ2VYLFxyXG4gICAgICAgICAgICAgICAgaW5pdGlhbFkgPSAod2luZG93LmlubmVySGVpZ2h0IC8gMikgLSBwYWdlWTtcclxuXHJcblxyXG4gICAgICAgICAgICBbXS5zbGljZS5jYWxsKGxheWVycykuZm9yRWFjaChmdW5jdGlvbiAobGF5ZXIsIGkpIHtcclxuICAgICAgICAgICAgICAgIHZhciBsYXllclN0eWxlID0gbGF5ZXIuc3R5bGUsXHJcbiAgICAgICAgICAgICAgICAgICAgZGl2aWRlciA9IGkgLyA0MCxcclxuICAgICAgICAgICAgICAgICAgICBib3R0b21Qb3NpdGlvbiA9ICh3aW5kb3cuaW5uZXJIZWlnaHQgLyAyKSAqIGRpdmlkZXIsXHJcbiAgICAgICAgICAgICAgICAgICAgaG9yaXpvbnRhbFBvc2l0aW9uID0gKHdpbmRvdy5pbm5lcldpZHRoIC8gMikgKiBkaXZpZGVyLFxyXG4gICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uWCA9IGluaXRpYWxYICogZGl2aWRlcixcclxuICAgICAgICAgICAgICAgICAgICBwb3NpdGlvblkgPSBpbml0aWFsWSAqIGRpdmlkZXIsXHJcbiAgICAgICAgICAgICAgICAgICAgdHJhbnNmb3JtU3RyaW5nID0gJ3RyYW5zbGF0ZTNkKCcgKyBwb3NpdGlvblggKyAncHgsJyArIHBvc2l0aW9uWSArICdweCwgMCknO1xyXG5cclxuICAgICAgICAgICAgICAgIGxheWVyU3R5bGUudHJhbnNmb3JtID0gdHJhbnNmb3JtU3RyaW5nO1xyXG4gICAgICAgICAgICAgICAgbGF5ZXJTdHlsZS53ZWJraXRUcmFuc2Zvcm0gPSB0cmFuc2Zvcm1TdHJpbmc7XHJcbiAgICAgICAgICAgICAgICBsYXllclN0eWxlLmJvdHRvbSA9ICctJyArIGJvdHRvbVBvc2l0aW9uICsgJ3B4JztcclxuICAgICAgICAgICAgICAgIGxheWVyU3R5bGUubGVmdCA9ICctJyArIGhvcml6b250YWxQb3NpdGlvbiArICdweCc7XHJcbiAgICAgICAgICAgICAgICBsYXllclN0eWxlLnJpZ2h0ID0gJy0nICsgaG9yaXpvbnRhbFBvc2l0aW9uICsgJ3B4JztcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJue1xyXG4gICAgICAgIGluaXQ6IF9zaG93XHJcbiAgICB9O1xyXG59KSgpO1xyXG5cclxuICAgIFxyXG5cclxuIiwidmFyIHByZWxvYWRlciA9IChmdW5jdGlvbigpe1xyXG4gICAgdmFyIHBlcmNlbnRzVG90YWwgPSAwO1xyXG4gICAgdmFyIHByZWxvYWRlciA9ICQoJy5wcmVsb2FkZXInKTtcclxuXHJcbiAgICB2YXIgaW1nUGF0aCA9ICQoJyonKS5tYXAoZnVuY3Rpb24gKG5keCwgZWxlbWVudCkge1xyXG4gICAgICAgIHZhciBiYWNrZ3JvdW5kID0gJChlbGVtZW50KS5jc3MoJ2JhY2tncm91bmQtaW1hZ2UnKTtcclxuICAgICAgICB2YXIgaXNJbWcgPSAkKGVsZW1lbnQpLmlzKCdpbWcnKTtcclxuICAgICAgICB2YXIgcGF0aCA9ICcnO1xyXG5cclxuICAgICAgICBpZiAoYmFja2dyb3VuZCAhPSAnbm9uZScpIHtcclxuICAgICAgICAgICAgcGF0aCA9IGJhY2tncm91bmQucmVwbGFjZSgndXJsKFwiJywgJycpLnJlcGxhY2UoJ1wiKScsICcnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChpc0ltZykge1xyXG4gICAgICAgICAgICBwYXRoID0gJChlbGVtZW50KS5hdHRyKCdzcmMnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChwYXRoKSByZXR1cm4gcGF0aDtcclxuICAgIH0pO1xyXG5cclxuICAgIHZhciBzZXRQZXJjZW50cyA9IGZ1bmN0aW9uKHRvdGFsLCBjdXJyZW50KSB7XHJcbiAgICAgICAgdmFyIHBlcmNlbnRzID0gTWF0aC5jZWlsKGN1cnJlbnQgLyB0b3RhbCAqIDEwMCk7XHJcblxyXG4gICAgICAgICQoJy5wcmVsb2FkZXJfX3BlcmNlbnQnKS50ZXh0KHBlcmNlbnRzICsgJyUnKTtcclxuXHJcbiAgICAgICAgaWYgKHBlcmNlbnRzID49IDEwMCkge1xyXG4gICAgICAgICAgICBwcmVsb2FkZXIuZmFkZU91dCgpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgdmFyIGxvYWRJbWFnZXMgPSBmdW5jdGlvbihpbWFnZXMpIHtcclxuXHJcbiAgICAgICAgaWYgKCFpbWFnZXMubGVuZ3RoKSBwcmVsb2FkZXIuZmFkZU91dCgpO1xyXG5cclxuICAgICAgICBpbWFnZXMuZm9yRWFjaChmdW5jdGlvbihpbWcsIGksIGltYWdlcyl7XHJcbiAgICAgICAgICAgIHZhciBmYWtlSW1hZ2UgPSAkKCc8aW1nPicsIHtcclxuICAgICAgICAgICAgICAgIGF0dHIgOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3JjIDogaW1nXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgZmFrZUltYWdlLm9uKCdsb2FkIGVycm9yJywgZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgIHBlcmNlbnRzVG90YWwrKztcclxuICAgICAgICAgICAgICAgIHNldFBlcmNlbnRzKGltYWdlcy5sZW5ndGgsIHBlcmNlbnRzVG90YWwpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgaW5pdDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgaW1ncyA9IGltZ1BhdGgudG9BcnJheSgpO1xyXG5cclxuICAgICAgICAgICAgbG9hZEltYWdlcyhpbWdzKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0oKSk7XHJcblxyXG4kKGZ1bmN0aW9uICgpIHtcclxuICAgIHByZWxvYWRlci5pbml0KCk7XHJcbn0pO1xyXG4iLCJ2YXIgU2Nyb2xsUGFnZSA9IChmdW5jdGlvbiAoKSB7XHJcblxyXG5yZXR1cm4ge1xyXG5kb3duOiBmdW5jdGlvbiAoZWxlbSkge1xyXG4gICAgdmFyIHNlY3Rpb24gPSBlbGVtLnBhcmVudE5vZGUubmV4dFNpYmxpbmcubmV4dFNpYmxpbmcsXHJcbiAgICBwb3NUb3AgPSBzZWN0aW9uLm9mZnNldFRvcDtcclxuXHJcbiQoJ2JvZHksaHRtbCcpLmFuaW1hdGUoe3Njcm9sbFRvcDogcG9zVG9wfSwgMTUwMCk7XHJcbn0sXHJcblxyXG51cDogZnVuY3Rpb24gKCkge1xyXG4kKCdib2R5LGh0bWwnKS5hbmltYXRlKHtzY3JvbGxUb3A6IDB9LCAxMjAwKTtcclxufVxyXG59XHJcbn0pKCk7XHJcbiIsIi8vINCQ0L3QuNC80LDRhtC40Y8g0YHQutC40LvQu9C+0LJcclxudmFyIHNraWxsc0RyYXcgPSAoZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIHNraWxscyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5za2lsbCcpLFxyXG4gICAgICAgIGNpcmNsZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuc2tpbGxzX19jaXJjbGUtYWJvdmUnKSxcclxuICAgICAgICB3aW5kb3dIZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XHJcblxyXG4gICAgLy8g0LLRi9GH0LjRgdC70LXQvdC40LUg0LTQu9C40L3RiyDQvtC60YDRg9C20L3QvtGB0YLQuFxyXG4gICAgdmFyIGNpcmNsZUxlbmd0aCA9IGZ1bmN0aW9uIChjaXJjbGUpIHtcclxuICAgICAgICB2YXIgY2lyY2xlUmFkaXVzID0gY2lyY2xlLmdldEF0dHJpYnV0ZSgncicpLFxyXG4gICAgICAgICAgICBjaXJjbGVMZW5ndGggPSAyICogTWF0aC5QSSAqIGNpcmNsZVJhZGl1cztcclxuXHJcbiAgICAgICAgcmV0dXJuIGNpcmNsZUxlbmd0aDtcclxuICAgIH07XHJcblxyXG4gICAgLy8g0L/RgNC40LzQtdC90LXQvdC40LUg0Log0L7QutGA0YPQttC90L7RgdGC0Lgg0YHQstC+0LnRgdGC0LIg0L/QviDRg9C80L7Qu9GH0LDQvdC40Y5cclxuICAgIFtdLnNsaWNlLmNhbGwoY2lyY2xlcykuZm9yRWFjaChmdW5jdGlvbiAoY2lyY2xlKSB7XHJcblxyXG4gICAgICAgIGNpcmNsZS5zdHlsZS5zdHJva2VEYXNob2Zmc2V0ID0gY2lyY2xlTGVuZ3RoKGNpcmNsZSk7XHJcbiAgICAgICAgY2lyY2xlLnN0eWxlLnN0cm9rZURhc2hhcnJheSA9IGNpcmNsZUxlbmd0aChjaXJjbGUpO1xyXG5cclxuICAgIH0pO1xyXG5cclxuICAgIC8vINCw0L3QuNC80LjRgNC+0LLQsNC90LjQtSDQvtC60YDRg9C20L3QvtGB0YLQuCDQsiDQt9Cw0LLQuNGB0LjQvNC+0YHRgtC4INC+0YIg0L/RgNC+0YbQtdC90YLQvtCyXHJcbiAgICB2YXIgY2lyY2xlQW5pbWF0aW9uID0gZnVuY3Rpb24gKHNraWxsKSB7XHJcblxyXG4gICAgICAgIHZhciBjaXJjbGVGaWxsID0gc2tpbGwucXVlcnlTZWxlY3RvcignLnNraWxsc19fY2lyY2xlLWFib3ZlJyksXHJcbiAgICAgICAgICAgIHNraWxsUGVyY2VudCA9IHNraWxsLmdldEF0dHJpYnV0ZSgnZGF0YS1wZXJjZW50JyksXHJcbiAgICAgICAgICAgIGxlbmd0aCA9IGNpcmNsZUxlbmd0aChjaXJjbGVGaWxsKSxcclxuICAgICAgICAgICAgcGVyY2VudCA9IGxlbmd0aCAqICgxMDAgLSBza2lsbFBlcmNlbnQpIC8gMTAwO1xyXG5cclxuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgY2lyY2xlRmlsbC5zdHlsZS5zdHJva2VEYXNob2Zmc2V0ID0gcGVyY2VudDtcclxuICAgICAgICAgICAgY2lyY2xlRmlsbC5zdHlsZS50cmFuc2l0aW9uID0gJ2FsbCAxcyc7XHJcblxyXG4gICAgICAgICAgICBpZiAoc2tpbGxQZXJjZW50IDwgNTApIHtcclxuICAgICAgICAgICAgICAgIHNraWxsLnN0eWxlLm9wYWNpdHkgPSAwLjQ7XHJcbiAgICAgICAgICAgICAgICBza2lsbC5zdHlsZS50cmFuc2l0aW9uID0gJ2FsbCAxcyc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LCA1MDApO1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBncm93OiBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgICAgICBbXS5zbGljZS5jYWxsKHNraWxscykuZm9yRWFjaChmdW5jdGlvbiAoc2tpbGwpIHtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgY2lyY2xlUmVjdCA9IHNraWxsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLFxyXG4gICAgICAgICAgICAgICAgICAgIGNpcmNsZVBvcyA9IGNpcmNsZVJlY3QuYm90dG9tLFxyXG4gICAgICAgICAgICAgICAgICAgIHN0YXJ0QW5pbWF0aW9uID0gY2lyY2xlUG9zIC0gd2luZG93SGVpZ2h0O1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChzdGFydEFuaW1hdGlvbiA8PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2lyY2xlQW5pbWF0aW9uKHNraWxsKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn0pKCk7XHJcblxyXG4iLCJ2YXIgU2xpZGVyID0gKGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBpdGVtcyA9ICQoJy53b3JrLXNsaWRlcl9faXRlbScsICcud29yay1zbGlkZXJfX2xpc3RfbmV4dCcpLFxyXG4gICAgICAgIGluZGV4ID0gMSxcclxuICAgICAgICBuZHgsXHJcbiAgICAgICAgZHVyYXRpb24gPSA1MDAsXHJcbiAgICAgICAgdGl0bGUgPSAkKCcud29ya19fdGl0bGUnKSxcclxuICAgICAgICBza2lsbHMgPSAkKCcud29ya19fdGVjaG5vbG9neScpLFxyXG4gICAgICAgIGltZ0NvbnRhaW5lciA9ICQoJy53b3JrX19waWMnKTtcclxuXHJcbiAgICBmdW5jdGlvbiBfaW5pdCgpIHtcclxuICAgICAgICB2YXIgYWN0aXZlSXRlbSA9IGl0ZW1zLmVxKGluZGV4KSxcclxuICAgICAgICAgICAgaW1nU3JjID0gYWN0aXZlSXRlbS5maW5kKCdpbWcnKS5hdHRyKCdzcmMnKSxcclxuICAgICAgICAgICAgYWN0aXZlVGl0bGUgPSBhY3RpdmVJdGVtLmRhdGEoJ3RpdGxlJyksXHJcbiAgICAgICAgICAgIGFjdGl2ZVNsaWxsID0gYWN0aXZlSXRlbS5kYXRhKCd0ZWNobm9sb2d5Jyk7XHJcblxyXG4gICAgICAgIGltZ0NvbnRhaW5lci5hdHRyKCdzcmMnLCBpbWdTcmMpO1xyXG4gICAgICAgIHRpdGxlLnRleHQoYWN0aXZlVGl0bGUpO1xyXG4gICAgICAgIHNraWxscy50ZXh0KGFjdGl2ZVNsaWxsKTtcclxuXHJcbiAgICAgICAgdmFyIG5leHRJdGVtID0gJCgnLndvcmstc2xpZGVyX19pdGVtJywgJy53b3JrLXNsaWRlcl9fbGlzdF9uZXh0JykuZXEoaW5kZXggKyAxKTtcclxuICAgICAgICBuZXh0SXRlbS5hZGRDbGFzcygnd29yay1zbGlkZXJfX2l0ZW1fY3VycmVudCcpO1xyXG4gICAgICAgIHZhciBwcmV2SXRlbSA9ICQoJy53b3JrLXNsaWRlcl9faXRlbScsICcud29yay1zbGlkZXJfX2xpc3RfcHJldicpLmVxKGluZGV4IC0gMSk7XHJcbiAgICAgICAgcHJldkl0ZW0uYWRkQ2xhc3MoJ3dvcmstc2xpZGVyX19pdGVtX2N1cnJlbnQnKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBhbmltYXRlU2xpZGUobmR4LCBjb250YWluZXIsIGRpcmVjdGlvbikge1xyXG4gICAgICAgIHZhciBuZXh0SXRlbXMgPSAkKCcud29yay1zbGlkZXJfX2l0ZW0nLCBjb250YWluZXIpLFxyXG4gICAgICAgICAgICBjdXJyZW50SXRlbSA9IG5leHRJdGVtcy5maWx0ZXIoJy53b3JrLXNsaWRlcl9faXRlbV9jdXJyZW50JyksXHJcbiAgICAgICAgICAgIHJlcUl0ZW0gPSBuZXh0SXRlbXMuZXEobmR4KTtcclxuICAgICAgICBkaXJlY3Rpb24gPSBkaXJlY3Rpb24gPT09ICd1cCcgPyAtMTAwIDogMTAwO1xyXG5cclxuICAgICAgICBjdXJyZW50SXRlbS5hbmltYXRlKHtcclxuICAgICAgICAgICAgJ3RvcCc6IGRpcmVjdGlvbiArICclJ1xyXG4gICAgICAgIH0sIGR1cmF0aW9uKTtcclxuXHJcbiAgICAgICAgcmVxSXRlbS5hbmltYXRlKHtcclxuICAgICAgICAgICAgJ3RvcCc6IDBcclxuICAgICAgICB9LCBkdXJhdGlvbiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBjdXJyZW50SXRlbS5yZW1vdmVDbGFzcygnd29yay1zbGlkZXJfX2l0ZW1fY3VycmVudCcpLmNzcygndG9wJywgLWRpcmVjdGlvbiArICclJyk7XHJcbiAgICAgICAgICAgIHJlcUl0ZW0uYWRkQ2xhc3MoJ3dvcmstc2xpZGVyX19pdGVtX2N1cnJlbnQnKTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIF9tb3ZlTmV4dCgpIHtcclxuICAgICAgICB2YXIgY29udGFpbmVyID0gJCgnLndvcmstc2xpZGVyX19saXN0X25leHQnKSxcclxuICAgICAgICAgICAgZGlyZWN0aW9uID0gJ3VwJztcclxuXHJcbiAgICAgICAgaWYgKGluZGV4ID09IGl0ZW1zLmxlbmd0aCAtIDEpIHtcclxuICAgICAgICAgICAgbmR4ID0gMDtcclxuICAgICAgICB9IGVsc2UgaWYgKGluZGV4IDwgMCkge1xyXG4gICAgICAgICAgICBuZHggPSBpdGVtcy5sZW5ndGggLSAxO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIG5keCA9IGluZGV4ICsgMTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGFuaW1hdGVTbGlkZShuZHgsIGNvbnRhaW5lciwgZGlyZWN0aW9uKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBfbW92ZVByZXYoKSB7XHJcbiAgICAgICAgdmFyIGNvbnRhaW5lciA9ICQoJy53b3JrLXNsaWRlcl9fbGlzdF9wcmV2JyksXHJcbiAgICAgICAgICAgIGRpcmVjdGlvbiA9ICdkb3duJztcclxuXHJcbiAgICAgICAgaWYgKGluZGV4ID4gaXRlbXMubGVuZ3RoIC0gMSkge1xyXG4gICAgICAgICAgICBuZHggPSAwO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoaW5kZXggPD0gMCkge1xyXG4gICAgICAgICAgICBuZHggPSBpdGVtcy5sZW5ndGggLSAxO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIG5keCA9IGluZGV4IC0gMTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGFuaW1hdGVTbGlkZShuZHgsIGNvbnRhaW5lciwgZGlyZWN0aW9uKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBfc2xpZGVTaG93KCkge1xyXG4gICAgICAgIHZhciBmYWRlZE91dCA9ICQuRGVmZXJyZWQoKSxcclxuICAgICAgICAgICAgbG9hZGVkID0gJC5EZWZlcnJlZCgpLFxyXG4gICAgICAgICAgICBuZXh0U3JjID0gaXRlbXMuZXEoaW5kZXgpLmZpbmQoJ2ltZycpLmF0dHIoJ3NyYycpLFxyXG4gICAgICAgICAgICBuZXh0VGl0bGUgPSBpdGVtcy5lcShpbmRleCkuZGF0YSgndGl0bGUnKSxcclxuICAgICAgICAgICAgbmV4dFNraWxscyA9IGl0ZW1zLmVxKGluZGV4KS5kYXRhKCd0ZWNobm9sb2d5Jyk7XHJcblxyXG4gICAgICAgIF9tb3ZlTmV4dCgpO1xyXG4gICAgICAgIF9tb3ZlUHJldigpO1xyXG5cclxuICAgICAgICBpbWdDb250YWluZXIuZmFkZU91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHRpdGxlLnNsaWRlVXAoKTtcclxuICAgICAgICAgICAgc2tpbGxzLmZhZGVPdXQoKTtcclxuICAgICAgICAgICAgZmFkZWRPdXQucmVzb2x2ZSgpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBmYWRlZE91dC5kb25lKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdGl0bGUudGV4dChuZXh0VGl0bGUpO1xyXG4gICAgICAgICAgICBza2lsbHMudGV4dChuZXh0U2tpbGxzKTtcclxuICAgICAgICAgICAgaW1nQ29udGFpbmVyLmF0dHIoJ3NyYycsIG5leHRTcmMpLm9uKCdsb2FkJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgbG9hZGVkLnJlc29sdmUoKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgbG9hZGVkLmRvbmUoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB0aXRsZS5zbGlkZURvd24oKTtcclxuICAgICAgICAgICAgc2tpbGxzLmZhZGVJbigpO1xyXG4gICAgICAgICAgICBpbWdDb250YWluZXIuZmFkZUluKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBpbml0OiBfaW5pdCxcclxuICAgICAgICBtb3ZlOiBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgICAgICAkKCcudG9nZ2xlX19saW5rJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoJCh0aGlzKS5oYXNDbGFzcygndG9nZ2xlX19saW5rX25leHQnKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGluZGV4Kys7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKCQodGhpcykuaGFzQ2xhc3MoJ3RvZ2dsZV9fbGlua19wcmV2JykpIHtcclxuICAgICAgICAgICAgICAgICAgICBpbmRleC0tO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmIChpbmRleCA+IGl0ZW1zLmxlbmd0aCAtIDEpIHtcclxuICAgICAgICAgICAgICAgICAgICBpbmRleCA9IDA7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGluZGV4IDwgMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGluZGV4ID0gaXRlbXMubGVuZ3RoIC0gMTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBfc2xpZGVTaG93KCk7XHJcblxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufSlcclxuKCk7IiwiY29uc3QgZm9ybVVwbG9hZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN1cGxvYWQnKTtcclxuXHJcbmZ1bmN0aW9uIGZpbGVVcGxvYWQodXJsLCBkYXRhLCBjYikge1xyXG4gICAgbGV0IHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG4gICAgeGhyLm9wZW4oJ1BPU1QnLCB1cmwsIHRydWUpO1xyXG5cclxuICAgIHhoci5vbmxvYWQgPSBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgIGxldCByZXN1bHQgPSBKU09OLnBhcnNlKHhoci5yZXNwb25zZVRleHQpO1xyXG4gICAgICAgIGNiKHJlc3VsdC5zdGF0dXMpO1xyXG4gICAgfTtcclxuXHJcbiAgICB4aHIuc2VuZChkYXRhKTtcclxufVxyXG5cclxuZnVuY3Rpb24gcHJlcGFyZVNlbmRGaWxlKGUpIHtcclxuICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgIGxldCByZXN1bHRDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc3RhdHVzJyk7XHJcbiAgICBsZXQgZm9ybURhdGEgPSBuZXcgRm9ybURhdGEoKTtcclxuICAgIGxldCBmaWxlID0gZG9jdW1lbnRcclxuICAgICAgICAucXVlcnlTZWxlY3RvcignI2ZpbGUtc2VsZWN0JylcclxuICAgICAgICAuZmlsZXNbMF07XHJcbiAgICBsZXQgbmFtZSA9IGRvY3VtZW50XHJcbiAgICAgICAgLnF1ZXJ5U2VsZWN0b3IoJyNmaWxlLWRlc2MnKVxyXG4gICAgICAgIC52YWx1ZTtcclxuXHJcbiAgICBmb3JtRGF0YS5hcHBlbmQoJ3Bob3RvJywgZmlsZSwgZmlsZS5uYW1lKTtcclxuICAgIGZvcm1EYXRhLmFwcGVuZCgnbmFtZScsIG5hbWUpO1xyXG5cclxuICAgIHJlc3VsdENvbnRhaW5lci5pbm5lckhUTUwgPSAnVXBsb2FkaW5nLi4uJztcclxuICAgIGZpbGVVcGxvYWQoJy91cGxvYWQnLCBmb3JtRGF0YSwgZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICByZXN1bHRDb250YWluZXIuaW5uZXJIVE1MID0gZGF0YTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5pZiAoZm9ybVVwbG9hZCkge1xyXG4gICAgZm9ybVVwbG9hZC5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCBwcmVwYXJlU2VuZEZpbGUpO1xyXG59XHJcblxyXG4vLy0tLS0tLS0tLS0tLSBibG9jayBtYWlsXHJcbmNvbnN0IGZvcm1NYWlsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI21haWwnKTtcclxuXHJcbmlmIChmb3JtTWFpbCkge1xyXG4gICAgZm9ybU1haWwuYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgcHJlcGFyZVNlbmRNYWlsKTtcclxufVxyXG5cclxuZnVuY3Rpb24gcHJlcGFyZVNlbmRNYWlsKGUpIHtcclxuICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgIGxldCByZXN1bHRDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc3RhdHVzJyk7XHJcbiAgICBsZXQgZGF0YSA9IHtcclxuICAgICAgICBuYW1lOiBmb3JtTWFpbC5uYW1lLnZhbHVlLFxyXG4gICAgICAgIGVtYWlsOiBmb3JtTWFpbC5lbWFpbC52YWx1ZSxcclxuICAgICAgICB0ZXh0OiBmb3JtTWFpbC50ZXh0LnZhbHVlXHJcbiAgICB9O1xyXG4gICAgcmVzdWx0Q29udGFpbmVyLmlubmVySFRNTCA9ICdTZW5kaW5nLi4uJztcclxuICAgIHNlbmRBamF4SnNvbignL2NvbnRhY3QtbWUnLCBkYXRhLCBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgIHJlc3VsdENvbnRhaW5lci5pbm5lckhUTUwgPSBkYXRhO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNlbmRBamF4SnNvbih1cmwsIGRhdGEsIGNiKSB7XHJcbiAgICBsZXQgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcbiAgICB4aHIub3BlbignUE9TVCcsIHVybCwgdHJ1ZSk7XHJcbiAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcignQ29udGVudC1UeXBlJywgJ2FwcGxpY2F0aW9uL2pzb24nKTtcclxuICAgIHhoci5vbmxvYWQgPSBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgIGxldCByZXN1bHQgPSBKU09OLnBhcnNlKHhoci5yZXNwb25zZVRleHQpO1xyXG4gICAgICAgIGNiKHJlc3VsdC5zdGF0dXMpO1xyXG4gICAgfTtcclxuICAgIHhoci5zZW5kKEpTT04uc3RyaW5naWZ5KGRhdGEpKTtcclxufVxyXG5cclxuLy8tLS0tIGJsb2NrIEJsb2dcclxuXHJcbmNvbnN0IGZvcm1CbG9nID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2Jsb2cnKTtcclxuXHJcbmlmIChmb3JtQmxvZykge1xyXG4gICAgZm9ybUJsb2cuYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgcHJlcGFyZVNlbmRQb3N0KTtcclxufVxyXG5cclxuZnVuY3Rpb24gcHJlcGFyZVNlbmRQb3N0KGUpIHtcclxuICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgIGxldCByZXN1bHRDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc3RhdHVzJyk7XHJcbiAgICBsZXQgZGF0YSA9IHtcclxuICAgICAgICB0aXRsZTogZm9ybUJsb2cudGl0bGUudmFsdWUsXHJcbiAgICAgICAgZGF0ZTogZm9ybUJsb2cuZGF0ZS52YWx1ZSxcclxuICAgICAgICB0ZXh0OiBmb3JtQmxvZy50ZXh0LnZhbHVlXHJcbiAgICB9O1xyXG4gICAgcmVzdWx0Q29udGFpbmVyLmlubmVySFRNTCA9ICdTZW5kaW5nLi4uJztcclxuICAgIHNlbmRBamF4SnNvbignL2FkZHBvc3QnLCBkYXRhLCBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgIHJlc3VsdENvbnRhaW5lci5pbm5lckhUTUwgPSBkYXRhO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbi8vLS0tLSBibG9jayBMb2dpblxyXG5cclxuY29uc3QgZm9ybUxvZ2luID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2xvZ2luJyk7XHJcblxyXG5pZiAoZm9ybUxvZ2luKSB7XHJcbiAgICBmb3JtTG9naW4uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgcHJlcGFyZUF1dGgpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBwcmVwYXJlQXV0aChlKSB7XHJcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICBsZXQgcmVzdWx0Q29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnN0YXR1cycpO1xyXG4gICAgbGV0IGRhdGEgPSB7XHJcbiAgICAgICAgbG9naW46IGZvcm1Mb2dpbi5sb2dpbi52YWx1ZSxcclxuICAgICAgICBwYXNzd29yZDogZm9ybUxvZ2luLnBhc3N3b3JkLnZhbHVlXHJcbiAgICB9O1xyXG4gICAgcmVzdWx0Q29udGFpbmVyLmlubmVySFRNTCA9ICdTZW5kaW5nLi4uJztcclxuICAgIHNlbmRBamF4SnNvbignLycsIGRhdGEsIGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgcmVzdWx0Q29udGFpbmVyLmlubmVySFRNTCA9IGRhdGE7XHJcbiAgICB9KTtcclxufSIsInZhciBwcmVsb2FkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByZWxvYWRlcicpO1xyXG5cclxuaWYgKHByZWxvYWQgIT09IG51bGwpIHByZWxvYWRlci5pbml0KCk7XHJcblxyXG53aW5kb3cub25sb2FkID0gZnVuY3Rpb24gKCkge1xyXG5cclxuXHJcblxyXG4gICAgLy9JbmRleCBQYXJhbGxheFxyXG4gICAgdmFyIHBhcmFsbGF4ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3BhcmFsbGF4Jyk7XHJcblxyXG4gICAgaWYgKHBhcmFsbGF4ICE9PSBudWxsKSB7XHJcbiAgICAgICAgbWFpblBhcmFsbGF4LmluaXQoKTtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgc2xpZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLndvcmtfX3NsaWRlcicpO1xyXG5cclxuICAgIGlmIChzbGlkZXIgIT09IG51bGwpIHtcclxuICAgICAgICAoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAvLyBTbGlkZXIuaW5pdCgpO1xyXG4gICAgICAgICAgICBTbGlkZXIuaW5pdCgpO1xyXG4gICAgICAgICAgICBTbGlkZXIubW92ZSgpO1xyXG4gICAgICAgIH0pKCk7XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIGZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdmb3JtJyk7XHJcblxyXG4gICAgaWYgKGZvcm0gIT09IG51bGwpIHtcclxuICAgICAgICAvL9C+0YfQuNGB0YLQutCwINC+0YjQuNCx0LrQuFxyXG4gICAgICAgIHZhciBpbnB1dHMgPSBmb3JtLmVsZW1lbnRzO1xyXG4gICAgICAgIHZhciBjbG9zZUVycm9yID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmlucHV0LWVycm9yLWNhcHRjaGFfX2Nsb3NlJyk7XHJcblxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgaW5wdXRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlucHV0c1tpXS5vbmZvY3VzID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5wYXJlbnROb2RlLmNsYXNzTGlzdC5jb250YWlucygnaW5wdXQtZ3JvdXBfZXJyb3InKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIFZhbGlkYXRpb24uY2xlYXIodGhpcyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChjbG9zZUVycm9yICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIGNsb3NlRXJyb3Iub25jbGljayA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgY2xvc2VFcnJvci5wYXJlbnROb2RlLnBhcmVudE5vZGUuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBmb3JtLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgICAgIHZhciB2YWxpZCA9IFZhbGlkYXRpb24uaW5pdChmb3JtKTtcclxuXHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHZhbGlkKTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvL1BhcmFsbGF4IGhlYWRlciwgc2tpbGxzXHJcbiAgICB2YXIgYmcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYmctcGFyYWxsYXgnKSxcclxuICAgICAgICBza2lsbHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2tpbGwnKSxcclxuICAgICAgICBibG9nV3JhcHBlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ibG9nLWNvbnRhaW5lcicpO1xyXG4gICAgLy/QpNGD0L3QutGG0LjRjyDRgdC60YDQvtC70LvQsCDRgdGC0YDQsNC90LjRhtGLXHJcbiAgICB3aW5kb3cub25zY3JvbGwgPSBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgIHZhciB3U2Nyb2xsID0gd2luZG93LnBhZ2VZT2Zmc2V0O1xyXG5cclxuICAgICAgICBpZiAoYmcgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgaGVhZGVyUGFyYWxsYXguaW5pdCh3U2Nyb2xsKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHNraWxscyAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICBza2lsbHNEcmF3Lmdyb3coKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGJsb2dXcmFwcGVyICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIEJsb2dNZW51LmluaXQoKTtcclxuICAgICAgICAgICAgQmxvZ01lbnUuaW5pdEFjdGl2ZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9O1xyXG5cclxuICAgIHZhciBzaWRlTWVudSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zaWRlbWVudS1idG4nKTtcclxuXHJcbiAgICBpZiAoc2lkZU1lbnUgIT09IG51bGwpIHtcclxuICAgICAgICBzaWRlTWVudS5vbmNsaWNrID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBCbG9nTWVudS50b2dnbGUoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgd2luZG93Lm9ucmVzaXplID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIEJsb2dNZW51LmluaXQoKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLy8g0KHQutGA0L7Qu9C7INC90LAg0L7QtNC40L0g0Y3QutGA0LDQvSDQstC90LjQt1xyXG4gICAgdmFyIHNjcm9sbERvd24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYXJyb3cnKTtcclxuICAgIHZhciBzY3JvbGxVcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hcnJvdy11cCcpO1xyXG5cclxuICAgIGlmIChzY3JvbGxEb3duICE9PSBudWxsKSB7XHJcbiAgICAgICAgc2Nyb2xsRG93bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgICAgIFNjcm9sbFBhZ2UuZG93bih0aGlzKTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG4gICAgaWYgKHNjcm9sbFVwICE9PSBudWxsKSB7XHJcbiAgICAgICAgc2Nyb2xsVXAuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgICAgICBTY3JvbGxQYWdlLnVwKHRoaXMpO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG59O1xyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuIl19
