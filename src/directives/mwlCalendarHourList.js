'use strict';

var angular = require('angular');

angular
  .module('mwl.calendar')
  .controller('MwlCalendarHourListCtrl', function($scope, moment, calendarConfig, calendarHelper) {
    var vm = this;
    var dayViewStart, dayViewEnd;

    function updateDays() {
      dayViewStart = moment(vm.dayViewStart || '00:00', 'HH:mm');
      dayViewEnd = moment(vm.dayViewEnd || '23:00', 'HH:mm');
      vm.dayViewSplit = parseInt(vm.dayViewSplit);
      vm.hours = [];
      var dayCounter = moment(vm.currentDay)
        .clone()
        .hours(dayViewStart.hours())
        .minutes(dayViewStart.minutes())
        .seconds(dayViewStart.seconds());
      for (var i = 0; i <= dayViewEnd.diff(dayViewStart, 'hours'); i++) {
        vm.hours.push({
          label: calendarHelper.formatDate(dayCounter, calendarConfig.dateFormats.hour),
          date: dayCounter.clone()
        });
        dayCounter.add(1, 'hour');
      }
    }

    var originalLocale = moment.locale();

    $scope.$on('calendar.refreshView', function() {

      if (originalLocale !== moment.locale()) {
        originalLocale = moment.locale();
        updateDays();
      }

    });

    $scope.$watchGroup([
      'vm.dayViewStart',
      'vm.dayViewEnd',
      'vm.dayViewSplit',
      'vm.currentDay'
    ], function() {
      updateDays();
    });

  })
  .directive('mwlCalendarHourList', function(calendarUseTemplates) {

    return {
      restrict: 'EA',
      template: calendarUseTemplates ? require('./../templates/calendarHourList.html') : '',
      controller: 'MwlCalendarHourListCtrl as vm',
      scope: {
        currentDay: '=',
        dayViewStart: '=',
        dayViewEnd: '=',
        dayViewSplit: '=',
        onTimespanClick: '='
      },
      bindToController: true
    };

  });
