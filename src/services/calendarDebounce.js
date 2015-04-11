'use strict';

angular
  .module('mwl.calendar')
  .service('calendarDebounce', function($timeout) {

    function debounce(func, wait, immediate) {
      var timeout;
      return function() {
        var context = this, args = arguments;
        var later = function() {
          timeout = null;
          if (!immediate) {
            func.apply(context, args);
          }
        };
        var callNow = immediate && !timeout;
        $timeout.cancel(timeout);
        timeout = $timeout(later, wait);
        if (callNow) {
          func.apply(context, args);
        }
      };
    }

    return debounce;

  });
