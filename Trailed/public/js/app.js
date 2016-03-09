var app = angular.module('traildApp', [
  'ngRoute',
  'TraildControllers',
  'ngMap',
  'ui.bootstrap'
]);

app.config(function($routeProvider){
  $routeProvider
	.when('/', {
    	templateUrl: 'Home.html',
	    controller: 'HomeController'
	})

  .when('/trails/:trailType', {
    templateUrl: 'ListTrails.html',
    controller: 'ListTrailsController'
  })

  .when('/trail/:trailId', {
    templateUrl: 'Trail.html',
    controller: 'TrailController'
  })

  .when('/trailmap', {
    templateUrl: 'TrailMap.html',
    controller: 'TrailMapController'
  })

  .when('/noTrailsFound', {
    templateUrl: 'noTrailsRouteFound.html',
    controller: 'noTrailsRouteFoundController'
  })

});






