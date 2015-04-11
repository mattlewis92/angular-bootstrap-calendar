'use strict';

angular
  .module('mwl.calendar')
  .directive('mwlCalendarWeek', function() {

    return {
      templateUrl: 'templates/calendarWeekView.html',
      restrict: 'EA',
      require: '^mwlCalendar',
      scope: {
        events: '=calendarEvents',
        currentDay: '=calendarCurrentDay',
        eventClick: '=calendarEventClick',
        timespanClick: '=calendarTimespanClick'
      },
      controller: function($scope, moment, calendarHelper, calendarDebounce) {

        var updateView = calendarDebounce(function() {
          $scope.view = calendarHelper.getWeekView($scope.events, $scope.currentDay);
        }, 50);

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
