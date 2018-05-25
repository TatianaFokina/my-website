// https://codepen.io/Pustur/pen/mPNoWx


(function() {
	'use strict';

	// Vars
	var $links = $('.nav a'),
		$sections = getSections($links),
		$root = $('html, body');

	// Events
	$(window).on('scroll', function() {
		activateLink($sections, $links);
	});

	$('a[href*="#"]:not([href="#"])').on('click', function() {
		var href = $.attr(this, 'href');

		$root.animate({
			scrollTop: $(href).offset().top
		}, 500, function() {
			window.location.hash = href;
		});

		return false;
	});

	// Init
	window.CP.PenTimer.MAX_TIME_IN_LOOP_WO_EXIT = Number.MAX_SAFE_INT;
	activateLink($sections, $links);

	// Functions
	function getSections($links) {
		var linksHref,
			hashes = '';

		for (var i = 0, len = $links.length; i < len; i++) {
			linksHref = $links.eq(i).attr('href');

			if (linksHref.charAt(0) === '#') {
				hashes += linksHref + ',';
			}
		}
		hashes = hashes.slice(0, -1);

		return $(hashes);
	}

	function activateLink($sections, $links) {
		var $section,
			yPosition = $(window).scrollTop();

		for (var i = $sections.length - 1; i >= 0; i--) {
			$section = $sections.eq(i);

			if (yPosition >= $section.offset().top)  {
				for (var j = 0, linksLen = $links.length; j < linksLen; j++) {
					$links.eq(j).removeClass('active');
				}
				$links.filter('[href="#' + $section.attr('id') + '"]').addClass('active');
				return;
			}
		}
	}
}());