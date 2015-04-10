'use strict';

angular
  .module('mwl.calendar')
  .directive('mwlCalendarYear', function(moment) {

    return {
      templateUrl: 'templates/year.html',
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
        timespanClick: '=calendarTimespanClick'
      },
      controller: function($scope, $sce, $timeout, calendarHelper, eventCountBadgeTotalFilter) {
        var firstRun = false;

        $scope.$sce = $sce;
        $scope.eventCountBadgeTotalFilter = eventCountBadgeTotalFilter;

        function updateView() {
          $scope.view = calendarHelper.getYearView($scope.events, $scope.currentDay);

          //Auto open the calendar to the current day if set
          if ($scope.autoOpen && !firstRun) {
            $scope.view.forEach(function(row, rowIndex) {
              row.forEach(function(year, cellIndex) {
                if (moment($scope.currentDay).startOf('month').isSame(year.date)) {
                  $scope.monthClicked(rowIndex, cellIndex, true);
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

        $scope.monthClicked = function(yearIndex, monthIndex, monthClickedFirstRun) {

          if (!monthClickedFirstRun) {
            $scope.timespanClick({calendarDate: $scope.view[yearIndex][monthIndex].date.startOf('month').toDate()});
          }

          var handler = calendarHelper.toggleEventBreakdown($scope.view, yearIndex, monthIndex);
          $scope.view = handler.view;
          $scope.openEvents = handler.openEvents;

        };

        $scope.drillDown = function(month) {
          var date = moment($scope.currentDay).clone().month(month).toDate();
          if ($scope.timespanClick({calendarDate: date}) !== false) {
            $scope.calendarCtrl.changeView('month', date);
          }
        };
      },
      link: function(scope, element, attrs, calendarCtrl) {
        scope.calendarCtrl = calendarCtrl;
      }
    };

  });
