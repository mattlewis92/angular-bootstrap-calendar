'use strict';

angular
  .module('mwl.calendar')
  .directive('mwlCalendarDay', function() {

    return {
      templateUrl: 'templates/day.html',
      restrict: 'EA',
      require: '^mwlCalendar',
      scope: {
        events: '=calendarEvents',
        currentDay: '=calendarCurrentDay',
        eventClick: '=calendarEventClick',
        eventLabel: '@calendarEventLabel',
        timeLabel: '@calendarTimeLabel',
        dayViewStart: '@calendarDayViewStart',
        dayViewEnd: '@calendarDayViewEnd',
        dayViewSplit: '@calendarDayViewSplit'
      },
      controller: function($scope, moment, calendarHelper, calendarConfig) {

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

        function updateView() {
          $scope.view = calendarHelper.getDayView($scope.events, $scope.currentDay, dayViewStart.hours(), dayViewEnd.hours(), $scope.dayHeight);
        }

        $scope.$watch('currentDay', updateView);
        $scope.$watch('events', updateView, true);

      }
    };

  });
