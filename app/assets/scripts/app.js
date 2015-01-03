'use strict';

angular.module('myApp', [
	'myApp.version',
	'ngRoute',
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

.config(["$stateProvider", "$urlRouterProvider", "$locationProvider", "$routeProvider", 
	function($stateProvider, $urlRouterProvider, $locationProvider, $routeProvider) {
	    //$locationProvider.html5Mode(true);
	    //$locationProvider.hashPrefix('!');    
	    $stateProvider
		    .state('home',    { url: "/home",     templateUrl: "templates/home.html" })
		    .state('about',   { url: "/about",    templateUrl: "templates/about.html" })
		    .state('where',   { url: "/where",    templateUrl: "templates/where.html" })	
		    .state('products',   { url: "/products",    templateUrl: "templates/products.html" })	
		   /* .state('products', { 
		    	url: "/products/:param", 
		    	templateUrl: "templates/products.html",
		    	controller: "productController"
		    })*/
		    .state('gallery', { url: "/gallery",  templateUrl: "templates/gallery.html", image: 'http://lorempixel.com/400/200/sports' });
		$urlRouterProvider.otherwise('/home');
}])

/*.controller('productController', ["$scope", "$routeParams", function( $scope, $routeParams) {
	    		$scope.param = "default";
	    		$routeParams = $routeParams.param;
	    		//$scope.param = $routeParams.param;
	    		//$scope.product = $routeParams.product;
	    		console.log('product is: '+ $routeParams.param);
	        }])
*/

