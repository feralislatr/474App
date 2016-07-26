//start with blank input value on load
$(function() {
    $('input').val('');
});

//vertical scroll
$(function() {
	$('.move').bind('click',function(event){
	    var $anchor = $(this);
	    
		$('html, body').stop().animate({
			scrollTop: $($anchor.attr('href')).offset().top
		}, 1300,'easeInOutExpo');
		event.preventDefault();

	});
});

function scroll(){
    console.log("i work1");
    $("#page1").animate({left:'-1000px'},10000,'easeInOutExpo');
    console.log("i work");
    };


//page change
function handleHash(){
     var a1 = $('#a1').val(); //name
     var a2 = $('#a2').val(); //sex
     var a3 = $('#a3').val(); //age
     var a4 = $('#a4').val(); //education years
     var a5 = $('#a5').val(); //current month
     console.log("in handle hash" +a1+a2+a3+a4+a5);
      if(a1 && a2 && a3 && a4 && a5){
    $(location.hash).removeClass('hidden');
    $('body').html($(location.hash).html());
      alert("in here")
      }
}

$('#scroll').on("click", handleHash);
$('#back').on('click',handleHash);
 
