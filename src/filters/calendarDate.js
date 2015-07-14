'use strict';

var angular = require('angular');

angular
  .module('mwl.calendar')
  .filter('calendarDate', function(calendarHelper, calendarConfig) {

    function calendarDate(date, format, getFromConfig) {

      if (getFromConfig === true) {
        format = calendarConfig.dateFormats[format];
      }

      return calendarHelper.formatDate(date, format);

    }

    // This is stateful because the locale can change as well
    // as calendarConfig.dateFormats which would change the value outside of this filter
    calendarDate.$stateful = true;

    return calendarDate;

  });
