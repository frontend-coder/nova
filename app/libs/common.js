$(document).ready(function () {
	// вверхнее красиво-вращающееся меню
	// 1 и 2 строка это анимация крестика
	//3 строка - слайдер вниз меню
	//слайдер вниз меню отвечает за работу мобильного меню к переносу
	$('.toggle-mnu').click(function () {
		$(this).toggleClass('on');
		$('.top-menu').slideToggle();
		return false;
	});
	$('body, .top-menu ul li a').click(function () {
		$('.hidden-mnu').hide('slow');
	});


	$('.menubtn').on('click', function () {
		$(this).toggleClass('opened');
		$('.navmenu').toggleClass('opened');
		return false;
	});

	$('body').on('click', function () {
		$('.menubtn').removeClass('opened');
		$('.navmenu').removeClass('opened');

	});

	// pagination on lending pages
	$('.top_line_menu ul li a, .text-list li a').mPageScroll2id({
		layout: 'auto',
		offset: '.top_line_box',
		scrollEasing: 'linear',
		highlightByNextTarget: true,
		keepHighlightUntilNext: true,
		autoScrollSpeed: true,
		scrollSpeed: 1000
	});

	$(function () {
		$('#phone_key').mask('+7(000)000-00-00', {
			placeholder: '+7(___)___-__-__',
			clearIfNotMatch: true
		});
		$('#footer_phone').mask('+7(000)000-00-00', {
			placeholder: '+7(___)___-__-__',
			clearIfNotMatch: true
		});
	});

	$('.popup-youtube').magnificPopup({
		disableOn: 700,
		type: 'iframe',
		mainClass: 'mfp-fade',
		fixedBgPos:false,
		fixedContentPos:false,
		removalDelay: 160,
		preloader: false,
		tClose: 'Закрыть (Esc)'
	});


	//слайдер команды

	$('#comand_carousel').owlCarousel({
		loop: true,
		margin: 30,
		slideSpeed: 2500,
		//	autoplay             : true,
		autoplayTimeout: 3500,
		nav: false,
		dragBeforeAnimFinish: true,
		mouseDrag: true,
		touchDrag: true,
		stagePadding: 30,
		stopOnHover: false,
		responsive: {
			0: {
				items: 1
			},
			600: {
				items: 3
			},
			1000: {
				items: 5
			}
		}
	});

	$('#adwise_carousel').owlCarousel({
		items: 1,
		loop: true,
		margin: 30,
		slideSpeed: 2500,
		//	autoplay          : true,
		autoplayTimeout: 3500,
		nav: false,
		dragBeforeAnimFinish: true,
		mouseDrag: true,
		touchDrag: true,
		stagePadding: 30,
		stopOnHover: false,
		dots: true
	});

	$('#brands_carousel').owlCarousel({
		loop: true,
		items: 5,
		margin: 20,
		slideSpeed: 500,
		// autoplay          : true,
		stopOnHover: false,
		autoplayTimeout: 3500,
		dragBeforeAnimFinish: true,
		mouseDrag: true,
		touchDrag: true,
		//stagePadding          : 50,
		nav: false,
		dots: true
	});

	var animTime = 300,
		clickPolice = false;

	$(document).on('touchstart click', '.acc-btn', function () {
		if (!clickPolice) {
			clickPolice = true;

			var currIndex = $(this).index('.acc-btn'),
				targetHeight = $('.acc-content-inner').eq(currIndex).outerHeight();

			$('.acc-btn').removeClass('selected');
			$(this).addClass('selected');

			$('.acc-btn h1').removeClass('selectev');
			$(this).find('h1').addClass('selectev');

			$('.acc-content').stop().animate({
				height: 0
			}, animTime);
			$('.acc-content').eq(currIndex).stop().animate({
				height: targetHeight
			}, animTime);

			setTimeout(function () {
				clickPolice = false;
			}, animTime);
		}

	});




	// всплывающие окна обратной связи позвонить мне
	$('a[href=\'#call-back\']').magnificPopup({
		mainClass: 'mfp-fade',
		removalDelay: 400,
		fixedBgPos: false,
		fixedContentPos: false,
		tClose: 'Закрыть (Esc)',
		type: 'inline'
	});

	/*чтобы в формах был индивидуальный заголовок */
	$('a[href="#call-back"]').click(function () {
		var dataForm = $(this).data('form');
		var dataText = $(this).data('text');
		$('.forms-call h4').text(dataText);
		$('.forms-call [name=admin-data]').val(dataForm);
	});


	//Ajax push mesege http://api.jquery.com/jquery.ajax/
	$('form').submit(function () { //Change
		var th = $(this);
		$.ajax({
			type: 'POST',
			url: 'mail.php', //Change
			data: th.serialize()
		}).done(function () {
			$('.forms-calldecor .success').addClass('active');
			setTimeout(function () {
				// Done Functions
				$('.forms-calldecor .success').removeClass('active');
				th.trigger('reset');
				$.magnificPopup.close();
			}, 3000);
		});
		return false;
	});
	//castom code
});



