'use strict';

angular
  .module('mwl.calendar')
  .directive('mwlCalendar', function() {

    return {
      templateUrl: 'templates/main.html',
      restrict: 'EA',
      scope: {
        events: '=calendarEvents',
        view: '=calendarView',
        currentDay: '=calendarCurrentDay',
        control: '=calendarControl',
        eventClick: '&calendarEventClick',
        eventEditClick: '&calendarEditEventClick',
        eventDeleteClick: '&calendarDeleteEventClick',
        editEventHtml: '=calendarEditEventHtml',
        deleteEventHtml: '=calendarDeleteEventHtml',
        autoOpen: '=calendarAutoOpen',
        useIsoWeek: '=calendarUseIsoWeek',
        eventLabel: '@calendarEventLabel',
        timeLabel: '@calendarTimeLabel',
        dayViewStart: '@calendarDayViewStart',
        dayViewEnd: '@calendarDayViewEnd',
        weekTitleLabel: '@calendarWeekTitleLabel',
        timespanClick: '&calendarTimespanClick',
        dayViewSplit: '@calendarDayViewSplit'
      },
      controller: function($scope, $timeout, moment, calendarConfig) {

        var self = this;

        var weekTitleLabel = $scope.weekTitleLabel || calendarConfig.titleFormats.week;
        this.titleFunctions = {
          day: function(currentDay) {
            return moment(currentDay).format(calendarConfig.titleFormats.day);
          },
          week: function(currentDay) {
            return weekTitleLabel.replace('{week}', moment(currentDay).week()).replace('{year}', moment(currentDay).format('YYYY'));
          },
          month: function(currentDay) {
            return moment(currentDay).format(calendarConfig.titleFormats.month);
          },
          year: function(currentDay) {
            return moment(currentDay).format(calendarConfig.titleFormats.year);
          }
        };

        this.changeView = function(view, newDay) {
          $scope.view = view;
          $scope.currentDay = newDay;
        };

        $scope.control = $scope.control || {};

        $scope.control.prev = function() {
          $scope.currentDay = moment($scope.currentDay).subtract(1, $scope.view).toDate();
        };

        $scope.control.next = function() {
          $scope.currentDay = moment($scope.currentDay).add(1, $scope.view).toDate();
        };

        $scope.control.getTitle = function() {
          if (!self.titleFunctions[$scope.view]) {
            return '';
          }
          return self.titleFunctions[$scope.view]($scope.currentDay);
        };

        //Auto update the calendar when the locale changes
        var firstRunWatcher = true;
        var unbindWatcher = $scope.$watch(function() {
          return moment.locale();
        }, function() {
          if (firstRunWatcher) { //dont run the first time the calendar is initialised
            firstRunWatcher = false;
            return;
          }
          var originalView = angular.copy($scope.view);
          $scope.view = 'redraw';
          $timeout(function() { //bit of a hacky way to redraw the calendar, should be refactored at some point
            $scope.view = originalView;
          });
        });

        //Remove the watcher when the calendar is destroyed
        var unbindDestroyListener = $scope.$on('$destroy', function() {
          unbindDestroyListener();
          unbindWatcher();
        });

      }
    };

  });
