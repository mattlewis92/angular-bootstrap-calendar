'use strict';

var angular = require('angular');

angular
  .module('mwl.calendar')
  .controller('MwlCalendarHourListCtrl', function($scope, $attrs, moment, calendarConfig, calendarHelper) {
    var vm = this;
    var dayViewStart, dayViewEnd;

    function updateDays() {
      dayViewStart = moment(vm.dayViewStart || '00:00', 'HH:mm');
      dayViewEnd = moment(vm.dayViewEnd || '23:00', 'HH:mm');
      vm.dayViewSplit = parseInt(vm.dayViewSplit);
      vm.hours = [];
      var dayCounter = moment(vm.viewDate)
        .clone();

      if ($attrs.dayWidth) {
        dayCounter = dayCounter.startOf('week');
      }

      dayCounter
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
      vm.hourChunks = [];
      for (var j = 0; j < (60 / vm.dayViewSplit); j++) {
        vm.hourChunks.push(j);
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
      'vm.viewDate'
    ], function() {
      updateDays();
    });

    vm.eventDropped = function(event, date) {
      var newStart = moment(date);
      var newEnd = calendarHelper.adjustEndDateFromStartDiff(event.startsAt, newStart, event.endsAt);

      vm.onEventTimesChanged({
        calendarEvent: event,
        calendarDate: date,
        calendarNewEventStart: newStart.toDate(),
        calendarNewEventEnd: newEnd ? newEnd.toDate() : null
      });
    };

    vm.getClickedDate = function(baseDate, minutes, days) {
      return moment(baseDate).clone().add(minutes, 'minutes').add(days || 0, 'days').toDate();
    };

  })
  .directive('mwlCalendarHourList', function(calendarConfig) {

    return {
      restrict: 'E',
      templateUrl: calendarConfig.templates.calendarHourList,
      controller: 'MwlCalendarHourListCtrl as vm',
      scope: {
        viewDate: '=',
        dayViewStart: '=',
        dayViewEnd: '=',
        dayViewSplit: '=',
        dayWidth: '=?',
        onTimespanClick: '=',
        onEventTimesChanged: '='
      },
      bindToController: true
    };

  });
