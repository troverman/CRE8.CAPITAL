jQuery('html').removeClass('no-js').addClass('js');

if ( navigator.appVersion.indexOf("Mac")!=-1 ) 
	jQuery('html').addClass('osx');

jQuery(document).ready(function($) {

	(function() {

		$('[rel=carousel]').carousel()
		$('[rel=tooltip]').tooltip();
		$('[rel=popover]').popover();


	    $('.accordion').on('show', function (e) {
	         $(e.target).prev('.accordion-heading').find('.accordion-toggle').addClass('active');
	    });

	    $('.accordion').on('hide', function (e) {
	        $(this).find('.accordion-toggle').not($(e.target)).removeClass('active');
	    });
        

	    $(window).load(function() {

			$('a[rel=external]').attr('target','_blank');
			
		});

	})();

    

	(function() {

   			$('<i id="back-to-top"></i>').appendTo($('body'));

			$(window).scroll(function() {

				if($(this).scrollTop() != 0) {
					$('#back-to-top').fadeIn();	
				} else {
					$('#back-to-top').fadeOut();
				}

			});
			
			$('#back-to-top').click(function() {
				$('body,html').animate({scrollTop:0},600);
			});	

	})();



   (function() {

   		var is_touch_device = !!('ontouchstart' in window);

		function swipe( e, direction ) {

			var $carousel = $(e.currentTarget);
			
			if( direction === 'left' )
				$carousel.find('.carousel-control.right').trigger('click');
			
			if( direction === 'right' )
				$carousel.find('.carousel-control.left').trigger('click');
		}
		
		if (is_touch_device === true) {

			$('#carousel').swipe({
				allowPageScroll : 'auto',
				swipeLeft       : swipe,
				swipeRight      : swipe
			});

		}

	})();

    

   (function() {

		$('a[rel=shortcut]').each(function(){

			var $this = $(this);
			var key = $this.data('key');
			var href = $this.attr('href');

			if (key && href) {
				$(document).bind('keydown', key, function(){
					top.location.href = href;
				});
			}
		})

	})();


})