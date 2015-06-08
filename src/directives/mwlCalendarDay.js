'use strict';

angular
  .module('mwl.calendar')
  .controller('MwlCalendarDayCtrl', function($scope, $timeout, moment, calendarHelper, calendarConfig) {

    var vm = this;

    vm.calendarConfig = calendarConfig;

    $scope.$on('calendar.refreshView', function() {
      vm.dayViewHeight = calendarHelper.getDayViewHeight(
        $scope.dayViewStart,
        $scope.dayViewEnd,
        $scope.dayViewSplit
      );

      vm.view = calendarHelper.getDayView(
        $scope.events,
        $scope.currentDay,
        moment($scope.dayViewStart || '00:00', 'HH:mm').hours(),
        moment($scope.dayViewEnd || '23:00', 'HH:mm').hours(),
        (60 / $scope.dayViewSplit) * 30
      );

    });

    vm.timeChanged = function(event, chunksMoved) {
      var minutesDiff = chunksMoved * $scope.dayViewSplit;
      var newStart = moment(event.startsAt).add(minutesDiff, 'minutes');
      var newEnd = moment(event.endsAt).add(minutesDiff, 'minutes');
      delete event.tempStartsAt;

      $scope.onEventDrop({
        calendarEvent: event,
        calendarNewEventStart: newStart.toDate(),
        calendarNewEventEnd: newEnd.toDate()
      });
    };

    vm.tempTimeChanged = function(event, chunksMoved) {
      var minutesDiff = chunksMoved * $scope.dayViewSplit;
      event.tempStartsAt = moment(event.startsAt).add(minutesDiff, 'minutes').toDate();
    };

  })
  .directive('mwlCalendarDay', function() {

    return {
      templateUrl: 'src/templates/calendarDayView.html',
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
      controller: 'MwlCalendarDayCtrl as vm'
    };

  });
