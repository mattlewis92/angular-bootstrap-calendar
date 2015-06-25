/**
 * angular-bootstrap-calendar - A pure AngularJS bootstrap themed responsive calendar that can display events and has views for year, month, week and day
 * @version v0.11.3
 * @link https://github.com/mattlewis92/angular-bootstrap-calendar
 * @license MIT
 */
(function (window, angular) {
    'use strict';
    angular.module('mwl.calendar', []);
    angular.module('mwl.calendar').run([
        '$templateCache',
        function ($templateCache) {
            $templateCache.put('src/templates/calendar.html', '<div class="cal-context" ng-switch="view"><div class="alert alert-danger" ng-switch-default>The value passed to the view attribute of the calendar is not set</div><div class="alert alert-danger" ng-hide="currentDay">The value passed to current-day attribute of the calendar is not set</div><mwl-calendar-year events="events" current-day="currentDay" on-event-click="onEventClick" on-event-drop="onEventDrop" on-edit-event-click="onEditEventClick" on-delete-event-click="onDeleteEventClick" on-timespan-click="onTimespanClick" edit-event-html="editEventHtml" delete-event-html="deleteEventHtml" auto-open="autoOpen" ng-switch-when="year"></mwl-calendar-year><mwl-calendar-month events="events" current-day="currentDay" on-event-click="onEventClick" on-event-drop="onEventDrop" on-edit-event-click="onEditEventClick" on-delete-event-click="onDeleteEventClick" on-timespan-click="onTimespanClick" edit-event-html="editEventHtml" delete-event-html="deleteEventHtml" auto-open="autoOpen" ng-switch-when="month"></mwl-calendar-month><mwl-calendar-week events="events" current-day="currentDay" on-event-click="onEventClick" on-event-drop="onEventDrop" day-view-start="dayViewStart" day-view-end="dayViewEnd" day-view-split="dayViewSplit || 30" ng-switch-when="week"></mwl-calendar-week><mwl-calendar-day events="events" current-day="currentDay" on-event-click="onEventClick" on-event-drop="onEventDrop" day-view-start="dayViewStart" day-view-end="dayViewEnd" day-view-split="dayViewSplit || 30" ng-switch-when="day"></mwl-calendar-day></div>');
            $templateCache.put('src/templates/calendarDayView.html', '<div class="cal-day-box"><div class="row-fluid clearfix cal-row-head"><div class="span1 col-xs-1 cal-cell" ng-bind="vm.calendarConfig.i18nStrings.timeLabel"></div><div class="span11 col-xs-11 cal-cell" ng-bind="vm.calendarConfig.i18nStrings.eventsLabel"></div></div><div class="cal-day-panel clearfix" ng-style="{height: vm.dayViewHeight + \'px\'}"><mwl-calendar-hour-list day-view-start="dayViewStart" day-view-end="dayViewEnd" day-view-split="dayViewSplit"></mwl-calendar-hour-list><div class="pull-left day-event day-highlight" ng-class="\'dh-event-\' + event.type + \' \' + event.cssClass" ng-repeat="event in vm.view track by event.$id" ng-style="{top: event.top + \'px\', left: event.left + 60 + \'px\', height: event.height + \'px\'}" mwl-draggable="event.editable !== false" axis="y" snap-grid="{y: 30}" on-drag="vm.tempTimeChanged(event, y)" on-drag-end="vm.timeChanged(event, y)"><span class="cal-hours"><span ng-show="event.top == 0"><span ng-bind="(event.tempStartsAt || event.startsAt) | calendarDate:\'day\':true"></span>,</span> <span ng-bind="(event.tempStartsAt || event.startsAt) | calendarDate:\'time\':true"></span></span> <a href="javascript:;" class="event-item" ng-click="onEventClick({calendarEvent: event})"><span ng-bind-html="vm.$sce.trustAsHtml(event.title) | calendarTruncateEventTitle:20:event.height"></span></a></div></div></div>');
            $templateCache.put('src/templates/calendarHourList.html', '<div class="cal-day-panel-hour"><div class="cal-day-hour" ng-repeat="hour in vm.hours track by $index"><div class="row-fluid cal-day-hour-part"><div class="span1 col-xs-1"><strong ng-bind="hour.label"></strong></div><div class="span11 col-xs-11"></div></div><div class="row-fluid cal-day-hour-part"><div class="span1 col-xs-1"></div><div class="span11 col-xs-11"></div></div><div class="row-fluid cal-day-hour-part" ng-show="vm.dayViewSplit < 30"><div class="span1 col-xs-1"></div><div class="span11 col-xs-11"></div></div><div class="row-fluid cal-day-hour-part" ng-show="vm.dayViewSplit < 30"><div class="span1 col-xs-1"></div><div class="span11 col-xs-11"></div></div><div class="row-fluid cal-day-hour-part" ng-show="vm.dayViewSplit < 15"><div class="span1 col-xs-1"></div><div class="span11 col-xs-11"></div></div><div class="row-fluid cal-day-hour-part" ng-show="vm.dayViewSplit < 15"><div class="span1 col-xs-1"></div><div class="span11 col-xs-11"></div></div></div></div>');
            $templateCache.put('src/templates/calendarMonthDay.html', '<div mwl-droppable on-drop="vm.handleEventDrop(dropData.event, day.date)" class="cal-month-day" ng-class="{\n            \'cal-day-outmonth\': !day.inMonth,\n            \'cal-day-inmonth\': day.inMonth,\n            \'cal-day-weekend\': day.isWeekend,\n            \'cal-day-past\': day.isPast,\n            \'cal-day-today\': day.isToday,\n            \'cal-day-future\': day.isFuture\n          }"><small class="cal-events-num badge badge-important pull-left" ng-show="day.badgeTotal > 0" ng-bind="day.badgeTotal"></small> <span class="pull-right" data-cal-date ng-click="vm.calendarCtrl.drillDown(day.date)" ng-bind="day.label"></span><div class="cal-day-tick" ng-show="dayIndex === vm.openDayIndex && vm.view[vm.openDayIndex].events.length > 0"><i class="glyphicon glyphicon-chevron-up"></i> <i class="fa fa-chevron-up"></i></div><div ng-include="\'src/templates/calendarMonthEventsList.html\'"></div></div>');
            $templateCache.put('src/templates/calendarMonthEventsList.html', '<div class="events-list" ng-show="day.events.length > 0"><a ng-repeat="event in day.events | orderBy:\'startsAt\' track by event.$id" href="javascript:;" ng-click="onEventClick({calendarEvent: event})" class="pull-left event" ng-class="\'event-\' + event.type + \' \' + event.cssClass" ng-mouseenter="vm.highlightEvent(event, true)" ng-mouseleave="vm.highlightEvent(event, false)" tooltip-append-to-body="true" tooltip-html-unsafe="{{ (event.startsAt | calendarDate:\'time\':true) + \' - \' + event.title }}" mwl-draggable="event.editable !== false" drop-data="{event: event}"></a></div>');
            $templateCache.put('src/templates/calendarMonthView.html', '<div class="cal-row-fluid cal-row-head"><div class="cal-cell1" ng-repeat="day in vm.weekDays track by $index" ng-bind="day"></div></div><div class="cal-month-box"><div ng-repeat="rowOffset in vm.monthOffsets track by rowOffset"><div class="cal-row-fluid cal-before-eventlist"><div ng-repeat="day in vm.view | calendarLimitTo:7:rowOffset track by $index" ng-init="dayIndex = vm.view.indexOf(day)" class="cal-cell1 cal-cell {{ day.highlightClass }}" ng-click="vm.dayClicked(day)" ng-class="{pointer: day.events.length > 0}"><div ng-include="\'src/templates/calendarMonthDay.html\'"></div></div></div><mwl-calendar-slide-box is-open="vm.openRowIndex === $index && vm.view[vm.openDayIndex].events.length > 0" events="vm.view[vm.openDayIndex].events" on-event-click="onEventClick" edit-event-html="editEventHtml" on-edit-event-click="onEditEventClick" delete-event-html="deleteEventHtml" on-delete-event-click="onDeleteEventClick"></mwl-calendar-slide-box></div></div>');
            $templateCache.put('src/templates/calendarSlideBox.html', '<div class="cal-slide-box" collapse="vm.shouldCollapse" mwl-collapse-fallback="vm.shouldCollapse"><div class="cal-slide-content cal-event-list"><ul class="unstyled list-unstyled"><li ng-repeat="event in events | orderBy:\'startsAt\' track by event.$id" ng-class="event.cssClass" mwl-draggable="event.editable !== false" drop-data="{event: event}"><span class="pull-left event" ng-class="\'event-\' + event.type"></span> &nbsp; <a href="javascript:;" class="event-item" ng-click="onEventClick({calendarEvent: event})"><span ng-bind-html="vm.$sce.trustAsHtml(event.title)"></span> <span ng-show="isMonthView">(<span ng-bind="event.startsAt | calendarDate:\'time\':true"></span>)</span> <span ng-show="isYearView">(<span ng-bind="event.startsAt | calendarDate:\'datetime\':true"></span>)</span></a> <a href="javascript:;" class="event-item-edit" ng-if="editEventHtml && event.editable !== false" ng-bind-html="vm.$sce.trustAsHtml(editEventHtml)" ng-click="onEditEventClick({calendarEvent: event})"></a> <a href="javascript:;" class="event-item-delete" ng-if="deleteEventHtml && event.deletable !== false" ng-bind-html="vm.$sce.trustAsHtml(deleteEventHtml)" ng-click="onDeleteEventClick({calendarEvent: event})"></a></li></ul></div></div>');
            $templateCache.put('src/templates/calendarWeekView.html', '<div class="cal-week-box" ng-class="{\'cal-day-box\': vm.showTimes}"><div class="cal-row-fluid cal-row-head"><div class="cal-cell1" ng-repeat="day in vm.view.days track by $index" ng-class="{\n        \'cal-day-weekend\': day.isWeekend,\n        \'cal-day-past\': day.isPast,\n        \'cal-day-today\': day.isToday,\n        \'cal-day-future\': day.isFuture}" mwl-element-dimensions="vm.dayColumnDimensions"><span ng-bind="day.weekDayLabel"></span><br><small><span data-cal-date ng-click="vm.calendarCtrl.drillDown(day.date)" class="pointer" ng-bind="day.dayLabel"></span></small></div></div><div class="cal-day-panel clearfix" ng-style="{height: vm.showTimes ? (vm.dayViewHeight + \'px\') : \'auto\'}"><mwl-calendar-hour-list day-view-start="dayViewStart" day-view-end="dayViewEnd" day-view-split="dayViewSplit" ng-if="vm.showTimes"></mwl-calendar-hour-list><div class="row"><div class="col-xs-12"><div class="cal-row-fluid" ng-repeat="event in vm.view.events track by event.$id"><div ng-class="\'cal-cell\' + (vm.showTimes ? 1 : event.daySpan) + \' cal-offset\' + event.dayOffset + \' day-highlight dh-event-\' + event.type + \' \' + event.cssClass" ng-style="{top: vm.showTimes ? ((event.top + 2) + \'px\') : \'auto\', position: vm.showTimes ? \'absolute\' : \'inherit\'}" data-event-class mwl-draggable="event.editable !== false" axis="vm.showTimes ? \'xy\' : \'x\'" snap-grid="vm.showTimes ? {x: vm.dayColumnDimensions.width, y: 30} : {x: vm.dayColumnDimensions.width}" on-drag="vm.tempTimeChanged(event, y)" on-drag-end="vm.weekDragged(event, x, y)"><strong ng-bind="(event.tempStartsAt || event.startsAt) | calendarDate:\'time\':true" ng-show="vm.showTimes"></strong> <a href="javascript:;" ng-click="onEventClick({calendarEvent: event})" class="event-item" ng-bind-html="vm.$sce.trustAsHtml(event.title)" tooltip-html-unsafe="{{ event.title }}" tooltip-placement="left" tooltip-append-to-body="true"></a></div></div></div></div></div></div>');
            $templateCache.put('src/templates/calendarYearView.html', '<div class="cal-year-box"><div ng-repeat="rowOffset in [0, 4, 8] track by rowOffset"><div class="row cal-before-eventlist"><div class="span3 col-md-3 col-xs-6 cal-cell" ng-repeat="month in vm.view | calendarLimitTo:4:rowOffset track by $index" ng-init="monthIndex = vm.view.indexOf(month)" ng-click="vm.monthClicked(month)" ng-class="{pointer: month.events.length > 0, \'cal-day-today\': month.isToday}" mwl-droppable on-drop="vm.handleEventDrop(dropData.event, month.date)"><span class="pull-right" data-cal-date ng-click="vm.calendarCtrl.drillDown(month.date)" ng-bind="month.label"></span> <small class="cal-events-num badge badge-important pull-left" ng-show="month.badgeTotal > 0" ng-bind="month.badgeTotal"></small><div class="cal-day-tick" ng-show="monthIndex === vm.openMonthIndex && vm.view[vm.openMonthIndex].events.length > 0"><i class="glyphicon glyphicon-chevron-up"></i> <i class="fa fa-chevron-up"></i></div></div></div><mwl-calendar-slide-box is-open="vm.openRowIndex === $index && vm.view[vm.openMonthIndex].events.length > 0" events="vm.view[vm.openMonthIndex].events" on-event-click="onEventClick" edit-event-html="editEventHtml" on-edit-event-click="onEditEventClick" delete-event-html="deleteEventHtml" on-delete-event-click="onDeleteEventClick"></mwl-calendar-slide-box></div></div>');
        }
    ]);
    'use strict';
    angular.module('mwl.calendar').constant('moment', window.moment);
    //eslint-disable-line angular/ng_window_service
    'use strict';
    angular.module('mwl.calendar').constant('interact', window.interact);
    //eslint-disable-line angular/ng_window_service
    'use strict';
    angular.module('mwl.calendar').factory('calendarTitle', [
        'moment',
        'calendarConfig',
        'calendarHelper',
        function (moment, calendarConfig, calendarHelper) {
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
        }
    ]);
    'use strict';
    angular.module('mwl.calendar').factory('calendarHelper', [
        'dateFilter',
        'moment',
        'calendarConfig',
        function (dateFilter, moment, calendarConfig) {
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
                        eventStart.set({ year: periodStart.year() });
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
                return eventStart.isAfter(periodStart) && eventStart.isBefore(periodEnd) || eventEnd.isAfter(periodStart) && eventEnd.isBefore(periodEnd) || eventStart.isBefore(periodStart) && eventEnd.isAfter(periodEnd) || eventStart.isSame(periodStart) || eventEnd.isSame(periodEnd);
            }
            function filterEventsInPeriod(events, startPeriod, endPeriod) {
                return events.filter(function (event) {
                    return eventIsInPeriod(event, startPeriod, endPeriod);
                });
            }
            function getEventsInPeriod(calendarDate, period, allEvents) {
                var startPeriod = moment(calendarDate).startOf(period);
                var endPeriod = moment(calendarDate).endOf(period);
                return filterEventsInPeriod(allEvents, startPeriod, endPeriod);
            }
            function getBadgeTotal(events) {
                return events.filter(function (event) {
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
            function getYearView(events, currentDay) {
                var view = [];
                var eventsInPeriod = getEventsInPeriod(currentDay, 'year', events);
                var month = moment(currentDay).startOf('year');
                var count = 0;
                while (count < 12) {
                    var startPeriod = month.clone();
                    var endPeriod = startPeriod.clone().endOf('month');
                    var periodEvents = filterEventsInPeriod(eventsInPeriod, startPeriod, endPeriod);
                    view.push({
                        label: formatDate(startPeriod, calendarConfig.dateFormats.month),
                        isToday: startPeriod.isSame(moment().startOf('month')),
                        events: periodEvents,
                        date: startPeriod,
                        badgeTotal: getBadgeTotal(periodEvents)
                    });
                    month.add(1, 'month');
                    count++;
                }
                return view;
            }
            function getMonthView(events, currentDay) {
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
                    view.push({
                        label: day.date(),
                        date: day.clone(),
                        inMonth: inMonth,
                        isPast: today.isAfter(day),
                        isToday: today.isSame(day),
                        isFuture: today.isBefore(day),
                        isWeekend: [
                            0,
                            6
                        ].indexOf(day.day()) > -1,
                        events: monthEvents,
                        badgeTotal: getBadgeTotal(monthEvents)
                    });
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
                        isWeekend: [
                            0,
                            6
                        ].indexOf(dayCounter.day()) > -1
                    });
                    dayCounter.add(1, 'day');
                }
                var eventsSorted = filterEventsInPeriod(events, startOfWeek, endOfWeek).map(function (event) {
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
                return {
                    days: days,
                    events: eventsSorted
                };
            }
            function getDayView(events, currentDay, dayViewStart, dayViewEnd, dayViewSplit) {
                var dayStartHour = moment(dayViewStart || '00:00', 'HH:mm').hours();
                var dayEndHour = moment(dayViewEnd || '23:00', 'HH:mm').hours();
                var hourHeight = 60 / dayViewSplit * 30;
                var calendarStart = moment(currentDay).startOf('day').add(dayStartHour, 'hours');
                var calendarEnd = moment(currentDay).startOf('day').add(dayEndHour, 'hours');
                var calendarHeight = (dayEndHour - dayStartHour + 1) * hourHeight;
                var hourHeightMultiplier = hourHeight / 60;
                var buckets = [];
                var eventsInPeriod = filterEventsInPeriod(events, moment(currentDay).startOf('day').toDate(), moment(currentDay).endOf('day').toDate());
                return eventsInPeriod.map(function (event) {
                    if (moment(event.startsAt).isBefore(calendarStart)) {
                        event.top = 0;
                    } else {
                        event.top = moment(event.startsAt).startOf('minute').diff(calendarStart.startOf('minute'), 'minutes') * hourHeightMultiplier - 2;
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
                }).filter(function (event) {
                    return event.height > 0;
                }).map(function (event) {
                    var cannotFitInABucket = true;
                    buckets.forEach(function (bucket, bucketIndex) {
                        var canFitInThisBucket = true;
                        bucket.forEach(function (bucketItem) {
                            if (eventIsInPeriod(event, bucketItem.startsAt, bucketItem.endsAt || bucketItem.startsAt) || eventIsInPeriod(bucketItem, event.startsAt, event.endsAt || event.startsAt)) {
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
                weekView.days.forEach(function (day) {
                    var dayEvents = weekView.events.filter(function (event) {
                        return moment(event.startsAt).startOf('day').isSame(moment(day.date).startOf('day'));
                    });
                    var newDayEvents = getDayView(dayEvents, day.date, dayViewStart, dayViewEnd, dayViewSplit);
                    newEvents = newEvents.concat(newDayEvents);
                });
                weekView.events = newEvents;
                return weekView;
            }
            function getDayViewHeight(dayViewStart, dayViewEnd, dayViewSplit) {
                var dayViewStartM = moment(dayViewStart || '00:00', 'HH:mm');
                var dayViewEndM = moment(dayViewEnd || '23:00', 'HH:mm');
                var hourHeight = 60 / dayViewSplit * 30;
                return (dayViewEndM.diff(dayViewStartM, 'hours') + 1) * hourHeight + 2;
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
                eventIsInPeriod: eventIsInPeriod    //expose for testing only
            };
        }
    ]);
    'use strict';
    angular.module('mwl.calendar').service('calendarDebounce', [
        '$timeout',
        function ($timeout) {
            function debounce(func, wait, immediate) {
                var timeout;
                return function () {
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
        }
    ]);
    'use strict';
    angular.module('mwl.calendar').provider('calendarConfig', function () {
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
        configProvider.setDateFormats = function (formats) {
            angular.extend(defaultDateFormats, formats);
            return configProvider;
        };
        configProvider.setTitleFormats = function (formats) {
            angular.extend(defaultTitleFormats, formats);
            return configProvider;
        };
        configProvider.setI18nStrings = function (strings) {
            angular.extend(i18nStrings, strings);
            return configProvider;
        };
        configProvider.setDisplayAllMonthEvents = function (value) {
            displayAllMonthEvents = value;
            return configProvider;
        };
        configProvider.setDateFormatter = function (value) {
            if ([
                    'angular',
                    'moment'
                ].indexOf(value) === -1) {
                throw new Error('Invalid date formatter. Allowed types are angular and moment.');
            }
            dateFormatter = value;
            defaultDateFormats = angular.copy(defaultFormats[dateFormatter].date);
            defaultTitleFormats = angular.copy(defaultFormats[dateFormatter].title);
            return configProvider;
        };
        configProvider.showTimesOnWeekView = function (value) {
            showTimesOnWeekView = value;
            //experimental, and ignores the event end date
            return configProvider;
        };
        configProvider.$get = function () {
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
    'use strict';
    angular.module('mwl.calendar').filter('calendarTruncateEventTitle', function () {
        return function (string, length, boxHeight) {
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
    'use strict';
    angular.module('mwl.calendar').filter('calendarLimitTo', [
        'limitToFilter',
        function (limitToFilter) {
            if (angular.version.minor >= 4) {
                //1.4+ supports the begin attribute
                return limitToFilter;
            }
            //Copied from the angular source. Only 1.4 has the begin functionality.
            return function (input, limit, begin) {
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
                begin = !begin || isNaN(begin) ? 0 : parseInt(begin);
                begin = begin < 0 && begin >= -input.length ? input.length + begin : begin;
                if (limit >= 0) {
                    return input.slice(begin, begin + limit);
                } else if (begin === 0) {
                    return input.slice(limit, input.length);
                } else {
                    return input.slice(Math.max(0, begin + limit), begin);
                }
            };
        }
    ]);
    'use strict';
    angular.module('mwl.calendar').filter('calendarDate', [
        'calendarHelper',
        'calendarConfig',
        function (calendarHelper, calendarConfig) {
            function calendarDate(date, format, getFromConfig) {
                if (getFromConfig === true) {
                    format = calendarConfig.dateFormats[format];
                }
                return calendarHelper.formatDate(date, format);
            }
            calendarDate.$stateful = true;
            return calendarDate;
        }
    ]);
    'use strict';
    angular.module('mwl.calendar').controller('MwlElementDimensionsCtrl', [
        '$element',
        '$scope',
        '$parse',
        '$attrs',
        function ($element, $scope, $parse, $attrs) {
            $parse($attrs.mwlElementDimensions).assign($scope, {
                width: $element[0].offsetWidth,
                height: $element[0].offsetHeight
            });
        }
    ]).directive('mwlElementDimensions', function () {
        return {
            restrict: 'A',
            controller: 'MwlElementDimensionsCtrl'
        };
    });
    'use strict';
    angular.module('mwl.calendar').controller('MwlDroppableCtrl', [
        '$element',
        '$scope',
        '$parse',
        '$attrs',
        'interact',
        function ($element, $scope, $parse, $attrs, interact) {
            if (!interact) {
                return;
            }
            interact($element[0]).dropzone({
                ondragenter: function (event) {
                    angular.element(event.target).addClass('drop-active');
                },
                ondragleave: function (event) {
                    angular.element(event.target).removeClass('drop-active');
                },
                ondropdeactivate: function (event) {
                    angular.element(event.target).removeClass('drop-active');
                },
                ondrop: function (event) {
                    if (event.relatedTarget.dropData) {
                        $parse($attrs.onDrop)($scope, { dropData: event.relatedTarget.dropData });
                        $scope.$apply();
                    }
                }
            });
            var unbindDestroy = $scope.$on('$destroy', function () {
                unbindDestroy();
                interact($element[0]).unset();
            });
        }
    ]).directive('mwlDroppable', function () {
        return {
            restrict: 'A',
            controller: 'MwlDroppableCtrl'
        };
    });
    'use strict';
    angular.module('mwl.calendar').controller('MwlDraggableCtrl', [
        '$element',
        '$scope',
        '$window',
        '$parse',
        '$attrs',
        '$timeout',
        'interact',
        function ($element, $scope, $window, $parse, $attrs, $timeout, interact) {
            if (!interact) {
                return;
            }
            var snap, snapGridDimensions;
            if ($attrs.snapGrid) {
                snapGridDimensions = $parse($attrs.snapGrid)($scope);
                snap = { targets: [interact.createSnapGrid(snapGridDimensions)] };
            }
            function translateElement(elm, transformValue) {
                return elm.css('transform', transformValue).css('-ms-transform', transformValue).css('-webkit-transform', transformValue);
            }
            function canDrag() {
                return $parse($attrs.mwlDraggable)($scope);
            }
            function getUnitsMoved(x, y, gridDimensions) {
                var result = {
                    x: x,
                    y: y
                };
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
                onstart: function (event) {
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
                onmove: function (event) {
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
                        translateElement(elm, 'translate(' + x + 'px, ' + y + 'px)').css('z-index', 1000).attr('data-x', x).attr('data-y', y);
                        if ($attrs.onDrag) {
                            $parse($attrs.onDrag)($scope, getUnitsMoved(x, y, snapGridDimensions));
                            $scope.$apply();
                        }
                    }
                },
                onend: function (event) {
                    if (canDrag()) {
                        var elm = angular.element(event.target);
                        var x = elm.attr('data-x');
                        var y = elm.attr('data-y');
                        event.target.style.pointerEvents = 'auto';
                        if ($attrs.onDragEnd) {
                            $parse($attrs.onDragEnd)($scope, getUnitsMoved(x, y, snapGridDimensions));
                            $scope.$apply();
                        }
                        $timeout(function () {
                            translateElement(elm, null).removeAttr('data-x').removeAttr('data-y').removeClass('dragging-active');
                        }, 50);
                    }
                }
            });
            var unbindDestroy = $scope.$on('$destroy', function () {
                unbindDestroy();
                interact($element[0]).unset();
            });
        }
    ]).directive('mwlDraggable', function () {
        return {
            restrict: 'A',
            controller: 'MwlDraggableCtrl'
        };
    });
    'use strict';
    angular.module('mwl.calendar').controller('MwlDateModifierCtrl', [
        '$element',
        '$attrs',
        '$scope',
        'moment',
        function ($element, $attrs, $scope, moment) {
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
            $scope.$on('$destroy', function () {
                $element.unbind('click', onClick);
            });
        }
    ]).directive('mwlDateModifier', function () {
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
    'use strict';
    angular.module('mwl.calendar').controller('MwlCollapseFallbackCtrl', [
        '$scope',
        '$attrs',
        '$element',
        function ($scope, $attrs, $element) {
            var unbindWatcher = $scope.$watch($attrs.mwlCollapseFallback, function (shouldCollapse) {
                if (shouldCollapse) {
                    $element.addClass('ng-hide');
                } else {
                    $element.removeClass('ng-hide');
                }
            });
            var unbindDestroy = $scope.$on('$destroy', function () {
                unbindDestroy();
                unbindWatcher();
            });
        }
    ]).directive('mwlCollapseFallback', [
        '$injector',
        function ($injector) {
            if ($injector.has('collapseDirective')) {
                return {};
            }
            return {
                restrict: 'A',
                controller: 'MwlCollapseFallbackCtrl'
            };
        }
    ]);
    'use strict';
    angular.module('mwl.calendar').controller('MwlCalendarYearCtrl', [
        '$scope',
        'moment',
        'calendarHelper',
        function ($scope, moment, calendarHelper) {
            var vm = this;
            var firstRun = true;
            var unbindListener = $scope.$on('calendar.refreshView', function () {
                vm.view = calendarHelper.getYearView($scope.events, $scope.currentDay);
                //Auto open the calendar to the current day if set
                if ($scope.autoOpen && firstRun) {
                    firstRun = false;
                    vm.view.forEach(function (month) {
                        if (moment($scope.currentDay).startOf('month').isSame(month.date)) {
                            vm.monthClicked(month, true);
                        }
                    });
                }
            });
            $scope.$on('$destroy', function () {
                unbindListener();
            });
            vm.monthClicked = function (month, monthClickedFirstRun) {
                if (!monthClickedFirstRun) {
                    $scope.onTimespanClick({ calendarDate: month.date.toDate() });
                }
                vm.openRowIndex = null;
                var monthIndex = vm.view.indexOf(month);
                if (monthIndex === vm.openMonthIndex) {
                    //the month has been clicked and is already open
                    vm.openMonthIndex = null;    //close the open month
                } else {
                    vm.openMonthIndex = monthIndex;
                    vm.openRowIndex = Math.floor(monthIndex / 4);
                }
            };
            vm.handleEventDrop = function (event, newMonthDate) {
                var newStart = moment(event.startsAt).month(moment(newMonthDate).month());
                var newEnd = calendarHelper.adjustEndDateFromStartDiff(event.startsAt, newStart, event.endsAt);
                $scope.onEventDrop({
                    calendarEvent: event,
                    calendarDate: newMonthDate,
                    calendarNewEventStart: newStart.toDate(),
                    calendarNewEventEnd: newEnd.toDate()
                });
            };
        }
    ]).directive('mwlCalendarYear', function () {
        return {
            templateUrl: 'src/templates/calendarYearView.html',
            restrict: 'EA',
            require: '^mwlCalendar',
            scope: {
                events: '=',
                currentDay: '=',
                onEventClick: '=',
                onEventDrop: '=',
                onEditEventClick: '=',
                onDeleteEventClick: '=',
                editEventHtml: '=',
                deleteEventHtml: '=',
                autoOpen: '=',
                onTimespanClick: '='
            },
            controller: 'MwlCalendarYearCtrl as vm',
            link: function (scope, element, attrs, calendarCtrl) {
                scope.vm.calendarCtrl = calendarCtrl;
            }
        };
    });
    'use strict';
    angular.module('mwl.calendar').controller('MwlCalendarWeekCtrl', [
        '$scope',
        '$sce',
        'moment',
        'calendarHelper',
        'calendarConfig',
        function ($scope, $sce, moment, calendarHelper, calendarConfig) {
            var vm = this;
            vm.showTimes = calendarConfig.showTimesOnWeekView;
            vm.$sce = $sce;
            var unbindListener = $scope.$on('calendar.refreshView', function () {
                vm.dayViewHeight = calendarHelper.getDayViewHeight($scope.dayViewStart, $scope.dayViewEnd, $scope.dayViewSplit);
                if (vm.showTimes) {
                    vm.view = calendarHelper.getWeekViewWithTimes($scope.events, $scope.currentDay, $scope.dayViewStart, $scope.dayViewEnd, $scope.dayViewSplit);
                } else {
                    vm.view = calendarHelper.getWeekView($scope.events, $scope.currentDay);
                }
            });
            $scope.$on('$destroy', function () {
                unbindListener();
            });
            vm.weekDragged = function (event, daysDiff, minuteChunksMoved) {
                var newStart = moment(event.startsAt).add(daysDiff, 'days');
                var newEnd = moment(event.endsAt).add(daysDiff, 'days');
                if (minuteChunksMoved) {
                    var minutesDiff = minuteChunksMoved * $scope.dayViewSplit;
                    newStart = newStart.add(minutesDiff, 'minutes');
                    newEnd = newEnd.add(minutesDiff, 'minutes');
                }
                delete event.tempStartsAt;
                $scope.onEventDrop({
                    calendarEvent: event,
                    calendarNewEventStart: newStart.toDate(),
                    calendarNewEventEnd: newEnd.toDate()
                });
            };
            vm.tempTimeChanged = function (event, minuteChunksMoved) {
                var minutesDiff = minuteChunksMoved * $scope.dayViewSplit;
                event.tempStartsAt = moment(event.startsAt).add(minutesDiff, 'minutes').toDate();
            };
        }
    ]).directive('mwlCalendarWeek', function () {
        return {
            templateUrl: 'src/templates/calendarWeekView.html',
            restrict: 'EA',
            require: '^mwlCalendar',
            scope: {
                events: '=',
                currentDay: '=',
                onEventClick: '=',
                onEventDrop: '=',
                dayViewStart: '=',
                dayViewEnd: '=',
                dayViewSplit: '='
            },
            controller: 'MwlCalendarWeekCtrl as vm',
            link: function (scope, element, attrs, calendarCtrl) {
                scope.vm.calendarCtrl = calendarCtrl;
            }
        };
    });
    'use strict';
    angular.module('mwl.calendar').controller('MwlCalendarSlideBoxCtrl', [
        '$scope',
        '$sce',
        function ($scope, $sce) {
            var vm = this;
            vm.$sce = $sce;
            var unbindWatcher = $scope.$watch('isOpen', function (isOpen) {
                vm.shouldCollapse = !isOpen;
            });
            var unbindDestroy = $scope.$on('$destroy', function () {
                unbindDestroy();
                unbindWatcher();
            });
        }
    ]).directive('mwlCalendarSlideBox', function () {
        return {
            restrict: 'EA',
            templateUrl: 'src/templates/calendarSlideBox.html',
            replace: true,
            controller: 'MwlCalendarSlideBoxCtrl as vm',
            require: [
                '^?mwlCalendarMonth',
                '^?mwlCalendarYear'
            ],
            link: function (scope, elm, attrs, ctrls) {
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
    'use strict';
    angular.module('mwl.calendar').controller('MwlCalendarMonthCtrl', [
        '$scope',
        'moment',
        'calendarHelper',
        function ($scope, moment, calendarHelper) {
            var vm = this;
            var firstRun = true;
            var unbindListener = $scope.$on('calendar.refreshView', function () {
                vm.weekDays = calendarHelper.getWeekDayNames();
                vm.view = calendarHelper.getMonthView($scope.events, $scope.currentDay);
                var rows = Math.floor(vm.view.length / 7);
                vm.monthOffsets = [];
                for (var i = 0; i < rows; i++) {
                    vm.monthOffsets.push(i * 7);
                }
                //Auto open the calendar to the current day if set
                if ($scope.autoOpen && firstRun) {
                    firstRun = false;
                    vm.view.forEach(function (day) {
                        if (day.inMonth && moment($scope.currentDay).startOf('day').isSame(day.date)) {
                            vm.dayClicked(day, true);
                        }
                    });
                }
            });
            $scope.$on('$destroy', function () {
                unbindListener();
            });
            vm.dayClicked = function (day, dayClickedFirstRun) {
                if (!dayClickedFirstRun) {
                    $scope.onTimespanClick({ calendarDate: day.date.toDate() });
                }
                vm.openRowIndex = null;
                var dayIndex = vm.view.indexOf(day);
                if (dayIndex === vm.openDayIndex) {
                    //the day has been clicked and is already open
                    vm.openDayIndex = null;    //close the open day
                } else {
                    vm.openDayIndex = dayIndex;
                    vm.openRowIndex = Math.floor(dayIndex / 7);
                }
            };
            vm.highlightEvent = function (event, shouldAddClass) {
                vm.view.forEach(function (day) {
                    delete day.highlightClass;
                    if (shouldAddClass) {
                        var dayContainsEvent = day.events.indexOf(event) > -1;
                        if (dayContainsEvent) {
                            day.highlightClass = 'day-highlight dh-event-' + event.type;
                        }
                    }
                });
            };
            vm.handleEventDrop = function (event, newDayDate) {
                var newStart = moment(event.startsAt).date(moment(newDayDate).date()).month(moment(newDayDate).month());
                var newEnd = calendarHelper.adjustEndDateFromStartDiff(event.startsAt, newStart, event.endsAt);
                $scope.onEventDrop({
                    calendarEvent: event,
                    calendarDate: newDayDate,
                    calendarNewEventStart: newStart.toDate(),
                    calendarNewEventEnd: newEnd.toDate()
                });
            };
        }
    ]).directive('mwlCalendarMonth', function () {
        return {
            templateUrl: 'src/templates/calendarMonthView.html',
            restrict: 'EA',
            require: '^mwlCalendar',
            scope: {
                events: '=',
                currentDay: '=',
                onEventClick: '=',
                onEditEventClick: '=',
                onDeleteEventClick: '=',
                onEventDrop: '=',
                editEventHtml: '=',
                deleteEventHtml: '=',
                autoOpen: '=',
                onTimespanClick: '='
            },
            controller: 'MwlCalendarMonthCtrl as vm',
            link: function (scope, element, attrs, calendarCtrl) {
                scope.vm.calendarCtrl = calendarCtrl;
            }
        };
    });
    'use strict';
    angular.module('mwl.calendar').controller('MwlCalendarHourListCtrl', [
        '$scope',
        'moment',
        'calendarConfig',
        'calendarHelper',
        function ($scope, moment, calendarConfig, calendarHelper) {
            var vm = this;
            var dayViewStart, dayViewEnd;
            function updateDays() {
                dayViewStart = moment($scope.dayViewStart || '00:00', 'HH:mm');
                dayViewEnd = moment($scope.dayViewEnd || '23:00', 'HH:mm');
                vm.dayViewSplit = parseInt($scope.dayViewSplit);
                vm.hours = [];
                var dayCounter = moment(dayViewStart);
                for (var i = 0; i <= dayViewEnd.diff(dayViewStart, 'hours'); i++) {
                    vm.hours.push({ label: calendarHelper.formatDate(dayCounter, calendarConfig.dateFormats.hour) });
                    dayCounter.add(1, 'hour');
                }
            }
            var originalLocale = moment.locale();
            var unbindListener = $scope.$on('calendar.refreshView', function () {
                if (originalLocale !== moment.locale()) {
                    originalLocale = moment.locale();
                    updateDays();
                }
            });
            $scope.$on('$destroy', function () {
                unbindListener();
            });
            updateDays();
        }
    ]).directive('mwlCalendarHourList', function () {
        return {
            restrict: 'EA',
            templateUrl: 'src/templates/calendarHourList.html',
            controller: 'MwlCalendarHourListCtrl as vm',
            scope: {
                dayViewStart: '=',
                dayViewEnd: '=',
                dayViewSplit: '='
            }
        };
    });
    'use strict';
    angular.module('mwl.calendar').controller('MwlCalendarDayCtrl', [
        '$scope',
        '$timeout',
        '$sce',
        'moment',
        'calendarHelper',
        'calendarConfig',
        function ($scope, $timeout, $sce, moment, calendarHelper, calendarConfig) {
            var vm = this;
            vm.calendarConfig = calendarConfig;
            vm.$sce = $sce;
            var unbindListener = $scope.$on('calendar.refreshView', function () {
                vm.dayViewHeight = calendarHelper.getDayViewHeight($scope.dayViewStart, $scope.dayViewEnd, $scope.dayViewSplit);
                vm.view = calendarHelper.getDayView($scope.events, $scope.currentDay, $scope.dayViewStart, $scope.dayViewEnd, $scope.dayViewSplit);
            });
            $scope.$on('$destroy', function () {
                unbindListener();
            });
            vm.timeChanged = function (event, minuteChunksMoved) {
                var minutesDiff = minuteChunksMoved * $scope.dayViewSplit;
                var newStart = moment(event.startsAt).add(minutesDiff, 'minutes');
                var newEnd = moment(event.endsAt).add(minutesDiff, 'minutes');
                delete event.tempStartsAt;
                $scope.onEventDrop({
                    calendarEvent: event,
                    calendarNewEventStart: newStart.toDate(),
                    calendarNewEventEnd: newEnd.toDate()
                });
            };
            vm.tempTimeChanged = function (event, minuteChunksMoved) {
                var minutesDiff = minuteChunksMoved * $scope.dayViewSplit;
                event.tempStartsAt = moment(event.startsAt).add(minutesDiff, 'minutes').toDate();
            };
        }
    ]).directive('mwlCalendarDay', function () {
        return {
            templateUrl: 'src/templates/calendarDayView.html',
            restrict: 'EA',
            require: '^mwlCalendar',
            scope: {
                events: '=',
                currentDay: '=',
                onEventClick: '=',
                onEventDrop: '=',
                dayViewStart: '=',
                dayViewEnd: '=',
                dayViewSplit: '='
            },
            controller: 'MwlCalendarDayCtrl as vm'
        };
    });
    'use strict';
    angular.module('mwl.calendar').controller('MwlCalendarCtrl', [
        '$scope',
        '$timeout',
        '$window',
        '$locale',
        'moment',
        'calendarTitle',
        'calendarDebounce',
        function ($scope, $timeout, $window, $locale, moment, calendarTitle, calendarDebounce) {
            var vm = this;
            $scope.events = $scope.events || [];
            vm.changeView = function (view, newDay) {
                $scope.view = view;
                $scope.currentDay = newDay;
            };
            vm.drillDown = function (date) {
                var rawDate = moment(date).toDate();
                var nextView = {
                    year: 'month',
                    month: 'day',
                    week: 'day'
                };
                if ($scope.onDrillDownClick({
                        calendarDate: rawDate,
                        calendarNextView: nextView[$scope.view]
                    }) !== false) {
                    vm.changeView(nextView[$scope.view], rawDate);
                }
            };
            var previousDate = moment($scope.currentDay);
            var previousView = angular.copy($scope.view);
            //Use a debounce to prevent it being called 3 times on initialisation
            var refreshCalendar = calendarDebounce(function () {
                if (calendarTitle[$scope.view]) {
                    $scope.viewTitle = calendarTitle[$scope.view]($scope.currentDay);
                }
                $scope.events = $scope.events.map(function (event, index) {
                    Object.defineProperty(event, '$id', {
                        enumerable: false,
                        value: index
                    });
                    return event;
                });
                //if on-timespan-click="calendarDay = calendarDate" is set then dont update the view as nothing needs to change
                var currentDate = moment($scope.currentDay);
                var shouldUpdate = true;
                if (previousDate.clone().startOf($scope.view).isSame(currentDate.clone().startOf($scope.view)) && !previousDate.isSame(currentDate) && $scope.view === previousView) {
                    shouldUpdate = false;
                }
                previousDate = currentDate;
                previousView = angular.copy($scope.view);
                if (shouldUpdate) {
                    $scope.$broadcast('calendar.refreshView');
                }
            }, 50);
            //Auto update the calendar when the locale changes
            var unbindLocaleWatcher = $scope.$watch(function () {
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
            var unbindDestroyListener = $scope.$on('$destroy', function () {
                unbindOnDestroy.forEach(function (unbind) {
                    unbind();
                });
            });
            unbindOnDestroy.push(unbindDestroyListener);
        }
    ]).directive('mwlCalendar', function () {
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
                onEventDrop: '&',
                onEditEventClick: '&',
                onDeleteEventClick: '&',
                onTimespanClick: '&',
                onDrillDownClick: '&',
                dayViewStart: '@',
                dayViewEnd: '@',
                dayViewSplit: '@'
            },
            controller: 'MwlCalendarCtrl as vm'
        };
    });
}(window, angular));