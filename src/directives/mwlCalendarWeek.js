'use strict';

angular
  .module('mwl.calendar')
  .controller('MwlCalendarWeekCtrl', function($scope, $sce, moment, calendarHelper, calendarConfig) {

    var vm = this;

    vm.showTimes = calendarConfig.showTimesOnWeekView;
    vm.$sce = $sce;

    var unbindListener = $scope.$on('calendar.refreshView', function() {
      vm.dayViewHeight = calendarHelper.getDayViewHeight(
        $scope.dayViewStart,
        $scope.dayViewEnd,
        $scope.dayViewSplit
      );
      if (vm.showTimes) {
        vm.view = calendarHelper.getWeekViewWithTimes(
          $scope.events,
          $scope.currentDay,
          $scope.dayViewStart,
          $scope.dayViewEnd,
          $scope.dayViewSplit
        );
      } else {
        vm.view = calendarHelper.getWeekView($scope.events, $scope.currentDay);
      }
    });

    $scope.$on('$destroy', function() {
      unbindListener();
    });

    vm.weekDragged = function(event, daysDiff, minuteChunksMoved) {

      var newStart = moment(event.startsAt).add(daysDiff, 'days');
      var newEnd = moment(event.endsAt).add(daysDiff, 'days');

      if (minuteChunksMoved) {
        var minutesDiff = minuteChunksMoved * $scope.dayViewSplit;
        newStart = newStart.add(minutesDiff, 'minutes');
        newEnd = newEnd.add(minutesDiff, 'minutes');
      }

      delete event.tempStartsAt;

      $scope.onEventDrop({
        calendarEvent: event,
        calendarNewEventStart: newStart.toDate(),
        calendarNewEventEnd: newEnd.toDate()
      });
    };

    vm.tempTimeChanged = function(event, minuteChunksMoved) {
      var minutesDiff = minuteChunksMoved * $scope.dayViewSplit;
      event.tempStartsAt = moment(event.startsAt).add(minutesDiff, 'minutes').toDate();
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
