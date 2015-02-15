'use strict';

/**
 * @ngdoc directive
 * @name angularBootstrapCalendarApp.directive:mwlCalendarDay
 * @description
 * # mwlCalendarDay
 */
angular.module('mwl.calendar')
  .directive('mwlCalendarDay', function($filter, moment, calendarHelper) {
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
        dayViewStart:'@calendarDayViewStart',
        dayViewEnd:'@calendarDayViewEnd'
      },
      link: function postLink(scope, element, attrs, calendarCtrl) {

        var dayViewStart = moment(scope.dayViewStart || '00:00', 'HH:mm');
        var dayViewEnd = moment(scope.dayViewEnd || '23:00', 'HH:mm');

        scope.days = [];
        var dayCounter = moment(dayViewStart);
        for (var i = 0; i <= dayViewEnd.diff(dayViewStart, 'hours'); i++) {
          scope.days.push({
            label: dayCounter.format('ha')
          });
          dayCounter.add(1, 'hour');
        }

        calendarCtrl.titleFunctions.day = function(currentDay) {
          return $filter('date')(currentDay, 'EEEE d MMMM, yyyy');
        };

        function updateView() {
          scope.view = calendarHelper.getDayView(scope.events, scope.currentDay, dayViewStart.hours(), dayViewEnd.hours());
        }

        scope.$watch('currentDay', updateView);
        scope.$watch('events', updateView, true);

      }
    };
  });
