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
        eventClick: '&',
        eventEditClick: '&',
        eventDeleteClick: '&',
        editEventHtml: '=',
        deleteEventHtml: '=',
        autoOpen: '=',
        timespanClick: '&',
        dayViewStart: '@',
        dayViewEnd: '@',
        dayViewSplit: '@',
        viewTitle: '=',
        onDrillDown: '&'
      },
      controller: function($scope, $timeout, moment, calendarTitle, calendarDebounce) {

        var vm = this;

        vm.changeView = function(view, newDay) {
          $scope.view = view;
          $scope.currentDay = newDay;
        };

        vm.drillDown = function(date) {

          var nextView = {
            'year': 'month',
            'month': 'day',
            'week': 'day'
          };

          if ($scope.onDrillDown({calendarDate: moment(date).toDate(), calendarNextView: nextView[$scope.view]}) !== false) {
            vm.changeView(nextView[$scope.view], date);
          }

        };

        //Use a debounce to prevent it being called 3 times on initialisation
        var refreshCalendar = calendarDebounce(function() {
          if (calendarTitle[$scope.view]) {
            $scope.viewTitle = calendarTitle[$scope.view]($scope.currentDay);
          }
          $scope.$broadcast('calendar.refreshView');
        }, 50);

        //Auto update the calendar when the locale changes
        var unbindLocaleWatcher = $scope.$watch(function() {
          return moment.locale();
        }, refreshCalendar);

        var unbindOnDestroy = [];
        unbindOnDestroy.push(unbindLocaleWatcher);

        //Refresh the calendar when any of these variables change.
        unbindOnDestroy.push($scope.$watch('currentDay', refreshCalendar));
        unbindOnDestroy.push($scope.$watch('view', refreshCalendar));
        unbindOnDestroy.push($scope.$watch('events', refreshCalendar, true));

        //Remove any watchers when the calendar is destroyed
        var unbindDestroyListener = $scope.$on('$destroy', function() {
          unbindOnDestroy.forEach(function(unbind) {
            unbind();
          });
        });
        unbindOnDestroy.push(unbindDestroyListener);

      }
    };

  });
