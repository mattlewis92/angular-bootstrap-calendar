'use strict';

var angular = require('angular');

angular
  .module('mwl.calendar')
  .controller('MwlCalendarCtrl', function($scope, $timeout, $window, $attrs, $locale, moment, calendarTitle) {

    var vm = this;

    vm.events = vm.events || [];

    vm.changeView = function(view, newDay) {
      vm.view = view;
      vm.currentDay = newDay;
    };

    vm.drillDown = function(date) {

      var rawDate = moment(date).toDate();

      var nextView = {
        year: 'month',
        month: 'day',
        week: 'day'
      };

      if (vm.onDrillDownClick({calendarDate: rawDate, calendarNextView: nextView[vm.view]}) !== false) {
        vm.changeView(nextView[vm.view], rawDate);
      }

    };

    var previousDate = moment(vm.currentDay);
    var previousView = vm.view;

    function refreshCalendar() {
      if (calendarTitle[vm.view] && angular.isDefined($attrs.viewTitle)) {
        vm.viewTitle = calendarTitle[vm.view](vm.currentDay);
      }

      vm.events = vm.events.map(function(event, index) {
        Object.defineProperty(event, '$id', {enumerable: false, configurable: true, value: index});
        return event;
      });

      //if on-timespan-click="calendarDay = calendarDate" is set then don't update the view as nothing needs to change
      var currentDate = moment(vm.currentDay);
      var shouldUpdate = true;
      if (
        previousDate.clone().startOf(vm.view).isSame(currentDate.clone().startOf(vm.view)) &&
        !previousDate.isSame(currentDate) &&
        vm.view === previousView
      ) {
        shouldUpdate = false;
      }
      previousDate = currentDate;
      previousView = vm.view;

      if (shouldUpdate) {
        $scope.$broadcast('calendar.refreshView');
      }
    }

    var eventsWatched = false;

    //Refresh the calendar when any of these variables change.
    $scope.$watchGroup([
      'vm.currentDay',
      'vm.view',
      function() {
        return moment.locale() + $locale.id; //Auto update the calendar when the locale changes
      }
    ], function() {
      if (!eventsWatched) {
        eventsWatched = true;
        //need to deep watch events hence why it isn't included in the watch group
        $scope.$watch('vm.events', refreshCalendar, true); //this will call refreshCalendar when the watcher starts (i.e. now)
      } else {
        refreshCalendar();
      }
    });

  })
  .directive('mwlCalendar', function() {

    return {
      template: require('./../templates/calendar.html'),
      restrict: 'EA',
      scope: {
        events: '=',
        view: '=',
        viewTitle: '=?',
        currentDay: '=',
        editEventHtml: '=',
        deleteEventHtml: '=',
        autoOpen: '=',
        onEventClick: '&',
        onEventTimesChanged: '&',
        onEditEventClick: '&',
        onDeleteEventClick: '&',
        onTimespanClick: '&',
        onDrillDownClick: '&',
        cellModifier: '&',
        dayViewStart: '@',
        dayViewEnd: '@',
        dayViewSplit: '@'
      },
      controller: 'MwlCalendarCtrl as vm',
      bindToController: true
    };

  });
