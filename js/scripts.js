$( function() {
    $( "#accordion" ).accordion({
      heightStyle: "content"
    });
	$( ".services-right .services-slide" ).removeClass("active");
	$( ".services-right .services-slide:first-child()" ).addClass("active");

  } );

function hasClass(element, className) {
    return (' ' + element.className + ' ').indexOf(' ' + className+ ' ') > -1;
}

var navs = document.querySelectorAll('.services-nav li');
var tabs = document.querySelectorAll('.services-slide');
var modal = document.querySelector('.modal');
var modalOpeners = document.querySelectorAll('.modal-open');
var modalClosers = document.querySelectorAll('.modal-close');
var modalOverlay = document.querySelector('.modal-overlay');

for(i=0; i<navs.length; i++) {
	navs[i].onclick = function() {
		console.log(this);
		for(j=0; j<navs.length; j++) {
			navs[j].classList.remove('active')
		}
		for(k=0; k<tabs.length; k++) {
			console.log(tabs[k])
			tabs[k].classList.remove('active');
			if (tabs[k].dataset.slide == this.dataset.target) {
				console.log('Adding active');
				tabs[k].classList.add('active');
			}
		}
		this.classList.add('active')
		
	}
}

var i = 0;
for(i=0; i<modalOpeners.length; i++) {
	modalOpeners[i].onclick = function() {
		modal.classList.add('active');
		return false;
	}
}
for(i=0; i<modalClosers.length; i++) {
	modalClosers[i].onclick = function() {
		modal.classList.remove('active');
		return false;
	}
}
modalOverlay.onclick = function() {
	modal.classList.remove('active');
	return false;
}

var linkNav = document.querySelectorAll('[href^="#"]'), //выбираем все ссылки к якорю на странице
    V = 0.2;  // скорость, может иметь дробное значение через точку (чем меньше значение - тем больше скорость)
for (var i = 0; i < linkNav.length; i++) {
    linkNav[i].addEventListener('click', function(e) { //по клику на ссылку
        e.preventDefault(); //отменяем стандартное поведение
        var w = window.pageYOffset,  // производим прокрутка прокрутка
            hash = this.href.replace(/[^#]*(.*)/, '$1');  // к id элемента, к которому нужно перейти
        t = document.querySelector(hash).getBoundingClientRect().top,  // отступ от окна браузера до id
            start = null;
        requestAnimationFrame(step);  // подробнее про функцию анимации [developer.mozilla.org]
        function step(time) {
            if (start === null) start = time;
            var progress = time - start,
                r = (t < 0 ? Math.max(w - progress/V, w + t) : Math.min(w + progress/V, w + t));
            window.scrollTo(0,r);
            if (r != w + t) {
                requestAnimationFrame(step)
            } else {
                location.hash = hash  // URL с хэшем
            }
        }
    }, false);
}

window.onscroll = function()
{
	var pageOffset =document.documentElement.scrollTop || document.body.scrollTop;
    if(pageOffset >= 200)
    {
        document.querySelector('.on-top').style.visibility="visible"
    } else
    {
        document.querySelector('.on-top').style.visibility="hidden";
    }
};

$(document).ready(function(){
  $(".owl-carousel").owlCarousel({
  dots: true, lazyLoad:true, nav: true, navText : [" ", " "], autoplay: true, autoplayTimeout: 4000, loop: true, responsive:{
        0:{
            items:2
        },
        600:{
            items:3
        }
    }
  });
});
