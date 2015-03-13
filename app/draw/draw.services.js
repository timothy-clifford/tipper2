'use strict';

angular.module('tipper2.draw.services', ['ngResource'])

.factory('DrawSvc', ['$resource', function($resource) {
	return $resource('/data/draw_2015.json', {} );
}])

.factory('RoundSvc', ['$resource', function($resource) {
	return $resource('/data/draw_rounds_2015.json', {});
}])
;