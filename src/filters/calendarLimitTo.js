'use strict';

var angular = require('angular');

angular
  .module('mwl.calendar')
  .filter('calendarLimitTo', function(limitToFilter) {

    if (angular.version.minor >= 4) { //1.4+ supports the begin attribute
      return limitToFilter;
    }

    //Copied from the angular source. Only 1.4 has the begin functionality.
    return function(input, limit, begin) {
      if (Math.abs(Number(limit)) === Infinity) {
        limit = Number(limit);
      } else {
        limit = parseInt(limit);
      }
      if (isNaN(limit)) {
        return input;
      }

      if (angular.isNumber(input)) {
        input = input.toString();
      }
      if (!angular.isArray(input) && !angular.isString(input)) {
        return input;
      }

      begin = (!begin || isNaN(begin)) ? 0 : parseInt(begin);
      begin = (begin < 0 && begin >= -input.length) ? input.length + begin : begin;

      if (limit >= 0) {
        return input.slice(begin, begin + limit);
      } else if (begin === 0) {
        return input.slice(limit, input.length);
      } else {
        return input.slice(Math.max(0, begin + limit), begin);
      }
    };

  });
