'use strict';

angular.module('mwl.calendar')
  .provider('calendarConfig', function() {

    var defaultDateFormats = {
      hour: 'ha',
      day: 'D MMM',
      month: 'MMMM',
      weekDay: 'dddd'
    };

    var defaultTitleFormats = {
      day: 'dddd D MMMM, YYYY',
      week: 'Week {week} of {year}',
      month: 'MMMM YYYY',
      year: 'YYYY'
    };

    var configProvider = this;

    configProvider.configureDateFormats = function(formats) {
      angular.extend(defaultDateFormats, formats);
      return configProvider;
    };

    configProvider.configureTitleFormats = function(formats) {
      angular.extend(defaultTitleFormats, formats);
      return configProvider;
    };

    configProvider.$get = function() {
      return {
        dateFormats: defaultDateFormats,
        titleFormats: defaultTitleFormats
      };
    };

  });
