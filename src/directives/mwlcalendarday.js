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
      templateUrl: 'templates/day.html',
      restrict: 'EA',
      require: '^mwlCalendar',
      scope: {
        events: '=calendarEvents',
        currentDay: '=calendarCurrentDay',
        control: '=calendarControl',
        eventClick: '&calendarEventClick'
      },
      link: function postLink(scope, element, attrs, calendarCtrl) {

        calendarCtrl.titleFunctions.day = function(currentDay) {
          return moment(currentDay).format('dddd DD MMMM, YYYY');
        };

        scope.control = scope.control || {};

        scope.control.updateView = function() {
          scope.view = calendarHelper.getDayView(scope.events, scope.currentDay);
        };

      }
    };
  });
