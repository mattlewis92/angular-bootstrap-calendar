'use strict';

var angular = require('angular');

angular
  .module('mwl.calendar')
  .controller('MwlCalendarMonthCtrl', function($scope, moment, calendarHelper, calendarConfig) {

    var vm = this;
    vm.calendarConfig = calendarConfig;
    vm.openRowIndex = null;

    $scope.$on('calendar.refreshView', function() {

      vm.weekDays = calendarHelper.getWeekDayNames();

      vm.view = calendarHelper.getMonthView(vm.events, vm.viewDate, vm.cellModifier);
      var rows = Math.floor(vm.view.length / 7);
      vm.monthOffsets = [];
      for (var i = 0; i < rows; i++) {
        vm.monthOffsets.push(i * 7);
      }

      //Auto open the calendar to the current day if set
      if (vm.cellIsOpen && vm.openRowIndex === null) {
        vm.openDayIndex = null;
        vm.view.forEach(function(day) {
          if (day.inMonth && moment(vm.viewDate).startOf('day').isSame(day.date)) {
            vm.dayClicked(day, true);
          }
        });
      }

    });

    vm.dayClicked = function(day, dayClickedFirstRun, $event) {

      if (!dayClickedFirstRun) {
        vm.onTimespanClick({
          calendarDate: day.date.toDate(),
          calendarCell: day,
          $event: $event
        });
        if ($event && $event.defaultPrevented) {
          return;
        }
      }

      vm.openRowIndex = null;
      var dayIndex = vm.view.indexOf(day);
      if (dayIndex === vm.openDayIndex) { //the day has been clicked and is already open
        vm.openDayIndex = null; //close the open day
        vm.cellIsOpen = false;
      } else {
        vm.openDayIndex = dayIndex;
        vm.openRowIndex = Math.floor(dayIndex / 7);
        vm.cellIsOpen = true;
      }

    };

    vm.highlightEvent = function(event, shouldAddClass) {

      vm.view.forEach(function(day) {
        delete day.highlightClass;
        if (shouldAddClass) {
          var dayContainsEvent = day.events.indexOf(event) > -1;
          if (dayContainsEvent) {
            day.highlightClass = 'day-highlight dh-event-' + event.type;
          }
        }
      });

    };

    vm.handleEventDrop = function(event, newDayDate, draggedFromDate) {

      var newStart = moment(event.startsAt)
        .date(moment(newDayDate).date())
        .month(moment(newDayDate).month());

      var newEnd = calendarHelper.adjustEndDateFromStartDiff(event.startsAt, newStart, event.endsAt);

      vm.onEventTimesChanged({
        calendarEvent: event,
        calendarDate: newDayDate,
        calendarNewEventStart: newStart.toDate(),
        calendarNewEventEnd: newEnd ? newEnd.toDate() : null,
        calendarDraggedFromDate: draggedFromDate
      });
    };

  })
  .directive('mwlCalendarMonth', function(calendarConfig) {

    return {
      templateUrl: calendarConfig.templates.calendarMonthView,
      restrict: 'E',
      require: '^mwlCalendar',
      scope: {
        events: '=',
        viewDate: '=',
        onEventClick: '=',
        onEditEventClick: '=',
        onDeleteEventClick: '=',
        onEventTimesChanged: '=',
        editEventHtml: '=',
        deleteEventHtml: '=',
        cellIsOpen: '=',
        onTimespanClick: '=',
        cellModifier: '=',
        slideBoxDisabled: '='
      },
      controller: 'MwlCalendarMonthCtrl as vm',
      link: function(scope, element, attrs, calendarCtrl) {
        scope.vm.calendarCtrl = calendarCtrl;
      },
      bindToController: true
    };

  });
