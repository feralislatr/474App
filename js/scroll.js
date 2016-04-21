//start with blank input value on load
$(document).ready(function() {
    $('input').val('');
});

$(function() {
	$('.move').bind('click',function(event){
	    var $anchor = $(this);
	    
		$('html, body').stop().animate({
			scrollTop: $($anchor.attr('href')).offset().top
		}, 1300,'easeInOutExpo');
		event.preventDefault();

	});
});

