'use strict';

angular
  .module('mwl.calendar')
  .directive('mwlCalendarMonth', function() {

    return {
      templateUrl: 'templates/month.html',
      restrict: 'EA',
      require: '^mwlCalendar',
      scope: {
        events: '=calendarEvents',
        currentDay: '=calendarCurrentDay',
        eventClick: '=calendarEventClick',
        eventEditClick: '=calendarEditEventClick',
        eventDeleteClick: '=calendarDeleteEventClick',
        editEventHtml: '=calendarEditEventHtml',
        deleteEventHtml: '=calendarDeleteEventHtml',
        autoOpen: '=calendarAutoOpen',
        timespanClick: '=calendarTimespanClick'
      },
      controller: function($scope, $timeout, moment, calendarHelper, eventCountBadgeTotalFilter, calendarDebounce) {

        var vm = this;
        var firstRun = false;

        vm.eventCountBadgeTotalFilter = eventCountBadgeTotalFilter;

        var updateView = calendarDebounce(function() {
          vm.view = calendarHelper.getMonthView($scope.events, $scope.currentDay);
          var rows = Math.floor(vm.view.length / 7);
          vm.monthOffsets = [];
          for (var i = 0; i < rows; i++) {
            vm.monthOffsets.push(i * 7);
          }

          //Auto open the calendar to the current day if set
          if ($scope.autoOpen && !firstRun) {
            vm.view.forEach(function(day) {
              if (day.inMonth && moment($scope.currentDay).startOf('day').isSame(day.date)) {
                vm.dayClicked(day, true);
                $timeout(function() {
                  firstRun = false;
                });
              }
            });
          }

        }, 50);

        $scope.$watch('currentDay', updateView);
        $scope.$watch('events', updateView, true);

        vm.weekDays = calendarHelper.getWeekDayNames();

        vm.dayClicked = function(day, dayClickedFirstRun) {

          if (!dayClickedFirstRun) {
            $scope.timespanClick({calendarDate: day.date.toDate()});
          }

          vm.view.forEach(function(monthDay) {
            monthDay.isOpened = false;
          });

          vm.openEvents = day.events;
          vm.openRowIndex = null;
          if (vm.openEvents.length > 0) {
            var dayIndex = vm.view.indexOf(day);
            vm.openRowIndex = Math.floor(dayIndex / 7);
            day.isOpened = true;
          }

        };

        vm.drillDown = function(day) {
          var date = moment($scope.currentDay).clone().date(day.date.date()).toDate();
          if ($scope.timespanClick({calendarDate: date}) !== false) {
            vm.calendarCtrl.changeView('day', date);
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
