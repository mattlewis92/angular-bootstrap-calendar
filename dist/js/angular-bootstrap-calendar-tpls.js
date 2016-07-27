/**
 * angular-bootstrap-calendar - A pure AngularJS bootstrap themed responsive calendar that can display events and has views for year, month, week and day
 * @version v0.22.0
 * @link https://github.com/mattlewis92/angular-bootstrap-calendar
 * @license MIT
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("angular"), require("moment"), (function webpackLoadOptionalExternalModule() { try { return require("interact.js"); } catch(e) {} }()));
	else if(typeof define === 'function' && define.amd)
		define(["angular", "moment", "interact"], factory);
	else if(typeof exports === 'object')
		exports["angularBootstrapCalendarModuleName"] = factory(require("angular"), require("moment"), (function webpackLoadOptionalExternalModule() { try { return require("interact.js"); } catch(e) {} }()));
	else
		root["angularBootstrapCalendarModuleName"] = factory(root["angular"], root["moment"], root["interact"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_12__, __WEBPACK_EXTERNAL_MODULE_28__, __WEBPACK_EXTERNAL_MODULE_52__) {
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

	var angular = __webpack_require__(12);

	function requireAll(r) {
	  r.keys().forEach(r);
	}

	var templates = {};

	if (true) {

	  var templatesContext = __webpack_require__(13);

	  templatesContext.keys().forEach(function(templateName) {
	    var templateNameWithoutPrefix = templateName.replace('./', '');
	    var cacheTemplateName = 'mwl/' + templateNameWithoutPrefix;
	    var configTemplateName = templateNameWithoutPrefix.replace('.html', '');
	    templates[configTemplateName] = {
	      cacheTemplateName: cacheTemplateName,
	      template: templatesContext(templateName)
	    };
	  });

	}

	module.exports = angular
	  .module('mwl.calendar', [])
	  .config(["calendarConfig", function(calendarConfig) {
	    angular.forEach(templates, function(template, templateName) {
	      if (!calendarConfig.templates[templateName]) {
	        calendarConfig.templates[templateName] = template.cacheTemplateName;
	      }
	    });
	  }])
	  .run(["$templateCache", "$interpolate", function($templateCache, $interpolate) {

	    angular.forEach(templates, function(template) {
	      if (!$templateCache.get(template.cacheTemplateName)) {
	        var templateContents = template.template
	          .replace('{{', $interpolate.startSymbol())
	          .replace('}}', $interpolate.endSymbol());
	        $templateCache.put(template.cacheTemplateName, templateContents);
	      }
	    });

	  }]).name;

	requireAll(__webpack_require__(23));
	requireAll(__webpack_require__(41));
	requireAll(__webpack_require__(46));


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
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_12__;

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var map = {
		"./calendar.html": 14,
		"./calendarDayView.html": 15,
		"./calendarHourList.html": 16,
		"./calendarMonthCell.html": 17,
		"./calendarMonthCellEvents.html": 18,
		"./calendarMonthView.html": 19,
		"./calendarSlideBox.html": 20,
		"./calendarWeekView.html": 21,
		"./calendarYearView.html": 22
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
	webpackContext.id = 13;


/***/ },
/* 14 */
/***/ function(module, exports) {

	module.exports = "<div\n  class=\"cal-context\"\n  ng-switch=\"vm.view\"\n  ng-if=\"vm.templatesLoaded\">\n\n  <div class=\"alert alert-danger\" ng-switch-default>The value passed to the view attribute of the calendar is not set</div>\n\n  <div class=\"alert alert-danger\" ng-hide=\"vm.viewDate\">The value passed to view-date attribute of the calendar is not set</div>\n\n  <mwl-calendar-year\n    events=\"vm.events\"\n    view-date=\"vm.viewDate\"\n    on-event-click=\"vm.onEventClick\"\n    on-event-times-changed=\"vm.onEventTimesChanged\"\n    on-edit-event-click=\"vm.onEditEventClick\"\n    on-delete-event-click=\"vm.onDeleteEventClick\"\n    on-timespan-click=\"vm.onTimespanClick\"\n    edit-event-html=\"vm.editEventHtml\"\n    delete-event-html=\"vm.deleteEventHtml\"\n    cell-is-open=\"vm.cellIsOpen\"\n    cell-modifier=\"vm.cellModifier\"\n    slide-box-disabled=\"vm.slideBoxDisabled\"\n    custom-template-urls=\"vm.customTemplateUrls\"\n    ng-switch-when=\"year\">\n  </mwl-calendar-year>\n\n  <mwl-calendar-month\n    events=\"vm.events\"\n    view-date=\"vm.viewDate\"\n    on-event-click=\"vm.onEventClick\"\n    on-event-times-changed=\"vm.onEventTimesChanged\"\n    on-edit-event-click=\"vm.onEditEventClick\"\n    on-delete-event-click=\"vm.onDeleteEventClick\"\n    on-timespan-click=\"vm.onTimespanClick\"\n    on-date-range-select=\"vm.onDateRangeSelect\"\n    edit-event-html=\"vm.editEventHtml\"\n    delete-event-html=\"vm.deleteEventHtml\"\n    cell-is-open=\"vm.cellIsOpen\"\n    cell-modifier=\"vm.cellModifier\"\n    slide-box-disabled=\"vm.slideBoxDisabled\"\n    custom-template-urls=\"vm.customTemplateUrls\"\n    ng-switch-when=\"month\">\n  </mwl-calendar-month>\n\n  <mwl-calendar-week\n    events=\"vm.events\"\n    view-date=\"vm.viewDate\"\n    on-event-click=\"vm.onEventClick\"\n    on-event-times-changed=\"vm.onEventTimesChanged\"\n    day-view-start=\"vm.dayViewStart\"\n    day-view-end=\"vm.dayViewEnd\"\n    day-view-split=\"vm.dayViewSplit\"\n    day-view-event-chunk-size=\"vm.dayViewEventChunkSize\"\n    on-timespan-click=\"vm.onTimespanClick\"\n    on-date-range-select=\"vm.onDateRangeSelect\"\n    custom-template-urls=\"vm.customTemplateUrls\"\n    ng-switch-when=\"week\">\n  </mwl-calendar-week>\n\n  <mwl-calendar-day\n    events=\"vm.events\"\n    view-date=\"vm.viewDate\"\n    on-event-click=\"vm.onEventClick\"\n    on-event-times-changed=\"vm.onEventTimesChanged\"\n    on-timespan-click=\"vm.onTimespanClick\"\n    on-date-range-select=\"vm.onDateRangeSelect\"\n    day-view-start=\"vm.dayViewStart\"\n    day-view-end=\"vm.dayViewEnd\"\n    day-view-split=\"vm.dayViewSplit\"\n    day-view-event-chunk-size=\"vm.dayViewEventChunkSize\"\n    on-edit-event-click=\"vm.onEditEventClick\"\n    on-delete-event-click=\"vm.onDeleteEventClick\"\n    edit-event-html=\"vm.editEventHtml\"\n    delete-event-html=\"vm.deleteEventHtml\"\n    custom-template-urls=\"vm.customTemplateUrls\"\n    ng-switch-when=\"day\">\n  </mwl-calendar-day>\n</div>\n";

/***/ },
/* 15 */
/***/ function(module, exports) {

	module.exports = "<div class=\"cal-week-box cal-all-day-events-box\" ng-if=\"vm.allDayEvents.length > 0\">\n  <div class=\"cal-day-panel clearfix\">\n    <div class=\"row\">\n      <div class=\"col-xs-12\">\n        <div class=\"cal-row-fluid\">\n          <div\n            class=\"cal-cell-6 day-highlight dh-event-{{ event.type }}\"\n            ng-style=\"{backgroundColor: event.color.secondary}\"\n            data-event-class\n            ng-repeat=\"event in vm.allDayEvents track by event.$id\">\n            <strong>\n              <span ng-bind=\"event.startsAt | calendarDate:'datetime':true\"></span>\n              <span ng-if=\"event.endsAt\">\n                - <span ng-bind=\"event.endsAt | calendarDate:'datetime':true\"></span>\n              </span>\n            </strong>\n            <a\n              href=\"javascript:;\"\n              class=\"event-item\"\n              ng-bind-html=\"vm.calendarEventTitle.dayView(event) | calendarTrustAsHtml\">\n            </a>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n\n<div class=\"cal-day-box\">\n  <div class=\"cal-day-panel clearfix\" ng-style=\"{height: vm.dayViewHeight + 'px', minWidth: vm.viewWidth + 'px'}\">\n\n    <mwl-calendar-hour-list\n      day-view-start=\"vm.dayViewStart\"\n      day-view-end=\"vm.dayViewEnd\"\n      day-view-split=\"vm.dayViewSplit\"\n      on-timespan-click=\"vm.onTimespanClick\"\n      on-date-range-select=\"vm.onDateRangeSelect\"\n      on-event-times-changed=\"vm.onEventTimesChanged\"\n      view-date=\"vm.viewDate\"\n      custom-template-urls=\"vm.customTemplateUrls\">\n    </mwl-calendar-hour-list>\n\n    <div\n      class=\"pull-left day-event day-highlight\"\n      ng-repeat=\"dayEvent in vm.nonAllDayEvents track by dayEvent.event.$id\"\n      ng-class=\"'dh-event-' + dayEvent.event.type + ' ' + dayEvent.event.cssClass\"\n      ng-style=\"{\n        top: dayEvent.top - 1 + 'px',\n        left: dayEvent.left + 60 + 'px',\n        height: dayEvent.height + 'px',\n        backgroundColor: dayEvent.event.color.secondary,\n        borderColor: dayEvent.event.color.primary\n      }\"\n      mwl-draggable=\"dayEvent.event.draggable === true\"\n      axis=\"'xy'\"\n      snap-grid=\"{y: vm.dayViewEventChunkSize || 30, x: 50}\"\n      on-drag=\"vm.eventDragged(dayEvent.event, y / 30)\"\n      on-drag-end=\"vm.eventDragComplete(dayEvent.event, y / 30)\"\n      mwl-resizable=\"dayEvent.event.resizable === true && dayEvent.event.endsAt\"\n      resize-edges=\"{top: true, bottom: true}\"\n      on-resize=\"vm.eventResized(dayEvent.event, edge, y / 30)\"\n      on-resize-end=\"vm.eventResizeComplete(dayEvent.event, edge, y / 30)\">\n\n      <span class=\"cal-hours\">\n        <span ng-show=\"dayEvent.top == 0\"><span ng-bind=\"(dayEvent.event.tempStartsAt || dayEvent.event.startsAt) | calendarDate:'day':true\"></span>, </span>\n        <span ng-bind=\"(dayEvent.event.tempStartsAt || dayEvent.event.startsAt) | calendarDate:'time':true\"></span>\n      </span>\n      <a href=\"javascript:;\" class=\"event-item\" ng-click=\"vm.onEventClick({calendarEvent: dayEvent.event})\">\n        <span ng-bind-html=\"vm.calendarEventTitle.dayView(dayEvent.event) | calendarTrustAsHtml\"></span>\n      </a>\n\n      <a\n        href=\"javascript:;\"\n        class=\"event-item-edit\"\n        ng-if=\"vm.editEventHtml && dayEvent.event.editable !== false\"\n        ng-bind-html=\"vm.editEventHtml | calendarTrustAsHtml\"\n        ng-click=\"vm.onEditEventClick({calendarEvent: dayEvent.event})\">\n      </a>\n\n      <a\n        href=\"javascript:;\"\n        class=\"event-item-delete\"\n        ng-if=\"vm.deleteEventHtml && dayEvent.event.deletable !== false\"\n        ng-bind-html=\"vm.deleteEventHtml | calendarTrustAsHtml\"\n        ng-click=\"vm.onDeleteEventClick({calendarEvent: dayEvent.event})\">\n      </a>\n\n      <a\n        href=\"javascript:;\"\n        class=\"event-item-action\"\n        ng-repeat=\"action in dayEvent.event.actions track by $index\"\n        ng-class=\"action.cssClass\"\n        ng-bind-html=\"action.label | calendarTrustAsHtml\"\n        ng-click=\"action.onClick({calendarEvent: dayEvent.event})\">\n      </a>\n\n    </div>\n\n  </div>\n\n</div>\n";

/***/ },
/* 16 */
/***/ function(module, exports) {

	module.exports = "<div class=\"cal-day-panel-hour\">\n\n  <div class=\"cal-day-hour\" ng-repeat=\"hour in vm.hourGrid track by $index\">\n\n    <div\n      class=\"cal-day-hour-part\"\n      ng-repeat=\"segment in hour.segments track by $index\"\n      ng-class=\"{ 'cal-day-hour-part-selected': vm.dateRangeSelect &&\n                vm.dateRangeSelect.startDate <= vm.getClickedDate(segment.date, vm.dayViewSplit * $index) &&\n                vm.getClickedDate(segment.date, vm.dayViewSplit * $index) < vm.dateRangeSelect.endDate }\"\n      ng-click=\"vm.onTimespanClick({calendarDate: vm.getClickedDate(segment.date, vm.dayViewSplit * $index)})\"\n      mwl-droppable\n      on-drop=\"vm.eventDropped(dropData.event, vm.getClickedDate(segment.date, vm.dayViewSplit * $index))\"\n      mwl-drag-select=\"!!vm.onDateRangeSelect\"\n      on-drag-select-start=\"vm.onDragSelectStart(vm.getClickedDate(segment.date, vm.dayViewSplit * $index))\"\n      on-drag-select-move=\"vm.onDragSelectMove(vm.getClickedDate(segment.date, vm.dayViewSplit * ($index + 1)))\"\n      on-drag-select-end=\"vm.onDragSelectEnd(vm.getClickedDate(segment.date, vm.dayViewSplit * ($index + 1)))\"\n      ng-if=\"!vm.dayWidth\">\n      <div class=\"cal-day-hour-part-time\">\n        <strong ng-bind=\"segment.date | calendarDate:'hour':true\" ng-if=\"segment.isStart\"></strong>\n      </div>\n    </div>\n\n    <div\n      class=\"cal-day-hour-part\"\n      ng-repeat=\"segment in hour.segments track by $index\"\n      ng-if=\"vm.dayWidth\">\n      <div class=\"cal-day-hour-part-time\">\n        <strong ng-bind=\"segment.date | calendarDate:'hour':true\" ng-if=\"segment.isStart\"></strong>\n        &nbsp;\n      </div>\n      <div\n        class=\"cal-day-hour-part-spacer\"\n        ng-repeat=\"dayIndex in [0, 1, 2, 3, 4, 5, 6]\"\n        ng-style=\"{width: vm.dayWidth + 'px'}\"\n        ng-class=\"{ 'cal-day-hour-part-selected': vm.dateRangeSelect &&\n                vm.dateRangeSelect.startDate <= vm.getClickedDate(segment.date, vm.dayViewSplit * $parent.$index, dayIndex) &&\n                vm.getClickedDate(segment.date, vm.dayViewSplit * $parent.$index, dayIndex) < vm.dateRangeSelect.endDate }\"\n        ng-click=\"vm.onTimespanClick({calendarDate: vm.getClickedDate(segment.date, vm.dayViewSplit * $parent.$index, dayIndex)})\"\n        mwl-droppable\n        on-drop=\"vm.eventDropped(dropData.event, vm.getClickedDate(segment.date, vm.dayViewSplit * $parent.$index, dayIndex))\"\n        mwl-drag-select=\"!!vm.onDateRangeSelect\"\n        on-drag-select-start=\"vm.onDragSelectStart(vm.getClickedDate(segment.date, vm.dayViewSplit * $parent.$index, dayIndex), dayIndex)\"\n        on-drag-select-move=\"vm.onDragSelectMove(vm.getClickedDate(segment.date, vm.dayViewSplit * ($parent.$index + 1), vm.dateRangeSelect.dayIndex))\"\n        on-drag-select-end=\"vm.onDragSelectEnd(vm.getClickedDate(segment.date, vm.dayViewSplit * ($parent.$index + 1), vm.dateRangeSelect.dayIndex))\">\n      </div>\n    </div>\n\n  </div>\n\n</div>\n";

/***/ },
/* 17 */
/***/ function(module, exports) {

	module.exports = "<div\n  mwl-droppable\n  on-drop=\"vm.handleEventDrop(dropData.event, day.date, dropData.draggedFromDate)\"\n  mwl-drag-select=\"!!vm.onDateRangeSelect\"\n  on-drag-select-start=\"vm.onDragSelectStart(day)\"\n  on-drag-select-move=\"vm.onDragSelectMove(day)\"\n  on-drag-select-end=\"vm.onDragSelectEnd(day)\"\n  class=\"cal-month-day {{ day.cssClass }}\"\n  ng-class=\"{\n    'cal-day-outmonth': !day.inMonth,\n    'cal-day-inmonth': day.inMonth,\n    'cal-day-weekend': day.isWeekend,\n    'cal-day-past': day.isPast,\n    'cal-day-today': day.isToday,\n    'cal-day-future': day.isFuture,\n    'cal-day-selected': vm.dateRangeSelect && vm.dateRangeSelect.startDate <= day.date && day.date <= vm.dateRangeSelect.endDate\n  }\">\n\n  <small\n    class=\"cal-events-num badge badge-important pull-left\"\n    ng-show=\"day.badgeTotal > 0\"\n    ng-bind=\"day.badgeTotal\">\n  </small>\n\n  <span\n    class=\"pull-right\"\n    data-cal-date\n    ng-click=\"vm.calendarCtrl.dateClicked(day.date)\"\n    ng-bind=\"day.label\">\n  </span>\n\n  <div class=\"cal-day-tick\" ng-show=\"dayIndex === vm.openDayIndex && vm.view[vm.openDayIndex].events.length > 0 && !vm.slideBoxDisabled\">\n    <i class=\"glyphicon glyphicon-chevron-up\"></i>\n    <i class=\"fa fa-chevron-up\"></i>\n  </div>\n\n  <ng-include src=\"vm.customTemplateUrls.calendarMonthCellEvents || vm.calendarConfig.templates.calendarMonthCellEvents\"></ng-include>\n\n  <div id=\"cal-week-box\" ng-if=\"$first && rowHovered\">\n    <span ng-bind=\"vm.getWeekNumberLabel(day)\"></span>\n  </div>\n\n</div>\n";

/***/ },
/* 18 */
/***/ function(module, exports) {

	module.exports = "<div class=\"events-list\" ng-show=\"day.events.length > 0\">\n  <a\n    ng-repeat=\"event in day.events | orderBy:'startsAt' track by event.$id\"\n    href=\"javascript:;\"\n    ng-click=\"$event.stopPropagation(); vm.onEventClick({calendarEvent: event})\"\n    class=\"pull-left event\"\n    ng-class=\"'event-' + event.type + ' ' + event.cssClass\"\n    ng-style=\"{backgroundColor: event.color.primary}\"\n    ng-mouseenter=\"vm.highlightEvent(event, true)\"\n    ng-mouseleave=\"vm.highlightEvent(event, false)\"\n    tooltip-append-to-body=\"true\"\n    uib-tooltip-html=\"vm.calendarEventTitle.monthViewTooltip(event) | calendarTrustAsHtml\"\n    mwl-draggable=\"event.draggable === true\"\n    drop-data=\"{event: event, draggedFromDate: day.date.toDate()}\">\n  </a>\n</div>\n";

/***/ },
/* 19 */
/***/ function(module, exports) {

	module.exports = "<div class=\"cal-row-fluid cal-row-head\">\n\n  <div class=\"cal-cell1\" ng-repeat=\"day in vm.weekDays track by $index\" ng-bind=\"day\"></div>\n\n</div>\n<div class=\"cal-month-box\">\n\n  <div\n    ng-repeat=\"rowOffset in vm.monthOffsets track by rowOffset\"\n    ng-mouseenter=\"rowHovered = true\"\n    ng-mouseleave=\"rowHovered = false\">\n    <div class=\"cal-row-fluid cal-before-eventlist\">\n      <div\n        ng-repeat=\"day in vm.view | calendarLimitTo:7:rowOffset track by $index\"\n        ng-init=\"dayIndex = vm.view.indexOf(day)\"\n        class=\"cal-cell1 cal-cell {{ day.highlightClass }}\"\n        ng-style=\"{backgroundColor: day.backgroundColor}\"\n        ng-click=\"vm.dayClicked(day, false, $event)\"\n        ng-class=\"{pointer: day.events.length > 0}\">\n        <ng-include src=\"vm.customTemplateUrls.calendarMonthCell || vm.calendarConfig.templates.calendarMonthCell\"></ng-include>\n      </div>\n    </div>\n\n    <mwl-calendar-slide-box\n      is-open=\"vm.openRowIndex === $index && vm.view[vm.openDayIndex].events.length > 0 && !vm.slideBoxDisabled\"\n      events=\"vm.view[vm.openDayIndex].events\"\n      on-event-click=\"vm.onEventClick\"\n      edit-event-html=\"vm.editEventHtml\"\n      on-edit-event-click=\"vm.onEditEventClick\"\n      delete-event-html=\"vm.deleteEventHtml\"\n      on-delete-event-click=\"vm.onDeleteEventClick\"\n      cell=\"vm.view[vm.openDayIndex]\"\n      custom-template-urls=\"vm.customTemplateUrls\">\n    </mwl-calendar-slide-box>\n\n  </div>\n\n</div>\n";

/***/ },
/* 20 */
/***/ function(module, exports) {

	module.exports = "<div class=\"cal-slide-box\" uib-collapse=\"vm.isCollapsed\" mwl-collapse-fallback=\"vm.isCollapsed\">\n  <div class=\"cal-slide-content cal-event-list\">\n    <ul class=\"unstyled list-unstyled\">\n\n      <li\n        ng-repeat=\"event in vm.events | orderBy:'startsAt' track by event.$id\"\n        ng-class=\"event.cssClass\"\n        mwl-draggable=\"event.draggable === true\"\n        drop-data=\"{event: event}\">\n        <span class=\"pull-left event\" ng-class=\"'event-' + event.type\" ng-style=\"{backgroundColor: event.color.primary}\"></span>\n        &nbsp;\n        <a\n          href=\"javascript:;\"\n          class=\"event-item\"\n          ng-click=\"vm.onEventClick({calendarEvent: event})\">\n          <span ng-bind-html=\"isMonthView ? vm.calendarEventTitle.monthView(event) : vm.calendarEventTitle.yearView(event) | calendarTrustAsHtml\"></span>\n        </a>\n\n        <a\n          href=\"javascript:;\"\n          class=\"event-item-edit\"\n          ng-if=\"vm.editEventHtml && event.editable !== false\"\n          ng-bind-html=\"vm.editEventHtml | calendarTrustAsHtml\"\n          ng-click=\"vm.onEditEventClick({calendarEvent: event})\">\n        </a>\n\n        <a\n          href=\"javascript:;\"\n          class=\"event-item-delete\"\n          ng-if=\"vm.deleteEventHtml && event.deletable !== false\"\n          ng-bind-html=\"vm.deleteEventHtml | calendarTrustAsHtml\"\n          ng-click=\"vm.onDeleteEventClick({calendarEvent: event})\">\n        </a>\n\n        <a\n          href=\"javascript:;\"\n          class=\"event-item-action\"\n          ng-class=\"action.cssClass\"\n          ng-repeat=\"action in event.actions track by $index\"\n          ng-bind-html=\"action.label | calendarTrustAsHtml\"\n          ng-click=\"action.onClick({calendarEvent: event})\">\n        </a>\n\n      </li>\n\n    </ul>\n  </div>\n</div>\n";

/***/ },
/* 21 */
/***/ function(module, exports) {

	module.exports = "<div class=\"cal-week-box\" ng-class=\"{'cal-day-box': vm.showTimes}\">\n  <div class=\"cal-row-fluid cal-row-head\">\n\n    <div\n      class=\"cal-cell1\"\n      ng-repeat=\"day in vm.view.days track by $index\"\n      ng-class=\"{\n        'cal-day-weekend': day.isWeekend,\n        'cal-day-past': day.isPast,\n        'cal-day-today': day.isToday,\n        'cal-day-future': day.isFuture}\"\n      mwl-element-dimensions=\"vm.dayColumnDimensions\"\n      mwl-droppable\n      on-drop=\"vm.eventDropped(dropData.event, day.date)\">\n\n      <span ng-bind=\"day.weekDayLabel\"></span>\n      <br>\n      <small>\n        <span\n          data-cal-date\n          ng-click=\"vm.calendarCtrl.dateClicked(day.date)\"\n          class=\"pointer\"\n          ng-bind=\"day.dayLabel\">\n        </span>\n      </small>\n\n    </div>\n\n  </div>\n\n  <div class=\"cal-day-panel clearfix\" ng-style=\"{height: vm.showTimes ? (vm.dayViewHeight + 'px') : 'auto'}\">\n\n    <mwl-calendar-hour-list\n      day-view-start=\"vm.dayViewStart\"\n      day-view-end=\"vm.dayViewEnd\"\n      day-view-split=\"vm.dayViewSplit\"\n      day-width=\"vm.dayColumnDimensions.width\"\n      view-date=\"vm.viewDate\"\n      on-timespan-click=\"vm.onTimespanClick\"\n      on-date-range-select=\"vm.onDateRangeSelect\"\n      custom-template-urls=\"vm.customTemplateUrls\"\n      ng-if=\"vm.showTimes\">\n    </mwl-calendar-hour-list>\n\n    <div class=\"row\" ng-repeat=\"row in vm.view.eventRows track by $index\">\n      <div class=\"col-xs-12\">\n        <div class=\"cal-row-fluid\">\n          <div\n            ng-repeat=\"eventRow in row.row track by eventRow.event.$id\"\n            ng-class=\"'cal-cell' + (vm.showTimes ? 1 : eventRow.span) + (vm.showTimes ? '' : ' cal-offset' + eventRow.offset)\"\n            ng-style=\"{\n              top: vm.showTimes ? ((eventRow.top) + 'px') : 'auto',\n              position: vm.showTimes ? 'absolute' : 'inherit',\n              width: vm.showTimes ? (vm.dayColumnDimensions.width + 'px') : '',\n              left: vm.showTimes ? (vm.dayColumnDimensions.width * eventRow.offset) + 15 + 'px' : ''\n            }\">\n            <div\n              class=\"day-highlight\"\n              ng-class=\"['dh-event-' + eventRow.event.type, eventRow.event.cssClass, !vm.showTimes && eventRow.startsBeforeWeek ? '' : 'border-left-rounded', !vm.showTimes && eventRow.endsAfterWeek ? '' : 'border-right-rounded']\"\n              ng-style=\"{backgroundColor: eventRow.event.color.secondary}\"\n              data-event-class\n              mwl-draggable=\"eventRow.event.draggable === true\"\n              axis=\"vm.showTimes ? 'xy' : 'x'\"\n              snap-grid=\"vm.showTimes ? {x: vm.dayColumnDimensions.width, y: vm.dayViewEventChunkSize || 30} : {x: vm.dayColumnDimensions.width}\"\n              on-drag=\"vm.tempTimeChanged(eventRow.event, y / 30)\"\n              on-drag-end=\"vm.weekDragged(eventRow.event, x / vm.dayColumnDimensions.width, y / 30)\"\n              mwl-resizable=\"eventRow.event.resizable === true && eventRow.event.endsAt && !vm.showTimes\"\n              resize-edges=\"{left: true, right: true}\"\n              on-resize-end=\"vm.weekResized(eventRow.event, edge, x / vm.dayColumnDimensions.width)\">\n              <strong ng-bind=\"(eventRow.event.tempStartsAt || eventRow.event.startsAt) | calendarDate:'time':true\" ng-show=\"vm.showTimes\"></strong>\n              <a\n                href=\"javascript:;\"\n                ng-click=\"vm.onEventClick({calendarEvent: eventRow.event})\"\n                class=\"event-item\"\n                ng-bind-html=\"vm.calendarEventTitle.weekView(eventRow.event) | calendarTrustAsHtml\"\n                uib-tooltip-html=\"vm.calendarEventTitle.weekViewTooltip(eventRow.event) | calendarTrustAsHtml\"\n                tooltip-placement=\"left\"\n                tooltip-append-to-body=\"true\">\n              </a>\n            </div>\n          </div>\n        </div>\n      </div>\n\n    </div>\n\n  </div>\n</div>\n";

/***/ },
/* 22 */
/***/ function(module, exports) {

	module.exports = "<div class=\"cal-year-box\">\n  <div ng-repeat=\"rowOffset in [0, 4, 8] track by rowOffset\">\n    <div class=\"row cal-before-eventlist\">\n      <div\n        class=\"span3 col-md-3 col-xs-6 cal-cell {{ day.cssClass }}\"\n        ng-repeat=\"month in vm.view | calendarLimitTo:4:rowOffset track by $index\"\n        ng-init=\"monthIndex = vm.view.indexOf(month)\"\n        ng-click=\"vm.monthClicked(month, false, $event)\"\n        ng-class=\"{pointer: month.events.length > 0, 'cal-day-today': month.isToday}\"\n        mwl-droppable\n        on-drop=\"vm.handleEventDrop(dropData.event, month.date)\">\n\n        <span\n          class=\"pull-right\"\n          data-cal-date\n          ng-click=\"vm.calendarCtrl.dateClicked(month.date)\"\n          ng-bind=\"month.label\">\n        </span>\n\n        <small\n          class=\"cal-events-num badge badge-important pull-left\"\n          ng-show=\"month.badgeTotal > 0\"\n          ng-bind=\"month.badgeTotal\">\n        </small>\n\n        <div\n          class=\"cal-day-tick\"\n          ng-show=\"monthIndex === vm.openMonthIndex && vm.view[vm.openMonthIndex].events.length > 0 && !vm.slideBoxDisabled\">\n          <i class=\"glyphicon glyphicon-chevron-up\"></i>\n          <i class=\"fa fa-chevron-up\"></i>\n        </div>\n\n      </div>\n    </div>\n\n    <mwl-calendar-slide-box\n      is-open=\"vm.openRowIndex === $index && vm.view[vm.openMonthIndex].events.length > 0 && !vm.slideBoxDisabled\"\n      events=\"vm.view[vm.openMonthIndex].events\"\n      on-event-click=\"vm.onEventClick\"\n      edit-event-html=\"vm.editEventHtml\"\n      on-edit-event-click=\"vm.onEditEventClick\"\n      delete-event-html=\"vm.deleteEventHtml\"\n      on-delete-event-click=\"vm.onDeleteEventClick\"\n      cell=\"vm.view[vm.openMonthIndex]\"\n      custom-template-urls=\"vm.customTemplateUrls\">\n    </mwl-calendar-slide-box>\n\n  </div>\n\n</div>\n";

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	var map = {
		"./mwlCalendar.js": 24,
		"./mwlCalendarDay.js": 25,
		"./mwlCalendarHourList.js": 26,
		"./mwlCalendarMonth.js": 29,
		"./mwlCalendarSlideBox.js": 30,
		"./mwlCalendarWeek.js": 31,
		"./mwlCalendarYear.js": 32,
		"./mwlCollapseFallback.js": 33,
		"./mwlDateModifier.js": 34,
		"./mwlDragSelect.js": 35,
		"./mwlDraggable.js": 36,
		"./mwlDroppable.js": 37,
		"./mwlDynamicDirectiveTemplate.js": 38,
		"./mwlElementDimensions.js": 39,
		"./mwlResizable.js": 40
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
	webpackContext.id = 23;


/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var angular = __webpack_require__(12);
	var LOG_PREFIX = 'Bootstrap calendar:';
	var CHANGELOG_LINK = 'https://github.com/mattlewis92/angular-bootstrap-calendar/blob/master/CHANGELOG.md';

	angular
	  .module('mwl.calendar')
	  .controller('MwlCalendarCtrl', ["$scope", "$log", "$timeout", "$attrs", "$locale", "moment", "calendarTitle", "calendarHelper", function($scope, $log, $timeout, $attrs, $locale, moment, calendarTitle, calendarHelper) {

	    var vm = this;

	    vm.events = vm.events || [];

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

	    if ($attrs.onEditEventClick || $attrs.onDeleteEventClick || $attrs.editEventHtml || $attrs.deleteEventHtml) {
	      $log.warn(LOG_PREFIX, '`on-edit-event-click`, `on-delete-event-click`, `edit-event-html`, `delete-event-html` options ' +
	        'are deprecated, please see the changelog on how to upgrade: ' + CHANGELOG_LINK);
	    }

	    var previousDate = moment(vm.viewDate);
	    var previousView = vm.view;

	    function eventIsValid(event) {
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

	      if (event.type && !event.color) {
	        $log.warn(LOG_PREFIX, 'Event type is deprecated, please see the changelog on how to upgrade: ' + CHANGELOG_LINK, event);
	      }

	      return true;
	    }

	    function refreshCalendar() {

	      if (calendarTitle[vm.view] && angular.isDefined($attrs.viewTitle)) {
	        vm.viewTitle = calendarTitle[vm.view](vm.viewDate);
	      }

	      vm.events = vm.events.filter(eventIsValid).map(function(event, index) {
	        Object.defineProperty(event, '$id', {enumerable: false, configurable: true, value: index});
	        return event;
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

	  }])
	  .directive('mwlCalendar', function() {

	    return {
	      template: '<div mwl-dynamic-directive-template name="calendar" overrides="vm.customTemplateUrls"></div>',
	      restrict: 'E',
	      scope: {
	        events: '=',
	        view: '=',
	        viewTitle: '=?',
	        viewDate: '=',
	        editEventHtml: '=?',
	        deleteEventHtml: '=?',
	        cellIsOpen: '=?',
	        slideBoxDisabled: '=?',
	        customTemplateUrls: '=?',
	        onEventClick: '&',
	        onEventTimesChanged: '&',
	        onEditEventClick: '&',
	        onDeleteEventClick: '&',
	        onTimespanClick: '&',
	        onDateRangeSelect: '&?',
	        onViewChangeClick: '&',
	        cellModifier: '&',
	        dayViewStart: '@',
	        dayViewEnd: '@',
	        dayViewSplit: '@',
	        dayViewEventChunkSize: '@'
	      },
	      controller: 'MwlCalendarCtrl as vm',
	      bindToController: true
	    };

	  });


/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var angular = __webpack_require__(12);

	angular
	  .module('mwl.calendar')
	  .controller('MwlCalendarDayCtrl', ["$scope", "moment", "calendarHelper", "calendarEventTitle", function($scope, moment, calendarHelper, calendarEventTitle) {

	    var vm = this;

	    vm.calendarEventTitle = calendarEventTitle;

	    function refreshView() {
	      vm.dayViewSplit = vm.dayViewSplit || 30;
	      vm.dayViewHeight = calendarHelper.getDayViewHeight(
	        vm.dayViewStart,
	        vm.dayViewEnd,
	        vm.dayViewSplit
	      );

	      var view = calendarHelper.getDayView(
	        vm.events,
	        vm.viewDate,
	        vm.dayViewStart,
	        vm.dayViewEnd,
	        vm.dayViewSplit
	      );

	      vm.allDayEvents = view.allDayEvents;
	      vm.nonAllDayEvents = view.events;
	      vm.viewWidth = view.width + 62;

	    }

	    $scope.$on('calendar.refreshView', refreshView);

	    $scope.$watchGroup([
	      'vm.dayViewStart',
	      'vm.dayViewEnd',
	      'vm.dayViewSplit'
	    ], refreshView);

	    vm.eventDragComplete = function(event, minuteChunksMoved) {
	      var minutesDiff = minuteChunksMoved * vm.dayViewSplit;
	      var newStart = moment(event.startsAt).add(minutesDiff, 'minutes');
	      var newEnd = moment(event.endsAt).add(minutesDiff, 'minutes');
	      delete event.tempStartsAt;

	      vm.onEventTimesChanged({
	        calendarEvent: event,
	        calendarNewEventStart: newStart.toDate(),
	        calendarNewEventEnd: event.endsAt ? newEnd.toDate() : null
	      });
	    };

	    vm.eventDragged = function(event, minuteChunksMoved) {
	      var minutesDiff = minuteChunksMoved * vm.dayViewSplit;
	      event.tempStartsAt = moment(event.startsAt).add(minutesDiff, 'minutes').toDate();
	    };

	    vm.eventResizeComplete = function(event, edge, minuteChunksMoved) {
	      var minutesDiff = minuteChunksMoved * vm.dayViewSplit;
	      var start = moment(event.startsAt);
	      var end = moment(event.endsAt);
	      if (edge === 'start') {
	        start.add(minutesDiff, 'minutes');
	      } else {
	        end.add(minutesDiff, 'minutes');
	      }
	      delete event.tempStartsAt;

	      vm.onEventTimesChanged({
	        calendarEvent: event,
	        calendarNewEventStart: start.toDate(),
	        calendarNewEventEnd: end.toDate()
	      });
	    };

	    vm.eventResized = function(event, edge, minuteChunksMoved) {
	      var minutesDiff = minuteChunksMoved * vm.dayViewSplit;
	      if (edge === 'start') {
	        event.tempStartsAt = moment(event.startsAt).add(minutesDiff, 'minutes').toDate();
	      }
	    };

	  }])
	  .directive('mwlCalendarDay', function() {

	    return {
	      template: '<div mwl-dynamic-directive-template name="calendarDayView" overrides="vm.customTemplateUrls"></div>',
	      restrict: 'E',
	      require: '^mwlCalendar',
	      scope: {
	        events: '=',
	        viewDate: '=',
	        onEventClick: '=',
	        onEventTimesChanged: '=',
	        onTimespanClick: '=',
	        onDateRangeSelect: '=',
	        dayViewStart: '=',
	        dayViewEnd: '=',
	        dayViewSplit: '=',
	        dayViewEventChunkSize: '=',
	        onEditEventClick: '=',
	        onDeleteEventClick: '=',
	        editEventHtml: '=',
	        deleteEventHtml: '=',
	        customTemplateUrls: '=?'
	      },
	      controller: 'MwlCalendarDayCtrl as vm',
	      bindToController: true
	    };

	  });


/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var angular = __webpack_require__(12);
	var calendarUtils = __webpack_require__(27);

	angular
	  .module('mwl.calendar')
	  .controller('MwlCalendarHourListCtrl', ["$scope", "$attrs", "moment", "calendarHelper", function($scope, $attrs, moment, calendarHelper) {
	    var vm = this;

	    function updateDays() {

	      vm.dayViewSplit = parseInt(vm.dayViewSplit);
	      var dayStart = (vm.dayViewStart || '00:00').split(':');
	      var dayEnd = (vm.dayViewEnd || '23:59').split(':');
	      vm.hourGrid = calendarUtils.getDayViewHourGrid({
	        viewDate: $attrs.dayWidth ? moment(vm.viewDate).startOf('week').toDate() : moment(vm.viewDate).toDate(),
	        hourSegments: 60 / vm.dayViewSplit,
	        dayStart: {
	          hour: dayStart[0],
	          minute: dayStart[1]
	        },
	        dayEnd: {
	          hour: dayEnd[0],
	          minute: dayEnd[1]
	        }
	      });

	    }

	    var originalLocale = moment.locale();

	    $scope.$on('calendar.refreshView', function() {

	      if (originalLocale !== moment.locale()) {
	        originalLocale = moment.locale();
	        updateDays();
	      }

	    });

	    $scope.$watchGroup([
	      'vm.dayViewStart',
	      'vm.dayViewEnd',
	      'vm.dayViewSplit',
	      'vm.viewDate'
	    ], function() {
	      updateDays();
	    });

	    vm.eventDropped = function(event, date) {
	      var newStart = moment(date);
	      var newEnd = calendarHelper.adjustEndDateFromStartDiff(event.startsAt, newStart, event.endsAt);

	      vm.onEventTimesChanged({
	        calendarEvent: event,
	        calendarDate: date,
	        calendarNewEventStart: newStart.toDate(),
	        calendarNewEventEnd: newEnd ? newEnd.toDate() : null
	      });
	    };

	    vm.getClickedDate = function(baseDate, minutes, days) {
	      return moment(baseDate).clone().startOf('hour').add(minutes, 'minutes').add(days || 0, 'days').toDate();
	    };

	    vm.onDragSelectStart = function(date, dayIndex) {
	      if (!vm.dateRangeSelect) {
	        vm.dateRangeSelect = {
	          active: true,
	          startDate: date,
	          endDate: date,
	          dayIndex: dayIndex
	        };
	      }
	    };

	    vm.onDragSelectMove = function(date) {
	      if (vm.dateRangeSelect) {
	        vm.dateRangeSelect.endDate = date;
	      }
	    };

	    vm.onDragSelectEnd = function(date) {
	      vm.dateRangeSelect.endDate = date;
	      if (vm.dateRangeSelect.endDate > vm.dateRangeSelect.startDate) {
	        vm.onDateRangeSelect({calendarRangeStartDate: vm.dateRangeSelect.startDate, calendarRangeEndDate: vm.dateRangeSelect.endDate});
	      }
	      delete vm.dateRangeSelect;
	    };

	  }])
	  .directive('mwlCalendarHourList', function() {

	    return {
	      restrict: 'E',
	      template: '<div mwl-dynamic-directive-template name="calendarHourList" overrides="vm.customTemplateUrls"></div>',
	      controller: 'MwlCalendarHourListCtrl as vm',
	      scope: {
	        viewDate: '=',
	        dayViewStart: '=',
	        dayViewEnd: '=',
	        dayViewSplit: '=',
	        dayWidth: '=?',
	        onTimespanClick: '=',
	        onDateRangeSelect: '=',
	        onEventTimesChanged: '=',
	        customTemplateUrls: '=?'
	      },
	      bindToController: true
	    };

	  });


/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var moment = __webpack_require__(28);
	var WEEKEND_DAY_NUMBERS = [0, 6];
	var DAYS_IN_WEEK = 7;
	var HOURS_IN_DAY = 24;
	var MINUTES_IN_HOUR = 60;
	var getDaySpan = function (event, offset, startOfWeek) {
	    var span = 1;
	    if (event.end) {
	        var begin = moment(event.start).isBefore(startOfWeek) ? startOfWeek : moment(event.start);
	        span = moment(event.end)
	            .endOf('day')
	            .add(1, 'minute')
	            .diff(begin.startOf('day'), 'days');
	        if (span > DAYS_IN_WEEK) {
	            span = DAYS_IN_WEEK;
	        }
	    }
	    var totalLength = offset + span;
	    if (totalLength > DAYS_IN_WEEK) {
	        span -= (totalLength - DAYS_IN_WEEK);
	    }
	    return span;
	};
	exports.getDayOffset = function (event, startOfWeek) {
	    var offset = 0;
	    if (moment(event.start).startOf('day').isAfter(moment(startOfWeek))) {
	        offset = moment(event.start).startOf('day').diff(startOfWeek, 'days');
	    }
	    return offset;
	};
	var isEventIsPeriod = function (_a) {
	    var event = _a.event, periodStart = _a.periodStart, periodEnd = _a.periodEnd;
	    var eventStart = moment(event.start);
	    var eventEnd = moment(event.end || event.start);
	    if (eventStart.isAfter(periodStart) && eventStart.isBefore(periodEnd)) {
	        return true;
	    }
	    if (eventEnd.isAfter(periodStart) && eventEnd.isBefore(periodEnd)) {
	        return true;
	    }
	    if (eventStart.isBefore(periodStart) && eventEnd.isAfter(periodEnd)) {
	        return true;
	    }
	    if (eventStart.isSame(periodStart) || eventStart.isSame(periodEnd)) {
	        return true;
	    }
	    if (eventEnd.isSame(periodStart) || eventEnd.isSame(periodEnd)) {
	        return true;
	    }
	    return false;
	};
	var getEventsInPeriod = function (_a) {
	    var events = _a.events, periodStart = _a.periodStart, periodEnd = _a.periodEnd;
	    return events.filter(function (event) { return isEventIsPeriod({ event: event, periodStart: periodStart, periodEnd: periodEnd }); });
	};
	var getWeekDay = function (_a) {
	    var date = _a.date;
	    var today = moment().startOf('day');
	    return {
	        date: date,
	        isPast: date.isBefore(today),
	        isToday: date.isSame(today),
	        isFuture: date.isAfter(today),
	        isWeekend: WEEKEND_DAY_NUMBERS.indexOf(date.day()) > -1
	    };
	};
	exports.getWeekViewHeader = function (_a) {
	    var viewDate = _a.viewDate;
	    var start = moment(viewDate).startOf('week');
	    var days = [];
	    for (var i = 0; i < DAYS_IN_WEEK; i++) {
	        var date = start.clone().add(i, 'days');
	        days.push(getWeekDay({ date: date }));
	    }
	    return days;
	};
	exports.getWeekView = function (_a) {
	    var events = _a.events, viewDate = _a.viewDate;
	    var startOfWeek = moment(viewDate).startOf('week');
	    var endOfWeek = moment(viewDate).endOf('week');
	    var eventsMapped = getEventsInPeriod({ events: events, periodStart: startOfWeek, periodEnd: endOfWeek }).map(function (event) {
	        var offset = exports.getDayOffset(event, startOfWeek);
	        var span = getDaySpan(event, offset, startOfWeek);
	        return {
	            event: event,
	            offset: offset,
	            span: span,
	            startsBeforeWeek: moment(event.start).isBefore(startOfWeek),
	            endsAfterWeek: moment(event.end || event.start).isAfter(endOfWeek)
	        };
	    }).sort(function (itemA, itemB) {
	        var startSecondsDiff = moment(itemA.event.start).diff(moment(itemB.event.start));
	        if (startSecondsDiff === 0) {
	            var endA = moment(itemA.event.end || itemA.event.start);
	            var endB = moment(itemB.event.end || itemB.event.start);
	            return moment(endB).diff(endA);
	        }
	        return startSecondsDiff;
	    });
	    var eventRows = [];
	    var allocatedEvents = [];
	    eventsMapped.forEach(function (event, index) {
	        if (allocatedEvents.indexOf(event) === -1) {
	            allocatedEvents.push(event);
	            var rowSpan_1 = event.span + event.offset;
	            var otherRowEvents = eventsMapped.slice(index + 1).filter(function (nextEvent) {
	                if (allocatedEvents.indexOf(nextEvent) === -1 &&
	                    nextEvent.offset >= rowSpan_1 &&
	                    rowSpan_1 + nextEvent.span <= DAYS_IN_WEEK) {
	                    nextEvent.offset -= rowSpan_1;
	                    rowSpan_1 += nextEvent.span + nextEvent.offset;
	                    allocatedEvents.push(nextEvent);
	                    return true;
	                }
	            });
	            eventRows.push({
	                row: [
	                    event
	                ].concat(otherRowEvents)
	            });
	        }
	    });
	    return eventRows;
	};
	exports.getMonthView = function (_a) {
	    var events = _a.events, viewDate = _a.viewDate;
	    var start = moment(viewDate).startOf('month').startOf('week');
	    var end = moment(viewDate).endOf('month').endOf('week');
	    var eventsInMonth = getEventsInPeriod({
	        events: events,
	        periodStart: moment(viewDate).startOf('month'),
	        periodEnd: moment(viewDate).endOf('month')
	    });
	    var days = [];
	    for (var i = 0; i < end.diff(start, 'days') + 1; i++) {
	        var date = start.clone().add(i, 'days');
	        var day = getWeekDay({ date: date });
	        day.inMonth = date.clone().startOf('month').isSame(moment(viewDate).startOf('month'));
	        if (day.inMonth) {
	            day.events = getEventsInPeriod({
	                events: eventsInMonth,
	                periodStart: moment(date).startOf('day'),
	                periodEnd: moment(date).endOf('day')
	            });
	        }
	        else {
	            day.events = [];
	        }
	        days.push(day);
	    }
	    var rows = Math.floor(days.length / 7);
	    var rowOffsets = [];
	    for (var i = 0; i < rows; i++) {
	        rowOffsets.push(i * 7);
	    }
	    return {
	        rowOffsets: rowOffsets,
	        days: days
	    };
	};
	exports.getDayView = function (_a) {
	    var events = _a.events, viewDate = _a.viewDate, hourSegments = _a.hourSegments, dayStart = _a.dayStart, dayEnd = _a.dayEnd, eventWidth = _a.eventWidth, segmentHeight = _a.segmentHeight;
	    var startOfView = moment(viewDate)
	        .startOf('day')
	        .hour(dayStart.hour)
	        .minute(dayStart.minute);
	    var endOfView = moment(viewDate)
	        .endOf('day')
	        .startOf('minute')
	        .hour(dayEnd.hour)
	        .minute(dayEnd.minute);
	    var previousDayEvents = [];
	    var dayViewEvents = getEventsInPeriod({
	        events: events,
	        periodStart: startOfView,
	        periodEnd: endOfView
	    }).sort(function (eventA, eventB) {
	        return eventA.start.valueOf() - eventB.start.valueOf();
	    }).map(function (event) {
	        var eventStart = event.start;
	        var eventEnd = event.end || eventStart;
	        var startsBeforeDay = eventStart < startOfView.toDate();
	        var endsAfterDay = eventEnd > endOfView.toDate();
	        var hourHeightModifier = (hourSegments * segmentHeight) / MINUTES_IN_HOUR;
	        var top = 0;
	        if (eventStart > startOfView.toDate()) {
	            top += moment(eventStart).diff(startOfView, 'minutes');
	        }
	        top *= hourHeightModifier;
	        var startDate = startsBeforeDay ? startOfView : moment(eventStart);
	        var endDate = endsAfterDay ? endOfView : moment(eventEnd);
	        var height = endDate.diff(startDate, 'minutes');
	        if (!event.end) {
	            height = segmentHeight;
	        }
	        else {
	            height *= hourHeightModifier;
	        }
	        var bottom = top + height;
	        var overlappingPreviousEvents = previousDayEvents.filter(function (previousEvent) {
	            var previousEventTop = previousEvent.top;
	            var previousEventBottom = previousEvent.top + previousEvent.height;
	            if (top < previousEventTop && previousEventTop < bottom) {
	                return true;
	            }
	            else if (top < previousEventBottom && previousEventBottom < bottom) {
	                return true;
	            }
	            else if (previousEventTop <= top && bottom <= previousEventBottom) {
	                return true;
	            }
	            return false;
	        });
	        var dayEvent = {
	            event: event,
	            height: height,
	            width: eventWidth,
	            top: top,
	            left: overlappingPreviousEvents.length * eventWidth,
	            startsBeforeDay: startsBeforeDay,
	            endsAfterDay: endsAfterDay
	        };
	        if (height > 0) {
	            previousDayEvents.push(dayEvent);
	        }
	        return dayEvent;
	    }).filter(function (dayEvent) { return dayEvent.height > 0; });
	    var width = Math.max.apply(Math, dayViewEvents.map(function (event) { return event.left + event.width; }));
	    return {
	        events: dayViewEvents,
	        width: width
	    };
	};
	exports.getDayViewHourGrid = function (_a) {
	    var viewDate = _a.viewDate, hourSegments = _a.hourSegments, dayStart = _a.dayStart, dayEnd = _a.dayEnd;
	    var hours = [];
	    var startOfView = moment(viewDate).startOf('day').hour(dayStart.hour).minute(dayStart.minute);
	    var endOfView = moment(viewDate).endOf('day').startOf('minute').hour(dayEnd.hour).minute(dayEnd.minute);
	    var segmentDuration = MINUTES_IN_HOUR / hourSegments;
	    var startOfDay = moment(viewDate).startOf('day');
	    for (var i = 0; i < HOURS_IN_DAY; i++) {
	        var segments = [];
	        for (var j = 0; j < hourSegments; j++) {
	            var date = startOfDay.clone().add(i, 'hours').add(j * segmentDuration, 'minutes');
	            if (date >= startOfView && date < endOfView) {
	                segments.push({
	                    date: date,
	                    isStart: j === 0
	                });
	            }
	        }
	        if (segments.length > 0) {
	            hours.push({ segments: segments });
	        }
	    }
	    return hours;
	};
	//# sourceMappingURL=calendarUtils.js.map

/***/ },
/* 28 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_28__;

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var angular = __webpack_require__(12);

	angular
	  .module('mwl.calendar')
	  .controller('MwlCalendarMonthCtrl', ["$scope", "moment", "calendarHelper", "calendarConfig", "calendarEventTitle", function($scope, moment, calendarHelper, calendarConfig, calendarEventTitle) {

	    var vm = this;
	    vm.calendarConfig = calendarConfig;
	    vm.calendarEventTitle = calendarEventTitle;
	    vm.openRowIndex = null;

	    $scope.$on('calendar.refreshView', function() {

	      vm.weekDays = calendarHelper.getWeekDayNames();

	      vm.view = calendarHelper.getMonthView(vm.events, vm.viewDate, vm.cellModifier);
	      var rows = Math.floor(vm.view.length / 7);
	      vm.monthOffsets = [];
	      for (var i = 0; i < rows; i++) {
	        vm.monthOffsets.push(i * 7);
	      }

	      //Auto open the calendar to the current day if set
	      if (vm.cellIsOpen && vm.openRowIndex === null) {
	        vm.openDayIndex = null;
	        vm.view.forEach(function(day) {
	          if (day.inMonth && moment(vm.viewDate).startOf('day').isSame(day.date)) {
	            vm.dayClicked(day, true);
	          }
	        });
	      }

	    });

	    vm.dayClicked = function(day, dayClickedFirstRun, $event) {

	      if (!dayClickedFirstRun) {
	        vm.onTimespanClick({
	          calendarDate: day.date.toDate(),
	          calendarCell: day,
	          $event: $event
	        });
	        if ($event && $event.defaultPrevented) {
	          return;
	        }
	      }

	      vm.openRowIndex = null;
	      var dayIndex = vm.view.indexOf(day);
	      if (dayIndex === vm.openDayIndex) { //the day has been clicked and is already open
	        vm.openDayIndex = null; //close the open day
	        vm.cellIsOpen = false;
	      } else {
	        vm.openDayIndex = dayIndex;
	        vm.openRowIndex = Math.floor(dayIndex / 7);
	        vm.cellIsOpen = true;
	      }

	    };

	    vm.highlightEvent = function(event, shouldAddClass) {

	      vm.view.forEach(function(day) {
	        delete day.highlightClass;
	        delete day.backgroundColor;
	        if (shouldAddClass) {
	          var dayContainsEvent = day.events.indexOf(event) > -1;
	          if (dayContainsEvent) {
	            day.highlightClass = 'day-highlight dh-event-' + event.type;
	            day.backgroundColor = event.color ? event.color.secondary : '';
	          }
	        }
	      });

	    };

	    vm.handleEventDrop = function(event, newDayDate, draggedFromDate) {

	      var newStart = moment(event.startsAt)
	        .date(moment(newDayDate).date())
	        .month(moment(newDayDate).month())
	        .year(moment(newDayDate).year());

	      var newEnd = calendarHelper.adjustEndDateFromStartDiff(event.startsAt, newStart, event.endsAt);

	      vm.onEventTimesChanged({
	        calendarEvent: event,
	        calendarDate: newDayDate,
	        calendarNewEventStart: newStart.toDate(),
	        calendarNewEventEnd: newEnd ? newEnd.toDate() : null,
	        calendarDraggedFromDate: draggedFromDate
	      });
	    };

	    vm.getWeekNumberLabel = function(day) {
	      var weekNumber = day.date.clone().add(1, 'day').isoWeek();
	      if (typeof calendarConfig.i18nStrings.weekNumber === 'function') {
	        return calendarConfig.i18nStrings.weekNumber({weekNumber: weekNumber});
	      } else {
	        return calendarConfig.i18nStrings.weekNumber.replace('{week}', weekNumber);
	      }
	    };

	    vm.onDragSelectStart = function(day) {
	      if (!vm.dateRangeSelect) {
	        vm.dateRangeSelect = {
	          startDate: day.date,
	          endDate: day.date
	        };
	      }
	    };

	    vm.onDragSelectMove = function(day) {
	      if (vm.dateRangeSelect) {
	        vm.dateRangeSelect.endDate = day.date;
	      }
	    };

	    vm.onDragSelectEnd = function(day) {
	      vm.dateRangeSelect.endDate = day.date;
	      if (vm.dateRangeSelect.endDate > vm.dateRangeSelect.startDate) {
	        vm.onDateRangeSelect({
	          calendarRangeStartDate: vm.dateRangeSelect.startDate.clone().startOf('day').toDate(),
	          calendarRangeEndDate: vm.dateRangeSelect.endDate.clone().endOf('day').toDate()
	        });
	      }
	      delete vm.dateRangeSelect;
	    };

	  }])
	  .directive('mwlCalendarMonth', function() {

	    return {
	      template: '<div mwl-dynamic-directive-template name="calendarMonthView" overrides="vm.customTemplateUrls"></div>',
	      restrict: 'E',
	      require: '^mwlCalendar',
	      scope: {
	        events: '=',
	        viewDate: '=',
	        onEventClick: '=',
	        onEditEventClick: '=',
	        onDeleteEventClick: '=',
	        onEventTimesChanged: '=',
	        onDateRangeSelect: '=',
	        editEventHtml: '=',
	        deleteEventHtml: '=',
	        cellIsOpen: '=',
	        onTimespanClick: '=',
	        cellModifier: '=',
	        slideBoxDisabled: '=',
	        customTemplateUrls: '=?'
	      },
	      controller: 'MwlCalendarMonthCtrl as vm',
	      link: function(scope, element, attrs, calendarCtrl) {
	        scope.vm.calendarCtrl = calendarCtrl;
	      },
	      bindToController: true
	    };

	  });


/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var angular = __webpack_require__(12);

	angular
	  .module('mwl.calendar')
	  .controller('MwlCalendarSlideBoxCtrl', ["$scope", "$timeout", "calendarConfig", "calendarEventTitle", function($scope, $timeout, calendarConfig, calendarEventTitle) {

	    var vm = this;
	    vm.calendarConfig = calendarConfig;
	    vm.calendarEventTitle = calendarEventTitle;

	    vm.isCollapsed = true;
	    $scope.$watch('vm.isOpen', function(isOpen) {
	      //events must be populated first to set the element height before animation will work
	      $timeout(function() {
	        vm.isCollapsed = !isOpen;
	      });
	    });

	  }])
	  .directive('mwlCalendarSlideBox', function() {

	    return {
	      restrict: 'E',
	      template: '<div mwl-dynamic-directive-template name="calendarSlideBox" overrides="vm.customTemplateUrls"></div>',
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
	        onDeleteEventClick: '=',
	        cell: '=',
	        customTemplateUrls: '=?'
	      },
	      bindToController: true
	    };

	  });


/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var angular = __webpack_require__(12);

	angular
	  .module('mwl.calendar')
	  .controller('MwlCalendarWeekCtrl', ["$scope", "moment", "calendarHelper", "calendarConfig", "calendarEventTitle", function($scope, moment, calendarHelper, calendarConfig, calendarEventTitle) {

	    var vm = this;

	    vm.showTimes = calendarConfig.showTimesOnWeekView;
	    vm.calendarEventTitle = calendarEventTitle;

	    $scope.$on('calendar.refreshView', function() {
	      vm.dayViewSplit = vm.dayViewSplit || 30;
	      vm.dayViewHeight = calendarHelper.getDayViewHeight(
	        vm.dayViewStart,
	        vm.dayViewEnd,
	        vm.dayViewSplit
	      );
	      if (vm.showTimes) {
	        vm.view = calendarHelper.getWeekViewWithTimes(
	          vm.events,
	          vm.viewDate,
	          vm.dayViewStart,
	          vm.dayViewEnd,
	          vm.dayViewSplit
	        );
	      } else {
	        vm.view = calendarHelper.getWeekView(vm.events, vm.viewDate);
	      }
	    });

	    vm.weekDragged = function(event, daysDiff, minuteChunksMoved) {

	      var newStart = moment(event.startsAt).add(daysDiff, 'days');
	      var newEnd = moment(event.endsAt).add(daysDiff, 'days');

	      if (minuteChunksMoved) {
	        var minutesDiff = minuteChunksMoved * vm.dayViewSplit;
	        newStart = newStart.add(minutesDiff, 'minutes');
	        newEnd = newEnd.add(minutesDiff, 'minutes');
	      }

	      delete event.tempStartsAt;

	      vm.onEventTimesChanged({
	        calendarEvent: event,
	        calendarNewEventStart: newStart.toDate(),
	        calendarNewEventEnd: event.endsAt ? newEnd.toDate() : null
	      });
	    };

	    vm.eventDropped = function(event, date) {
	      var daysDiff = moment(date).diff(moment(event.startsAt), 'days');
	      vm.weekDragged(event, daysDiff);
	    };

	    vm.weekResized = function(event, edge, daysDiff) {

	      var start = moment(event.startsAt);
	      var end = moment(event.endsAt);
	      if (edge === 'start') {
	        start.add(daysDiff, 'days');
	      } else {
	        end.add(daysDiff, 'days');
	      }

	      vm.onEventTimesChanged({
	        calendarEvent: event,
	        calendarNewEventStart: start.toDate(),
	        calendarNewEventEnd: end.toDate()
	      });

	    };

	    vm.tempTimeChanged = function(event, minuteChunksMoved) {
	      var minutesDiff = minuteChunksMoved * vm.dayViewSplit;
	      event.tempStartsAt = moment(event.startsAt).add(minutesDiff, 'minutes').toDate();
	    };

	  }])
	  .directive('mwlCalendarWeek', function() {

	    return {
	      template: '<div mwl-dynamic-directive-template name="calendarWeekView" overrides="vm.customTemplateUrls"></div>',
	      restrict: 'E',
	      require: '^mwlCalendar',
	      scope: {
	        events: '=',
	        viewDate: '=',
	        onEventClick: '=',
	        onEventTimesChanged: '=',
	        dayViewStart: '=',
	        dayViewEnd: '=',
	        dayViewSplit: '=',
	        dayViewEventChunkSize: '=',
	        onTimespanClick: '=',
	        onDateRangeSelect: '=',
	        customTemplateUrls: '=?'
	      },
	      controller: 'MwlCalendarWeekCtrl as vm',
	      link: function(scope, element, attrs, calendarCtrl) {
	        scope.vm.calendarCtrl = calendarCtrl;
	      },
	      bindToController: true
	    };

	  });


/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var angular = __webpack_require__(12);

	angular
	  .module('mwl.calendar')
	  .controller('MwlCalendarYearCtrl', ["$scope", "moment", "calendarHelper", function($scope, moment, calendarHelper) {

	    var vm = this;
	    vm.openMonthIndex = null;

	    $scope.$on('calendar.refreshView', function() {
	      vm.view = calendarHelper.getYearView(vm.events, vm.viewDate, vm.cellModifier);

	      //Auto open the calendar to the current day if set
	      if (vm.cellIsOpen && vm.openMonthIndex === null) {
	        vm.openMonthIndex = null;
	        vm.view.forEach(function(month) {
	          if (moment(vm.viewDate).startOf('month').isSame(month.date)) {
	            vm.monthClicked(month, true);
	          }
	        });
	      }

	    });

	    vm.monthClicked = function(month, monthClickedFirstRun, $event) {

	      if (!monthClickedFirstRun) {
	        vm.onTimespanClick({
	          calendarDate: month.date.toDate(),
	          calendarCell: month,
	          $event: $event
	        });
	        if ($event && $event.defaultPrevented) {
	          return;
	        }
	      }

	      vm.openRowIndex = null;
	      var monthIndex = vm.view.indexOf(month);
	      if (monthIndex === vm.openMonthIndex) { //the month has been clicked and is already open
	        vm.openMonthIndex = null; //close the open month
	        vm.cellIsOpen = false;
	      } else {
	        vm.openMonthIndex = monthIndex;
	        vm.openRowIndex = Math.floor(monthIndex / 4);
	        vm.cellIsOpen = true;
	      }

	    };

	    vm.handleEventDrop = function(event, newMonthDate) {
	      var newStart = moment(event.startsAt)
	        .month(moment(newMonthDate).month())
	        .year(moment(newMonthDate).year());
	      var newEnd = calendarHelper.adjustEndDateFromStartDiff(event.startsAt, newStart, event.endsAt);

	      vm.onEventTimesChanged({
	        calendarEvent: event,
	        calendarDate: newMonthDate,
	        calendarNewEventStart: newStart.toDate(),
	        calendarNewEventEnd: newEnd ? newEnd.toDate() : null
	      });
	    };

	  }])
	  .directive('mwlCalendarYear', function() {

	    return {
	      template: '<div mwl-dynamic-directive-template name="calendarYearView" overrides="vm.customTemplateUrls"></div>',
	      restrict: 'E',
	      require: '^mwlCalendar',
	      scope: {
	        events: '=',
	        viewDate: '=',
	        onEventClick: '=',
	        onEventTimesChanged: '=',
	        onEditEventClick: '=',
	        onDeleteEventClick: '=',
	        editEventHtml: '=',
	        deleteEventHtml: '=',
	        cellIsOpen: '=',
	        onTimespanClick: '=',
	        cellModifier: '=',
	        slideBoxDisabled: '=',
	        customTemplateUrls: '=?'
	      },
	      controller: 'MwlCalendarYearCtrl as vm',
	      link: function(scope, element, attrs, calendarCtrl) {
	        scope.vm.calendarCtrl = calendarCtrl;
	      },
	      bindToController: true
	    };

	  });


/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var angular = __webpack_require__(12);

	angular
	  .module('mwl.calendar')
	  .controller('MwlCollapseFallbackCtrl', ["$scope", "$attrs", "$element", function($scope, $attrs, $element) {

	    $scope.$watch($attrs.mwlCollapseFallback, function(shouldCollapse) {
	      if (shouldCollapse) {
	        $element.addClass('ng-hide');
	      } else {
	        $element.removeClass('ng-hide');
	      }
	    });

	  }])
	  .directive('mwlCollapseFallback', ["$injector", function($injector) {

	    if ($injector.has('uibCollapseDirective')) {
	      return {};
	    }

	    return {
	      restrict: 'A',
	      controller: 'MwlCollapseFallbackCtrl'
	    };

	  }]);


/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var angular = __webpack_require__(12);

	angular
	  .module('mwl.calendar')
	  .controller('MwlDateModifierCtrl', ["$element", "$attrs", "$scope", "moment", function($element, $attrs, $scope, moment) {

	    var vm = this;

	    function onClick() {
	      if (angular.isDefined($attrs.setToToday)) {
	        vm.date = new Date();
	      } else if (angular.isDefined($attrs.increment)) {
	        vm.date = moment(vm.date).add(1, vm.increment).toDate();
	      } else if (angular.isDefined($attrs.decrement)) {
	        vm.date = moment(vm.date).subtract(1, vm.decrement).toDate();
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
	      controller: 'MwlDateModifierCtrl as vm',
	      scope: {
	        date: '=',
	        increment: '=',
	        decrement: '='
	      },
	      bindToController: true
	    };

	  });


/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var angular = __webpack_require__(12);

	angular
	  .module('mwl.calendar')
	  .controller('MwlDragSelectCtrl', ["$scope", "$element", "$parse", "$attrs", function($scope, $element, $parse, $attrs) {

	    function handleMouseEvent(callbackName) {
	      return function(event) {
	        if (callbackName) {
	          $parse(callbackName)($scope);
	          $scope.$apply();
	        }
	        event.preventDefault();
	      };
	    }

	    var onMouseDown = handleMouseEvent($attrs.onDragSelectStart);
	    var onMouseMove = handleMouseEvent($attrs.onDragSelectMove);
	    var onMouseUp = handleMouseEvent($attrs.onDragSelectEnd);

	    function enableMouseListeners() {
	      $element.on('mousedown', onMouseDown);
	      $element.on('mousemove', onMouseMove);
	      $element.on('mouseup', onMouseUp);
	    }

	    function disableMouseListeners() {
	      $element.off('mousedown', onMouseDown);
	      $element.off('mousemove', onMouseMove);
	      $element.off('mouseup', onMouseUp);
	    }

	    $scope.$watch($attrs.mwlDragSelect, function(isEnabled) {
	      if (isEnabled) {
	        enableMouseListeners();
	      } else {
	        disableMouseListeners();
	      }
	    });

	    $scope.$on('$destroy', function() {
	      disableMouseListeners();
	    });

	  }])
	  .directive('mwlDragSelect', function() {

	    return {
	      restrict: 'A',
	      controller: 'MwlDragSelectCtrl'
	    };

	  });


/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var angular = __webpack_require__(12);

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
	        .css('-ms-transform', transformValue)
	        .css('-webkit-transform', transformValue)
	        .css('transform', transformValue);
	    }

	    interact($element[0]).draggable({
	      snap: snap,
	      onstart: function(event) {
	        angular.element(event.target).addClass('dragging-active');
	        event.target.dropData = $parse($attrs.dropData)($scope);
	        event.target.style.pointerEvents = 'none';
	        if ($attrs.onDragStart) {
	          $parse($attrs.onDragStart)($scope);
	          $scope.$apply();
	        }
	      },
	      onmove: function(event) {

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
	          .css('z-index', 50)
	          .attr('data-x', x)
	          .attr('data-y', y);

	        if ($attrs.onDrag) {
	          $parse($attrs.onDrag)($scope, {x: x, y: y});
	          $scope.$apply();
	        }

	      },
	      onend: function(event) {

	        var elm = angular.element(event.target);
	        var x = elm.attr('data-x');
	        var y = elm.attr('data-y');

	        event.target.style.pointerEvents = 'auto';
	        if ($attrs.onDragEnd) {
	          $parse($attrs.onDragEnd)($scope, {x: x, y: y});
	          $scope.$apply();
	        }

	        $timeout(function() {
	          translateElement(elm, '')
	            .css('z-index', 'auto')
	            .removeAttr('data-x')
	            .removeAttr('data-y')
	            .removeClass('dragging-active');
	        });

	      }
	    });

	    $scope.$watch($attrs.mwlDraggable, function(enabled) {
	      interact($element[0]).draggable({
	        enabled: enabled
	      });
	    });

	    $scope.$on('$destroy', function() {
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
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var angular = __webpack_require__(12);

	angular
	  .module('mwl.calendar')
	  .controller('MwlDroppableCtrl', ["$element", "$scope", "$parse", "$attrs", "interact", function($element, $scope, $parse, $attrs, interact) {

	    if (!interact) {
	      return;
	    }

	    var DROP_ACTIVE_CLASS = $attrs.dropActiveClass || 'drop-active';

	    interact($element[0]).dropzone({
	      ondragenter: function(event) {
	        angular.element(event.target).addClass(DROP_ACTIVE_CLASS);
	      },
	      ondragleave: function(event) {
	        angular.element(event.target).removeClass(DROP_ACTIVE_CLASS);
	      },
	      ondropdeactivate: function(event) {
	        angular.element(event.target).removeClass(DROP_ACTIVE_CLASS);
	      },
	      ondrop: function(event) {
	        if (event.relatedTarget.dropData) {
	          $parse($attrs.onDrop)($scope, {dropData: event.relatedTarget.dropData});
	          $scope.$apply();
	        }
	      }
	    });

	    $scope.$on('$destroy', function() {
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
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var angular = __webpack_require__(12);

	angular
	  .module('mwl.calendar')
	  .controller('MwlDynamicDirectiveTemplateCtrl', ["$compile", "$scope", "$attrs", "$element", "$templateCache", "calendarConfig", function($compile, $scope, $attrs, $element, $templateCache, calendarConfig) {

	    $scope.$watch($attrs.overrides, function(overrides) {

	      var templateName = calendarConfig.templates[$attrs.name];
	      if (
	        overrides &&
	        angular.isObject(overrides) &&
	        overrides[$attrs.name] &&
	        $templateCache.get(overrides[$attrs.name])
	      ) {
	        templateName = overrides[$attrs.name];
	      }
	      var template = $templateCache.get(templateName);
	      $element.html(template);
	      $compile($element.contents())($scope);

	    });

	  }])
	  .directive('mwlDynamicDirectiveTemplate', function() {

	    return {
	      restrict: 'A',
	      controller: 'MwlDynamicDirectiveTemplateCtrl'
	    };

	  });


/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var angular = __webpack_require__(12);

	angular
	  .module('mwl.calendar')
	  .controller('MwlElementDimensionsCtrl', ["$element", "$scope", "$parse", "$attrs", "$window", function($element, $scope, $parse, $attrs, $window) {

	    function setDimensions() {
	      $parse($attrs.mwlElementDimensions).assign($scope, {
	        width: $element[0].offsetWidth,
	        height: $element[0].offsetHeight
	      });
	      $scope.$applyAsync();
	    }

	    var win = angular.element($window);

	    win.bind('resize', setDimensions);

	    setDimensions();

	    $scope.$on('$destroy', function() {
	      win.unbind('resize', setDimensions);
	    });

	  }])
	  .directive('mwlElementDimensions', function() {

	    return {
	      restrict: 'A',
	      controller: 'MwlElementDimensionsCtrl'
	    };

	  });


/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var angular = __webpack_require__(12);

	angular
	  .module('mwl.calendar')
	  .controller('MwlResizableCtrl', ["$element", "$scope", "$parse", "$attrs", "$timeout", "interact", function($element, $scope, $parse, $attrs, $timeout, interact) {

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

	    function getUnitsResized(edge, elm) {
	      var unitsResized = {};
	      unitsResized.edge = edge;
	      if (edge === 'start') {
	        unitsResized.x = elm.data('x');
	        unitsResized.y = elm.data('y');
	      } else if (edge === 'end') {
	        unitsResized.x = parseFloat(elm.css('width').replace('px', '')) - originalDimensions.width;
	        unitsResized.y = parseFloat(elm.css('height').replace('px', '')) - originalDimensions.height;
	      }
	      return unitsResized;
	    }

	    interact($element[0]).resizable({
	      edges: $parse($attrs.resizeEdges)($scope),
	      snap: snap,
	      onstart: function(event) {

	        resizeEdge = 'end';
	        var elm = angular.element(event.target);
	        originalDimensions.height = elm[0].offsetHeight;
	        originalDimensions.width = elm[0].offsetWidth;
	        originalDimensionsStyle.height = elm.css('height');
	        originalDimensionsStyle.width = elm.css('width');

	      },
	      onmove: function(event) {

	        if (event.rect.width > 0 && event.rect.height > 0) {
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
	            $parse($attrs.onResize)($scope, getUnitsResized(resizeEdge, elm));
	            $scope.$apply();
	          }

	        }

	      },
	      onend: function(event) {

	        var elm = angular.element(event.target);
	        var unitsResized = getUnitsResized(resizeEdge, elm);

	        $timeout(function() {
	          elm
	            .data('x', null)
	            .data('y', null)
	            .css({
	              transform: '',
	              width: originalDimensionsStyle.width,
	              height: originalDimensionsStyle.height
	            });
	        });

	        if ($attrs.onResizeEnd) {
	          $parse($attrs.onResizeEnd)($scope, unitsResized);
	          $scope.$apply();
	        }

	      }
	    });

	    $scope.$watch($attrs.mwlResizable, function(enabled) {
	      interact($element[0]).resizable({
	        enabled: enabled
	      });
	    });

	    $scope.$on('$destroy', function() {
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
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	var map = {
		"./calendarDate.js": 42,
		"./calendarLimitTo.js": 43,
		"./calendarTruncateEventTitle.js": 44,
		"./calendarTrustAsHtml.js": 45
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
	webpackContext.id = 41;


/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var angular = __webpack_require__(12);

	angular
	  .module('mwl.calendar')
	  .filter('calendarDate', ["calendarHelper", "calendarConfig", function(calendarHelper, calendarConfig) {

	    function calendarDate(date, format, getFromConfig) {

	      if (getFromConfig === true) {
	        format = calendarConfig.dateFormats[format];
	      }

	      return calendarHelper.formatDate(date, format);

	    }

	    // This is stateful because the locale can change as well
	    // as calendarConfig.dateFormats which would change the value outside of this filter
	    calendarDate.$stateful = true;

	    return calendarDate;

	  }]);


/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var angular = __webpack_require__(12);

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
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var angular = __webpack_require__(12);

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
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var angular = __webpack_require__(12);

	angular
	  .module('mwl.calendar')
	  .filter('calendarTrustAsHtml', ["$sce", function($sce) {

	    return function(text) {
	      return $sce.trustAsHtml(text);
	    };

	  }]);


/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	var map = {
		"./calendarConfig.js": 47,
		"./calendarEventTitle.js": 48,
		"./calendarHelper.js": 49,
		"./calendarTitle.js": 50,
		"./interact.js": 51,
		"./moment.js": 53
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
	webpackContext.id = 46;


/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var angular = __webpack_require__(12);

	angular
	  .module('mwl.calendar')
	  .constant('calendarConfig', {
	    allDateFormats: {
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
	    },
	    get dateFormats() {
	      return this.allDateFormats[this.dateFormatter].date;
	    },
	    get titleFormats() {
	      return this.allDateFormats[this.dateFormatter].title;
	    },
	    dateFormatter: 'angular',
	    showTimesOnWeekView: false,
	    displayAllMonthEvents: false,
	    i18nStrings: {
	      weekNumber: 'Week {week}'
	    },
	    templates: {},
	    colorTypes: {
	      info: {
	        primary: '#1e90ff',
	        secondary: '#d1e8ff'
	      },
	      important: {
	        primary: '#ad2121',
	        secondary: '#fae3e3'
	      },
	      warning: {
	        primary: '#e3bc08',
	        secondary: '#fdf1ba'
	      },
	      inverse: {
	        primary: '#1b1b1b',
	        secondary: '#c1c1c1'
	      },
	      special: {
	        primary: '#800080',
	        secondary: '#ffe6ff'
	      },
	      success: {
	        primary: '#006400',
	        secondary: '#caffca'
	      }
	    }
	  });


/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var angular = __webpack_require__(12);

	angular
	  .module('mwl.calendar')
	  .factory('calendarEventTitle', ["calendarDateFilter", "calendarTruncateEventTitleFilter", function(calendarDateFilter, calendarTruncateEventTitleFilter) {

	    function yearView(event) {
	      return event.title + ' (' + calendarDateFilter(event.startsAt, 'datetime', true) + ')';
	    }

	    function monthView(event) {
	      return event.title + ' (' + calendarDateFilter(event.startsAt, 'time', true) + ')';
	    }

	    function monthViewTooltip(event) {
	      return calendarDateFilter(event.startsAt, 'time', true) + ' - ' + event.title;
	    }

	    function weekView(event) {
	      return event.title;
	    }

	    function weekViewTooltip(event) {
	      return event.title;
	    }

	    function dayView(event) {
	      return event.allDay ? event.title : calendarTruncateEventTitleFilter(event.title, 20, event.height);
	    }

	    return {
	      yearView: yearView,
	      monthView: monthView,
	      monthViewTooltip: monthViewTooltip,
	      weekView: weekView,
	      weekViewTooltip: weekViewTooltip,
	      dayView: dayView
	    };

	  }]);


/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var angular = __webpack_require__(12);
	var calendarUtils = __webpack_require__(27);

	angular
	  .module('mwl.calendar')
	  .factory('calendarHelper', ["$q", "$templateRequest", "dateFilter", "moment", "calendarConfig", function($q, $templateRequest, dateFilter, moment, calendarConfig) {

	    function formatDate(date, format) {
	      if (calendarConfig.dateFormatter === 'angular') {
	        return dateFilter(moment(date).toDate(), format);
	      } else if (calendarConfig.dateFormatter === 'moment') {
	        return moment(date).format(format);
	      } else {
	        throw new Error('Unknown date formatter: ' + calendarConfig.dateFormatter);
	      }
	    }

	    function adjustEndDateFromStartDiff(oldStart, newStart, oldEnd) {
	      if (!oldEnd) {
	        return oldEnd;
	      }
	      var diffInSeconds = moment(newStart).diff(moment(oldStart));
	      return moment(oldEnd).add(diffInSeconds);
	    }

	    function getRecurringEventPeriod(eventPeriod, recursOn, containerPeriodStart) {

	      var eventStart = moment(eventPeriod.start);
	      var eventEnd = moment(eventPeriod.end);
	      var periodStart = moment(containerPeriodStart);

	      if (recursOn) {

	        switch (recursOn) {
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
	            throw new Error('Invalid value (' + recursOn + ') given for recurs on. Can only be year or month.');
	        }

	        eventEnd = adjustEndDateFromStartDiff(eventPeriod.start, eventStart, eventEnd);

	      }

	      return {start: eventStart, end: eventEnd};

	    }

	    function eventIsInPeriod(event, periodStart, periodEnd) {

	      periodStart = moment(periodStart);
	      periodEnd = moment(periodEnd);

	      var eventPeriod = getRecurringEventPeriod({start: event.startsAt, end: event.endsAt || event.startsAt}, event.recursOn, periodStart);
	      var eventStart = eventPeriod.start;
	      var eventEnd = eventPeriod.end;

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

	    function getYearView(events, viewDate, cellModifier) {

	      var view = [];
	      var eventsInPeriod = getEventsInPeriod(viewDate, 'year', events);
	      var month = moment(viewDate).startOf('year');
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

	    function getMonthView(events, viewDate, cellModifier) {

	      var startOfMonth = moment(viewDate).startOf('month');
	      var day = startOfMonth.clone().startOf('week');
	      var endOfMonthView = moment(viewDate).endOf('month').endOf('week');
	      var eventsInPeriod;
	      if (calendarConfig.displayAllMonthEvents) {
	        eventsInPeriod = filterEventsInPeriod(events, day, endOfMonthView);
	      } else {
	        eventsInPeriod = filterEventsInPeriod(events, startOfMonth, startOfMonth.clone().endOf('month'));
	      }
	      var view = [];
	      var today = moment().startOf('day');

	      while (day.isBefore(endOfMonthView)) {

	        var inMonth = day.month() === moment(viewDate).month();
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

	    function getWeekView(events, viewDate) {

	      var startOfWeek = moment(viewDate).startOf('week');
	      var endOfWeek = moment(viewDate).endOf('week');
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

	      var eventRows = calendarUtils.getWeekView({
	        viewDate: viewDate,
	        events: filterEventsInPeriod(events, startOfWeek, endOfWeek).map(function(event) {

	          var weekViewStart = moment(startOfWeek).startOf('day');

	          var eventPeriod = getRecurringEventPeriod({
	            start: moment(event.startsAt).startOf('day'),
	            end: moment(event.endsAt || event.startsAt).startOf('day').add(1, 'second')
	          }, event.recursOn, weekViewStart);

	          eventPeriod.originalEvent = event;

	          return eventPeriod;

	        })
	      }).map(function(eventRow) {

	        eventRow.row = eventRow.row.map(function(rowEvent) {
	          rowEvent.event = rowEvent.event.originalEvent;
	          return rowEvent;
	        });

	        return eventRow;

	      });

	      return {days: days, eventRows: eventRows};

	    }

	    function getDayView(events, viewDate, dayViewStart, dayViewEnd, dayViewSplit) {

	      var dayStart = (dayViewStart || '00:00').split(':');
	      var dayEnd = (dayViewEnd || '23:59').split(':');

	      var allDayEvents = events.filter(function(event) {
	        return event.allDay;
	      });

	      var nonAllDayEvents = events.filter(function(event) {
	        return !event.allDay;
	      });

	      var view = calendarUtils.getDayView({
	        events: nonAllDayEvents.map(function(event) { // hack required to work with event API
	          event.start = event.startsAt;
	          event.end = event.endsAt;
	          return event;
	        }),
	        viewDate: viewDate,
	        hourSegments: 60 / dayViewSplit,
	        dayStart: {
	          hour: dayStart[0],
	          minute: dayStart[1]
	        },
	        dayEnd: {
	          hour: dayEnd[0],
	          minute: dayEnd[1]
	        },
	        eventWidth: 150,
	        segmentHeight: 30
	      });

	      // remove hack to work with new event API
	      nonAllDayEvents.forEach(function(event) {
	        delete event.start;
	        delete event.end;
	      });

	      view.allDayEvents = allDayEvents;

	      return view;

	    }

	    function getWeekViewWithTimes(events, viewDate, dayViewStart, dayViewEnd, dayViewSplit) {
	      var weekView = getWeekView(events, viewDate);
	      var newEvents = [];
	      var flattenedEvents = [];
	      weekView.eventRows.forEach(function(row) {
	        row.row.forEach(function(eventRow) {
	          flattenedEvents.push(eventRow.event);
	        });
	      });
	      weekView.days.forEach(function(day) {
	        var dayEvents = flattenedEvents.filter(function(event) {
	          return moment(event.startsAt).startOf('day').isSame(moment(day.date).startOf('day'));
	        });
	        var newDayEvents = getDayView(
	          dayEvents,
	          day.date,
	          dayViewStart,
	          dayViewEnd,
	          dayViewSplit
	        ).events;
	        newEvents = newEvents.concat(newDayEvents);
	      });
	      weekView.eventRows = [{
	        row: newEvents.map(function(dayEvent) {
	          var event = dayEvent.event;
	          return {
	            event: event,
	            top: dayEvent.top,
	            offset: calendarUtils.getDayOffset(
	              {start: event.startsAt, end: event.endsAt},
	              moment(viewDate).startOf('week')
	            )
	          };
	        })
	      }];
	      return weekView;
	    }

	    function getDayViewHeight(dayViewStart, dayViewEnd, dayViewSplit) {
	      var dayViewStartM = moment(dayViewStart || '00:00', 'HH:mm');
	      var dayViewEndM = moment(dayViewEnd || '23:59', 'HH:mm');
	      var hourHeight = (60 / dayViewSplit) * 30;
	      return ((dayViewEndM.diff(dayViewStartM, 'minutes') / 60) * hourHeight) + 3;
	    }

	    function loadTemplates() {

	      var templatePromises = Object.keys(calendarConfig.templates).map(function(key) {
	        var templateUrl = calendarConfig.templates[key];
	        return $templateRequest(templateUrl);
	      });

	      return $q.all(templatePromises);

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
	      loadTemplates: loadTemplates,
	      eventIsInPeriod: eventIsInPeriod //expose for testing only
	    };

	  }]);


/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var angular = __webpack_require__(12);

	angular
	  .module('mwl.calendar')
	  .factory('calendarTitle', ["moment", "calendarConfig", "calendarHelper", function(moment, calendarConfig, calendarHelper) {

	    function day(viewDate) {
	      return calendarHelper.formatDate(viewDate, calendarConfig.titleFormats.day);
	    }

	    function week(viewDate) {
	      return calendarConfig.titleFormats.week
	        .replace('{week}', moment(viewDate).isoWeek())
	        .replace('{year}', moment(viewDate).startOf('week').format('YYYY'));
	    }

	    function month(viewDate) {
	      return calendarHelper.formatDate(viewDate, calendarConfig.titleFormats.month);
	    }

	    function year(viewDate) {
	      return calendarHelper.formatDate(viewDate, calendarConfig.titleFormats.year);
	    }

	    return {
	      day: day,
	      week: week,
	      month: month,
	      year: year
	    };

	  }]);


/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var angular = __webpack_require__(12);
	var interact;
	try {
	  interact = __webpack_require__(52);
	} catch (e) {
	  /* istanbul ignore next */
	  interact = null;
	}

	angular
	  .module('mwl.calendar')
	  .constant('interact', interact);


/***/ },
/* 52 */
/***/ function(module, exports) {

	if(typeof __WEBPACK_EXTERNAL_MODULE_52__ === 'undefined') {var e = new Error("Cannot find module \"undefined\""); e.code = 'MODULE_NOT_FOUND'; throw e;}
	module.exports = __WEBPACK_EXTERNAL_MODULE_52__;

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var angular = __webpack_require__(12);
	var moment = __webpack_require__(28);

	angular
	  .module('mwl.calendar')
	  .constant('moment', moment);


/***/ }
/******/ ])
});
;