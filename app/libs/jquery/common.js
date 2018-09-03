$(document).ready(function() {
	$("body").niceScroll({
horizrailenabled:false
});
// вверхнее красиво-вращающееся меню
// 1 и 2 строка это анимация крестика
//3 строка - слайдер вниз меню
//слайдер вниз меню отвечает за работу мобильного меню к переносу
$(".toggle-mnu").click(function() {
$(this).toggleClass("on");
$(".top-menu").slideToggle();
return false;
});
$('body, .top-menu ul li a').click(function () {
$('.hidden-mnu').hide("slow");
});

// pagination on lending pages
$(".top_line_menu ul li a, .hidden_mnu ul li a").mPageScroll2id({
layout                 : "auto",
offset                 : ".top_line_box",
scrollEasing           : "linear",
highlightByNextTarget  : true,
keepHighlightUntilNext : true,
autoScrollSpeed        : true,
scrollSpeed            : 1000
});

$(function() {
	$("#phone_key").mask("+7(000)000-00-00", {placeholder: "+7(___)___-__-__",clearIfNotMatch: true});
	$("#phone_header").mask("+7(000)000-00-00", {placeholder: "+7(___)___-__-__",clearIfNotMatch: true});
});

// всплывающие окна обратной связи позвонить мне
$("a[href='#call-back']").magnificPopup ({
	mainClass:'mfp-fade',
	removalDelay:400,
	tClose: 'Закрыть (Esc)',
	type:'inline'
});


/*чтобы в формах был индивидуальный заголовок */
$("a[href='#call-back']").click(function(){
	var dataForm = $(this).data("form");
	var dataText = $(this).data("text");
	$(".forms-call h4").text(dataText);
	$(".forms-call [name=admin-data]").val(dataForm);
});

//слайдер команды

$('#comand_carousel').owlCarousel({
		loop                 : true,
		margin               : 30,
		slideSpeed           : 2500,
	//	autoplay             : true,
		autoplayTimeout      : 3500,
		nav                  : false,
		dragBeforeAnimFinish : true,
		mouseDrag            : true,
		touchDrag            : true,
		stagePadding         : 30,
		stopOnHover          : false,
    responsive:{
        0:{
            items:1
        },
        600:{
            items:3
        },
        1000:{
            items:5
        }
    }
});




//Ajax push mesege http://api.jquery.com/jquery.ajax/

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
//castom code



});