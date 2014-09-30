'use strict';


angular.module('mwl.calendar')
  .filter('truncateEventTitle', function() {

    return function(string, length) {
      if (!string) return '';

      if (string.length >= length) {
        return string.substr(0, length) + '...';
      } else {
        return string;
      }
    };

  });
