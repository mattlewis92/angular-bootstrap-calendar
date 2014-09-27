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
      templateUrl: 'views/directives/angularCalendar/week.html',
      restrict: 'EA',
      scope: {
        events: '=calendarEvents',
        currentDay: '=calendarCurrentDay',
        control: '=calendarControl',
        eventClick: '&calendarEventClick'
      },
      link: function postLink(scope, element, attrs) {

        scope.control = scope.control || {};

        scope.control.getTitle = function() {
          return 'Week ' + moment(scope.currentDay).week() + ' of ' + moment(scope.currentDay).format('YYYY');
        };

        scope.control.updateView = function() {
          scope.view = calendarHelper.getWeekView(scope.events, scope.currentDay);
        };

      }
    };
  });
