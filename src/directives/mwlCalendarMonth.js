'use strict';

angular
  .module('mwl.calendar')
  .directive('mwlCalendarMonth', function() {

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
      controller: function($scope, $sce, $timeout, moment, calendarHelper, eventCountBadgeTotalFilter) {
        var firstRun = false;

        $scope.$sce = $sce;
        $scope.eventCountBadgeTotalFilter = eventCountBadgeTotalFilter;

        function updateView() {
          $scope.view = calendarHelper.getMonthView($scope.events, $scope.currentDay, $scope.useIsoWeek);

          //Auto open the calendar to the current day if set
          if ($scope.autoOpen && !firstRun) {
            $scope.view.forEach(function(week, rowIndex) {
              week.forEach(function(day, cellIndex) {
                if (day.inMonth && moment($scope.currentDay).startOf('day').isSame(day.date.startOf('day'))) {
                  $scope.dayClicked(rowIndex, cellIndex, true);
                  $timeout(function() {
                    firstRun = false;
                  });
                }
              });
            });
          }

        }

        $scope.$watch('currentDay', updateView);
        $scope.$watch('events', updateView, true);

        $scope.weekDays = calendarHelper.getWeekDayNames(false, $scope.useIsoWeek);

        $scope.dayClicked = function(rowIndex, cellIndex, dayClickedFirstRun) {

          if (!dayClickedFirstRun) {
            $scope.timespanClick({calendarDate: $scope.view[rowIndex][cellIndex].date.startOf('day').toDate()});
          }

          var handler = calendarHelper.toggleEventBreakdown($scope.view, rowIndex, cellIndex);
          $scope.view = handler.view;
          $scope.openEvents = handler.openEvents;

        };

        $scope.drillDown = function(day) {
          var date = moment($scope.currentDay).clone().date(day).toDate();
          if ($scope.timespanClick({calendarDate: date}) !== false) {
            $scope.calendarCtrl.changeView('day', date);
          }
        };

        $scope.highlightEvent = function(event, shouldAddClass) {

          $scope.view.forEach(function(week) {

            week.forEach(function(day) {

              delete day.highlightClass;

              if (shouldAddClass) {
                var dayContainsEvent = day.events.filter(function(e) {
                  return e.$id === event.$id;
                }).length > 0;

                if (dayContainsEvent) {
                  day.highlightClass = 'day-highlight dh-event-' + event.type;
                }
              }

            });

          });

        };
      },
      link: function(scope, element, attrs, calendarCtrl) {
        scope.calendarCtrl = calendarCtrl;
      }
    };

  });
