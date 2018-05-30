// Mobile menu
$(function() {
	var $link = '.js-expand-lnk';
	var $block = '.js-expand-block';

	// Check page width
	function checkWindowWidth() {
		if ($(window).width() < 576) {
			return true;
		}
		else {
			return false;
		}
	}
	// Initialization at page load
	checkWindowWidth();
	// Initialization at resize window
	$(window).resize(checkWindowWidth);

	// Click to hamburger or menu item
	$($link + ', .nav-item__lnk').click(function() {
		if (checkWindowWidth()) {
			$($link).toggleClass('in').next($block).slideToggle();
		}
	});

	// Click to .content => close menu
	$('.content, .js-scroll-to-top, footer').click(function() {
		if (checkWindowWidth()) {
			$($link).removeClass('in').next($block).slideUp();
		}
	});

});