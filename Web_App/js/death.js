//api interaction//


var app = angular.module('myApp', []);

app.controller('myCtrl', function($scope, $http) {

      //display results
        $scope.getResult = function(){
        //encode url
      
          var a1 = $('#a1').val(); //name
          var a2 = $('#a2').val(); //sex
          var a3 = $('#a3').val(); //age
          var a4 = $('#a4').val(); //education years
          var a5 = $('#a5').val(); //current month
          var nurl = encodeURI("https://deathcalcapp-rserva.c9users.io:8080/api/getDeath?0="+a4+'&1='+a5+'&2='+a2+'&3='+a3);

          console.log(a1);
          console.log(a4);
          console.log(a5);
          console.log(a2);
          console.log(a3);
          
          console.log(nurl);
          
        if(a1 && a2 && a3 && a4 && a5){
        $http.get(nurl)
        .then(function(response) {
            console.log("response:"+response.data.message);
            $scope.result = response.data.message;
            $("#result").html(response.data.message);
            });
        }
        }
});