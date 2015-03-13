'use strict';

angular.module('tipper2.draw', ['ngRoute', 'ui.grid'])

.controller('DrawCtrl', ['$scope', 'DrawSvc', 'RoundSvc', '$location', '$anchorScroll', '$log', 
	function($scope, DrawSvc, RoundSvc, $location, $anchorScroll, $log) {
	
	$scope.draw = $scope.rounds = {
	};

	$scope.heading = function(index) {
		return Object.keys($scope.draw)[index]
	};

	$scope.doShortcut = function() {
		$log.debug($scope.selectedRound);
		$location.hash($scope.selectedRound.title);
	};

	RoundSvc.query().$promise.then( function(data) {
		$scope.rounds = data;
	});

	DrawSvc.query().$promise.then( function(data) {
		$scope.draw = data.groupBy(function (n) {
			return n.round;
		});
	});

}]);