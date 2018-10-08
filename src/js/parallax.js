/* Parallax Scrolling */
$(function($) {
	$(window).scroll(function() {
		var $parallax = $(this).scrollTop();

		if($parallax < 500) {
			$('.js-hero-photo').css(
				'object-position', "0 " + $parallax * 0.3 + 'px'
			);
		}
	});
});