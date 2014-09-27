'use strict';

/**
 * @ngdoc directive
 * @name angularBootstrapCalendarApp.directive:mwlCalendarDay
 * @description
 * # mwlCalendarDay
 */
angular.module('mwl.calendar')
  .directive('mwlCalendarDay', function(calendarHelper) {
    return {
      templateUrl: 'views/directives/angularCalendar/day.html',
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
          return moment(scope.currentDay).format('dddd DD MMMM, YYYY');
        };

        scope.control.updateView = function() {
          scope.view = calendarHelper.getDayView(scope.events, scope.currentDay);
        };

      }
    };
  });
