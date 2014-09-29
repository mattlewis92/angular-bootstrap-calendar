'use strict';

/**
 * @ngdoc function
 * @name angularBootstrapCalendarApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angularBootstrapCalendarApp
 */
angular.module('mwl.calendar')
  .controller('MainCtrl', function ($scope) {

    $scope.events = [
      {
        title: 'Event 1',
        type: 'warning',
        starts_at: new Date(),
        ends_at: new Date()
      },
      {
        title: 'Event 2',
        type: 'info',
        starts_at: new Date(2013,5,1,1),
        ends_at: new Date(2014,8,26,15)
      }
    ];

    $scope.calendarView = 'month';
    $scope.calendarDay = new Date();

    $scope.eventClicked = function(event) {
      console.log('Event clicked', event);
    };

    $scope.eventEdited = function(event) {
      console.log('Event edited', event);
    };

    $scope.eventDeleted = function(event) {
      console.log('Event deleted', event);
    };

    $scope.setCalendarToToday = function() {
      $scope.calendarDay = new Date();
    };

  });
