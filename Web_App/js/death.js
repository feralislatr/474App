//api interaction//

var deathController = angular.module('deathController', []); //removed ngroute & deathcalc

// angular.module('deathcalc').directive('Death', function(){
//   return{
//     restrict: 'E', //<- only matches element name
//     controller: 'DeathCtrl',
//     scope: true
//   };
// });

deathController.controller('DeathCtrl', function($scope, $http){
   
      //display results
      $scope.getResult = function(){
          var name = $scope.name;
          var sex = $scope.sex;
          var age = $scope.age;
          var edu = $scope.edu;
          var month = $scope.month;

          //var nurl = encodeURI("http://localhost:4200/api/getDeath?0="+a4+'&1='+a5+'&2='+a2+'&3='+a3); //docker
          var nurl = encodeURI("http://localhost:4200/api/getDeath?0="+edu+'&1='+month+'&2='+sex+'&3='+age);
          console.log(edu);
          console.log(month);
          console.log(sex);
          console.log(age);
          
          console.log("sending "+nurl);

          //stop page reload on anchor scroll - might no need
          $scope.$on('$locationChangeStart', function(ev) {
            ev.preventDefault();
          });
          
          //if(a2 && a3 && a4 && a5){
          if(name && sex && age && edu && month != undefined){
          $http.get(nurl)
          .then(function(response) {
              console.log("response:"+response.data.message);
              $scope.cause = response.data.message;
             // $("#result").html(response.data.message);
             //$("#result").html($scope.cause);
              });
          }else{
            alert("Fill out all the forms so you can die properly");
          }
      }
});








//start with blank input value on load
$(function() {
    $('input').val('');
});

// window.onload = function(){
//  document.getElementById("#a1").value = "";
// }


//vertical scroll
$(function() {
  $('.move').bind('click',function(event){
      var $anchor = $(this);
      console.log("jquery scroll was click");
    $('html, body').stop().animate({
      scrollTop: $($anchor.attr('href')).offset().top
    }, 1300,'easeInOutExpo');
    event.preventDefault();

  });
});

//honestly this doesn't even work

// function scroll(){
//     console.log("i work1");
//     $("#page1").animate({left:'-1000px'},10000,'easeInOutExpo');
//     console.log("i work");
//     //$("#container").animate({'margin-left':'200px'},500);
//     };

//use angular instead
//nvm, see if it works how it is 
//nvm, remove jquery

//page change
// function handleHash(){
//      // var a1 = $('#a1').val(); //name
//      // console.log("a1: "+ a1);
//      var a2 = $('#a2').val(); //sex
//      console.log("a2: "+ a2);
//      var a3 = $('#a3').val(); //age
//      console.log("a3: "+ a3);
//      var a4 = $('#a4').val(); //education years
//      console.log("a4: "+ a4);
//      var a5 = $('#a5').val(); //current month
//      console.log("a5: "+ a5);
//       if(a2 && a3 && a4 && a5){
//     $(location.hash).removeClass('hidden');
//     $('body').html($(location.hash).html());
//       }
//       else{
//       if(parent.location.hash != ''){
//         //alert("Fill out all the forms so you can die properly");
//       }
//       parent.location.hash = '';
     
//         }
//       }

// $(window).on("hashchange", handleHash);
// $('#back').on('click',handleHash);



