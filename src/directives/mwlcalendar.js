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
      templateUrl: 'templates/main.html',
      restrict: 'EA',
      scope: {
        events: '=calendarEvents',
        view: '=calendarView',
        currentDay: '=calendarCurrentDay',
        control: '=calendarControl',
        eventClick: '&calendarEventClick'
      },
      controller: function($scope) {

        var self = this;

        this.titleFunctions = {};

        $scope.subControls = {};

        $scope.control = $scope.control || {};

        $scope.control.prev = function() {
          $scope.currentDay = moment($scope.currentDay).subtract(1, $scope.view).toDate();
        };

        $scope.control.next = function() {
          $scope.currentDay = moment($scope.currentDay).add(1, $scope.view).toDate();
        };

        $scope.control.getTitle = function() {
          if (!self.titleFunctions[$scope.view]) return '';
          return self.titleFunctions[$scope.view]($scope.currentDay);
        };

        $scope.eventClickHandler = function(event) {
          $scope.eventClick({$event: event});
        }

        function updateView() {
          $timeout(function() {
            if ($scope.subControls[$scope.view]) {
              $scope.subControls[$scope.view].updateView();
            } else {
              updateView();
            }
          });
        }

        $timeout(function() {
          $scope.$watch('view', updateView);
          $scope.$watch('currentDay', updateView);
          $scope.$watch('events', updateView);
        });


      }
    };
  });
