'use strict';

angular.module('tipper2.comp', ['ngRoute', 'ui.grid'])

.controller('LadderCtrl', ['$scope', 'LadderSvc', function($scope, LadderSvc) {

	$scope.ladderOptions = {
		enableSorting: true,
		columnDefs: [],
		excludeProperties: ['$$hashKey'],
	};

	LadderSvc.query().$promise.then( function(data) {
		$scope.ladderOptions.data = data;

		$scope.ladderOptions.columnDefs.push({name: 'name'});
		var roundsCompleted = $scope.ladderOptions.data[0].results.length;
		for(var i = 0; i < roundsCompleted; i++) {
			// this will work until the finals...
			$scope.ladderOptions.columnDefs.push( {name: 'round ' + (i + 1), field: 'results[' + i + '].score'});
		}
		// find the movement from the last round, ie. rank up 2, down 1, etc
		// need to find the rank for the current round (ordered list of names)
		var rankedCurrentRound = $scope.ladderOptions.data.sortBy(function(n) {
			if (n.results.length > 0) {
				return n.results[n.results.length - 1].cumulativeTotal;
			}
		}, true);
		// need to find the rank for the previous round (ordered list of names)
		var rankedPreviousRound = $scope.ladderOptions.data.sortBy(function(n) {
			if (n.results.length > 1)
			return n.results[n.results.length - 2].cumulativeTotal;
		}, true);
		// for each name, compare the current rank to the previous, add to the player object
		$scope.ladderOptions.data.each(function(n) {
			var currentRank = rankedCurrentRound.findIndex({ name: n.name});
			var previousRank = rankedPreviousRound.findIndex({ name: n.name});
			n.change = currentRank - previousRank;
		});
		$scope.ladderOptions.columnDefs.push({name: 'change'});	
		$scope.ladderOptions.columnDefs.push({name: 'total'});
	});

}]);