// Mobile menu
$(function($) {

	$('.js-expand-lnk').click(function() {
		$(this).toggleClass('in').next('.js-expand-block').slideToggle();
	});

});