//Переменная для включения/отключения индикатора загрузки
var spinner = $('.ymap-container').children('.loader');
//Переменная для определения была ли хоть раз загружена Яндекс.Карта (чтобы избежать повторной загрузки при наведении)
var check_if_load = false;
//Необходимые переменные для того, чтобы задать координаты на Яндекс.Карте
var myMapTemp, myPlacemarkTemp;

//Функция создания карты сайта и затем вставки ее в блок с идентификатором "map-yandex"
function init() {
	var myMapTemp = new ymaps.Map('map-yandex', {
		center: [56.826185, 60.562255], // координаты центра на карте
		zoom: 7, // коэффициент приближения карты
		controls: ['zoomControl', 'fullscreenControl'] // выбираем только те функции, которые необходимы при использовании
	});

	myMapTemp.events.add('click', function () {
		myMapTemp.behaviors.disable('scrollZoom'); // При щелчке на карте обюирется зум карты при скроллинге мыши
	});

	var myPlacemarkTemp = new ymaps.GeoObject({
		geometry: {
			type: 'Point',
			coordinates: [56.826185, 60.562255] // координаты, где будет размещаться флажок на карте
		}
	});

	myMapTemp.geoObjects.add(myPlacemarkTemp); // помещаем флажок на карту



	var myPlacemarkTemp4 = new ymaps.GeoObject({
		geometry: {
			type: 'Point',
			coordinates: [55.826185, 60.562255] // координаты, где будет размещаться 2-й флажок на карте
		}
	});

	myMapTemp.geoObjects.add(myPlacemarkTemp4); // помещаем флажок на карту

	// Получаем первый экземпляр коллекции слоев, потом первый слой коллекции
	var layer = myMapTemp.layers.get(0).get(0);

	// Решение по callback-у для определния полной загрузки карты
	waitForTilesLoad(layer).then(function () {
		// Скрываем индикатор загрузки после полной загрузки карты
		spinner.removeClass('is-active');
	});
}

// Функция для определения полной загрузки карты (на самом деле проверяется загрузка тайлов)
function waitForTilesLoad(layer) {
	return new ymaps.vow.Promise(function (resolve, reject) {
		var tc = getTileContainer(layer),
			readyAll = true;
		tc.tiles.each(function (tile, number) {
			if (!tile.isReady()) {
				readyAll = false;
			}
		});
		if (readyAll) {
			resolve();
		} else {
			tc.events.once('ready', function () {
				resolve();
			});
		}
	});
}

function getTileContainer(layer) {
	for (var k in layer) {
		if (layer.hasOwnProperty(k)) {
			if (
				layer[k] instanceof ymaps.layer.tileContainer.CanvasContainer ||
        layer[k] instanceof ymaps.layer.tileContainer.DomContainer
			) {
				return layer[k];
			}
		}
	}
	return null;
}

// Функция загрузки API Яндекс.Карт по требованию (в нашем случае при наведении)
function loadScript(url, callback) {
	var script = document.createElement('script');

	if (script.readyState) { // IE
		script.onreadystatechange = function () {
			if (script.readyState == 'loaded' ||
        script.readyState == 'complete') {
				script.onreadystatechange = null;
				callback();
			}
		};
	} else { // Другие браузеры
		script.onload = function () {
			callback();
		};
	}

	script.src = url;
	document.getElementsByTagName('head')[0].appendChild(script);
}

// Основная функция, которая проверяет когда мы навели на блок с классом "ymap-container"
var ymap = function () {
	$('.ymap-container').mouseenter(function () {
		if (!check_if_load) { // проверяем первый ли раз загружается Яндекс.Карта, если да, то загружаем
			// Чтобы не было повторной загрузки карты, мы изменяем значение переменной
			check_if_load = true;
			// Показываем индикатор загрузки до тех пор, пока карта не загрузится
			spinner.addClass('is-active');
			// Загружаем API Яндекс.Карт
			loadScript('https://api-maps.yandex.ru/2.1/?lang=ru_RU&amp;loadByRequire=1', function () {
				// Как только API Яндекс.Карт загрузились, сразу формируем карту и помещаем в блок с идентификатором "map-yandex"
				ymaps.load(init);
			});
		}
	});
};
$(function () {
	//Запускаем основную функцию
	ymap();
});
