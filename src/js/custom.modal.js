$(function() {
	//var $scrolled_element = '.panel-inr'; // Селектор прокручивающегося блока

	// После клика на пункт окно разворачивается
	$('.work-card').click(function () {
		$('html').css('overflow', 'hidden');
		$('.modal-container').css('display', 'flex');

		var $modal_content_src = $(this).data("work"); // Считывает название файла с работой (атрибут data-work)

		$.ajax({
			url: 'ajax-portfolio/' + $modal_content_src + '.html',
			success: function(data) {
				var $title = $(data).filter('#title').html();
				$('.modal__title').html($title);

				var $date = $(data).filter('#date').html();
				$('.modal__date').html($date);

				var $desc = $(data).filter('#desc').html();
				$('.modal__desc').html($desc);

				var $link = $(data).filter('#link').html();
				$('.modal__link').html($link);

				var $content = $(data).filter('#content').html();
				$('.modal__content').html($content);
			}
		});



		//$('.panel .scrollbar-inner').scrollTop(0); // Пролистывает в начало
	});

	// Закрытие окна
	$('.modal__close-btn, .modal-container').click(function () {
		$('.modal-container').css('display', 'none');
		$('html').css('overflow', 'auto');
	});


	//Закрыть после клика на .modal-container (включая дочерние элементы)
	$('.modal-container').click(function() {
		//$(this).removeClass('d-inline-block');
		$('html').css('overflow', 'auto');
	});
	//НЕ закрывать при клике на .modal
	$('.modal').click(function(event){
		event.stopPropagation();
	});
});



/*
* Modal
* */
/*jQuery(document).ready(function ($) {
	$('.link-to-modal').click(function(){
		//$(this).next('.modal-container').addClass('d-inline-block');
		var popup_id=$(this).attr('aria-labelledby');
		$('.' + popup_id).addClass('d-inline-block');
		$('html').css('overflow', 'hidden');

	});


	// Закрыть
	$('.modal__close-btn').click(function(){
		$('html').css('overflow', 'auto');
		$(this).closest('.modal-container').removeClass('d-inline-block');
	});

	//Закрыть после клика на .modal-container (включая дочерние элементы)
	$('.modal-container').click(function() {
		$(this).removeClass('d-inline-block');
		$('html').css('overflow', 'auto');
	});
	//НЕ закрывать при клике на .modal
	$('.modal').click(function(event){
		event.stopPropagation();
	});
});*/