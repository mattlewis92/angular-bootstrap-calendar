'use strict';

/**
 * @ngdoc directive
 * @name angularBootstrapCalendarApp.directive:mwlCalendarYear
 * @description
 * # mwlCalendarYear
 */
angular.module('mwl.calendar')
  .directive('mwlCalendarYear', function(calendarHelper, moment) {
    return {
      templateUrl: '/views/directives/angularCalendar/year.html',
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
          return moment(scope.currentDay).format('YYYY');
        };

        scope.control.updateView = function() {
          scope.view = calendarHelper.getYearView(scope.events, scope.currentDay);
        };

        scope.monthClicked = function(yearIndex, monthIndex) {

          var handler = calendarHelper.toggleEventBreakdown(scope.view, yearIndex, monthIndex);
          scope.view = handler.view;
          scope.openEvents = handler.openEvents;

        };

      }
    };
  });
