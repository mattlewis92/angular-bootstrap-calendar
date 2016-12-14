'use strict';

var angular = require('angular');

angular
  .module('mwl.calendar')
  .controller('MwlCalendarYearCtrl', function($scope, moment, calendarHelper) {

    var vm = this;
    vm.openMonthIndex = null;

    function toggleCell() {
      vm.openRowIndex = null;
      vm.openMonthIndex = null;

      if (vm.cellIsOpen && vm.view) {
        vm.view.forEach(function(month, monthIndex) {
          if (moment(vm.viewDate).startOf('month').isSame(month.date)) {
            vm.openMonthIndex = monthIndex;
            vm.openRowIndex = Math.floor(monthIndex / 4);
          }
        });
      }
    }

    $scope.$on('calendar.refreshView', function() {
      vm.view = calendarHelper.getYearView(vm.events, vm.viewDate, vm.cellModifier);

      if (vm.cellAutoOpenDisabled) {
        toggleCell();
      } else if (!vm.cellAutoOpenDisabled && vm.cellIsOpen && vm.openMonthIndex === null) {
        //Auto open the calendar to the current day if set
        vm.openMonthIndex = null;
        vm.view.forEach(function(month) {
          if (moment(vm.viewDate).startOf('month').isSame(month.date)) {
            vm.monthClicked(month, true);
          }
        });
      }

    });

    vm.monthClicked = function(month, monthClickedFirstRun, $event) {

      if (!monthClickedFirstRun) {
        vm.onTimespanClick({
          calendarDate: month.date.toDate(),
          calendarCell: month,
          $event: $event
        });
        if ($event && $event.defaultPrevented) {
          return;
        }
      }

      if (!vm.cellAutoOpenDisabled) {
        vm.openRowIndex = null;
        var monthIndex = vm.view.indexOf(month);
        if (monthIndex === vm.openMonthIndex) { //the month has been clicked and is already open
          vm.openMonthIndex = null; //close the open month
          vm.cellIsOpen = false;
        } else {
          vm.openMonthIndex = monthIndex;
          vm.openRowIndex = Math.floor(monthIndex / 4);
          vm.cellIsOpen = true;
        }
      }

    };

    vm.handleEventDrop = function(event, newMonthDate) {
      var newStart = moment(event.startsAt)
        .month(moment(newMonthDate).month())
        .year(moment(newMonthDate).year());
      var newEnd = calendarHelper.adjustEndDateFromStartDiff(event.startsAt, newStart, event.endsAt);

      vm.onEventTimesChanged({
        calendarEvent: event,
        calendarDate: newMonthDate,
        calendarNewEventStart: newStart.toDate(),
        calendarNewEventEnd: newEnd ? newEnd.toDate() : null
      });
    };

    vm.$onInit = function() {

      if (vm.cellAutoOpenDisabled) {
        $scope.$watchGroup([
          'vm.cellIsOpen',
          'vm.viewDate'
        ], toggleCell);
      }

    };

    if (angular.version.minor < 5) {
      vm.$onInit();
    }

  })
  .directive('mwlCalendarYear', function() {

    return {
      template: '<div mwl-dynamic-directive-template name="calendarYearView" overrides="vm.customTemplateUrls"></div>',
      restrict: 'E',
      require: '^mwlCalendar',
      scope: {
        events: '=',
        viewDate: '=',
        onEventClick: '=',
        onEventTimesChanged: '=',
        cellIsOpen: '=',
        cellAutoOpenDisabled: '=',
        onTimespanClick: '=',
        cellModifier: '=',
        slideBoxDisabled: '=',
        customTemplateUrls: '=?',
        templateScope: '='
      },
      controller: 'MwlCalendarYearCtrl as vm',
      link: function(scope, element, attrs, calendarCtrl) {
        scope.vm.calendarCtrl = calendarCtrl;
      },
      bindToController: true
    };

  });
