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
        viewTitle: '=',
        currentDay: '=',
        editEventHtml: '=',
        deleteEventHtml: '=',
        autoOpen: '=',
        onEventClick: '&',
        onEditEventClick: '&',
        onDeleteEventClick: '&',
        onTimespanClick: '&',
        onDrillDownClick: '&',
        dayViewStart: '@',
        dayViewEnd: '@',
        dayViewSplit: '@'
      },
      controller: function($scope, $timeout, moment, calendarTitle, calendarDebounce) {

        var vm = this;

        $scope.events = $scope.events || [];

        vm.changeView = function(view, newDay) {
          $scope.view = view;
          $scope.currentDay = newDay;
        };

        vm.drillDown = function(date) {

          var rawDate = moment(date).toDate();

          var nextView = {
            'year': 'month',
            'month': 'day',
            'week': 'day'
          };

          if ($scope.onDrillDownClick({calendarDate: rawDate, calendarNextView: nextView[$scope.view]}) !== false) {
            vm.changeView(nextView[$scope.view], rawDate);
          }

        };

        var previousDate = moment($scope.currentDay);
        var previousView = angular.copy($scope.view);

        //Use a debounce to prevent it being called 3 times on initialisation
        var refreshCalendar = calendarDebounce(function() {
          if (calendarTitle[$scope.view]) {
            $scope.viewTitle = calendarTitle[$scope.view]($scope.currentDay);
          }

          //if on-timespan-click="calendarDay = calendarDate" is set then dont update the view as nothing needs to change
          var currentDate = moment($scope.currentDay);
          var shouldUpdate = true;
          if (previousDate.clone().startOf($scope.view).isSame(currentDate.clone().startOf($scope.view)) &&
            !previousDate.isSame(currentDate) &&
            $scope.view === previousView) {
            shouldUpdate = false;
          }
          previousDate = currentDate;
          previousView = angular.copy($scope.view);

          if (shouldUpdate) {
            $scope.$broadcast('calendar.refreshView');
          }
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
