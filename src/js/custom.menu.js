// Mobile menu
$(function() {
	var $link = '.js-expand-lnk';
	var $block = '.js-expand-block';


	// Проверяет ширину страницы
	function checkWindowWidth() {
		if ($(window).width() <= 750) { // todo поменять значение
			return true;
		}
		else {
			return false;
		}
	}
	// Инициализация при загрузке страницы
	checkWindowWidth();
	// Инициализация при ресайзе окна
	$(window).resize(checkWindowWidth);

	// При клике на гамбургер или пункт меню
	$($link + ', .nav-item').click(function() {
		if (checkWindowWidth()) {
			$($link).toggleClass('in').next($block).slideToggle();
		}
	});

	// Меню закрывается при клике на .content
	$('.content, .js-scroll-to-top, footer').click(function() {
		if (checkWindowWidth()) {
			$($link).removeClass('in').next($block).slideUp();
		}
	});

});