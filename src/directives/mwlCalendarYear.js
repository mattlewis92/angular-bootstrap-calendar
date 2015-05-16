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

      },
      controllerAs: 'vm',
      link: function(scope, element, attrs, calendarCtrl) {
        scope.vm.calendarCtrl = calendarCtrl;
      }
    };

  });
