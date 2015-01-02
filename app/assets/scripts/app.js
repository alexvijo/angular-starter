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

.config(["$stateProvider", "$urlRouterProvider", "$locationProvider", function($stateProvider, $urlRouterProvider, $locationProvider) {
    
    // enable html5Mode for pushstate ('#'-less URLs)
    //$locationProvider.html5Mode(true);
    //$locationProvider.hashPrefix('!');  

	$urlRouterProvider.otherwise('/home');  
    $stateProvider
	    .state('home',    { url: "/home",     templateUrl: "templates/home.html" })
	    .state('about',   { url: "/about",    templateUrl: "templates/about.html" })
	    .state('where',   { url: "/where",    templateUrl: "templates/where.html" })	
	    .state('products',   { url: "/products",    templateUrl: "templates/products.html" })	
	    .state('products.first', { url: "/first", templateUrl: "templates/about.html",
	    	controller: function ($stateParams) {
	    		console.log('products');
            //expect($stateParams).toBe({contactId: "42"});
        	} 
	    })

	    .state('gallery', { url: "/gallery",  templateUrl: "templates/gallery.html", image: 'http://lorempixel.com/400/200/sports' });

}]);
