'use strict';

angular
  .module('mwl.calendar')
  .directive('mwlCalendarWeek', function() {
    return {
      templateUrl: 'templates/week.html',
      restrict: 'EA',
      require: '^mwlCalendar',
      scope: {
        events: '=calendarEvents',
        currentDay: '=calendarCurrentDay',
        eventClick: '=calendarEventClick',
        useIsoWeek: '=calendarUseIsoWeek'
      },
      controller: function($scope, moment, calendarHelper) {
        function updateView() {
          $scope.view = calendarHelper.getWeekView($scope.events, $scope.currentDay, $scope.useIsoWeek);
        }

        $scope.drillDown = function(day) {
          $scope.calendarCtrl.changeView('day', moment($scope.currentDay).clone().date(day).toDate());
        };

        $scope.$watch('currentDay', updateView);
        $scope.$watch('events', updateView, true);
      },
      link: function(scope, element, attrs, calendarCtrl) {
        scope.calendarCtrl = calendarCtrl;
      }
    };
  });
