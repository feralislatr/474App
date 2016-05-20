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
    //$("#container").animate({'margin-left':'200px'},500);
    };


//page change
function handleHash(){
     var a1 = $('#a1').val(); //name
     console.log("a1: "+ a1);
     var a2 = $('#a2').val(); //sex
     console.log("a2: "+ a2);
     var a3 = $('#a3').val(); //age
     console.log("a3: "+ a3);
     var a4 = $('#a4').val(); //education years
     console.log("a4: "+ a4);
     var a5 = $('#a5').val(); //current month
     console.log("a5: "+ a5);
      if(a1 && a2 && a3 && a4 && a5){
    $(location.hash).removeClass('hidden');
    $('body').html($(location.hash).html());
      }
      else{
      if(parent.location.hash != ''){
        alert("Fill out all the forms so you can die properly");
      }
      parent.location.hash = '';
     
        }
      }

$(window).on("hashchange", handleHash);
$('#back').on('click',handleHash);
 
