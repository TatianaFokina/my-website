// Scroll-to-top button
$(function($) {

	$(function () {
		$(window).scroll(function () {
			if ($(this).scrollTop() > 400) {
				$('.js-scroll-to-top').fadeIn();
			} else {
				$('.js-scroll-to-top').fadeOut();
			}
		});

		$('.js-scroll-to-top').click(function () {
			$('body,html').animate({
				scrollTop: 0
			}, 800);
			return false;
		});
	});

});