/**
 * angular-bootstrap-calendar - A pure AngularJS bootstrap themed responsive calendar that can display events and has views for year, month, week and day
 * @version v0.13.0
 * @link https://github.com/mattlewis92/angular-bootstrap-calendar
 * @license MIT
 */

(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("angular"), (function webpackLoadOptionalExternalModule() { try { return require("interact.js"); } catch(e) {} }()), require("moment"));
	else if(typeof define === 'function' && define.amd)
		define(["angular", "interact.js", "moment"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("angular"), (function webpackLoadOptionalExternalModule() { try { return require("interact.js"); } catch(e) {} }()), require("moment")) : factory(root["angular"], root["interact"], root["moment"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function(__WEBPACK_EXTERNAL_MODULE_13__, __WEBPACK_EXTERNAL_MODULE_45__, __WEBPACK_EXTERNAL_MODULE_47__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(8);

	module.exports = __webpack_require__(12);


/***/ },
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var angular = __webpack_require__(13);
	var MODULE_NAME = 'mwl.calendar';

	function requireAll(r) {
	  r.keys().forEach(r);
	}

	angular.module(MODULE_NAME, []);

	requireAll(__webpack_require__(14));
	requireAll(__webpack_require__(35));
	requireAll(__webpack_require__(39));

	module.exports = MODULE_NAME;


/***/ },
/* 13 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_13__;

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	var map = {
		"./mwlCalendar.js": 15,
		"./mwlCalendarDay.js": 17,
		"./mwlCalendarHourList.js": 19,
		"./mwlCalendarMonth.js": 21,
		"./mwlCalendarSlideBox.js": 23,
		"./mwlCalendarWeek.js": 25,
		"./mwlCalendarYear.js": 27,
		"./mwlCollapseFallback.js": 29,
		"./mwlDateModifier.js": 30,
		"./mwlDraggable.js": 31,
		"./mwlDroppable.js": 32,
		"./mwlElementDimensions.js": 33,
		"./mwlResizable.js": 34
	};
	function webpackContext(req) {
		return __webpack_require__(webpackContextResolve(req));
	};
	function webpackContextResolve(req) {
		return map[req] || (function() { throw new Error("Cannot find module '" + req + "'.") }());
	};
	webpackContext.keys = function webpackContextKeys() {
		return Object.keys(map);
	};
	webpackContext.resolve = webpackContextResolve;
	module.exports = webpackContext;
	webpackContext.id = 14;


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var angular = __webpack_require__(13);

	angular
	  .module('mwl.calendar')
	  .controller('MwlCalendarCtrl', ["$scope", "$timeout", "$window", "$locale", "moment", "calendarTitle", "calendarDebounce", function($scope, $timeout, $window, $locale, moment, calendarTitle, calendarDebounce) {

	    var vm = this;

	    $scope.events = $scope.events || [];

	    vm.changeView = function(view, newDay) {
	      $scope.view = view;
	      $scope.currentDay = newDay;
	    };

	    vm.drillDown = function(date) {

	      var rawDate = moment(date).toDate();

	      var nextView = {
	        year: 'month',
	        month: 'day',
	        week: 'day'
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

	      $scope.events = $scope.events.map(function(event, index) {
	        Object.defineProperty(event, '$id', {enumerable: false, value: index});
	        return event;
	      });

	      //if on-timespan-click="calendarDay = calendarDate" is set then dont update the view as nothing needs to change
	      var currentDate = moment($scope.currentDay);
	      var shouldUpdate = true;
	      if (previousDate.clone().startOf($scope.view).isSame(currentDate.clone().startOf($scope.view)) && !previousDate.isSame(currentDate) &&
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
	      return moment.locale() + $locale.id;
	    }, refreshCalendar);

	    var unbindOnDestroy = [];
	    unbindOnDestroy.push(unbindLocaleWatcher);

	    //Refresh the calendar when any of these variables change.
	    /* eslint-disable angular/ng_on_watch */
	    unbindOnDestroy.push($scope.$watch('currentDay', refreshCalendar));
	    unbindOnDestroy.push($scope.$watch('view', refreshCalendar));
	    unbindOnDestroy.push($scope.$watch('events', refreshCalendar, true));
	    /* eslint-enable angular/ng_on_watch */

	    //Remove any watchers when the calendar is destroyed
	    var unbindDestroyListener = $scope.$on('$destroy', function() {
	      unbindOnDestroy.forEach(function(unbind) {
	        unbind();
	      });
	    });
	    unbindOnDestroy.push(unbindDestroyListener);

	  }])
	  .directive('mwlCalendar', function() {

	    return {
	      template: __webpack_require__(16),
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
	      controller: 'MwlCalendarCtrl as vm'
	    };

	  });


