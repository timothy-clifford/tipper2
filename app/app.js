'use strict';

// Declare app level module which depends on views, and components
angular.module('tipper2', [
	'ngRoute',
	'ngResource',
	'ui.grid',
	'tipper2.draw.services',
	'tipper2.view1',
	'tipper2.draw'
]).

config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/draw', {
    	templateUrl: 'draw/draw.html',
    	controller: 'DrawCtrl'
  	});
  	$routeProvider.otherwise({redirectTo: '/view1'});

}]);
