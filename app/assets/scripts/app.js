'use strict';

var app = angular.module('myApp', [
	'myApp.version',
	'ngRoute',
	'ui.router',
	'uiGmapgoogle-maps'
]);

app.config(["$stateProvider", "$urlRouterProvider", "$locationProvider", "$routeProvider", "uiGmapGoogleMapApiProvider", 
	function($stateProvider, $urlRouterProvider, $locationProvider, $routeProvider, GoogleMapApiProviders) {
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

		GoogleMapApiProviders.configure({
            china: true
        });
}]);

app.directive('wrapOwlcarousel', function () {  
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
});

app.controller('mainCtrl', ['$scope', 'markers', function($scope, markers){
    $scope.map = {
      center: {
        latitude: 25.7516486,
        longitude: -80.2243542
      },
      zoom: 11,
      bounds: {}
    };
    $scope.options = {
      scrollwheel: false
    };
    $scope.markers = markers;


    // Get the bounds from the map once it's loaded
    $scope.$watch(function() {
      return $scope.map.bounds;
    }, function(nv, ov) {
      //console.log(nv);
      //console.log(ov);

        var markers = [
          {
            id: 1,
            //icon: 'assets/img/blue_marker.png',
            latitude: 25.799912,
            longitude: -80.199248,
            showWindow: false,
            title: 'Panther Coffee, Wynwood',
            address: '2390 NW 2nd Ave Miami, FL 33127'
          },
          {
            id: 2,
            //icon: 'assets/img/blue_marker.png',
            latitude: 25.794506,
            longitude: -80.144168,
            showWindow: false,
            title: 'Panther Coffee, South Beach',
            address: '1875 Purdy Ave Miami Beach, FL 33139'
          }          
          ];        
        
        $scope.markers.currentMarkers = markers;
     
    }, true);
    
    $scope.addMarkerLocation = function(){
      //console.log('adding m');

      var m = 
          {
            id: 3,
            //icon: 'assets/img/blue_marker.png',
            latitude: 25.686384,
            longitude: -80.311644,
            showWindow: false,
            title: 'Jimmyz Kitchen Pinecrest',
            address: '9050 S Dixie Hwy Miami, FL 33156'
          };
      $scope.markers.currentMarkers.push(m);
      //console.log(m);
    };
}]); 

app.factory('markers', function markers () {
    return {
      currentMarkers: []
    };
});

