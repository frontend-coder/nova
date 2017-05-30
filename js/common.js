$(document).ready(function() {
	$("body").niceScroll({
horizrailenabled:false
});

// вверхнее красиво-вращающееся меню
// 1 и 2 строка это анимация крестика
//3 строка - слайдер вниз меню
$(".toggle-mnu").click(function() {
$(this).toggleClass("on");
$(".top-menu").slideToggle();
return false;
});
$('body, .top-menu ul li a').click(function () {
$('.hidden-mnu').hide("slow");
});
$(".accordeon dd").hide().prev().click(function() {
	$(this).parents(".accordeon").find("dd").not(this).slideUp().prev().removeClass("active");
	$(this).next().not(":visible").slideDown().prev().addClass("active");
});

// одинаковой высоты разные по длине ашки
$(".name class").equalHeights();

//Кнопка наверх с права от контента
$("body").append('<div class="button-top"><i class="fa fa-angle-double-up" aria-hidden="true"></i></div>');
// Заставляет кнопку работать как ссылку на самый вверх
$("body").on("click", ".button-top", function() {
	$("html, body").animate({scrollTop: 0}, "slow");
});
// Заставляет прятаться кнопку, если посетитель на хедере
$(window).scroll(function() {
if ($(this).scrollTop() > $(this).height()) {
	$(".button-top").addClass("active");
} else
{  	$(".button-top").removeClass("active");
}
});

// начало блока портфолио
	$(function () {
		var filterList = {
			init: function () {
						// MixItUp plugin
				// http://mixitup.io
				$('#portfoliolist').mixItUp({
  				selectors: {
    			  target: '.portfolio',
    			  filter: '.filter'
    		  },
    		  load: {
      		  filter: '.app'
      		}
				});
		}
	};
	// Run the show!
		filterList.init();
	});
// конец блока портфолио

//слайдер отзывов
	$(".owl-carousel").owlCarousel({
		loop:true,
		items: 1,
		slideSpeed: 500,
	  autoplay: true,
	 stopOnHover : false,
	  autoplayTimeout: 3500,
		margin:130,
		  dragBeforeAnimFinish : true,
    mouseDrag : true,
    touchDrag : true,
		stagePadding:30
	});

//слайдер команды
	$(".owl-carouselkommand").owlCarousel({
		loop:true,
		items: 4,
		slideSpeed: 2500,
	  autoplay: true,
	 stopOnHover : false,
	  autoplayTimeout: 3500,
		margin:30,
		  dragBeforeAnimFinish : true,
    mouseDrag : true,
    touchDrag : true,
		stagePadding:30
	});

//слайдер отзывов
$(".owl-carousel-brand").owlCarousel({
loop:true,
items: 5,
slideSpeed: 500,
autoplay: true,
stopOnHover : false,
autoplayTimeout: 3500,
dragBeforeAnimFinish : true,
mouseDrag : true,
touchDrag : true,
tagePadding:50
});

$(".top-menu ul li a").mPageScroll2id({
layout:"auto",
offset:".top-line",
scrollEasing: "linear",
highlightByNextTarget: true,
keepHighlightUntilNext: true,
autoScrollSpeed: true,
scrollSpeed : 1000
});

// всплывающие окна обратной связи позвонить мне
$("a[href='#call-back']").magnificPopup ({
	mainClass:'mfp-fade',
	removalDelay:400,
	type:'inline',
});

/*чтобы в формах был индивидуальный заголовок */
$("a[href='#call-back']").click(function(){
	var dataForm = $(this).data("form");
	var dataText = $(this).data("text");
	$(".forms-call h4").text(dataText);
	$(".forms-call [name=admin-data]").val(dataForm);
});

//Аякс отправка форм Документация: http://api.jquery.com/jquery.ajax/

$("form").submit(function() { //Change
		var th = $(this);
		$.ajax({
			type: "POST",
			url: "mail.php", //Change
			data: th.serialize()
		}).done(function() {
			$(".forms-calldecor .success").addClass("active");
			setTimeout(function() {
				// Done Functions
				$(".forms-calldecor .success").removeClass("active");
				th.trigger("reset");
				$.magnificPopup.close();
			}, 3000);
		});
		return false;
	});
//ниже вставлять js код

});

