'use strict';

angular.module('myApp', [
	'myApp.view1',
	'myApp.view2',
	'myApp.version',
	'ui.router'
])

.config(["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider) {
  
    $urlRouterProvider.otherwise("/");
	  
    $stateProvider
	    .state('view1', {
	      url: "/view1",
	      templateUrl: "view1/view1.html"
	    })
	    .state('view2', {
	      url: "/view2",
	      templateUrl: "view2/view2.html",
		});

	//$locationProvider.html5Mode(true);	
}]);