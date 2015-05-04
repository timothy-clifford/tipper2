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
		$scope.calculateLadderChange(data);

		$scope.ladderOptions.columnDefs.push({name: 'name'});
		var roundsCompleted = $scope.ladderOptions.data[0].results.length;
		for(var i = 0; i < roundsCompleted; i++) {
			// this will work until the finals...
			$scope.ladderOptions.columnDefs.push( {name: 'round ' + (i + 1), field: 'results[' + i + '].score'});
		}

		$scope.ladderOptions.columnDefs.push({name: 'change'});	
		$scope.ladderOptions.columnDefs.push({name: 'total'});
	});

	$scope.calculateLadderChange = function(data) {
		// create an ordered array of scores.
		var uniqueTotals = [];
		data.each(function(n) {
			uniqueTotals.push(n.total);
		});
		uniqueTotals = uniqueTotals.unique();

		var uniquePreviousTotals = [];
		data.each(function (n) {
			uniquePreviousTotals.push(n.results[ n.results.length - 2 ].cumulativeTotal);
		});
		uniquePreviousTotals = uniquePreviousTotals.unique();

		// for each name, compare the current rank to the previous, add to the player object
		$scope.ladderOptions.data.each(function(n) {
			var currentRank = uniqueTotals.findIndex(n.total);
			var blah = n.results[ n.results.length - 2 ].cumulativeTotal;
			var previousRank = uniquePreviousTotals.findIndex(blah);
			// rank is an index, convert to number
			n.change = (previousRank - currentRank);
		});
	}

}]);