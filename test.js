$( document ).ready(function() {
	var width = $('.collage').width();
	// var padding = width * 0.005;
	// $(this).css('box-shadow', '10px 10px 5px #888');
	
	
	$(window).resize(function(){
		var collage = $('.collage');
		var collageItem = $('.collage-item');
		var width = collage.width();
		var padding = width * 0.005;
		// collage.css('box-shadow', 'inset 0 0 0 ' + padding + 'px ' + 'green');
		// collageItem.css('box-shadow', 'inset 0 0 0 ' + padding + 'px ' + 'blue');

	});
});	