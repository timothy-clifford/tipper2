'use strict';

angular.module('tipper2.comp.services', ['ngResource'])

.factory('LadderSvc', ['$resource', function($resource) {
	return $resource('/data/tipping_ladder_2015.json', {} );
}]);