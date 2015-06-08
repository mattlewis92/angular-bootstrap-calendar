'use strict';

angular
  .module('mwl.calendar')
  .filter('calendarDate', function(calendarHelper, calendarConfig) {

    function calendarDate(date, format, getFromConfig) {

      if (getFromConfig === true) {
        format = calendarConfig.dateFormats[format];
      }

      return calendarHelper.formatDate(date, format);

    }

    calendarDate.$stateful = true;

    return calendarDate;

  });