/***/ },
/* 16 */
/***/ function(module, exports) {

	module.exports = "<div class=\"cal-context\" ng-switch=\"view\">\n\n  <div class=\"alert alert-danger\" ng-switch-default>The value passed to the view attribute of the calendar is not set</div>\n\n  <div class=\"alert alert-danger\" ng-hide=\"currentDay\">The value passed to current-day attribute of the calendar is not set</div>\n\n  <mwl-calendar-year\n    events=\"events\"\n    current-day=\"currentDay\"\n    on-event-click=\"onEventClick\"\n    on-event-times-changed=\"onEventTimesChanged\"\n    on-edit-event-click=\"onEditEventClick\"\n    on-delete-event-click=\"onDeleteEventClick\"\n    on-timespan-click=\"onTimespanClick\"\n    edit-event-html=\"editEventHtml\"\n    delete-event-html=\"deleteEventHtml\"\n    auto-open=\"autoOpen\"\n    cell-modifier=\"cellModifier\"\n    ng-switch-when=\"year\"\n  ></mwl-calendar-year>\n\n  <mwl-calendar-month\n    events=\"events\"\n    current-day=\"currentDay\"\n    on-event-click=\"onEventClick\"\n    on-event-times-changed=\"onEventTimesChanged\"\n    on-edit-event-click=\"onEditEventClick\"\n    on-delete-event-click=\"onDeleteEventClick\"\n    on-timespan-click=\"onTimespanClick\"\n    edit-event-html=\"editEventHtml\"\n    delete-event-html=\"deleteEventHtml\"\n    auto-open=\"autoOpen\"\n    cell-modifier=\"cellModifier\"\n    ng-switch-when=\"month\"\n    ></mwl-calendar-month>\n\n  <mwl-calendar-week\n    events=\"events\"\n    current-day=\"currentDay\"\n    on-event-click=\"onEventClick\"\n    on-event-times-changed=\"onEventTimesChanged\"\n    day-view-start=\"dayViewStart\"\n    day-view-end=\"dayViewEnd\"\n    day-view-split=\"dayViewSplit || 30\"\n    ng-switch-when=\"week\"\n    ></mwl-calendar-week>\n\n  <mwl-calendar-day\n    events=\"events\"\n    current-day=\"currentDay\"\n    on-event-click=\"onEventClick\"\n    on-event-times-changed=\"onEventTimesChanged\"\n    day-view-start=\"dayViewStart\"\n    day-view-end=\"dayViewEnd\"\n    day-view-split=\"dayViewSplit || 30\"\n    ng-switch-when=\"day\"\n    ></mwl-calendar-day>\n</div>\n";

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var angular = __webpack_require__(13);

	angular
	  .module('mwl.calendar')
	  .controller('MwlCalendarDayCtrl', ["$scope", "$timeout", "$sce", "moment", "calendarHelper", "calendarConfig", function($scope, $timeout, $sce, moment, calendarHelper, calendarConfig) {

	    var vm = this;

	    vm.calendarConfig = calendarConfig;
	    vm.$sce = $sce;

	    var unbindListener = $scope.$on('calendar.refreshView', function() {
	      vm.dayViewHeight = calendarHelper.getDayViewHeight(
	        $scope.dayViewStart,
	        $scope.dayViewEnd,
	        $scope.dayViewSplit
	      );

	      vm.view = calendarHelper.getDayView(
	        $scope.events,
	        $scope.currentDay,
	        $scope.dayViewStart,
	        $scope.dayViewEnd,
	        $scope.dayViewSplit
	      );

	    });

	    $scope.$on('$destroy', function() {
	      unbindListener();
	    });

	    vm.eventDragComplete = function(event, minuteChunksMoved) {
	      var minutesDiff = minuteChunksMoved * $scope.dayViewSplit;
	      var newStart = moment(event.startsAt).add(minutesDiff, 'minutes');
	      var newEnd = moment(event.endsAt).add(minutesDiff, 'minutes');
	      delete event.tempStartsAt;

	      $scope.onEventTimesChanged({
	        calendarEvent: event,
	        calendarNewEventStart: newStart.toDate(),
	        calendarNewEventEnd: newEnd.toDate()
	      });
	    };

	    vm.eventDragged = function(event, minuteChunksMoved) {
	      var minutesDiff = minuteChunksMoved * $scope.dayViewSplit;
	      event.tempStartsAt = moment(event.startsAt).add(minutesDiff, 'minutes').toDate();
	    };

	    vm.eventResizeComplete = function(event, edge, minuteChunksMoved) {
	      var minutesDiff = minuteChunksMoved * $scope.dayViewSplit;
	      var start = moment(event.startsAt);
	      var end = moment(event.endsAt);
	      if (edge === 'start') {
	        start.add(minutesDiff, 'minutes');
	      } else {
	        end.add(minutesDiff, 'minutes');
	      }
	      delete event.tempStartsAt;

	      $scope.onEventTimesChanged({
	        calendarEvent: event,
	        calendarNewEventStart: start.toDate(),
	        calendarNewEventEnd: end.toDate()
	      });
	    };

	    vm.eventResized = function(event, edge, minuteChunksMoved) {
	      var minutesDiff = minuteChunksMoved * $scope.dayViewSplit;
	      if (edge === 'start') {
	        event.tempStartsAt = moment(event.startsAt).add(minutesDiff, 'minutes').toDate();
	      }
	    };

	  }])
	  .directive('mwlCalendarDay', function() {

	    return {
	      template: __webpack_require__(18),
	      restrict: 'EA',
	      require: '^mwlCalendar',
	      scope: {
	        events: '=',
	        currentDay: '=',
	        onEventClick: '=',
	        onEventTimesChanged: '=',
	        dayViewStart: '=',
	        dayViewEnd: '=',
	        dayViewSplit: '='
	      },
	      controller: 'MwlCalendarDayCtrl as vm'
	    };

	  });


/***/ },
/* 18 */
/***/ function(module, exports) {

	module.exports = "<div class=\"cal-day-box\">\n  <div class=\"row-fluid clearfix cal-row-head\">\n    <div class=\"span1 col-xs-1 cal-cell\" ng-bind=\"vm.calendarConfig.i18nStrings.timeLabel\"></div>\n    <div class=\"span11 col-xs-11 cal-cell\" ng-bind=\"vm.calendarConfig.i18nStrings.eventsLabel\"></div>\n  </div>\n\n  <div class=\"cal-day-panel clearfix\" ng-style=\"{height: vm.dayViewHeight + 'px'}\">\n\n    <mwl-calendar-hour-list\n      day-view-start=\"dayViewStart\"\n      day-view-end=\"dayViewEnd\"\n      day-view-split=\"dayViewSplit\">\n    </mwl-calendar-hour-list>\n\n    <div\n      class=\"pull-left day-event day-highlight\"\n      ng-class=\"'dh-event-' + event.type + ' ' + event.cssClass\"\n      ng-repeat=\"event in vm.view track by event.$id\"\n      ng-style=\"{top: event.top + 'px', left: event.left + 60 + 'px', height: event.height + 'px'}\"\n      mwl-draggable=\"event.draggable === true\"\n      axis=\"y\"\n      snap-grid=\"{y: 30}\"\n      on-drag=\"vm.eventDragged(event, y)\"\n      on-drag-end=\"vm.eventDragComplete(event, y)\"\n      mwl-resizable=\"event.resizable === true\"\n      resize-edges=\"{top: true, bottom: true}\"\n      on-resize=\"vm.eventResized(event, edge, y)\"\n      on-resize-end=\"vm.eventResizeComplete(event, edge, y)\">\n\n      <span class=\"cal-hours\">\n        <span ng-show=\"event.top == 0\"><span ng-bind=\"(event.tempStartsAt || event.startsAt) | calendarDate:'day':true\"></span>, </span>\n        <span ng-bind=\"(event.tempStartsAt || event.startsAt) | calendarDate:'time':true\"></span>\n      </span>\n      <a href=\"javascript:;\" class=\"event-item\" ng-click=\"onEventClick({calendarEvent: event})\">\n        <span ng-bind-html=\"vm.$sce.trustAsHtml(event.title) | calendarTruncateEventTitle:20:event.height\"></span>\n      </a>\n\n    </div>\n\n  </div>\n\n</div>\n";

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var angular = __webpack_require__(13);

	angular
	  .module('mwl.calendar')
	  .controller('MwlCalendarHourListCtrl', ["$scope", "moment", "calendarConfig", "calendarHelper", function($scope, moment, calendarConfig, calendarHelper) {
	    var vm = this;
	    var dayViewStart, dayViewEnd;

	    function updateDays() {
	      dayViewStart = moment($scope.dayViewStart || '00:00', 'HH:mm');
	      dayViewEnd = moment($scope.dayViewEnd || '23:00', 'HH:mm');
	      vm.dayViewSplit = parseInt($scope.dayViewSplit);
	      vm.hours = [];
	      var dayCounter = moment(dayViewStart);
	      for (var i = 0; i <= dayViewEnd.diff(dayViewStart, 'hours'); i++) {
	        vm.hours.push({
	          label: calendarHelper.formatDate(dayCounter, calendarConfig.dateFormats.hour)
	        });
	        dayCounter.add(1, 'hour');
	      }
	    }

	    var originalLocale = moment.locale();

	    var unbindListener = $scope.$on('calendar.refreshView', function() {

	      if (originalLocale !== moment.locale()) {
	        originalLocale = moment.locale();
	        updateDays();
	      }

	    });

	    $scope.$on('$destroy', function() {
	      unbindListener();
	    });

	    updateDays();

	  }])
	  .directive('mwlCalendarHourList', function() {

	    return {
	      restrict: 'EA',
	      template: __webpack_require__(20),
	      controller: 'MwlCalendarHourListCtrl as vm',
	      scope: {
	        dayViewStart: '=',
	        dayViewEnd: '=',
	        dayViewSplit: '='
	      }
	    };

	  });


/***/ },
/* 20 */
/***/ function(module, exports) {

	module.exports = "<div class=\"cal-day-panel-hour\">\n\n  <div class=\"cal-day-hour\" ng-repeat=\"hour in vm.hours track by $index\">\n\n    <div class=\"row-fluid cal-day-hour-part\">\n      <div class=\"span1 col-xs-1\"><strong ng-bind=\"hour.label\"></strong></div>\n      <div class=\"span11 col-xs-11\"></div>\n    </div>\n\n    <div class=\"row-fluid cal-day-hour-part\">\n      <div class=\"span1 col-xs-1\"></div>\n      <div class=\"span11 col-xs-11\"></div>\n    </div>\n\n    <div class=\"row-fluid cal-day-hour-part\" ng-show=\"vm.dayViewSplit < 30\">\n      <div class=\"span1 col-xs-1\"></div>\n      <div class=\"span11 col-xs-11\"></div>\n    </div>\n\n    <div class=\"row-fluid cal-day-hour-part\" ng-show=\"vm.dayViewSplit < 30\">\n      <div class=\"span1 col-xs-1\"></div>\n      <div class=\"span11 col-xs-11\"></div>\n    </div>\n\n    <div class=\"row-fluid cal-day-hour-part\" ng-show=\"vm.dayViewSplit < 15\">\n      <div class=\"span1 col-xs-1\"></div>\n      <div class=\"span11 col-xs-11\"></div>\n    </div>\n\n    <div class=\"row-fluid cal-day-hour-part\" ng-show=\"vm.dayViewSplit < 15\">\n      <div class=\"span1 col-xs-1\"></div>\n      <div class=\"span11 col-xs-11\"></div>\n    </div>\n\n  </div>\n\n</div>\n";

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var angular = __webpack_require__(13);

	angular
	  .module('mwl.calendar')
	  .controller('MwlCalendarMonthCtrl', ["$scope", "moment", "calendarHelper", function($scope, moment, calendarHelper) {

	    var vm = this;

	    var unbindListener = $scope.$on('calendar.refreshView', function() {

	      vm.weekDays = calendarHelper.getWeekDayNames();

	      vm.view = calendarHelper.getMonthView($scope.events, $scope.currentDay, $scope.cellModifier);
	      var rows = Math.floor(vm.view.length / 7);
	      vm.monthOffsets = [];
	      for (var i = 0; i < rows; i++) {
	        vm.monthOffsets.push(i * 7);
	      }

	      //Auto open the calendar to the current day if set
	      if ($scope.autoOpen) {
	        vm.view.forEach(function(day) {
	          if (day.inMonth && moment($scope.currentDay).startOf('day').isSame(day.date) && !vm.openDayIndex) {
	            vm.dayClicked(day, true);
	          }
	        });
	      }

	    });

	    $scope.$on('$destroy', function() {
	      unbindListener();
	    });

	    vm.dayClicked = function(day, dayClickedFirstRun) {

	      if (!dayClickedFirstRun) {
	        $scope.onTimespanClick({
	          calendarDate: day.date.toDate()
	        });
	      }

	      vm.openRowIndex = null;
	      var dayIndex = vm.view.indexOf(day);
	      if (dayIndex === vm.openDayIndex) { //the day has been clicked and is already open
	        vm.openDayIndex = null; //close the open day
	      } else {
	        vm.openDayIndex = dayIndex;
	        vm.openRowIndex = Math.floor(dayIndex / 7);
	      }

	    };

	    vm.highlightEvent = function(event, shouldAddClass) {

	      vm.view.forEach(function(day) {
	        delete day.highlightClass;
	        if (shouldAddClass) {
	          var dayContainsEvent = day.events.indexOf(event) > -1;
	          if (dayContainsEvent) {
	            day.highlightClass = 'day-highlight dh-event-' + event.type;
	          }
	        }
	      });

	    };

	    vm.handleEventDrop = function(event, newDayDate) {

	      var newStart = moment(event.startsAt)
	        .date(moment(newDayDate).date())
	        .month(moment(newDayDate).month());

	      var newEnd = calendarHelper.adjustEndDateFromStartDiff(event.startsAt, newStart, event.endsAt);

	      $scope.onEventTimesChanged({
	        calendarEvent: event,
	        calendarDate: newDayDate,
	        calendarNewEventStart: newStart.toDate(),
	        calendarNewEventEnd: newEnd.toDate()
	      });
	    };

	  }])
	  .directive('mwlCalendarMonth', function() {

	    return {
	      template: __webpack_require__(22),
	      restrict: 'EA',
	      require: '^mwlCalendar',
	      scope: {
	        events: '=',
	        currentDay: '=',
	        onEventClick: '=',
	        onEditEventClick: '=',
	        onDeleteEventClick: '=',
	        onEventTimesChanged: '=',
	        editEventHtml: '=',
	        deleteEventHtml: '=',
	        autoOpen: '=',
	        onTimespanClick: '=',
	        cellModifier: '='
	      },
	      controller: 'MwlCalendarMonthCtrl as vm',
	      link: function(scope, element, attrs, calendarCtrl) {
	        scope.vm.calendarCtrl = calendarCtrl;
	      }
	    };

	  });


/***/ },
/* 22 */
/***/ function(module, exports) {

	module.exports = "<script type=\"text/ng-template\" id=\"calendarMonthEventsList.html\">\n  <div class=\"events-list\" ng-show=\"day.events.length > 0\">\n    <a\n      ng-repeat=\"event in day.events | orderBy:'startsAt' track by event.$id\"\n      href=\"javascript:;\"\n      ng-click=\"onEventClick({calendarEvent: event})\"\n      class=\"pull-left event\"\n      ng-class=\"'event-' + event.type + ' ' + event.cssClass\"\n      ng-mouseenter=\"vm.highlightEvent(event, true)\"\n      ng-mouseleave=\"vm.highlightEvent(event, false)\"\n      tooltip-append-to-body=\"true\"\n      tooltip-html-unsafe=\"{{ (event.startsAt | calendarDate:'time':true) + ' - ' + event.title }}\"\n      mwl-draggable=\"event.draggable === true\"\n      drop-data=\"{event: event}\">\n    </a>\n  </div>\n</script>\n\n<script type=\"text/ng-template\" id=\"calendarMonthDay.html\">\n  <div\n    mwl-droppable\n    on-drop=\"vm.handleEventDrop(dropData.event, day.date)\"\n    class=\"cal-month-day {{ day.cssClass }}\"\n    ng-class=\"{\n            'cal-day-outmonth': !day.inMonth,\n            'cal-day-inmonth': day.inMonth,\n            'cal-day-weekend': day.isWeekend,\n            'cal-day-past': day.isPast,\n            'cal-day-today': day.isToday,\n            'cal-day-future': day.isFuture\n          }\">\n\n    <small\n      class=\"cal-events-num badge badge-important pull-left\"\n      ng-show=\"day.badgeTotal > 0\"\n      ng-bind=\"day.badgeTotal\">\n    </small>\n\n  <span\n    class=\"pull-right\"\n    data-cal-date\n    ng-click=\"vm.calendarCtrl.drillDown(day.date)\"\n    ng-bind=\"day.label\">\n  </span>\n\n    <div class=\"cal-day-tick\" ng-show=\"dayIndex === vm.openDayIndex && vm.view[vm.openDayIndex].events.length > 0\">\n      <i class=\"glyphicon glyphicon-chevron-up\"></i>\n      <i class=\"fa fa-chevron-up\"></i>\n    </div>\n\n    <div ng-include=\"'calendarMonthEventsList.html'\"></div>\n\n  </div>\n\n</script>\n\n<div class=\"cal-row-fluid cal-row-head\">\n\n  <div class=\"cal-cell1\" ng-repeat=\"day in vm.weekDays track by $index\" ng-bind=\"day\"></div>\n\n</div>\n<div class=\"cal-month-box\">\n\n  <div ng-repeat=\"rowOffset in vm.monthOffsets track by rowOffset\">\n    <div class=\"cal-row-fluid cal-before-eventlist\">\n      <div\n        ng-repeat=\"day in vm.view | calendarLimitTo:7:rowOffset track by $index\"\n        ng-init=\"dayIndex = vm.view.indexOf(day)\"\n        class=\"cal-cell1 cal-cell {{ day.highlightClass }}\"\n        ng-click=\"vm.dayClicked(day)\"\n        ng-class=\"{pointer: day.events.length > 0}\">\n        <div ng-include=\"'calendarMonthDay.html'\"></div>\n      </div>\n    </div>\n\n    <mwl-calendar-slide-box\n      is-open=\"vm.openRowIndex === $index && vm.view[vm.openDayIndex].events.length > 0\"\n      events=\"vm.view[vm.openDayIndex].events\"\n      on-event-click=\"onEventClick\"\n      edit-event-html=\"editEventHtml\"\n      on-edit-event-click=\"onEditEventClick\"\n      delete-event-html=\"deleteEventHtml\"\n      on-delete-event-click=\"onDeleteEventClick\">\n    </mwl-calendar-slide-box>\n\n  </div>\n\n</div>\n";

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var angular = __webpack_require__(13);

	angular
	  .module('mwl.calendar')
	  .controller('MwlCalendarSlideBoxCtrl', ["$scope", "$sce", function($scope, $sce) {

	    var vm = this;
	    vm.$sce = $sce;

	    var unbindWatcher = $scope.$watch('isOpen', function(isOpen) {
	      vm.shouldCollapse = !isOpen;
	    });

	    var unbindDestroy = $scope.$on('$destroy', function() {
	      unbindDestroy();
	      unbindWatcher();
	    });

	  }])
	  .directive('mwlCalendarSlideBox', function() {

	    return {
	      restrict: 'EA',
	      template: __webpack_require__(24),
	      replace: true,
	      controller: 'MwlCalendarSlideBoxCtrl as vm',
	      require: ['^?mwlCalendarMonth', '^?mwlCalendarYear'],
	      link: function(scope, elm, attrs, ctrls) {
	        scope.isMonthView = !!ctrls[0];
	        scope.isYearView = !!ctrls[1];
	      },
	      scope: {
	        isOpen: '=',
	        events: '=',
	        onEventClick: '=',
	        editEventHtml: '=',
	        onEditEventClick: '=',
	        deleteEventHtml: '=',
	        onDeleteEventClick: '='
	      }
	    };

	  });


/***/ },
/* 24 */
/***/ function(module, exports) {

	module.exports = "<div class=\"cal-slide-box\" collapse=\"vm.shouldCollapse\" mwl-collapse-fallback=\"vm.shouldCollapse\">\n  <div class=\"cal-slide-content cal-event-list\">\n    <ul class=\"unstyled list-unstyled\">\n\n      <li\n        ng-repeat=\"event in events | orderBy:'startsAt' track by event.$id\"\n        ng-class=\"event.cssClass\"\n        mwl-draggable=\"event.draggable === true\"\n        drop-data=\"{event: event}\">\n        <span class=\"pull-left event\" ng-class=\"'event-' + event.type\"></span>\n        &nbsp;\n        <a\n          href=\"javascript:;\"\n          class=\"event-item\"\n          ng-click=\"onEventClick({calendarEvent: event})\">\n          <span ng-bind-html=\"vm.$sce.trustAsHtml(event.title)\"></span>\n          <span ng-show=\"isMonthView\">(<span ng-bind=\"event.startsAt | calendarDate:'time':true\"></span>)</span>\n          <span ng-show=\"isYearView\">(<span ng-bind=\"event.startsAt | calendarDate:'datetime':true\"></span>)</span>\n        </a>\n\n        <a\n          href=\"javascript:;\"\n          class=\"event-item-edit\"\n          ng-if=\"editEventHtml && event.editable !== false\"\n          ng-bind-html=\"vm.$sce.trustAsHtml(editEventHtml)\"\n          ng-click=\"onEditEventClick({calendarEvent: event})\">\n        </a>\n\n        <a\n          href=\"javascript:;\"\n          class=\"event-item-delete\"\n          ng-if=\"deleteEventHtml && event.deletable !== false\"\n          ng-bind-html=\"vm.$sce.trustAsHtml(deleteEventHtml)\"\n          ng-click=\"onDeleteEventClick({calendarEvent: event})\">\n        </a>\n      </li>\n\n    </ul>\n  </div>\n</div>\n";

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var angular = __webpack_require__(13);

	angular
	  .module('mwl.calendar')
	  .controller('MwlCalendarWeekCtrl', ["$scope", "$sce", "moment", "calendarHelper", "calendarConfig", function($scope, $sce, moment, calendarHelper, calendarConfig) {

	    var vm = this;

	    vm.showTimes = calendarConfig.showTimesOnWeekView;
	    vm.$sce = $sce;

	    var unbindListener = $scope.$on('calendar.refreshView', function() {
	      vm.dayViewHeight = calendarHelper.getDayViewHeight(
	        $scope.dayViewStart,
	        $scope.dayViewEnd,
	        $scope.dayViewSplit
	      );
	      if (vm.showTimes) {
	        vm.view = calendarHelper.getWeekViewWithTimes(
	          $scope.events,
	          $scope.currentDay,
	          $scope.dayViewStart,
	          $scope.dayViewEnd,
	          $scope.dayViewSplit
	        );
	      } else {
	        vm.view = calendarHelper.getWeekView($scope.events, $scope.currentDay);
	      }
	    });

	    $scope.$on('$destroy', function() {
	      unbindListener();
	    });

	    vm.weekDragged = function(event, daysDiff, minuteChunksMoved) {

	      var newStart = moment(event.startsAt).add(daysDiff, 'days');
	      var newEnd = moment(event.endsAt).add(daysDiff, 'days');

	      if (minuteChunksMoved) {
	        var minutesDiff = minuteChunksMoved * $scope.dayViewSplit;
	        newStart = newStart.add(minutesDiff, 'minutes');
	        newEnd = newEnd.add(minutesDiff, 'minutes');
	      }

	      delete event.tempStartsAt;

	      $scope.onEventTimesChanged({
	        calendarEvent: event,
	        calendarNewEventStart: newStart.toDate(),
	        calendarNewEventEnd: newEnd.toDate()
	      });
	    };

	    vm.weekResized = function(event, edge, daysDiff) {

	      var start = moment(event.startsAt);
	      var end = moment(event.endsAt);
	      if (edge === 'start') {
	        start.add(daysDiff, 'days');
	      } else {
	        end.add(daysDiff, 'days');
	      }

	      $scope.onEventTimesChanged({
	        calendarEvent: event,
	        calendarNewEventStart: start.toDate(),
	        calendarNewEventEnd: end.toDate()
	      });

	    };

	    vm.tempTimeChanged = function(event, minuteChunksMoved) {
	      var minutesDiff = minuteChunksMoved * $scope.dayViewSplit;
	      event.tempStartsAt = moment(event.startsAt).add(minutesDiff, 'minutes').toDate();
	    };

	  }])
	  .directive('mwlCalendarWeek', function() {

	    return {
	      template: __webpack_require__(26),
	      restrict: 'EA',
	      require: '^mwlCalendar',
	      scope: {
	        events: '=',
	        currentDay: '=',
	        onEventClick: '=',
	        onEventTimesChanged: '=',
	        dayViewStart: '=',
	        dayViewEnd: '=',
	        dayViewSplit: '='
	      },
	      controller: 'MwlCalendarWeekCtrl as vm',
	      link: function(scope, element, attrs, calendarCtrl) {
	        scope.vm.calendarCtrl = calendarCtrl;
	      }
	    };

	  });


/***/ },
/* 26 */
/***/ function(module, exports) {

	module.exports = "<div class=\"cal-week-box\" ng-class=\"{'cal-day-box': vm.showTimes}\">\n  <div class=\"cal-row-fluid cal-row-head\">\n\n    <div\n      class=\"cal-cell1\"\n      ng-repeat=\"day in vm.view.days track by $index\"\n      ng-class=\"{\n        'cal-day-weekend': day.isWeekend,\n        'cal-day-past': day.isPast,\n        'cal-day-today': day.isToday,\n        'cal-day-future': day.isFuture}\"\n      mwl-element-dimensions=\"vm.dayColumnDimensions\">\n\n      <span ng-bind=\"day.weekDayLabel\"></span>\n      <br>\n      <small>\n        <span\n          data-cal-date\n          ng-click=\"vm.calendarCtrl.drillDown(day.date)\"\n          class=\"pointer\"\n          ng-bind=\"day.dayLabel\">\n        </span>\n      </small>\n\n    </div>\n\n  </div>\n\n  <div class=\"cal-day-panel clearfix\" ng-style=\"{height: vm.showTimes ? (vm.dayViewHeight + 'px') : 'auto'}\">\n\n    <mwl-calendar-hour-list\n      day-view-start=\"dayViewStart\"\n      day-view-end=\"dayViewEnd\"\n      day-view-split=\"dayViewSplit\"\n      ng-if=\"vm.showTimes\">\n    </mwl-calendar-hour-list>\n\n    <div class=\"row\">\n      <div class=\"col-xs-12\">\n        <div\n          class=\"cal-row-fluid \"\n          ng-repeat=\"event in vm.view.events track by event.$id\">\n          <div\n            ng-class=\"'cal-cell' + (vm.showTimes ? 1 : event.daySpan) + ' cal-offset' + event.dayOffset + ' day-highlight dh-event-' + event.type + ' ' + event.cssClass\"\n            ng-style=\"{top: vm.showTimes ? ((event.top + 2) + 'px') : 'auto', position: vm.showTimes ? 'absolute' : 'inherit'}\"\n            data-event-class\n            mwl-draggable=\"event.draggable === true\"\n            axis=\"vm.showTimes ? 'xy' : 'x'\"\n            snap-grid=\"vm.showTimes ? {x: vm.dayColumnDimensions.width, y: 30} : {x: vm.dayColumnDimensions.width}\"\n            on-drag=\"vm.tempTimeChanged(event, y)\"\n            on-drag-end=\"vm.weekDragged(event, x, y)\"\n            mwl-resizable=\"event.resizable === true && !vm.showTimes\"\n            resize-edges=\"{left: true, right: true}\"\n            on-resize-end=\"vm.weekResized(event, edge, x)\">\n            <strong ng-bind=\"(event.tempStartsAt || event.startsAt) | calendarDate:'time':true\" ng-show=\"vm.showTimes\"></strong>\n            <a\n              href=\"javascript:;\"\n              ng-click=\"onEventClick({calendarEvent: event})\"\n              class=\"event-item\"\n              ng-bind-html=\"vm.$sce.trustAsHtml(event.title)\"\n              tooltip-html-unsafe=\"{{ event.title }}\"\n              tooltip-placement=\"left\"\n              tooltip-append-to-body=\"true\">\n            </a>\n          </div>\n        </div>\n      </div>\n\n    </div>\n\n  </div>\n</div>\n";

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var angular = __webpack_require__(13);

	angular
	  .module('mwl.calendar')
	  .controller('MwlCalendarYearCtrl', ["$scope", "moment", "calendarHelper", function($scope, moment, calendarHelper) {

	    var vm = this;

	    var unbindListener = $scope.$on('calendar.refreshView', function() {
	      vm.view = calendarHelper.getYearView($scope.events, $scope.currentDay, $scope.cellModifier);

	      //Auto open the calendar to the current day if set
	      if ($scope.autoOpen) {
	        vm.view.forEach(function(month) {
	          if (moment($scope.currentDay).startOf('month').isSame(month.date) && !vm.openMonthIndex) {
	            vm.monthClicked(month, true);
	          }
	        });
	      }

	    });

	    $scope.$on('$destroy', function() {
	      unbindListener();
	    });

	    vm.monthClicked = function(month, monthClickedFirstRun) {

	      if (!monthClickedFirstRun) {
	        $scope.onTimespanClick({calendarDate: month.date.toDate()});
	      }

	      vm.openRowIndex = null;
	      var monthIndex = vm.view.indexOf(month);
	      if (monthIndex === vm.openMonthIndex) { //the month has been clicked and is already open
	        vm.openMonthIndex = null; //close the open month
	      } else {
	        vm.openMonthIndex = monthIndex;
	        vm.openRowIndex = Math.floor(monthIndex / 4);
	      }

	    };

	    vm.handleEventDrop = function(event, newMonthDate) {
	      var newStart = moment(event.startsAt).month(moment(newMonthDate).month());
	      var newEnd = calendarHelper.adjustEndDateFromStartDiff(event.startsAt, newStart, event.endsAt);

	      $scope.onEventTimesChanged({
	        calendarEvent: event,
	        calendarDate: newMonthDate,
	        calendarNewEventStart: newStart.toDate(),
	        calendarNewEventEnd: newEnd.toDate()
	      });
	    };

	  }])
	  .directive('mwlCalendarYear', function() {

	    return {
	      template: __webpack_require__(28),
	      restrict: 'EA',
	      require: '^mwlCalendar',
	      scope: {
	        events: '=',
	        currentDay: '=',
	        onEventClick: '=',
	        onEventTimesChanged: '=',
	        onEditEventClick: '=',
	        onDeleteEventClick: '=',
	        editEventHtml: '=',
	        deleteEventHtml: '=',
	        autoOpen: '=',
	        onTimespanClick: '=',
	        cellModifier: '='
	      },
	      controller: 'MwlCalendarYearCtrl as vm',
	      link: function(scope, element, attrs, calendarCtrl) {
	        scope.vm.calendarCtrl = calendarCtrl;
	      }
	    };

	  });


/***/ },
/* 28 */
/***/ function(module, exports) {

	module.exports = "<div class=\"cal-year-box\">\n  <div ng-repeat=\"rowOffset in [0, 4, 8] track by rowOffset\">\n    <div class=\"row cal-before-eventlist\">\n      <div\n        class=\"span3 col-md-3 col-xs-6 cal-cell {{ day.cssClass }}\"\n        ng-repeat=\"month in vm.view | calendarLimitTo:4:rowOffset track by $index\"\n        ng-init=\"monthIndex = vm.view.indexOf(month)\"\n        ng-click=\"vm.monthClicked(month)\"\n        ng-class=\"{pointer: month.events.length > 0, 'cal-day-today': month.isToday}\"\n        mwl-droppable\n        on-drop=\"vm.handleEventDrop(dropData.event, month.date)\">\n\n        <span\n          class=\"pull-right\"\n          data-cal-date\n          ng-click=\"vm.calendarCtrl.drillDown(month.date)\"\n          ng-bind=\"month.label\">\n        </span>\n\n        <small\n          class=\"cal-events-num badge badge-important pull-left\"\n          ng-show=\"month.badgeTotal > 0\"\n          ng-bind=\"month.badgeTotal\">\n        </small>\n\n        <div\n          class=\"cal-day-tick\"\n          ng-show=\"monthIndex === vm.openMonthIndex && vm.view[vm.openMonthIndex].events.length > 0\">\n          <i class=\"glyphicon glyphicon-chevron-up\"></i>\n          <i class=\"fa fa-chevron-up\"></i>\n        </div>\n\n      </div>\n    </div>\n\n    <mwl-calendar-slide-box\n      is-open=\"vm.openRowIndex === $index && vm.view[vm.openMonthIndex].events.length > 0\"\n      events=\"vm.view[vm.openMonthIndex].events\"\n      on-event-click=\"onEventClick\"\n      edit-event-html=\"editEventHtml\"\n      on-edit-event-click=\"onEditEventClick\"\n      delete-event-html=\"deleteEventHtml\"\n      on-delete-event-click=\"onDeleteEventClick\">\n    </mwl-calendar-slide-box>\n\n  </div>\n\n</div>\n";

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var angular = __webpack_require__(13);

	angular
	  .module('mwl.calendar')
	  .controller('MwlCollapseFallbackCtrl', ["$scope", "$attrs", "$element", function($scope, $attrs, $element) {
	    var unbindWatcher = $scope.$watch($attrs.mwlCollapseFallback, function(shouldCollapse) {
	      if (shouldCollapse) {
	        $element.addClass('ng-hide');
	      } else {
	        $element.removeClass('ng-hide');
	      }
	    });

	    var unbindDestroy = $scope.$on('$destroy', function() {
	      unbindDestroy();
	      unbindWatcher();
	    });

	  }])
	  .directive('mwlCollapseFallback', ["$injector", function($injector) {

	    if ($injector.has('collapseDirective')) {
	      return {};
	    }

	    return {
	      restrict: 'A',
	      controller: 'MwlCollapseFallbackCtrl'
	    };

	  }]);


/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var angular = __webpack_require__(13);

	angular
	  .module('mwl.calendar')
	  .controller('MwlDateModifierCtrl', ["$element", "$attrs", "$scope", "moment", function($element, $attrs, $scope, moment) {

	    function onClick() {
	      if (angular.isDefined($attrs.setToToday)) {
	        $scope.date = new Date();
	      } else if (angular.isDefined($attrs.increment)) {
	        $scope.date = moment($scope.date).add(1, $scope.increment).toDate();
	      } else if (angular.isDefined($attrs.decrement)) {
	        $scope.date = moment($scope.date).subtract(1, $scope.decrement).toDate();
	      }
	      $scope.$apply();
	    }

	    $element.bind('click', onClick);

	    $scope.$on('$destroy', function() {
	      $element.unbind('click', onClick);
	    });

	  }])
	  .directive('mwlDateModifier', function() {

	    return {
	      restrict: 'A',
	      controller: 'MwlDateModifierCtrl',
	      scope: {
	        date: '=',
	        increment: '=',
	        decrement: '='
	      }
	    };

	  });


/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var angular = __webpack_require__(13);

	angular
	  .module('mwl.calendar')
	  .controller('MwlDraggableCtrl', ["$element", "$scope", "$window", "$parse", "$attrs", "$timeout", "interact", function($element, $scope, $window, $parse, $attrs, $timeout, interact) {

	    if (!interact) {
	      return;
	    }

	    var snap, snapGridDimensions;
	    if ($attrs.snapGrid) {
	      snapGridDimensions = $parse($attrs.snapGrid)($scope);
	      snap = {
	        targets: [
	          interact.createSnapGrid(snapGridDimensions)
	        ]
	      };
	    }

	    function translateElement(elm, transformValue) {
	      return elm
	        .css('transform', transformValue)
	        .css('-ms-transform', transformValue)
	        .css('-webkit-transform', transformValue);
	    }

	    function canDrag() {
	      return $parse($attrs.mwlDraggable)($scope);
	    }

	    function getUnitsMoved(x, y, gridDimensions) {

	      var result = {x: x, y: y};

	      if (gridDimensions && gridDimensions.x) {
	        result.x /= gridDimensions.x;
	      }

	      if (gridDimensions && gridDimensions.y) {
	        result.y /= gridDimensions.y;
	      }

	      return result;

	    }

	    interact($element[0]).draggable({
	      snap: snap,
	      onstart: function(event) {
	        if (canDrag()) {
	          angular.element(event.target).addClass('dragging-active');
	          event.target.dropData = $parse($attrs.dropData)($scope);
	          event.target.style.pointerEvents = 'none';
	          if ($attrs.onDragStart) {
	            $parse($attrs.onDragStart)($scope);
	            $scope.$apply();
	          }
	        }
	      },
	      onmove: function(event) {

	        if (canDrag()) {
	          var elm = angular.element(event.target);
	          var x = (parseFloat(elm.attr('data-x')) || 0) + (event.dx || 0);
	          var y = (parseFloat(elm.attr('data-y')) || 0) + (event.dy || 0);

	          switch ($parse($attrs.axis)($scope)) {
	            case 'x':
	              y = 0;
	              break;

	            case 'y':
	              x = 0;
	              break;

	            default:
	          }

	          if ($window.getComputedStyle(elm[0]).position === 'static') {
	            elm.css('position', 'relative');
	          }

	          translateElement(elm, 'translate(' + x + 'px, ' + y + 'px)')
	            .css('z-index', 1000)
	            .attr('data-x', x)
	            .attr('data-y', y);

	          if ($attrs.onDrag) {
	            $parse($attrs.onDrag)($scope, getUnitsMoved(x, y, snapGridDimensions));
	            $scope.$apply();
	          }
	        }

	      },
	      onend: function(event) {

	        if (canDrag()) {
	          var elm = angular.element(event.target);
	          var x = elm.attr('data-x');
	          var y = elm.attr('data-y');

	          event.target.style.pointerEvents = 'auto';
	          if ($attrs.onDragEnd) {
	            $parse($attrs.onDragEnd)($scope, getUnitsMoved(x, y, snapGridDimensions));
	            $scope.$apply();
	          }

	          $timeout(function() {
	            translateElement(elm, null)
	              .removeAttr('data-x')
	              .removeAttr('data-y')
	              .removeClass('dragging-active');
	          }, 50);
	        }

	      }
	    });

	    var unbindDestroy = $scope.$on('$destroy', function() {
	      unbindDestroy();
	      interact($element[0]).unset();
	    });

	  }])
	  .directive('mwlDraggable', function() {

	    return {
	      restrict: 'A',
	      controller: 'MwlDraggableCtrl'
	    };

	  });


/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var angular = __webpack_require__(13);

	angular
	  .module('mwl.calendar')
	  .controller('MwlDroppableCtrl', ["$element", "$scope", "$parse", "$attrs", "interact", function($element, $scope, $parse, $attrs, interact) {

	    if (!interact) {
	      return;
	    }

	    interact($element[0]).dropzone({
	      ondragenter: function(event) {
	        angular.element(event.target).addClass('drop-active');
	      },
	      ondragleave: function(event) {
	        angular.element(event.target).removeClass('drop-active');
	      },
	      ondropdeactivate: function(event) {
	        angular.element(event.target).removeClass('drop-active');
	      },
	      ondrop: function(event) {
	        if (event.relatedTarget.dropData) {
	          $parse($attrs.onDrop)($scope, {dropData: event.relatedTarget.dropData});
	          $scope.$apply();
	        }
	      }
	    });

	    var unbindDestroy = $scope.$on('$destroy', function() {
	      unbindDestroy();
	      interact($element[0]).unset();
	    });

	  }])
	  .directive('mwlDroppable', function() {

	    return {
	      restrict: 'A',
	      controller: 'MwlDroppableCtrl'
	    };

	  });


/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var angular = __webpack_require__(13);

	angular
	  .module('mwl.calendar')
	  .controller('MwlElementDimensionsCtrl', ["$element", "$scope", "$parse", "$attrs", function($element, $scope, $parse, $attrs) {

	    $parse($attrs.mwlElementDimensions).assign($scope, {
	      width: $element[0].offsetWidth,
	      height: $element[0].offsetHeight
	    });

	  }])
	  .directive('mwlElementDimensions', function() {

	    return {
	      restrict: 'A',
	      controller: 'MwlElementDimensionsCtrl'
	    };

	  });


/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var angular = __webpack_require__(13);

	angular
	  .module('mwl.calendar')
	  .controller('MwlResizableCtrl', ["$element", "$scope", "$parse", "$attrs", "interact", function($element, $scope, $parse, $attrs, interact) {

	    if (!interact) {
	      return;
	    }

	    var snap, snapGridDimensions;
	    if ($attrs.snapGrid) {
	      snapGridDimensions = $parse($attrs.snapGrid)($scope);
	      snap = {
	        targets: [
	          interact.createSnapGrid(snapGridDimensions)
	        ]
	      };
	    }

	    var originalDimensions = {};
	    var originalDimensionsStyle = {};
	    var resizeEdge;

	    function canResize() {
	      return $parse($attrs.mwlResizable)($scope);
	    }

	    function getUnitsResized(edge, elm, gridDimensions) {
	      var unitsResized = {};
	      unitsResized.edge = edge;
	      if (edge === 'start') {
	        unitsResized.x = elm.data('x');
	        unitsResized.y = elm.data('y');
	      } else if (edge === 'end') {
	        unitsResized.x = parseFloat(elm.css('width').replace('px', '')) - originalDimensions.width;
	        unitsResized.y = parseFloat(elm.css('height').replace('px', '')) - originalDimensions.height;
	      }
	      if (gridDimensions && gridDimensions.x) {
	        unitsResized.x = Math.round(unitsResized.x / gridDimensions.x);
	      }
	      if (gridDimensions && gridDimensions.y) {
	        unitsResized.y = Math.round(unitsResized.y / gridDimensions.y);
	      }
	      return unitsResized;
	    }

	    interact($element[0]).resizable({
	      edges: $parse($attrs.resizeEdges)($scope),
	      snap: snap,
	      onstart: function(event) {

	        if (canResize()) {
	          resizeEdge = 'end';
	          var elm = angular.element(event.target);
	          originalDimensions.height = elm[0].offsetHeight;
	          originalDimensions.width = elm[0].offsetWidth;
	          originalDimensionsStyle.height = elm.css('height');
	          originalDimensionsStyle.width = elm.css('width');
	        }

	      },
	      onmove: function(event) {

	        if (canResize()) {
	          var elm = angular.element(event.target);
	          var x = parseFloat(elm.data('x') || 0);
	          var y = parseFloat(elm.data('y') || 0);

	          elm.css({
	            width: event.rect.width + 'px',
	            height: event.rect.height + 'px'
	          });

	          // translate when resizing from top or left edges
	          x += event.deltaRect.left;
	          y += event.deltaRect.top;

	          elm.css('transform', 'translate(' + x + 'px,' + y + 'px)');

	          elm.data('x', x);
	          elm.data('y', y);

	          if (event.deltaRect.left !== 0 || event.deltaRect.top !== 0) {
	            resizeEdge = 'start';
	          }

	          if ($attrs.onResize) {
	            $parse($attrs.onResize)($scope, getUnitsResized(resizeEdge, elm, snapGridDimensions));
	            $scope.$apply();
	          }

	        }

	      },
	      onend: function(event) {

	        if (canResize()) {

	          var elm = angular.element(event.target);
	          var unitsResized = getUnitsResized(resizeEdge, elm, snapGridDimensions);

	          elm
	            .data('x', null)
	            .data('y', null)
	            .css({
	              transform: null,
	              width: originalDimensionsStyle.width,
	              height: originalDimensionsStyle.height
	            });

	          if ($attrs.onResizeEnd) {
	            $parse($attrs.onResizeEnd)($scope, unitsResized);
	            $scope.$apply();
	          }
	        }

	      }
	    });

	    var unbindDestroy = $scope.$on('$destroy', function() {
	      unbindDestroy();
	      interact($element[0]).unset();
	    });

	  }])
	  .directive('mwlResizable', function() {

	    return {
	      restrict: 'A',
	      controller: 'MwlResizableCtrl'
	    };

	  });


/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	var map = {
		"./calendarDate.js": 36,
		"./calendarLimitTo.js": 37,
		"./calendarTruncateEventTitle.js": 38
	};
	function webpackContext(req) {
		return __webpack_require__(webpackContextResolve(req));
	};
	function webpackContextResolve(req) {
		return map[req] || (function() { throw new Error("Cannot find module '" + req + "'.") }());
	};
	webpackContext.keys = function webpackContextKeys() {
		return Object.keys(map);
	};
	webpackContext.resolve = webpackContextResolve;
	module.exports = webpackContext;
	webpackContext.id = 35;


/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var angular = __webpack_require__(13);

	angular
	  .module('mwl.calendar')
	  .filter('calendarDate', ["calendarHelper", "calendarConfig", function(calendarHelper, calendarConfig) {

	    function calendarDate(date, format, getFromConfig) {

	      if (getFromConfig === true) {
	        format = calendarConfig.dateFormats[format];
	      }

	      return calendarHelper.formatDate(date, format);

	    }

	    calendarDate.$stateful = true;

	    return calendarDate;

	  }]);


/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var angular = __webpack_require__(13);

	angular
	  .module('mwl.calendar')
	  .filter('calendarLimitTo', ["limitToFilter", function(limitToFilter) {

	    if (angular.version.minor >= 4) { //1.4+ supports the begin attribute
	      return limitToFilter;
	    }

	    //Copied from the angular source. Only 1.4 has the begin functionality.
	    return function(input, limit, begin) {
	      if (Math.abs(Number(limit)) === Infinity) {
	        limit = Number(limit);
	      } else {
	        limit = parseInt(limit);
	      }
	      if (isNaN(limit)) {
	        return input;
	      }

	      if (angular.isNumber(input)) {
	        input = input.toString();
	      }
	      if (!angular.isArray(input) && !angular.isString(input)) {
	        return input;
	      }

	      begin = (!begin || isNaN(begin)) ? 0 : parseInt(begin);
	      begin = (begin < 0 && begin >= -input.length) ? input.length + begin : begin;

	      if (limit >= 0) {
	        return input.slice(begin, begin + limit);
	      } else if (begin === 0) {
	        return input.slice(limit, input.length);
	      } else {
	        return input.slice(Math.max(0, begin + limit), begin);
	      }
	    };

	  }]);


/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var angular = __webpack_require__(13);

	angular
	  .module('mwl.calendar')
	  .filter('calendarTruncateEventTitle', function() {

	    return function(string, length, boxHeight) {
	      if (!string) {
	        return '';
	      }

	      //Only truncate if if actually needs truncating
	      if (string.length >= length && string.length / 20 > boxHeight / 30) {
	        return string.substr(0, length) + '...';
	      } else {
	        return string;
	      }
	    };

	  });


/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	var map = {
		"./calendarConfig.js": 40,
		"./calendarDebounce.js": 41,
		"./calendarHelper.js": 42,
		"./calendarTitle.js": 43,
		"./interact.js": 44,
		"./moment.js": 46
	};
	function webpackContext(req) {
		return __webpack_require__(webpackContextResolve(req));
	};
	function webpackContextResolve(req) {
		return map[req] || (function() { throw new Error("Cannot find module '" + req + "'.") }());
	};
	webpackContext.keys = function webpackContextKeys() {
		return Object.keys(map);
	};
	webpackContext.resolve = webpackContextResolve;
	module.exports = webpackContext;
	webpackContext.id = 39;


/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var angular = __webpack_require__(13);

	angular
	  .module('mwl.calendar')
	  .provider('calendarConfig', function() {

	    var defaultFormats = {
	      angular: {
	        date: {
	          hour: 'ha',
	          day: 'd MMM',
	          month: 'MMMM',
	          weekDay: 'EEEE',
	          time: 'HH:mm',
	          datetime: 'MMM d, h:mm a'
	        },
	        title: {
	          day: 'EEEE d MMMM, yyyy',
	          week: 'Week {week} of {year}',
	          month: 'MMMM yyyy',
	          year: 'yyyy'
	        }
	      },
	      moment: {
	        date: {
	          hour: 'ha',
	          day: 'D MMM',
	          month: 'MMMM',
	          weekDay: 'dddd',
	          time: 'HH:mm',
	          datetime: 'MMM D, h:mm a'
	        },
	        title: {
	          day: 'dddd D MMMM, YYYY',
	          week: 'Week {week} of {year}',
	          month: 'MMMM YYYY',
	          year: 'YYYY'
	        }
	      }
	    };

	    var dateFormatter = 'angular';
	    var defaultDateFormats = angular.copy(defaultFormats[dateFormatter].date);
	    var defaultTitleFormats = angular.copy(defaultFormats[dateFormatter].title);
	    var showTimesOnWeekView = false;

	    var i18nStrings = {
	      eventsLabel: 'Events',
	      timeLabel: 'Time'
	    };

	    var displayAllMonthEvents = false;

	    var configProvider = this;

	    configProvider.setDateFormats = function(formats) {
	      angular.extend(defaultDateFormats, formats);
	      return configProvider;
	    };

	    configProvider.setTitleFormats = function(formats) {
	      angular.extend(defaultTitleFormats, formats);
	      return configProvider;
	    };

	    configProvider.setI18nStrings = function(strings) {
	      angular.extend(i18nStrings, strings);
	      return configProvider;
	    };

	    configProvider.setDisplayAllMonthEvents = function(value) {
	      displayAllMonthEvents = value;
	      return configProvider;
	    };

	    configProvider.setDateFormatter = function(value) {
	      if (['angular', 'moment'].indexOf(value) === -1) {
	        throw new Error('Invalid date formatter. Allowed types are angular and moment.');
	      }
	      dateFormatter = value;
	      defaultDateFormats = angular.copy(defaultFormats[dateFormatter].date);
	      defaultTitleFormats = angular.copy(defaultFormats[dateFormatter].title);
	      return configProvider;
	    };

	    configProvider.showTimesOnWeekView = function(value) {
	      showTimesOnWeekView = value; //experimental, and ignores the event end date
	      return configProvider;
	    };

	    configProvider.$get = function() {
	      return {
	        dateFormats: defaultDateFormats,
	        titleFormats: defaultTitleFormats,
	        i18nStrings: i18nStrings,
	        displayAllMonthEvents: displayAllMonthEvents,
	        dateFormatter: dateFormatter,
	        showTimesOnWeekView: showTimesOnWeekView
	      };
	    };

	  });


/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var angular = __webpack_require__(13);

	angular
	  .module('mwl.calendar')
	  .service('calendarDebounce', ["$timeout", function($timeout) {

	    function debounce(func, wait, immediate) {
	      var timeout;
	      return function() {
	        var context = this, args = arguments;
	        function later() {
	          timeout = null;
	          if (!immediate) {
	            func.apply(context, args);
	          }
	        }
	        var callNow = immediate && !timeout;
	        $timeout.cancel(timeout);
	        timeout = $timeout(later, wait);
	        if (callNow) {
	          func.apply(context, args);
	        }
	      };
	    }

	    return debounce;

	  }]);


/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var angular = __webpack_require__(13);

	angular
	  .module('mwl.calendar')
	  .factory('calendarHelper', ["dateFilter", "moment", "calendarConfig", function(dateFilter, moment, calendarConfig) {

	    function formatDate(date, format) {
	      if (calendarConfig.dateFormatter === 'angular') {
	        return dateFilter(moment(date).toDate(), format);
	      } else if (calendarConfig.dateFormatter === 'moment') {
	        return moment(date).format(format);
	      }
	    }

	    function adjustEndDateFromStartDiff(oldStart, newStart, oldEnd) {
	      if (!oldEnd) {
	        return oldEnd;
	      }
	      var diffInSeconds = moment(newStart).diff(moment(oldStart));
	      return moment(oldEnd).add(diffInSeconds);
	    }

	    function eventIsInPeriod(event, periodStart, periodEnd) {

	      var eventStart = moment(event.startsAt);
	      var eventEnd = moment(event.endsAt || event.startsAt);
	      periodStart = moment(periodStart);
	      periodEnd = moment(periodEnd);

	      if (angular.isDefined(event.recursOn)) {

	        switch (event.recursOn) {
	          case 'year':
	            eventStart.set({
	              year: periodStart.year()
	            });
	            break;

	          case 'month':
	            eventStart.set({
	              year: periodStart.year(),
	              month: periodStart.month()
	            });
	            break;

	          default:
	            throw new Error('Invalid value (' + event.recursOn + ') given for recurs on. Can only be year, month or week.');
	        }

	        eventEnd = adjustEndDateFromStartDiff(event.startsAt, eventStart, eventEnd);

	      }

	      return (eventStart.isAfter(periodStart) && eventStart.isBefore(periodEnd)) ||
	        (eventEnd.isAfter(periodStart) && eventEnd.isBefore(periodEnd)) ||
	        (eventStart.isBefore(periodStart) && eventEnd.isAfter(periodEnd)) ||
	        eventStart.isSame(periodStart) ||
	        eventEnd.isSame(periodEnd);

	    }

	    function filterEventsInPeriod(events, startPeriod, endPeriod) {
	      return events.filter(function(event) {
	        return eventIsInPeriod(event, startPeriod, endPeriod);
	      });
	    }

	    function getEventsInPeriod(calendarDate, period, allEvents) {
	      var startPeriod = moment(calendarDate).startOf(period);
	      var endPeriod = moment(calendarDate).endOf(period);
	      return filterEventsInPeriod(allEvents, startPeriod, endPeriod);
	    }

	    function getBadgeTotal(events) {
	      return events.filter(function(event) {
	        return event.incrementsBadgeTotal !== false;
	      }).length;
	    }

	    function getWeekDayNames() {
	      var weekdays = [];
	      var count = 0;
	      while (count < 7) {
	        weekdays.push(formatDate(moment().weekday(count++), calendarConfig.dateFormats.weekDay));
	      }
	      return weekdays;
	    }

	    function getYearView(events, currentDay, cellModifier) {

	      var view = [];
	      var eventsInPeriod = getEventsInPeriod(currentDay, 'year', events);
	      var month = moment(currentDay).startOf('year');
	      var count = 0;
	      while (count < 12) {
	        var startPeriod = month.clone();
	        var endPeriod = startPeriod.clone().endOf('month');
	        var periodEvents = filterEventsInPeriod(eventsInPeriod, startPeriod, endPeriod);
	        var cell = {
	          label: formatDate(startPeriod, calendarConfig.dateFormats.month),
	          isToday: startPeriod.isSame(moment().startOf('month')),
	          events: periodEvents,
	          date: startPeriod,
	          badgeTotal: getBadgeTotal(periodEvents)
	        };

	        cellModifier({calendarCell: cell});
	        view.push(cell);
	        month.add(1, 'month');
	        count++;
	      }

	      return view;

	    }

	    function getMonthView(events, currentDay, cellModifier) {

	      var startOfMonth = moment(currentDay).startOf('month');
	      var day = startOfMonth.clone().startOf('week');
	      var endOfMonthView = moment(currentDay).endOf('month').endOf('week');
	      var eventsInPeriod;
	      if (calendarConfig.displayAllMonthEvents) {
	        eventsInPeriod = filterEventsInPeriod(events, day, endOfMonthView);
	      } else {
	        eventsInPeriod = filterEventsInPeriod(events, startOfMonth, startOfMonth.clone().endOf('month'));
	      }
	      var view = [];
	      var today = moment().startOf('day');

	      while (day.isBefore(endOfMonthView)) {

	        var inMonth = day.month() === moment(currentDay).month();
	        var monthEvents = [];
	        if (inMonth || calendarConfig.displayAllMonthEvents) {
	          monthEvents = filterEventsInPeriod(eventsInPeriod, day, day.clone().endOf('day'));
	        }

	        var cell = {
	          label: day.date(),
	          date: day.clone(),
	          inMonth: inMonth,
	          isPast: today.isAfter(day),
	          isToday: today.isSame(day),
	          isFuture: today.isBefore(day),
	          isWeekend: [0, 6].indexOf(day.day()) > -1,
	          events: monthEvents,
	          badgeTotal: getBadgeTotal(monthEvents)
	        };

	        cellModifier({calendarCell: cell});

	        view.push(cell);

	        day.add(1, 'day');
	      }

	      return view;

	    }

	    function getWeekView(events, currentDay) {

	      var startOfWeek = moment(currentDay).startOf('week');
	      var endOfWeek = moment(currentDay).endOf('week');
	      var dayCounter = startOfWeek.clone();
	      var days = [];
	      var today = moment().startOf('day');
	      while (days.length < 7) {
	        days.push({
	          weekDayLabel: formatDate(dayCounter, calendarConfig.dateFormats.weekDay),
	          date: dayCounter.clone(),
	          dayLabel: formatDate(dayCounter, calendarConfig.dateFormats.day),
	          isPast: dayCounter.isBefore(today),
	          isToday: dayCounter.isSame(today),
	          isFuture: dayCounter.isAfter(today),
	          isWeekend: [0, 6].indexOf(dayCounter.day()) > -1
	        });
	        dayCounter.add(1, 'day');
	      }

	      var eventsSorted = filterEventsInPeriod(events, startOfWeek, endOfWeek).map(function(event) {

	        var eventStart = moment(event.startsAt).startOf('day');
	        var eventEnd = moment(event.endsAt || event.startsAt).startOf('day');
	        var weekViewStart = moment(startOfWeek).startOf('day');
	        var weekViewEnd = moment(endOfWeek).startOf('day');
	        var offset, span;

	        if (eventStart.isBefore(weekViewStart) || eventStart.isSame(weekViewStart)) {
	          offset = 0;
	        } else {
	          offset = eventStart.diff(weekViewStart, 'days');
	        }

	        if (eventEnd.isAfter(weekViewEnd)) {
	          eventEnd = weekViewEnd;
	        }

	        if (eventStart.isBefore(weekViewStart)) {
	          eventStart = weekViewStart;
	        }

	        span = moment(eventEnd).diff(eventStart, 'days') + 1;

	        event.daySpan = span;
	        event.dayOffset = offset;

	        return event;
	      });

	      return {days: days, events: eventsSorted};

	    }

	    function getDayView(events, currentDay, dayViewStart, dayViewEnd, dayViewSplit) {

	      var dayStartHour = moment(dayViewStart || '00:00', 'HH:mm').hours();
	      var dayEndHour = moment(dayViewEnd || '23:00', 'HH:mm').hours();
	      var hourHeight = (60 / dayViewSplit) * 30;
	      var calendarStart = moment(currentDay).startOf('day').add(dayStartHour, 'hours');
	      var calendarEnd = moment(currentDay).startOf('day').add(dayEndHour, 'hours');
	      var calendarHeight = (dayEndHour - dayStartHour + 1) * hourHeight;
	      var hourHeightMultiplier = hourHeight / 60;
	      var buckets = [];
	      var eventsInPeriod = filterEventsInPeriod(
	        events,
	        moment(currentDay).startOf('day').toDate(),
	        moment(currentDay).endOf('day').toDate()
	      );

	      return eventsInPeriod.map(function(event) {
	        if (moment(event.startsAt).isBefore(calendarStart)) {
	          event.top = 0;
	        } else {
	          event.top = (moment(event.startsAt).startOf('minute').diff(calendarStart.startOf('minute'), 'minutes') * hourHeightMultiplier) - 2;
	        }

	        if (moment(event.endsAt || event.startsAt).isAfter(calendarEnd)) {
	          event.height = calendarHeight - event.top;
	        } else {
	          var diffStart = event.startsAt;
	          if (moment(event.startsAt).isBefore(calendarStart)) {
	            diffStart = calendarStart.toDate();
	          }
	          if (!event.endsAt) {
	            event.height = 30;
	          } else {
	            event.height = moment(event.endsAt || event.startsAt).diff(diffStart, 'minutes') * hourHeightMultiplier;
	          }
	        }

	        if (event.top - event.height > calendarHeight) {
	          event.height = 0;
	        }

	        event.left = 0;

	        return event;
	      }).filter(function(event) {
	        return event.height > 0;
	      }).map(function(event) {

	        var cannotFitInABucket = true;
	        buckets.forEach(function(bucket, bucketIndex) {
	          var canFitInThisBucket = true;

	          bucket.forEach(function(bucketItem) {
	            if (eventIsInPeriod(event, bucketItem.startsAt, bucketItem.endsAt || bucketItem.startsAt) ||
	              eventIsInPeriod(bucketItem, event.startsAt, event.endsAt || event.startsAt)) {
	              canFitInThisBucket = false;
	            }
	          });

	          if (canFitInThisBucket && cannotFitInABucket) {
	            cannotFitInABucket = false;
	            event.left = bucketIndex * 150;
	            buckets[bucketIndex].push(event);
	          }

	        });

	        if (cannotFitInABucket) {
	          event.left = buckets.length * 150;
	          buckets.push([event]);
	        }

	        return event;

	      });

	    }

	    function getWeekViewWithTimes(events, currentDay, dayViewStart, dayViewEnd, dayViewSplit) {
	      var weekView = getWeekView(events, currentDay);
	      var newEvents = [];
	      weekView.days.forEach(function(day) {
	        var dayEvents = weekView.events.filter(function(event) {
	          return moment(event.startsAt).startOf('day').isSame(moment(day.date).startOf('day'));
	        });
	        var newDayEvents = getDayView(
	          dayEvents,
	          day.date,
	          dayViewStart,
	          dayViewEnd,
	          dayViewSplit
	        );
	        newEvents = newEvents.concat(newDayEvents);
	      });
	      weekView.events = newEvents;
	      return weekView;
	    }

	    function getDayViewHeight(dayViewStart, dayViewEnd, dayViewSplit) {
	      var dayViewStartM = moment(dayViewStart || '00:00', 'HH:mm');
	      var dayViewEndM = moment(dayViewEnd || '23:00', 'HH:mm');
	      var hourHeight = (60 / dayViewSplit) * 30;
	      return ((dayViewEndM.diff(dayViewStartM, 'hours') + 1) * hourHeight) + 2;
	    }

	    return {
	      getWeekDayNames: getWeekDayNames,
	      getYearView: getYearView,
	      getMonthView: getMonthView,
	      getWeekView: getWeekView,
	      getDayView: getDayView,
	      getWeekViewWithTimes: getWeekViewWithTimes,
	      getDayViewHeight: getDayViewHeight,
	      adjustEndDateFromStartDiff: adjustEndDateFromStartDiff,
	      formatDate: formatDate,
	      eventIsInPeriod: eventIsInPeriod //expose for testing only
	    };

	  }]);


/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var angular = __webpack_require__(13);

	angular
	  .module('mwl.calendar')
	  .factory('calendarTitle', ["moment", "calendarConfig", "calendarHelper", function(moment, calendarConfig, calendarHelper) {

	    function day(currentDay) {
	      return calendarHelper.formatDate(currentDay, calendarConfig.titleFormats.day);
	    }

	    function week(currentDay) {
	      var weekTitleLabel = calendarConfig.titleFormats.week;
	      return weekTitleLabel.replace('{week}', moment(currentDay).week()).replace('{year}', moment(currentDay).format('YYYY'));
	    }

	    function month(currentDay) {
	      return calendarHelper.formatDate(currentDay, calendarConfig.titleFormats.month);
	    }

	    function year(currentDay) {
	      return calendarHelper.formatDate(currentDay, calendarConfig.titleFormats.year);
	    }

	    return {
	      day: day,
	      week: week,
	      month: month,
	      year: year
	    };

	  }]);


/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var angular = __webpack_require__(13);
	var interact;
	try {
	  interact = __webpack_require__(45);
	} catch (e) {
	  interact = null;
	}

	angular
	  .module('mwl.calendar')
	  .constant('interact', interact);


/***/ },
/* 45 */
/***/ function(module, exports) {

	if(typeof __WEBPACK_EXTERNAL_MODULE_45__ === 'undefined') {var e = new Error("Cannot find module \"undefined\""); e.code = 'MODULE_NOT_FOUND'; throw e;}
	module.exports = __WEBPACK_EXTERNAL_MODULE_45__;

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var angular = __webpack_require__(13);
	var moment = __webpack_require__(47);

	angular
	  .module('mwl.calendar')
	  .constant('moment', moment);


/***/ },
/* 47 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_47__;

/***/ }
/******/ ])
});
;