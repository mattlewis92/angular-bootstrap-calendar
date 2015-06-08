'use strict';

angular
  .module('demo', ['mwl.calendar', 'ui.bootstrap'])
  .controller('MainCtrl', function ($scope, $modal, moment) {

    //These variables MUST be set as a minimum for the calendar to work
    $scope.calendarView = 'month';
    $scope.calendarDay = new Date();
    $scope.events = [
      {
        title: 'An event',
        type: 'warning',
        startsAt: moment().startOf('week').subtract(2, 'days').add(8, 'hours').toDate(),
        endsAt: moment().startOf('week').add(1, 'week').add(9, 'hours').toDate()
      }, {
        title: '<i class="glyphicon glyphicon-asterisk"></i> <span class="text-primary">Another event</span>, with a <i>html</i> title',
        type: 'info',
        startsAt: moment().subtract(1, 'day').toDate(),
        endsAt: moment().add(5, 'days').toDate()
      }, {
        title: 'This is a really long event title that occurs on every year',
        type: 'important',
        startsAt: moment().startOf('day').add(7, 'hours').toDate(),
        endsAt: moment().startOf('day').add(19, 'hours').toDate(),
        recursOn: 'year'
      }
    ];

    /*
     var currentYear = moment().year();
     var currentMonth = moment().month();

    function random(min, max) {
      return Math.floor((Math.random() * max) + min);
    }

    for (var i = 0; i < 1000; i++) {
      var start = new Date(currentYear,random(0, 11),random(1, 28),random(0, 24),random(0, 59));
      $scope.events.push({
        title: 'Event ' + i,
        type: 'warning',
        startsAt: start,
        endsAt: moment(start).add(2, 'hours').toDate()
      })
    }*/

    function showModal(action, event) {
      $modal.open({
        templateUrl: 'modalContent.html',
        controller: function($scope) {
          $scope.action = action;
          $scope.event = event;
        }
      });
    }

    $scope.eventClicked = function(event) {
      showModal('Clicked', event);
    };

    $scope.eventEdited = function(event) {
      showModal('Edited', event);
    };

    $scope.eventDeleted = function(event) {
      showModal('Deleted', event);
    };

    $scope.eventDropped = function(event) {
      showModal('Dropped', event);
    };

    $scope.toggle = function($event, field, event) {
      $event.preventDefault();
      $event.stopPropagation();
      event[field] = !event[field];
    };

  });
