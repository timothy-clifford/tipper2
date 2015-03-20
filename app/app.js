'use strict';

// Declare app level module which depends on views, and components
angular.module('tipper2', [
	'ngRoute',
	'ngResource',
	'ui.grid',
	'tipper2.draw.services',
	'tipper2.comp.services',
	'tipper2.comp',
	'tipper2.team',
	'tipper2.round',
	'tipper2.draw'
]).

config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/draw', {
    	templateUrl: 'draw/draw.html',
    	controller: 'DrawCtrl'
  	});
	$routeProvider.when('/comp/ladder', {
	    templateUrl: 'comp/ladder.html',
	    controller: 'LadderCtrl'
	});
	$routeProvider.when('/team/:teamName', {
		templateUrl: 'team/team.html',
		controller: 'TeamCtrl'
	});
	$routeProvider.when('/round/:roundName', {
		templateUrl: 'round/round.html',
		controller: 'RoundCtrl'
	});
  	$routeProvider.otherwise({redirectTo: '/comp/ladder'});

}]);
