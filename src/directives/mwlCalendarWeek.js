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
        onEventClick: '='
      },
      controller: function($scope, calendarHelper) {

        var vm = this;

        $scope.$on('calendar.refreshView', function() {
          vm.view = calendarHelper.getWeekView($scope.events, $scope.currentDay);
        });

      },
      controllerAs: 'vm',
      link: function(scope, element, attrs, calendarCtrl) {
        scope.vm.calendarCtrl = calendarCtrl;
      }
    };

  });
