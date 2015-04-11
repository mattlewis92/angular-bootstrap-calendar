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
      controller: function($scope, moment, calendarHelper, calendarDebounce) {

        var vm = this;

        var updateView = calendarDebounce(function() {
          $scope.view = calendarHelper.getWeekView($scope.events, $scope.currentDay);
        }, 50);

        $scope.$watch('currentDay', updateView);
        $scope.$watch('events', updateView, true);

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
