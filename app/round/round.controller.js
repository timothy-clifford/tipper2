'use strict';

angular.module('tipper2.round', ['ngRoute', 'ui.grid'])

.controller('RoundCtrl', ['$scope', 'DrawSvc', '$routeParams', '$log',
	function($scope, DrawSvc, $routeParams, $log) {
		$scope.round = {};

		DrawSvc.query().$promise.then( function(data) {
		$scope.draw = data;
		
		$scope.round = $scope.draw.find({round: $routeParams.roundName});
	});

}]);