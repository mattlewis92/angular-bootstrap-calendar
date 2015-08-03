'use strict';

var angular = require('angular');

angular
  .module('mwl.calendar')
  .controller('MwlCalendarYearCtrl', function($scope, moment, calendarHelper) {

    var vm = this;

    $scope.$on('calendar.refreshView', function() {
      vm.view = calendarHelper.getYearView(vm.events, vm.currentDay, vm.cellModifier);

      //Auto open the calendar to the current day if set
      if (vm.autoOpen) {
        vm.view.forEach(function(month) {
          if (moment(vm.currentDay).startOf('month').isSame(month.date) && !vm.openMonthIndex) {
            vm.monthClicked(month, true);
          }
        });
      }

    });

    vm.monthClicked = function(month, monthClickedFirstRun) {

      if (!monthClickedFirstRun) {
        vm.onTimespanClick({calendarDate: month.date.toDate()});
      }

      vm.openRowIndex = null;
      var monthIndex = vm.view.indexOf(month);
      if (monthIndex === vm.openMonthIndex) { //the month has been clicked and is already open
        vm.openMonthIndex = null; //close the open month
      } else {
        vm.openMonthIndex = monthIndex;
        vm.openRowIndex = Math.floor(monthIndex / 4);
      }

    };

    vm.handleEventDrop = function(event, newMonthDate) {
      var newStart = moment(event.startsAt).month(moment(newMonthDate).month());
      var newEnd = calendarHelper.adjustEndDateFromStartDiff(event.startsAt, newStart, event.endsAt);

      vm.onEventTimesChanged({
        calendarEvent: event,
        calendarDate: newMonthDate,
        calendarNewEventStart: newStart.toDate(),
        calendarNewEventEnd: newEnd ? newEnd.toDate() : null
      });
    };

  })
  .directive('mwlCalendarYear', function(calendarUseTemplates) {

    return {
      template: calendarUseTemplates ? require('./../templates/calendarYearView.html') : '',
      restrict: 'EA',
      require: '^mwlCalendar',
      scope: {
        events: '=',
        currentDay: '=',
        onEventClick: '=',
        onEventTimesChanged: '=',
        onEditEventClick: '=',
        onDeleteEventClick: '=',
        editEventHtml: '=',
        deleteEventHtml: '=',
        autoOpen: '=',
        onTimespanClick: '=',
        cellModifier: '='
      },
      controller: 'MwlCalendarYearCtrl as vm',
      link: function(scope, element, attrs, calendarCtrl) {
        scope.vm.calendarCtrl = calendarCtrl;
      },
      bindToController: true
    };

  });
