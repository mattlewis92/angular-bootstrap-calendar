'use strict';

angular
  .module('mwl.calendar')
  .filter('calendarTruncateEventTitle', function() {

    return function(string, length, boxHeight) {
      if (!string) {
        return '';
      }

      //Only truncate if if actually needs truncating
      if (string.length >= length && string.length / 20 > boxHeight / 30) {
        return string.substr(0, length) + '...';
      } else {
        return string;
      }
    };

  });
