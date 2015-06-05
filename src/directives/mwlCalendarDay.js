'use strict';

angular
  .module('mwl.calendar')
  .controller('MwlCalendarDayCtrl', function($scope, $timeout, moment, calendarHelper, calendarConfig) {

    var vm = this;

    vm.calendarConfig = calendarConfig;

    $scope.$on('calendar.refreshView', function() {
      var dayViewStart = moment($scope.dayViewStart || '00:00', 'HH:mm');
      var dayViewEnd = moment($scope.dayViewEnd || '23:00', 'HH:mm');
      var hourHeight = (60 / $scope.dayViewSplit) * 30;
      vm.dayViewHeight = (dayViewEnd.diff(dayViewStart, 'hours') * hourHeight) + 1;

      vm.view = calendarHelper.getDayView(
        $scope.events,
        $scope.currentDay,
        dayViewStart.hours(),
        dayViewEnd.hours(),
        hourHeight
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
