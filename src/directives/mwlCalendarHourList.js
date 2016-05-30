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
      var dayCounter = moment(vm.viewDate).clone();

      if ($attrs.dayWidth) {
        dayCounter = dayCounter.startOf('week');
      }

      dayCounter = dayCounter.startOf('day').hours(dayViewStart.hours());

      var hourLength = dayViewEnd.clone().startOf('hour').diff(dayViewStart.clone().startOf('hour'), 'hours');
      var hourChunkLength = (60 / vm.dayViewSplit);

      for (var i = 0; i <= hourLength; i++) {
        var hour = {
          label: calendarHelper.formatDate(dayCounter, calendarConfig.dateFormats.hour),
          date: dayCounter.clone(),
          chunkIndexStart: 0,
          chunkIndexEnd: hourChunkLength - 1
        };
        if (i === 0) {
          hour.chunkIndexStart += dayViewStart.diff(dayCounter, 'minutes') / vm.dayViewSplit;
        } else if (i === hourLength) {
          hour.chunkIndexEnd -= dayViewEnd.diff(dayCounter, 'minutes') / vm.dayViewSplit;
        }
        vm.hours.push(hour);
        dayCounter.add(1, 'hour');
      }
      vm.hourChunks = [];
      for (var j = 0; j < hourChunkLength; j++) {
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

    vm.onDragSelectStart = function(date) {
      vm.dateRangeSelect = {
        startDate: date,
        endDate: date
      };
    };

    vm.onDragSelectMove = function(date) {
      if (vm.dateRangeSelect) {
        vm.dateRangeSelect.endDate = date;
      }
    };

    vm.onDragSelectEnd = function(date) {
      vm.dateRangeSelect.endDate = date;
      if (vm.dateRangeSelect.endDate > vm.dateRangeSelect.startDate) {
        vm.onDateRangeSelect({calendarRangeStartDate: vm.dateRangeSelect.startDate, calendarRangeEndDate: vm.dateRangeSelect.endDate});
      }
      delete vm.dateRangeSelect;
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
        onDateRangeSelect: '=',
        onEventTimesChanged: '='
      },
      bindToController: true
    };

  });
