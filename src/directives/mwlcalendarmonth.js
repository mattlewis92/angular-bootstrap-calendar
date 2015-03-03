'use strict';

/**
 * @ngdoc directive
 * @name angularBootstrapCalendarApp.directive:mwlCalendarMonth
 * @description
 * # mwlCalendarMonth
 */
angular.module('mwl.calendar')
  .directive('mwlCalendarMonth', function ($sce, $timeout, $filter, moment, calendarHelper) {
    return {
      templateUrl: 'templates/month.html',
      restrict: 'EA',
      require: '^mwlCalendar',
      scope: {
        events: '=calendarEvents',
        currentDay: '=calendarCurrentDay',
        eventClick: '=calendarEventClick',
        eventEditClick: '=calendarEditEventClick',
        eventDeleteClick: '=calendarDeleteEventClick',
        editEventHtml: '=calendarEditEventHtml',
        deleteEventHtml: '=calendarDeleteEventHtml',
        autoOpen: '=calendarAutoOpen',
        useIsoWeek: '=calendarUseIsoWeek',
        timespanClick: '=calendarTimespanClick'
      },
      link: function postLink(scope, element, attrs, calendarCtrl) {

        var firstRun = false;

        scope.$sce = $sce;

        calendarCtrl.titleFunctions.month = function(currentDay) {
          return $filter('date')(currentDay, 'MMMM yyyy');
        };

        function updateView() {
          scope.view = calendarHelper.getMonthView(scope.events, scope.currentDay, scope.useIsoWeek);

          //Auto open the calendar to the current day if set
          if (scope.autoOpen && !firstRun) {
            scope.view.forEach(function(week, rowIndex) {
              week.forEach(function(day, cellIndex) {
                if (day.inMonth && moment(scope.currentDay).startOf('day').isSame(day.date.startOf('day'))) {
                  scope.dayClicked(rowIndex, cellIndex, true);
                  $timeout(function() {
                    firstRun = false;
                  });
                }
              });
            });
          }

        }

        scope.$watch('currentDay', updateView);
        scope.$watch('events', updateView, true);

        scope.weekDays = calendarHelper.getWeekDayNames(false, scope.useIsoWeek);

        scope.dayClicked = function(rowIndex, cellIndex, firstRun) {

          if (!firstRun) {
            scope.timespanClick({$date: scope.view[rowIndex][cellIndex].date.startOf('day').toDate()});
          }

          var handler = calendarHelper.toggleEventBreakdown(scope.view, rowIndex, cellIndex);
          scope.view = handler.view;
          scope.openEvents = handler.openEvents;

        };

        scope.drillDown = function(day) {
          calendarCtrl.changeView('day', moment(scope.currentDay).clone().date(day).toDate());
        };

        scope.highlightEvent = function(event, shouldAddClass) {

          scope.view = scope.view.map(function(week) {

            week.isOpened = false;

            return week.map(function(day) {

              delete day.highlightClass;
              day.isOpened = false;

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
