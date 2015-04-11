'use strict';

angular
  .module('mwl.calendar')
  .directive('mwlCalendarDay', function() {

    return {
      templateUrl: 'src/templates/calendarDayView.html',
      restrict: 'EA',
      require: '^mwlCalendar',
      scope: {
        events: '=',
        currentDay: '=',
        eventClick: '=',
        eventLabel: '@',
        timeLabel: '@',
        dayViewStart: '@',
        dayViewEnd: '@',
        dayViewSplit: '@'
      },
      controller: function($scope, moment, calendarHelper, calendarConfig, calendarDebounce) {

        var dayViewStart = moment($scope.dayViewStart || '00:00', 'HH:mm');
        var dayViewEnd = moment($scope.dayViewEnd || '23:00', 'HH:mm');

        $scope.dayViewSplit = parseInt($scope.dayViewSplit);
        $scope.dayHeight = (60 / $scope.dayViewSplit) * 30;

        $scope.days = [];
        var dayCounter = moment(dayViewStart);
        for (var i = 0; i <= dayViewEnd.diff(dayViewStart, 'hours'); i++) {
          $scope.days.push({
            label: dayCounter.format(calendarConfig.dateFormats.hour)
          });
          dayCounter.add(1, 'hour');
        }

        var updateView = calendarDebounce(function() {
          $scope.view = calendarHelper.getDayView($scope.events, $scope.currentDay, dayViewStart.hours(), dayViewEnd.hours(), $scope.dayHeight);
        }, 50);

        $scope.$watch('currentDay', updateView);
        $scope.$watch('events', updateView, true);

      }
    };

  });
