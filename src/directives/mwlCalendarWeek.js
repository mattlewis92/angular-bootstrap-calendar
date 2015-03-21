'use strict';

angular
  .module('mwl.calendar')
  .directive('mwlCalendarWeek', function(moment) {
    return {
      templateUrl: 'templates/week.html',
      restrict: 'EA',
      require: '^mwlCalendar',
      scope: {
        events: '=calendarEvents',
        currentDay: '=calendarCurrentDay',
        eventClick: '=calendarEventClick',
        useIsoWeek: '=calendarUseIsoWeek',
        weekTitleLabel: '@calendarWeekTitleLabel'
      },
      controller: function($scope, calendarHelper) {
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

        var titleLabel = scope.weekTitleLabel || 'Week {week} of {year}';

        calendarCtrl.titleFunctions.week = function(currentDay) {
          return titleLabel.replace('{week}', moment(currentDay).week()).replace('{year}', moment(currentDay).format('YYYY'));
        };

        scope.calendarCtrl = calendarCtrl;

      }
    };
  });
