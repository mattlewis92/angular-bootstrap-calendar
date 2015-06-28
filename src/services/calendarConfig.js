'use strict';

var angular = require('angular');

angular
  .module('mwl.calendar')
  .provider('calendarConfig', function() {

    var defaultFormats = {
      angular: {
        date: {
          hour: 'ha',
          day: 'd MMM',
          month: 'MMMM',
          weekDay: 'EEEE',
          time: 'HH:mm',
          datetime: 'MMM d, h:mm a'
        },
        title: {
          day: 'EEEE d MMMM, yyyy',
          week: 'Week {week} of {year}',
          month: 'MMMM yyyy',
          year: 'yyyy'
        }
      },
      moment: {
        date: {
          hour: 'ha',
          day: 'D MMM',
          month: 'MMMM',
          weekDay: 'dddd',
          time: 'HH:mm',
          datetime: 'MMM D, h:mm a'
        },
        title: {
          day: 'dddd D MMMM, YYYY',
          week: 'Week {week} of {year}',
          month: 'MMMM YYYY',
          year: 'YYYY'
        }
      }
    };

    var dateFormatter = 'angular';
    var defaultDateFormats = angular.copy(defaultFormats[dateFormatter].date);
    var defaultTitleFormats = angular.copy(defaultFormats[dateFormatter].title);
    var showTimesOnWeekView = false;

    var i18nStrings = {
      eventsLabel: 'Events',
      timeLabel: 'Time'
    };

    var displayAllMonthEvents = false;

    var configProvider = this;

    configProvider.setDateFormats = function(formats) {
      angular.extend(defaultDateFormats, formats);
      return configProvider;
    };

    configProvider.setTitleFormats = function(formats) {
      angular.extend(defaultTitleFormats, formats);
      return configProvider;
    };

    configProvider.setI18nStrings = function(strings) {
      angular.extend(i18nStrings, strings);
      return configProvider;
    };

    configProvider.setDisplayAllMonthEvents = function(value) {
      displayAllMonthEvents = value;
      return configProvider;
    };

    configProvider.setDateFormatter = function(value) {
      if (['angular', 'moment'].indexOf(value) === -1) {
        throw new Error('Invalid date formatter. Allowed types are angular and moment.');
      }
      dateFormatter = value;
      defaultDateFormats = angular.copy(defaultFormats[dateFormatter].date);
      defaultTitleFormats = angular.copy(defaultFormats[dateFormatter].title);
      return configProvider;
    };

    configProvider.showTimesOnWeekView = function(value) {
      showTimesOnWeekView = value; //experimental, and ignores the event end date
      return configProvider;
    };

    configProvider.$get = function() {
      return {
        dateFormats: defaultDateFormats,
        titleFormats: defaultTitleFormats,
        i18nStrings: i18nStrings,
        displayAllMonthEvents: displayAllMonthEvents,
        dateFormatter: dateFormatter,
        showTimesOnWeekView: showTimesOnWeekView
      };
    };

  });
