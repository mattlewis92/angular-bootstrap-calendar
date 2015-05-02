'use strict';

angular
  .module('mwl.calendar')
  .factory('calendarTitle', function (moment, calendarConfig) {

    function day(currentDay) {
      return moment(currentDay).format(calendarConfig.titleFormats.day);
    }

    function week(currentDay) {
      var weekTitleLabel = calendarConfig.titleFormats.week;
      return weekTitleLabel.replace('{week}', moment(currentDay).week()).replace('{year}', moment(currentDay).format('YYYY'));
    }

    function month(currentDay) {
      return moment(currentDay).format(calendarConfig.titleFormats.month);
    }

    function year(currentDay) {
      return moment(currentDay).format(calendarConfig.titleFormats.year);
    }

    return {
      day: day,
      week: week,
      month: month,
      year: year
    };

  });
