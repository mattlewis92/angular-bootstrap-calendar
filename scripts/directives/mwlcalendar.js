'use strict';

/**
 * @ngdoc directive
 * @name angularBootstrapCalendarApp.directive:mwlCalendar
 * @description
 * # mwlCalendar
 */
angular.module('mwl.calendar')
  .directive('mwlCalendar', function ($timeout, moment) {
    return {
      templateUrl: 'views/directives/angularCalendar/main.html',
      restrict: 'EA',
      scope: {
        events: '=calendarEvents',
        view: '=calendarView',
        currentDay: '=calendarCurrentDay',
        control: '=calendarControl',
        title: '=calendarTitle',
        eventClick: '&calendarEventClick'
      },
      link: function postLink(scope, element, attrs) {

        scope.subControls = {};

        scope.control = scope.control || {};

        scope.control.prev = function() {
          scope.currentDay = moment(scope.currentDay).subtract(1, scope.view).toDate();
        };

        scope.control.next = function() {
          scope.currentDay = moment(scope.currentDay).add(1, scope.view).toDate();
        };

        scope.eventClickHandler = function(event) {
          scope.eventClick({$event: event});
        }

        function updateView() {
          $timeout(function() {
            scope.title = scope.subControls[scope.view].getTitle();
            scope.subControls[scope.view].updateView();
          });
        }

        $timeout(function() {
          scope.$watch('view', updateView);
          scope.$watch('currentDay', updateView);
          scope.$watch('events', updateView);
        });


      }
    };
  });
