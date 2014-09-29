'use strict';

/**
 * @ngdoc directive
 * @name angularBootstrapCalendarApp.directive:mwlCalendarWeek
 * @description
 * # mwlCalendarWeek
 */
angular.module('mwl.calendar')
  .directive('mwlCalendarWeek', function(moment, calendarHelper) {
    return {
      templateUrl: 'templates/week.html',
      restrict: 'EA',
      require: '^mwlCalendar',
      scope: {
        events: '=calendarEvents',
        currentDay: '=calendarCurrentDay',
        eventClick: '=calendarEventClick'
      },
      link: function postLink(scope, element, attrs, calendarCtrl) {

        calendarCtrl.titleFunctions.week = function(currentDay) {
          return 'Week ' + moment(currentDay).week() + ' of ' + moment(currentDay).format('YYYY');
        };

        function updateView() {
          scope.view = calendarHelper.getWeekView(scope.events, scope.currentDay);
        }

        scope.$watch('currentDay', updateView);
        scope.$watchCollection('events', updateView);

      }
    };
  });
