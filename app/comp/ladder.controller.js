'use strict';

angular.module('tipper2.comp', ['ngRoute', 'ui.grid'])

.controller('LadderCtrl', ['$scope', 'LadderSvc', function($scope, LadderSvc) {

	$scope.ladderOptions = {
		enableSorting: true,
	};

	LadderSvc.query().$promise.then( function(data) {
		$scope.ladderOptions.data = data
	});

}]);