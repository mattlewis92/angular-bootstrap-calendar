'use strict';

angular
  .module('mwl.calendar')
  .controller('MwlCalendarWeekCtrl', function($scope, moment, calendarHelper) {

    var vm = this;

    $scope.$on('calendar.refreshView', function() {
      vm.dayViewHeight = calendarHelper.getDayViewHeight(
        $scope.dayViewStart,
        $scope.dayViewEnd,
        $scope.dayViewSplit
      );
      vm.view = calendarHelper.getWeekView($scope.events, $scope.currentDay);
    });

    vm.weekDragged = function(event, daysDiff) {

      var newStart = moment(event.startsAt).add(daysDiff, 'days');
      var newEnd = moment(event.endsAt).add(daysDiff, 'days');

      $scope.onEventDrop({
        calendarEvent: event,
        calendarNewEventStart: newStart.toDate(),
        calendarNewEventEnd: newEnd.toDate()
      });
    };

  })
  .directive('mwlCalendarWeek', function() {

    return {
      templateUrl: 'src/templates/calendarWeekView.html',
      restrict: 'EA',
      require: '^mwlCalendar',
      scope: {
        events: '=',
        currentDay: '=',
        onEventClick: '=',
        onEventDrop: '=',
        dayViewStart: '=',
        dayViewEnd: '=',
        dayViewSplit: '='
      },
      controller: 'MwlCalendarWeekCtrl as vm',
      link: function(scope, element, attrs, calendarCtrl) {
        scope.vm.calendarCtrl = calendarCtrl;
      }
    };

  });
