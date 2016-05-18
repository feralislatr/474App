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



//horizontal scroll
// $(function() {
//     $("#scroll").click(function(e) {
//       console.log("horizontalscroll");
//         e.preventDefault();
//         $('#page2').animate({
//             scrollLeft: $('#page2').scrollLeft() + $(this.hash).offset().left
//         }, 500);
//     });
// });

function scroll(){
    console.log("i work1");
    $("#page1").animate({left:'-1000px'},10000,'easeInOutExpo');
    console.log("i work");
    //$("#container").animate({'margin-left':'200px'},500);
    };


//page change
function handleHash(){
  $(location.hash).removeClass('hidden');
  $('body').html($(location.hash).html());
  
}
$(window).on("hashchange", handleHash);
$('#back').on('click',handleHash);
  