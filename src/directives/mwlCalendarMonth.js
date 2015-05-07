'use strict';

angular
  .module('mwl.calendar')
  .directive('mwlCalendarMonth', function() {

    return {
      templateUrl: 'src/templates/calendarMonthView.html',
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

          vm.weekDays = calendarHelper.getWeekDayNames();

          vm.view = calendarHelper.getMonthView($scope.events, $scope.currentDay);
          var rows = Math.floor(vm.view.length / 7);
          vm.monthOffsets = [];
          for (var i = 0; i < rows; i++) {
            vm.monthOffsets.push(i * 7);
          }

          //Auto open the calendar to the current day if set
          if ($scope.autoOpen && firstRun) {
            firstRun = false;
            vm.view.forEach(function(day) {
              if (day.inMonth && moment($scope.currentDay).startOf('day').isSame(day.date)) {
                vm.dayClicked(day, true);
              }
            });
          }

          //if an event was deleted, remove it from the open events array
          vm.openEvents = vm.openEvents.filter(function(event) {
            return $scope.events.indexOf(event) > -1;
          });

          //close the open day if no more events
          if (vm.openEvents.length === 0) {
            vm.openRowIndex = null;
            vm.view.forEach(function(day) {
              day.isOpened = false;
            });
          }

        });

        vm.dayClicked = function(day, dayClickedFirstRun) {

          if (!dayClickedFirstRun) {
            $scope.onTimespanClick({calendarDate: day.date.toDate()});
          }

          vm.view.forEach(function(monthDay) {
            if (monthDay !== day) {
              monthDay.isOpened = false;
            }
          });

          vm.openRowIndex = null;

          if (day.isOpened) {
            vm.openEvents = [];
            day.isOpened = false;
          } else {
            vm.openEvents = day.events;
            if (vm.openEvents.length > 0) {
              var dayIndex = vm.view.indexOf(day);
              vm.openRowIndex = Math.floor(dayIndex / 7);
              day.isOpened = true;
            }
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
      },
      controllerAs: 'vm',
      link: function(scope, element, attrs, calendarCtrl) {
        scope.vm.calendarCtrl = calendarCtrl;
      }
    };

  });
