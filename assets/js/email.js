(function(){
	'use strict';

	var $input = $("input"),
		$form = $("form"),
		$indicator = $(".indicator");

	var $content = $input.val();

	$form.on("submit", function(e){
		e.preventDefault();
		$indicator.attr("data-content", "Saving...");
		$(".loader").addClass("full").delay(3000).queue(function(){
			$indicator.attr("data-content", "You've been subscribed!");
			$(this).addClass("done");
			$input.addClass("full");
			$input.val("");
		});
	});

	$input.on("input", function(){
		$indicator.attr("data-content", "Now hit enter!");
	});

})();