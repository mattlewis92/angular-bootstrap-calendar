'use strict';

var angular = require('angular');

angular
  .module('mwl.calendar')
  .controller('MwlCalendarHourListCtrl', function($scope, $attrs, moment, calendarConfig, calendarHelper, $parse, interact) {
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

    if (interact && vm.onSelectRange) {
      vm.select = {};
      vm.select.active = false;
      interact('.cal-day-hour-part').on('down', function(event) {
        if (!vm.select.active) {
          vm.select.active = true;
          var date = $parse(event.target.attributes['current-value'].value)($scope);
          vm.select.startDate = date;
          vm.select.endDate = date;
          $scope.$apply();
        }
        event.preventDefault();
      });

      interact('.cal-day-hour-part').on('up', function(event) {
        if (vm.select.active) {
          vm.select.active = false;
          var date = $parse(event.target.attributes['current-value'].value)($scope);
          vm.select.endDate = vm.getClickedDate(date, vm.dayViewSplit);
          if (vm.select.endDate > vm.select.startDate) {
            vm.onSelectRange({startDate: vm.select.startDate, endDate: vm.select.endDate});
            //vm.onTimespanClick({calendarDate: vm.select.startDate});
          }
          $scope.$apply();
        }
        event.preventDefault();
      });

      interact('.cal-day-hour-part').on('move', function(event) {
        if (vm.select.active) {
          var date = $parse(event.target.attributes['current-value'].value)($scope);
          vm.select.endDate = vm.getClickedDate(date, vm.dayViewSplit);
          $scope.$apply();
        }
        event.preventDefault();
      });
    }
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
        onSelectRange: '=',
        onEventTimesChanged: '='
      },
      bindToController: true
    };

  });
