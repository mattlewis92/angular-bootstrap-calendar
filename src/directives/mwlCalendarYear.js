'use strict';

angular
  .module('mwl.calendar')
  .directive('mwlCalendarYear', function() {

    return {
      templateUrl: 'src/templates/calendarYearView.html',
      restrict: 'EA',
      require: '^mwlCalendar',
      scope: {
        events: '=',
        currentDay: '=',
        onEventClick: '=',
        onEditEventClick: '=',
        onDeleteEventClick: '=',
        editEventHtml: '=',
        deleteEventHtml: '=',
        autoOpen: '=',
        onTimespanClick: '='
      },
      controller: function($scope, moment, calendarHelper) {

        var vm = this;
        var firstRun = true;
        vm.openEvents = [];

        $scope.$on('calendar.refreshView', function() {
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

          //if an event was deleted, remove it from the open events array
          vm.openEvents = vm.openEvents.filter(function(event) {
            return $scope.events.indexOf(event) > -1;
          });

          //Close the open year if no more events
          if (vm.openEvents.length === 0) {
            vm.openRowIndex = null;
            vm.view.forEach(function(month) {
              month.isOpened = false;
            });
          }

        });

        vm.monthClicked = function(month, monthClickedFirstRun) {

          if (!monthClickedFirstRun) {
            $scope.onTimespanClick({calendarDate: month.date.toDate()});
          }

          vm.view.forEach(function(yearMonth) {
            if (yearMonth !== month) {
              yearMonth.isOpened = false;
            }
          });

          vm.openRowIndex = null;

          if (month.isOpened) {
            vm.openEvents = [];
            month.isOpened = false;
          } else {
            vm.openEvents = month.events;
            if (vm.openEvents.length > 0) {
              var monthIndex = vm.view.indexOf(month);
              vm.openRowIndex = Math.floor(monthIndex / 4);
              month.isOpened = true;
            }
          }

        };

      },
      controllerAs: 'vm',
      link: function(scope, element, attrs, calendarCtrl) {
        scope.vm.calendarCtrl = calendarCtrl;
      }
    };

  });
