'use strict';

angular
  .module('mwl.calendar')
  .factory('calendarTitle', function(moment, calendarConfig, calendarHelper) {

    function day(currentDay) {
      return calendarHelper.formatDate(currentDay, calendarConfig.titleFormats.day);
    }

    function week(currentDay) {
      var weekTitleLabel = calendarConfig.titleFormats.week;
      return weekTitleLabel.replace('{week}', moment(currentDay).week()).replace('{year}', moment(currentDay).format('YYYY'));
    }

    function month(currentDay) {
      return calendarHelper.formatDate(currentDay, calendarConfig.titleFormats.month);
    }

    function year(currentDay) {
      return calendarHelper.formatDate(currentDay, calendarConfig.titleFormats.year);
    }

    return {
      day: day,
      week: week,
      month: month,
      year: year
    };

  });
