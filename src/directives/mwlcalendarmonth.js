'use strict';

/**
 * @ngdoc directive
 * @name angularBootstrapCalendarApp.directive:mwlCalendarMonth
 * @description
 * # mwlCalendarMonth
 */
angular.module('mwl.calendar')
  .directive('mwlCalendarMonth', function (calendarHelper) {
    return {
      templateUrl: 'templates/month.html',
      restrict: 'EA',
      require: '^mwlCalendar',
      scope: {
        events: '=calendarEvents',
        currentDay: '=calendarCurrentDay',
        eventClick: '&calendarEventClick'
      },
      link: function postLink(scope, element, attrs, calendarCtrl) {

        calendarCtrl.titleFunctions.month = function(currentDay) {
          return moment(currentDay).format('MMMM YYYY');
        };

        function updateView() {
          scope.view = calendarHelper.getMonthView(scope.events, scope.currentDay);
        }

        scope.$watch('currentDay', updateView);
        scope.$watchCollection('events', updateView);

        scope.weekDays = calendarHelper.getWeekDayNames();

        scope.dayClicked = function(rowIndex, cellIndex) {

          var handler = calendarHelper.toggleEventBreakdown(scope.view, rowIndex, cellIndex);
          scope.view = handler.view;
          scope.openEvents = handler.openEvents;

        };

        scope.highlightEvent = function(event, shouldAddClass) {

          scope.view = scope.view.map(function(week) {

            return week.map(function(day) {

              delete day.highlightClass;

              if (shouldAddClass) {
                var dayContainsEvent = day.events.filter(function(e) {
                  return e.$id == event.$id;
                }).length > 0;

                if (dayContainsEvent) {
                  day.highlightClass = 'day-highlight dh-event-' + event.type;
                }
              }

              return day;

            });

          });

        };

      }
    };
  });
