'use strict';

angular.module('myApp', [
	'myApp.version',
	'ui.router'
])

.directive('wrapOwlcarousel', function () {  
    return {  
        restrict: 'E',  
        link: function (scope, element, attrs) {  
            var options = scope.$eval($(element).attr('data-options'));  
            $(element).owlCarousel({
		          center: true,
		          items: 2,
		          loop: true,
		          margin: 10,
		          responsive:{ 600:{items:4} }
            });  
        }  
    };  
})

.config(["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/");
	  
    $stateProvider
	    .state('home', {
	      url: "/home",
	      templateUrl: "templates/home.html"
	    })
	    .state('about', {
	      url: "/about",
	      templateUrl: "templates/about.html"
	    })
	    .state('where', {
	      url: "/where",
	      templateUrl: "templates/where.html"
	    })	
	    .state('gallery', {
	      url: "/gallery",
	      templateUrl: "templates/gallery.html",
	      image: 'http://lorempixel.com/400/200/sports'
	    });	        	    
	//$locationProvider.html5Mode(true);	
}]);
