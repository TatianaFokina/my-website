$('.nav-item__lnk[href*="#"]')
	.not('[href="#"]').not('[href="#0"]').click(function () {
	$('html, body').animate({
		scrollTop: $( $(this).attr('href') ).offset().top
	}, 800);
	return false;
});