'use strict';

angular
  .module('mwl.calendar')
  .directive('mwlCalendar', function() {

    return {
      templateUrl: 'src/templates/calendar.html',
      restrict: 'EA',
      scope: {
        events: '=',
        view: '=',
        currentDay: '=',
        control: '=',
        eventClick: '&',
        eventEditClick: '&',
        eventDeleteClick: '&',
        editEventHtml: '=',
        deleteEventHtml: '=',
        autoOpen: '=',
        useIsoWeek: '=',
        eventLabel: '@',
        timeLabel: '@',
        dayViewStart: '@',
        dayViewEnd: '@',
        weekTitleLabel: '@',
        timespanClick: '&',
        dayViewSplit: '@'
      },
      controller: function($scope, $timeout, moment, calendarConfig) {

        var self = this;

        var weekTitleLabel = $scope.weekTitleLabel || calendarConfig.titleFormats.week;

        var titleFunctions = {
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

        var calendarControl = $scope.control || {};

        calendarControl.prev = function() {
          $scope.currentDay = moment($scope.currentDay).subtract(1, $scope.view).toDate();
        };

        calendarControl.next = function() {
          $scope.currentDay = moment($scope.currentDay).add(1, $scope.view).toDate();
        };

        calendarControl.getTitle = function() {
          if (!titleFunctions[$scope.view]) {
            return '';
          }
          return titleFunctions[$scope.view]($scope.currentDay);
        };

        $scope.control = calendarControl;

        //Auto update the calendar when the locale changes
        var firstRunWatcher = true;
        var unbindWatcher = $scope.$watch(function() {
          return moment.locale();
        }, function(locale) {

          //Maintain backwards compatibility with the previous functionality of the calendar
          if ($scope.useIsoWeek === true) {
            moment.locale(locale, {
              week: {
                dow: 1 //set monday as the first day of the week
              }
            });
          }

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
