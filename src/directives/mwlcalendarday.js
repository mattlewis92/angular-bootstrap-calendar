'use strict';

/**
 * @ngdoc directive
 * @name angularBootstrapCalendarApp.directive:mwlCalendarDay
 * @description
 * # mwlCalendarDay
 */
angular.module('mwl.calendar')
  .directive('mwlCalendarDay', function($filter, calendarHelper) {
    return {
      templateUrl: 'templates/day.html',
      restrict: 'EA',
      require: '^mwlCalendar',
      scope: {
        events: '=calendarEvents',
        currentDay: '=calendarCurrentDay',
        eventClick: '=calendarEventClick',
        eventLabel: '@calendarEventLabel',
        timeLabel: '@calendarTimeLabel'
      },
      link: function postLink(scope, element, attrs, calendarCtrl) {

        calendarCtrl.titleFunctions.day = function(currentDay) {
          return $filter('date')(currentDay, 'EEEE d MMMM, yyyy');
        };

        function updateView() {
          scope.view = calendarHelper.getDayView(scope.events, scope.currentDay);
        }

        scope.$watch('currentDay', updateView);
        scope.$watch('events', updateView, true);

      }
    };
  });
