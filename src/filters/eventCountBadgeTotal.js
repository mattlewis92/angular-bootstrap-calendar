'use strict';

angular.module('mwl.calendar')
  .filter('eventCountBadgeTotal', function() {

    return function(events) {

      return events.filter(function(event) {
        return event.incrementsBadgeTotal !== false;
      }).length;

    };

  });
