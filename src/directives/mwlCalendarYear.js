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
        eventClick: '=',
        eventEditClick: '=',
        eventDeleteClick: '=',
        editEventHtml: '=',
        deleteEventHtml: '=',
        autoOpen: '=',
        timespanClick: '='
      },
      controller: function($scope, $timeout, moment, calendarHelper, eventCountBadgeTotalFilter, calendarDebounce) {

        var vm = this;
        var firstRun = false;

        vm.eventCountBadgeTotalFilter = eventCountBadgeTotalFilter;

        var updateView = calendarDebounce(function() {
          vm.view = calendarHelper.getYearView($scope.events, $scope.currentDay);

          //Auto open the calendar to the current day if set
          if ($scope.autoOpen && !firstRun) {
            vm.view.forEach(function(month) {
              if (moment($scope.currentDay).startOf('month').isSame(month.date)) {
                vm.monthClicked(month, true);
                $timeout(function() {
                  firstRun = false;
                });
              }
            });
          }
        }, 50);

        $scope.$watch('currentDay', updateView);
        $scope.$watch('events', updateView, true);

        vm.monthClicked = function(month, monthClickedFirstRun) {

          if (!monthClickedFirstRun) {
            $scope.timespanClick({calendarDate: month.date.toDate()});
          }

          vm.openEvents = month.events;
          vm.openRowIndex = null;
          if (vm.openEvents.length > 0) {
            var monthIndex = vm.view.indexOf(month);
            vm.openRowIndex = Math.floor(monthIndex / 4);
          }

        };

        vm.drillDown = function(month) {
          var date = moment($scope.currentDay).clone().month(month.date.month()).toDate();
          if ($scope.timespanClick({calendarDate: date}) !== false) {
            vm.calendarCtrl.changeView('month', date);
          }
        };
      },
      controllerAs: 'vm',
      link: function(scope, element, attrs, calendarCtrl) {
        scope.vm.calendarCtrl = calendarCtrl;
      }
    };

  });
