'use strict';

angular
  .module('mwl.calendar')
  .controller('MwlCalendarYearCtrl', function($scope, moment, calendarHelper) {

    var vm = this;
    var firstRun = true;

    var unbindListener = $scope.$on('calendar.refreshView', function() {
      vm.view = calendarHelper.getYearView($scope.events, $scope.currentDay);

      //Auto open the calendar to the current day if set
      if ($scope.autoOpen && firstRun) {
        firstRun = false;
        vm.view.forEach(function(month) {
          if (moment($scope.currentDay).startOf('month').isSame(month.date)) {
            vm.monthClicked(month, true);
          }
        });
      }

    });

    $scope.$on('$destroy', function() {
      unbindListener();
    });

    vm.monthClicked = function(month, monthClickedFirstRun) {

      if (!monthClickedFirstRun) {
        $scope.onTimespanClick({calendarDate: month.date.toDate()});
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

      $scope.onEventDrop({
        calendarEvent: event,
        calendarDate: newMonthDate,
        calendarNewEventStart: newStart.toDate(),
        calendarNewEventEnd: newEnd.toDate()
      });
    };

  })
  .directive('mwlCalendarYear', function() {

    return {
      templateUrl: 'src/templates/calendarYearView.html',
      restrict: 'EA',
      require: '^mwlCalendar',
      scope: {
        events: '=',
        currentDay: '=',
        onEventClick: '=',
        onEventDrop: '=',
        onEditEventClick: '=',
        onDeleteEventClick: '=',
        editEventHtml: '=',
        deleteEventHtml: '=',
        autoOpen: '=',
        onTimespanClick: '='
      },
      controller: 'MwlCalendarYearCtrl as vm',
      link: function(scope, element, attrs, calendarCtrl) {
        scope.vm.calendarCtrl = calendarCtrl;
      }
    };

  });
