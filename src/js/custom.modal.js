// Открытие и закрытие модального окна
$(function() {
	
	var $modal = ".modal-container"; // Селектор модального окна. Элемент, который показыаем при нажатии на ссылку.
	var $link = '.work-card'; // Селектор ссылки на модальное окно
	var $link_opened = 'js-opened'; // Класс, который добавляем ссылки, соответствующей открытому модальному окну

	// Убирает все классы --opened у всех ссылок
	function removeAllOpenedFlags(){
		$($link).removeClass($link_opened);
	}
	// Добавляет класс для этой ссылки
	function setAsOpened($taget){
		$($taget).addClass($link_opened); // Добавляет класс для этой ссылки
	}
	// Функция загрузки и вставки контента из внешнего файла
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




	/*===============
	Открытие окна после клика на ссылку
	===============*/
	$($link).click(function () {
		$('html').css('overflow', 'hidden');
		$($modal).css('display', 'flex')
			.scrollTop(0); // Пролистывает в начало

		var $modal_content_src = $(this).data("work"); // Считывает название файла с работой (атрибут data-work)

		loadToModal($modal_content_src);
		removeAllOpenedFlags();
		setAsOpened(this);
	});




	/*===============
	Закрытие окна
	===============*/

	// Функция закрытия окна
	function modal_closure(){
		$($modal).css('display', 'none'); // Скрывает окно
		$('html').css('overflow', 'auto'); // Возвращает скроллбары
		removeAllOpenedFlags(); // Убирает все классы js--opened у всех ссылок
	}

	// Нажатие на кнопку закрытия
	$('.modal__close-btn').click(function () {
		modal_closure();
	});

	// Закрыть после клика на .modal-container (включая дочерние элементы)
	$($modal).click(function() {
		modal_closure();
	});
	//НЕ закрывать при клике на .modal
	$('.modal').click(function(event){
		event.stopPropagation();
	});





	/*===============
	Переключатель работ
	===============*/



	var $modal_now = 1,
		$links_amount = $($link).length,
		$modal_contentFirst = $($link).first(),
		$modal_contentFirst_src = $modal_contentFirst.data("work"),
		$modal_contentLast = $($link).last(),
		$modal_contentLast_src = $modal_contentLast.data("work");

	$('.modal__pager__next').click(function () {
		var $modal_contentNext = $('.' + $link_opened).closest('div').next().children($link),
			$modal_contentNext_src = $modal_contentNext.data("work");

		// Для перехода к первому элементу
		if ($modal_now === $links_amount || $modal_now <= 0 || $modal_now > $links_amount) {
			loadToModal($modal_contentFirst_src); // Вставляем содержимое из первой ссылки
			$modal_now = 1; // Сбрасываем счётчик
			removeAllOpenedFlags(); // - классы для всех ссылок
			$modal_contentFirst.addClass($link_opened); // + класс для ссылки
		}
		// Для перехода к следующему элементу
		else {
			loadToModal($modal_contentNext_src);
			$modal_now++;
			removeAllOpenedFlags(); // - классы для всех ссылок
			$modal_contentNext.addClass($link_opened); // + класс для ссылки
		}
		$($modal).scrollTop(0); // Пролистывает в начало

		console.log($modal_now);
	});


	$('.modal__pager__prev').click(function () {
		var $modal_contentPrev = $('.' + $link_opened).closest('div').prev().children($link),
			$modal_contentPrev_src = $modal_contentPrev.data("work");

		// Для перехода к последнему элементу
		if ($modal_now === 1 || $modal_now <= 0 || $modal_now > $links_amount) {
			loadToModal($modal_contentLast_src);
			$modal_now = $links_amount; // Устанавливаем максимальное значение
			removeAllOpenedFlags(); // - классы для всех ссылок
			$modal_contentLast.addClass($link_opened); // + класс для ссылки
		}
		// Для перехода к предыдущему элементу
		else {
			loadToModal($modal_contentPrev_src);
			$modal_now--;
			removeAllOpenedFlags(); // - классы для всех ссылок
			$modal_contentPrev.addClass($link_opened); // + класс для ссылки

		}
		$($modal).scrollTop(0); // Пролистывает в начало

		console.log($modal_now);
	});


});