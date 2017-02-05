'use strict';

var angular = require('angular');
var LOG_PREFIX = 'Bootstrap calendar:';

angular
  .module('mwl.calendar')
  .controller('MwlCalendarCtrl', function($scope, $log, $timeout, $attrs, $locale, moment, calendarTitle, calendarHelper) {

    var vm = this;

    vm.changeView = function(view, newDay) {
      vm.view = view;
      vm.viewDate = newDay;
    };

    vm.dateClicked = function(date) {

      var rawDate = moment(date).toDate();

      var nextView = {
        year: 'month',
        month: 'day',
        week: 'day'
      };

      if (vm.onViewChangeClick({calendarDate: rawDate, calendarNextView: nextView[vm.view]}) !== false) {
        vm.changeView(nextView[vm.view], rawDate);
      }

    };

    vm.$onInit = function() {

      if (vm.slideBoxDisabled) {
        $log.warn(LOG_PREFIX, 'The `slide-box-disabled` option is deprecated and will be removed in the next release. ' +
          'Instead set `cell-auto-open-disabled` to true');
      }

      vm.events = vm.events || [];

      var previousDate = moment(vm.viewDate);
      var previousView = vm.view;

      function checkEventIsValid(event) {
        if (!event.startsAt) {
          $log.warn(LOG_PREFIX, 'Event is missing the startsAt field', event);
        } else if (!angular.isDate(event.startsAt)) {
          $log.warn(LOG_PREFIX, 'Event startsAt should be a javascript date object. Do `new Date(event.startsAt)` to fix it.', event);
        }

        if (event.endsAt) {
          if (!angular.isDate(event.endsAt)) {
            $log.warn(LOG_PREFIX, 'Event endsAt should be a javascript date object. Do `new Date(event.endsAt)` to fix it.', event);
          }
          if (moment(event.startsAt).isAfter(moment(event.endsAt))) {
            $log.warn(LOG_PREFIX, 'Event cannot start after it finishes', event);
          }
        }
      }

      function refreshCalendar() {

        if (calendarTitle[vm.view] && angular.isDefined($attrs.viewTitle)) {
          vm.viewTitle = calendarTitle[vm.view](vm.viewDate);
        }

        vm.events.forEach(function(event, index) {
          checkEventIsValid(event);
          event.calendarEventId = index;
        });

        //if on-timespan-click="calendarDay = calendarDate" is set then don't update the view as nothing needs to change
        var currentDate = moment(vm.viewDate);
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
          // a $timeout is required as $broadcast is synchronous so if a new events array is set the calendar won't update
          $timeout(function() {
            $scope.$broadcast('calendar.refreshView');
          });
        }
      }

      calendarHelper.loadTemplates().then(function() {
        vm.templatesLoaded = true;

        var eventsWatched = false;

        //Refresh the calendar when any of these variables change.
        $scope.$watchGroup([
          'vm.viewDate',
          'vm.view',
          'vm.cellIsOpen',
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

      }).catch(function(err) {
        $log.error('Could not load all calendar templates', err);
      });

    };

    if (angular.version.minor < 5) {
      vm.$onInit();
    }

  })
  .directive('mwlCalendar', function() {

    return {
      template: '<div mwl-dynamic-directive-template name="calendar" overrides="vm.customTemplateUrls"></div>',
      restrict: 'E',
      scope: {
        events: '=',
        view: '=',
        viewTitle: '=?',
        viewDate: '=',
        cellIsOpen: '=?',
        cellAutoOpenDisabled: '=?',
        slideBoxDisabled: '=?',
        customTemplateUrls: '=?',
        onEventClick: '&',
        onEventTimesChanged: '&',
        onTimespanClick: '&',
        onDateRangeSelect: '&?',
        onViewChangeClick: '&',
        cellModifier: '&',
        dayViewStart: '@',
        dayViewEnd: '@',
        dayViewSplit: '@',
        dayViewEventChunkSize: '@',
        dayViewEventWidth: '@',
        templateScope: '=?',
        dayViewTimePosition: '@'
      },
      controller: 'MwlCalendarCtrl as vm',
      bindToController: true
    };

  });
