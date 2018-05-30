// Close & open modal window
$(function() {
	
	var $modal = ".modal-container", // modal window selector. Element is displayed when click on link
		$link = '.work-card', // modal window link selector
		$link_opened = 'js-opened', // add links with current modal window
		$modal_now = 1; // current window number

	// Delete all link classes --opened
	function removeAllOpenedFlags(){
		$($link).removeClass($link_opened);
	}
	// Add class to this link
	function setAsOpened($taget){
		$($taget).addClass($link_opened); // add class to this link
	}
	// Function for load and add content from external file
	function loadToModal($fileName){
		$.ajax({
			url: 'ajax-portfolio/' + $fileName + '.html',
			success: function(data) {
				var $title = $(data).filter('#title').html();
				$('.modal__title').html($title);

				var $date = $(data).filter('#date').html();
				$('.modal__date').html($date);

				var $desc = $(data).filter('#desc').html();
				$('.modal__desc').html($desc);

				var $link = $(data).filter('#link').html();
				if ($link){
					$('.modal__link').html($link);
				}
				else {
					$('.modal__link').empty();
				}

				var $content = $(data).filter('#content').html();
				$('.modal__content').html($content);
			}
		});
	}




	/*========================================================
	Open window after click to link
	========================================================*/
	$($link).click(function () {
		$('html').css('overflow', 'hidden');
		$($modal).css('display', 'flex')
			.scrollTop(0); // scroll to top

		var $modal_content_src = $(this).data("work"); // reads name of file with work ('data-work' attribute)

		$modal_now = $(this).index($link) + 1; // records the order number of current item (+1 because the count starts at 0)
		loadToModal($modal_content_src);
		removeAllOpenedFlags();
		setAsOpened(this);

		//console.log('Номер при открытии окна:' + $modal_now);
	});




	/*========================================================
	Close window
	========================================================*/

	// Function of close window
	function modal_closure(){
		$($modal).css('display', 'none'); // hidden window
		$('html').css('overflow', 'auto'); // return scrollbars
		removeAllOpenedFlags(); // remove all js--opened classes of all links
	}

	// Click to close button
	$('.modal__close-btn').click(function () {
		modal_closure();
	});

	// Click on .modal-container (+ children) => close
	$($modal).click(function() {
		modal_closure();
	});
	// Click on .modal => not to close
	$('.modal').click(function(event){
		event.stopPropagation();
	});




	/*========================================================
	Switch works
	========================================================*/
	var $links_amount = $($link).length,
		$modal_contentFirst = $($link).first(),
		$modal_contentFirst_src = $modal_contentFirst.data("work"),
		$modal_contentLast = $($link).last(),
		$modal_contentLast_src = $modal_contentLast.data("work");

	$('.modal__pager__next').click(function () {
		var $modal_contentNext = $('.' + $link_opened).closest('div').next().children($link),
			$modal_contentNext_src = $modal_contentNext.data("work");

		// To first element
		if ($modal_now === $links_amount || $modal_now <= 0 || $modal_now > $links_amount) {
			$modal_now = 1; // reset counter
			removeAllOpenedFlags(); // minus classes for all links
			setAsOpened($modal_contentFirst); // plus class for link
			loadToModal($modal_contentFirst_src); // add content from second link

		}
		// To next element
		else {
			removeAllOpenedFlags(); // minus classes for all links
			setAsOpened($modal_contentNext); // plus class for link
			$modal_now++;
			loadToModal($modal_contentNext_src);
		}
		$($modal).scrollTop(0); // scroll to top

		//console.log($modal_now);
	});


	$('.modal__pager__prev').click(function () {
		var $modal_contentPrev = $('.' + $link_opened).closest('div').prev().children($link),
			$modal_contentPrev_src = $modal_contentPrev.data("work");

		// To last element
		if ($modal_now === 1 || $modal_now <= 0 || $modal_now > $links_amount) {
						$modal_now = $links_amount; // set max value
			removeAllOpenedFlags(); // minus classes for all links
			setAsOpened($modal_contentLast); // plus class for link
			loadToModal($modal_contentLast_src);
		}
		// To prev element
		else {
			$modal_now--;
			removeAllOpenedFlags(); // minus classes for all links
			setAsOpened($modal_contentPrev); // plus class for link
			loadToModal($modal_contentPrev_src);

		}
		$($modal).scrollTop(0); // scroll to top

		//console.log($modal_now);
	});

});