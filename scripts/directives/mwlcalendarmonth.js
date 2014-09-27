'use strict';

/**
 * @ngdoc directive
 * @name angularBootstrapCalendarApp.directive:mwlCalendarMonth
 * @description
 * # mwlCalendarMonth
 */
angular.module('mwl.calendar')
  .directive('mwlCalendarMonth', function (calendarHelper) {
    return {
      templateUrl: '/views/directives/angularCalendar/month.html',
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
          return moment(scope.currentDay).format('MMMM YYYY');
        };

        scope.control.updateView = function() {
          scope.view = calendarHelper.getMonthView(scope.events, scope.currentDay);
        };

        scope.weekDays = calendarHelper.getWeekDayNames();

        scope.dayClicked = function(rowIndex, cellIndex) {

          var handler = calendarHelper.toggleEventBreakdown(scope.view, rowIndex, cellIndex);
          scope.view = handler.view;
          scope.openEvents = handler.openEvents;

        };

      }
    };
  });
