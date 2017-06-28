var deathcalc = angular.module('deathcalc', ['ngRoute', 'ngAnimate', 'deathController']);

deathcalc.config(function($routeProvider, $locationProvider){
	$routeProvider
	.when('/', {
		templateUrl: 'pages/death.html',
        controller: 'DeathCtrl'
	})
	.when('/results', {
		templateUrl: 'pages/results.html',
		controller: 'DeathCtrl'
	});
	$locationProvider.html5Mode({ 
		enabled: true,
    	rewriteLinks: false 
    });
	$locationProvider.hashPrefix('');
});

 //  .directive('scrollTo', function ($location, $anchorScroll) {
 //    return function(scope, element, attrs) {
 //    element.bind('click', function(event) {
	// 		event.stopPropagation();
	// 		scope.$on('$locationChangeStart', function(ev) {
	// 		  ev.preventDefault();
	// 		});
	// 		var location = attrs.scrollTo;
	// 		$location.hash(location);
	// 		$anchorScroll();
	// 	});
	// };
 //  });

// .run(function($rootScope, $location, $anchorScroll){
//   //when the route is changed scroll to the proper element.
//   $rootScope.$on('$routeChangeSuccess', function(newRoute, oldRoute){
//   	console.log("henlo i am scroll");
//   	console.log($location.path());
//   	//$location.hash($routeParams.scrollTo);
//     if($location.hash()) $anchorScroll();  

//    // $scope.scrollTo = function(id) {
//     //  $location.hash(id);
//     //  $anchorScroll();
//     $document.scrollToElement(someElement, offset, duration);
//   })
//  });
