$(function($) {

	$(function () {

		$('.nav-item__lnk[href^="#"]').click(function () {
			$('html, body').animate({
				scrollTop: $( $(this).attr('href') ).offset().top
			}, 800);
			return false;
		});
	});

});