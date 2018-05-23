// Mobile menu
$(function($) {
	function mobileMenu() {
		var $screen = $(window);
		if ($screen.width() < 800) { //todo Поменять значение
			var $link = '.js-expand-lnk';
			var $block = '.js-expand-block';

			// Клик на гамбургер
			// Клик на пункте меню
			// Клик на .content (включая дочерние элементы)
			$($link + ', .nav-item, .content').click(function() {
				$($link).toggleClass('in').next($block).slideToggle();
			});
		}
		console.log($screen.width());
	}

	// При загрузке страницы
	mobileMenu();

	// При ресайзе окна
	$(window).resize(function() {
		mobileMenu();
	});

});