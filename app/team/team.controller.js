'use strict';

angular.module('tipper2.team', ['ngRoute', 'ui.grid'])

.controller('TeamCtrl', ['$scope', '$routeParams', '$log',
	function($scope, $routeParams, $log, uiGridGroupingConstants) {

	$scope.teamName = $routeParams.teamName;

}]);