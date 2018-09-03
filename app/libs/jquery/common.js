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



// код подключения плагина Vertical-Horizontal-Tabs
  // $('#verticalTab').jqTabs();

// всплывающие окна обратной связи позвонить мне
$("a[href='#politics'], a[href='#call-backtimer'], a[href='#call-back'], a[href='#call-back4s'], a[href='#call-back6s'], a[href='#call-back8s'], a[href='#call-back10s']").magnificPopup ({
	mainClass:'mfp-fade',
	removalDelay:400,
	type:'inline'
});


/*чтобы в формах был индивидуальный заголовок */
$("a[href='#politics'], a[href='#call-backtimer'], a[href='#call-back'], a[href='#call-back4s'], a[href='#call-back6s'], a[href='#call-back8s'], a[href='#call-back10s']").click(function(){
	var dataForm = $(this).data("form");
	var dataText = $(this).data("text");
	$(".forms-call h4").text(dataText);
	$(".forms-call [name=admin-data]").val(dataForm);
});


$('input').iCheck({
	checkboxClass: 'icheckbox_minimal',
	radioClass: 'iradio_minimal',
	radioClass: 'iradio_minimal',
    increaseArea: '30%' // optional
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