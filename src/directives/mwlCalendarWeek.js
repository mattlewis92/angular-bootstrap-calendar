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
        useIsoWeek: '=calendarUseIsoWeek',
        timespanClick: '=calendarTimespanClick'
      },
      controller: function($scope, moment, calendarHelper) {
        function updateView() {
          $scope.view = calendarHelper.getWeekView($scope.events, $scope.currentDay, $scope.useIsoWeek);
        }

        $scope.drillDown = function(day) {
          var date = moment($scope.currentDay).clone().date(day).toDate();
          if ($scope.timespanClick({calendarDate: date}) !== false) {
            $scope.calendarCtrl.changeView('day', date);
          }
        };

        $scope.$watch('currentDay', updateView);
        $scope.$watch('events', updateView, true);
      },
      link: function(scope, element, attrs, calendarCtrl) {
        scope.calendarCtrl = calendarCtrl;
      }
    };

  });
