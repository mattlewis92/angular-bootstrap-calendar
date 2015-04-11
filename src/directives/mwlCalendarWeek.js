'use strict';

angular
  .module('mwl.calendar')
  .directive('mwlCalendarWeek', function() {

    return {
      templateUrl: 'src/templates/calendarWeekView.html',
      restrict: 'EA',
      require: '^mwlCalendar',
      scope: {
        events: '=',
        currentDay: '=',
        eventClick: '=',
        timespanClick: '='
      },
      controller: function($scope, calendarHelper) {

        var vm = this;

        $scope.$on('calendar.refreshView', function() {
          vm.view = calendarHelper.getWeekView($scope.events, $scope.currentDay);
        });

        vm.drillDown = function(day) {
          var date = day.date.toDate();
          if ($scope.timespanClick({calendarDate: date}) !== false) {
            vm.calendarCtrl.changeView('day', date);
          }
        };

      },
      controllerAs: 'vm',
      link: function(scope, element, attrs, calendarCtrl) {
        scope.vm.calendarCtrl = calendarCtrl;
      }
    };

  });