//Переменная для включения/отключения индикатора загрузки
var spinner = $('.ymap-container').children('.loader');
//Переменная для определения была ли хоть раз загружена Яндекс.Карта (чтобы избежать повторной загрузки при наведении)
var check_if_load = false;
//Необходимые переменные для того, чтобы задать координаты на Яндекс.Карте
var myMapTemp, myPlacemarkTemp;

//Функция создания карты сайта и затем вставки ее в блок с идентификатором "map-yandex"
function init () {
  var myMapTemp = new ymaps.Map("map-yandex", {
    center: [56.826185, 60.562255], // координаты центра на карте
    zoom: 7, // коэффициент приближения карты
    controls: ['zoomControl', 'fullscreenControl'] // выбираем только те функции, которые необходимы при использовании
  });

 myMapTemp.events.add('click', function () {
myMapTemp.behaviors.disable('scrollZoom'); // При щелчке на карте обюирется зум карты при скроллинге мыши
});

  var myPlacemarkTemp = new ymaps.GeoObject({
    geometry: {
        type: "Point",
        coordinates: [56.826185, 60.562255] // координаты, где будет размещаться флажок на карте
    }
  });

myMapTemp.geoObjects.add(myPlacemarkTemp); // помещаем флажок на карту



  var myPlacemarkTemp4 = new ymaps.GeoObject({
    geometry: {
        type: "Point",
        coordinates: [55.826185, 60.562255] // координаты, где будет размещаться 2-й флажок на карте
    }
  });

myMapTemp.geoObjects.add(myPlacemarkTemp4); // помещаем флажок на карту

  // Получаем первый экземпляр коллекции слоев, потом первый слой коллекции
  var layer = myMapTemp.layers.get(0).get(0);

  // Решение по callback-у для определния полной загрузки карты
  waitForTilesLoad(layer).then(function() {
    // Скрываем индикатор загрузки после полной загрузки карты
    spinner.removeClass('is-active');
  });
}

// Функция для определения полной загрузки карты (на самом деле проверяется загрузка тайлов)
function waitForTilesLoad(layer) {
  return new ymaps.vow.Promise(function (resolve, reject) {
    var tc = getTileContainer(layer), readyAll = true;
    tc.tiles.each(function (tile, number) {
      if (!tile.isReady()) {
        readyAll = false;
      }
    });
    if (readyAll) {
      resolve();
    } else {
      tc.events.once("ready", function() {
        resolve();
      });
    }
  });
}

function getTileContainer(layer) {
  for (var k in layer) {
    if (layer.hasOwnProperty(k)) {
      if (
        layer[k] instanceof ymaps.layer.tileContainer.CanvasContainer
        || layer[k] instanceof ymaps.layer.tileContainer.DomContainer
      ) {
        return layer[k];
      }
    }
  }
  return null;
}

// Функция загрузки API Яндекс.Карт по требованию (в нашем случае при наведении)
function loadScript(url, callback){
  var script = document.createElement("script");

  if (script.readyState){  // IE
    script.onreadystatechange = function(){
      if (script.readyState == "loaded" ||
              script.readyState == "complete"){
        script.onreadystatechange = null;
        callback();
      }
    };
  } else {  // Другие браузеры
    script.onload = function(){
      callback();
    };
  }

  script.src = url;
  document.getElementsByTagName("head")[0].appendChild(script);
}

// Основная функция, которая проверяет когда мы навели на блок с классом "ymap-container"
var ymap = function() {
  $('.ymap-container').mouseenter(function(){
      if (!check_if_load) { // проверяем первый ли раз загружается Яндекс.Карта, если да, то загружаем
      // Чтобы не было повторной загрузки карты, мы изменяем значение переменной
        check_if_load = true;
    // Показываем индикатор загрузки до тех пор, пока карта не загрузится
        spinner.addClass('is-active');
    // Загружаем API Яндекс.Карт
        loadScript("https://api-maps.yandex.ru/2.1/?lang=ru_RU&amp;loadByRequire=1", function(){
           // Как только API Яндекс.Карт загрузились, сразу формируем карту и помещаем в блок с идентификатором "map-yandex"
           ymaps.load(init);
        });
      }
    }
  );
}
$(function() {
 //Запускаем основную функцию
 ymap();
});