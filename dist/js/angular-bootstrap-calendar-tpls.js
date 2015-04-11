/**
 * angular-bootstrap-calendar - A pure AngularJS bootstrap themed responsive calendar that can display events and has views for year, month, week and day
 * @version v0.9.2
 * @link https://github.com/mattlewis92/angular-bootstrap-calendar
 * @license MIT
 */
(function (window, angular) {
    'use strict';
    angular.module('mwl.calendar', []);
    angular.module('mwl.calendar').run([
        '$templateCache',
        function ($templateCache) {
            $templateCache.put('src/templates/calendar.html', '<div class="cal-context" ng-switch="view"><div class="alert alert-danger" ng-switch-default>The value passed to calendar-view is not set</div><mwl-calendar-year events="events" current-day="currentDay" event-click="eventClick" edit-event-click="eventEditClick" delete-event-click="eventDeleteClick" edit-event-html="editEventHtml" delete-event-html="deleteEventHtml" auto-open="autoOpen" timespan-click="timespanClick" ng-switch-when="year"></mwl-calendar-year><mwl-calendar-month events="events" current-day="currentDay" event-click="eventClick" edit-event-click="eventEditClick" delete-event-click="eventDeleteClick" edit-event-html="editEventHtml" delete-event-html="deleteEventHtml" auto-open="autoOpen" timespan-click="timespanClick" ng-switch-when="month"></mwl-calendar-month><mwl-calendar-week events="events" current-day="currentDay" event-click="eventClick" timespan-click="timespanClick" ng-switch-when="week"></mwl-calendar-week><mwl-calendar-day events="events" current-day="currentDay" event-click="eventClick" event-label="{{ eventLabel }}" time-label="{{ timeLabel }}" day-view-start="{{ dayViewStart }}" day-view-end="{{ dayViewEnd }}" day-view-split="{{ dayViewSplit || 30 }}" ng-switch-when="day"></mwl-calendar-day></div>');
            $templateCache.put('src/templates/calendarDayView.html', '<div class="cal-day-box"><div class="row-fluid clearfix cal-row-head"><div class="span1 col-xs-1 cal-cell">{{ timeLabel || \'Time\' }}</div><div class="span11 col-xs-11 cal-cell">{{ eventLabel || \'Events\' }}</div></div><div class="cal-day-panel" class="clearfix" ng-style="{height: (days.length * dayHeight) + \'px\'}"><div class="cal-day-panel-hour"><div class="cal-day-hour" ng-repeat="day in days track by $index"><div class="row-fluid cal-day-hour-part"><div class="span1 col-xs-1"><strong>{{ day.label }}</strong></div><div class="span11 col-xs-11"></div></div><div class="row-fluid cal-day-hour-part"><div class="span1 col-xs-1"></div><div class="span11 col-xs-11"></div></div><div class="row-fluid cal-day-hour-part" ng-show="dayViewSplit < 30"><div class="span1 col-xs-1"></div><div class="span11 col-xs-11"></div></div><div class="row-fluid cal-day-hour-part" ng-show="dayViewSplit < 30"><div class="span1 col-xs-1"></div><div class="span11 col-xs-11"></div></div><div class="row-fluid cal-day-hour-part" ng-show="dayViewSplit < 15"><div class="span1 col-xs-1"></div><div class="span11 col-xs-11"></div></div><div class="row-fluid cal-day-hour-part" ng-show="dayViewSplit < 15"><div class="span1 col-xs-1"></div><div class="span11 col-xs-11"></div></div></div></div><div class="pull-left day-event day-highlight dh-event-{{ event.type }}" ng-repeat="event in view track by $index" ng-style="{top: event.top + \'px\', left: event.left + 60 + \'px\', height: event.height + \'px\'}"><a href="javascript:;" class="event-item" ng-click="eventClick({calendarEvent: event})"><span>{{ event.title | truncateEventTitle:20:event.height }}</span></a></div></div></div>');
            $templateCache.put('src/templates/calendarMonthDay.html', '<div class="cal-month-day" ng-class="{\n            \'cal-day-outmonth\': !day.inMonth,\n            \'cal-day-inmonth\': day.inMonth,\n            \'cal-day-weekend\': day.isWeekend,\n            \'cal-day-past\': day.isPast,\n            \'cal-day-today\': day.isToday,\n            \'cal-day-future\': day.isFuture\n          }"><small class="cal-events-num badge badge-important pull-left" ng-show="vm.eventCountBadgeTotalFilter(day.events) > 0">{{ day.events | eventCountBadgeTotal }}</small> <span class="pull-right" data-cal-date ng-click="vm.drillDown(day)">{{ day.label }}</span><div class="cal-day-tick" ng-show="day.isOpened"><i class="glyphicon glyphicon-chevron-up"></i> <i class="fa fa-chevron-up"></i></div><div ng-include="\'src/templates/calendarMonthEventsList.html\'"></div></div>');
            $templateCache.put('src/templates/calendarMonthEventsList.html', '<div class="events-list" ng-show="day.events.length > 0"><a href="javascript:;" ng-click="eventClick({calendarEvent: event})" ng-repeat="event in day.events track by $index" class="pull-left event event-{{ event.type }}" ng-mouseenter="vm.highlightEvent(event, true)" ng-mouseleave="vm.highlightEvent(event, false)" tooltip-append-to-body="true" tooltip="{{ event.title }}"></a></div>');
            $templateCache.put('src/templates/calendarMonthView.html', '<div class="cal-row-fluid cal-row-head"><div class="cal-cell1" ng-repeat="day in vm.weekDays track by $index">{{ day }}</div></div><div class="cal-month-box"><div ng-repeat="rowOffset in vm.monthOffsets track by rowOffset"><div class="cal-row-fluid cal-before-eventlist"><div ng-repeat="day in vm.view | calendarLimitTo:7:rowOffset track by $index" class="cal-cell1 cal-cell {{ day.highlightClass }}" ng-click="vm.dayClicked(day)" ng-class="{pointer: day.events.length > 0}"><div ng-include="\'src/templates/calendarMonthDay.html\'"></div></div></div><mwl-calendar-slide-box is-open="vm.openRowIndex === $index" events="vm.openEvents" event-click="eventClick" edit-event-html="editEventHtml" event-edit-click="eventEditClick" delete-event-html="deleteEventHtml" event-delete-click="eventDeleteClick"></mwl-calendar-slide-box></div></div>');
            $templateCache.put('src/templates/calendarSlideBox.html', '<div class="cal-slide-box" collapse="vm.shouldCollapse" mwl-collapse-fallback="vm.shouldCollapse"><div class="cal-slide-content cal-event-list"><ul class="unstyled list-unstyled"><li ng-repeat="event in events track by $index"><span class="pull-left event" ng-class="\'event-\' + event.type"></span> &nbsp; <a href="javascript:;" class="event-item" ng-click="eventClick({calendarEvent: event})">{{ event.title }} <span ng-show="isMonthView">({{ event.starts_at | date:\'shortTime\' }})</span> <span ng-show="isYearView">({{ event.starts_at | date:\'MMM d, h:mm a\' }})</span></a> <a href="javascript:;" class="event-item-edit" ng-if="editEventHtml && event.editable !== false" ng-bind-html="vm.$sce.trustAsHtml(editEventHtml)" ng-click="eventEditClick({calendarEvent: event})"></a> <a href="javascript:;" class="event-item-delete" ng-if="deleteEventHtml && event.deletable !== false" ng-bind-html="vm.$sce.trustAsHtml(deleteEventHtml)" ng-click="eventDeleteClick({calendarEvent: event})"></a></li></ul></div></div>');
            $templateCache.put('src/templates/calendarWeekView.html', '<div class="cal-week-box"><div class="cal-row-fluid cal-row-head"><div class="cal-cell1" ng-repeat="day in view.days track by $index" ng-class="{\n        \'cal-day-weekend\': day.isWeekend,\n        \'cal-day-past\': day.isPast,\n        \'cal-day-today\': day.isToday,\n        \'cal-day-future\': day.isFuture}">{{ day.weekDayLabel }}<br><small><span data-cal-date ng-click="vm.drillDown(day)" class="pointer">{{ day.dayLabel }}</span></small></div></div><div class="cal-row-fluid" ng-repeat="event in view.events track by $index"><div class="cal-cell{{ event.daySpan }} cal-offset{{ event.dayOffset }} day-highlight dh-event-{{ event.type }}" data-event-class><a href="javascript:;" ng-click="eventClick({calendarEvent: event})" class="cal-event-week">{{ event.title }}</a></div></div></div>');
            $templateCache.put('src/templates/calendarYearView.html', '<div class="cal-year-box"><div ng-repeat="rowOffset in [0, 4, 8] track by rowOffset"><div class="row cal-before-eventlist"><div class="span3 col-md-3 col-xs-6 cal-cell" ng-repeat="month in vm.view | calendarLimitTo:4:rowOffset track by $index" ng-click="vm.monthClicked(month)" ng-class="{pointer: month.events.length > 0, \'cal-day-today\': month.isToday}"><span class="pull-right" data-cal-date ng-click="vm.drillDown(month)">{{ month.label }}</span> <small class="cal-events-num badge badge-important pull-left" ng-show="vm.eventCountBadgeTotalFilter(month.events) > 0">{{ month.events | eventCountBadgeTotal }}</small><div class="cal-day-tick" ng-show="month.isOpened"><i class="glyphicon glyphicon-chevron-up"></i> <i class="fa fa-chevron-up"></i></div></div></div><mwl-calendar-slide-box is-open="vm.openRowIndex === $index" events="vm.openEvents" event-click="eventClick" edit-event-html="editEventHtml" event-edit-click="eventEditClick" delete-event-html="deleteEventHtml" event-delete-click="eventDeleteClick"></mwl-calendar-slide-box></div></div>');
        }
    ]);
    'use strict';
    angular.module('mwl.calendar').constant('moment', window.moment);
    'use strict';
    angular.module('mwl.calendar').factory('calendarHelper', [
        'moment',
        'calendarConfig',
        function (moment, calendarConfig) {
            function getEventsInPeriod(calendarDate, period, allEvents) {
                var startPeriod = moment(calendarDate).startOf(period);
                var endPeriod = moment(calendarDate).endOf(period);
                return allEvents.filter(function (event) {
                    return eventIsInPeriod(event.starts_at, event.ends_at, startPeriod, endPeriod);
                });
            }
            function eventIsInPeriod(eventStart, eventEnd, periodStart, periodEnd) {
                eventStart = moment(eventStart);
                eventEnd = moment(eventEnd);
                periodStart = moment(periodStart);
                periodEnd = moment(periodEnd);
                return eventStart.isAfter(periodStart) && eventStart.isBefore(periodEnd) || eventEnd.isAfter(periodStart) && eventEnd.isBefore(periodEnd) || eventStart.isBefore(periodStart) && eventEnd.isAfter(periodEnd) || eventStart.isSame(periodStart) || eventEnd.isSame(periodEnd);
            }
            function getWeekDayNames() {
                var weekdays = [];
                var count = 0;
                while (count < 7) {
                    weekdays.push(moment().weekday(count++).format(calendarConfig.dateFormats.weekDay));
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
                    view.push({
                        label: startPeriod.format(calendarConfig.dateFormats.month),
                        isToday: startPeriod.isSame(moment().startOf('month')),
                        events: eventsInPeriod.filter(function (event) {
                            return eventIsInPeriod(event.starts_at, event.ends_at, startPeriod, endPeriod);
                        }),
                        date: startPeriod
                    });
                    month.add(1, 'month');
                    count++;
                }
                return view;
            }
            function getMonthView(events, currentDay) {
                var eventsInPeriod = getEventsInPeriod(currentDay, 'month', events);
                var startOfMonth = moment(currentDay).startOf('month');
                var day = startOfMonth.clone().startOf('week');
                var endOfMonthView = moment(currentDay).endOf('month').endOf('week');
                var view = [];
                var today = moment().startOf('day');
                while (day.isBefore(endOfMonthView)) {
                    var inMonth = day.month() === moment(currentDay).month();
                    var monthEvents = [];
                    if (inMonth) {
                        monthEvents = eventsInPeriod.filter(function (event) {
                            return eventIsInPeriod(event.starts_at, event.ends_at, day, day.clone().endOf('day'));
                        });
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
                        events: monthEvents
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
                        weekDayLabel: dayCounter.format(calendarConfig.dateFormats.weekDay),
                        date: dayCounter.clone(),
                        dayLabel: dayCounter.format(calendarConfig.dateFormats.day),
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
                var eventsSorted = events.filter(function (event) {
                    return eventIsInPeriod(event.starts_at, event.ends_at, startOfWeek, endOfWeek);
                }).map(function (event) {
                    var eventStart = moment(event.starts_at).startOf('day');
                    var eventEnd = moment(event.ends_at).startOf('day');
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
            function getDayView(events, currentDay, dayStartHour, dayEndHour, dayHeight) {
                var eventsInPeriod = getEventsInPeriod(currentDay, 'day', events);
                var calendarStart = moment(currentDay).startOf('day').add(dayStartHour, 'hours');
                var calendarEnd = moment(currentDay).startOf('day').add(dayEndHour, 'hours');
                var calendarHeight = (dayEndHour - dayStartHour + 1) * dayHeight;
                var dayHeightMultiplier = dayHeight / 60;
                var buckets = [];
                return eventsInPeriod.filter(function (event) {
                    return eventIsInPeriod(event.starts_at, event.ends_at, moment(currentDay).startOf('day').toDate(), moment(currentDay).endOf('day').toDate());
                }).map(function (event) {
                    if (moment(event.starts_at).isBefore(calendarStart)) {
                        event.top = 0;
                    } else {
                        event.top = moment(event.starts_at).startOf('minute').diff(calendarStart.startOf('minute'), 'minutes') * dayHeightMultiplier - 2;
                    }
                    if (moment(event.ends_at).isAfter(calendarEnd)) {
                        event.height = calendarHeight - event.top;
                    } else {
                        var diffStart = event.starts_at;
                        if (moment(event.starts_at).isBefore(calendarStart)) {
                            diffStart = calendarStart.toDate();
                        }
                        event.height = moment(event.ends_at).diff(diffStart, 'minutes') * dayHeightMultiplier;
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
                            if (self.eventIsInPeriod(event.starts_at, event.ends_at, bucketItem.starts_at, bucketItem.ends_at) || self.eventIsInPeriod(bucketItem.starts_at, bucketItem.ends_at, event.starts_at, event.ends_at)) {
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
            return {
                getWeekDayNames: getWeekDayNames,
                getYearView: getYearView,
                getMonthView: getMonthView,
                getWeekView: getWeekView,
                getDayView: getDayView
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
                    var later = function () {
                        timeout = null;
                        if (!immediate) {
                            func.apply(context, args);
                        }
                    };
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
        var defaultDateFormats = {
            hour: 'ha',
            day: 'D MMM',
            month: 'MMMM',
            weekDay: 'dddd'
        };
        var defaultTitleFormats = {
            day: 'dddd D MMMM, YYYY',
            week: 'Week {week} of {year}',
            month: 'MMMM YYYY',
            year: 'YYYY'
        };
        var configProvider = this;
        configProvider.configureDateFormats = function (formats) {
            angular.extend(defaultDateFormats, formats);
            return configProvider;
        };
        configProvider.configureTitleFormats = function (formats) {
            angular.extend(defaultTitleFormats, formats);
            return configProvider;
        };
        configProvider.$get = function () {
            return {
                dateFormats: defaultDateFormats,
                titleFormats: defaultTitleFormats
            };
        };
    });
    'use strict';
    angular.module('mwl.calendar').filter('truncateEventTitle', function () {
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
    angular.module('mwl.calendar').filter('eventCountBadgeTotal', function () {
        return function (events) {
            return events.filter(function (event) {
                return event.incrementsBadgeTotal !== false;
            }).length;
        };
    });
    'use strict';
    angular.module('mwl.calendar').filter('calendarLimitTo', function () {
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
            } else {
                if (begin === 0) {
                    return input.slice(limit, input.length);
                } else {
                    return input.slice(Math.max(0, begin + limit), begin);
                }
            }
        };
    });
    'use strict';
    angular.module('mwl.calendar').directive('mwlCollapseFallback', [
        '$injector',
        function ($injector) {
            if ($injector.has('collapseDirective')) {
                return {};
            }
            return {
                restrict: 'A',
                controller: [
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
                ]
            };
        }
    ]);
    'use strict';
    angular.module('mwl.calendar').directive('mwlCalendarYear', function () {
        return {
            templateUrl: 'src/templates/calendarYearView.html',
            restrict: 'EA',
            require: '^mwlCalendar',
            scope: {
                events: '=',
                currentDay: '=',
                eventClick: '=',
                eventEditClick: '=',
                eventDeleteClick: '=',
                editEventHtml: '=',
                deleteEventHtml: '=',
                autoOpen: '=',
                timespanClick: '='
            },
            controller: [
                '$scope',
                '$timeout',
                'moment',
                'calendarHelper',
                'eventCountBadgeTotalFilter',
                'calendarDebounce',
                function ($scope, $timeout, moment, calendarHelper, eventCountBadgeTotalFilter, calendarDebounce) {
                    var vm = this;
                    var firstRun = false;
                    vm.eventCountBadgeTotalFilter = eventCountBadgeTotalFilter;
                    var updateView = calendarDebounce(function () {
                        vm.view = calendarHelper.getYearView($scope.events, $scope.currentDay);
                        //Auto open the calendar to the current day if set
                        if ($scope.autoOpen && !firstRun) {
                            vm.view.forEach(function (month) {
                                if (moment($scope.currentDay).startOf('month').isSame(month.date)) {
                                    vm.monthClicked(month, true);
                                    $timeout(function () {
                                        firstRun = false;
                                    });
                                }
                            });
                        }
                    }, 50);
                    $scope.$watch('currentDay', updateView);
                    $scope.$watch('events', updateView, true);
                    vm.monthClicked = function (month, monthClickedFirstRun) {
                        if (!monthClickedFirstRun) {
                            $scope.timespanClick({ calendarDate: month.date.toDate() });
                        }
                        vm.openEvents = month.events;
                        vm.openRowIndex = null;
                        if (vm.openEvents.length > 0) {
                            var monthIndex = vm.view.indexOf(month);
                            vm.openRowIndex = Math.floor(monthIndex / 4);
                        }
                    };
                    vm.drillDown = function (month) {
                        var date = moment($scope.currentDay).clone().month(month.date.month()).toDate();
                        if ($scope.timespanClick({ calendarDate: date }) !== false) {
                            vm.calendarCtrl.changeView('month', date);
                        }
                    };
                }
            ],
            controllerAs: 'vm',
            link: function (scope, element, attrs, calendarCtrl) {
                scope.vm.calendarCtrl = calendarCtrl;
            }
        };
    });
    'use strict';
    angular.module('mwl.calendar').directive('mwlCalendarWeek', function () {
        return {
            templateUrl: 'src/templates/calendarWeekView.html',
            restrict: 'EA',
            require: '^mwlCalendar',
            scope: {
                events: '=',
                currentDay: '=',
                eventClick: '=',
                timespanClick: '='
            },
            controller: [
                '$scope',
                'moment',
                'calendarHelper',
                'calendarDebounce',
                function ($scope, moment, calendarHelper, calendarDebounce) {
                    var vm = this;
                    var updateView = calendarDebounce(function () {
                        $scope.view = calendarHelper.getWeekView($scope.events, $scope.currentDay);
                    }, 50);
                    $scope.$watch('currentDay', updateView);
                    $scope.$watch('events', updateView, true);
                    vm.drillDown = function (day) {
                        var date = day.date.toDate();
                        if ($scope.timespanClick({ calendarDate: date }) !== false) {
                            vm.calendarCtrl.changeView('day', date);
                        }
                    };
                }
            ],
            controllerAs: 'vm',
            link: function (scope, element, attrs, calendarCtrl) {
                scope.vm.calendarCtrl = calendarCtrl;
            }
        };
    });
    'use strict';
    angular.module('mwl.calendar').directive('mwlCalendarSlideBox', function () {
        return {
            restrict: 'EA',
            templateUrl: 'src/templates/calendarSlideBox.html',
            replace: true,
            controller: [
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
            ],
            controllerAs: 'vm',
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
                eventClick: '=',
                editEventHtml: '=',
                eventEditClick: '=',
                deleteEventHtml: '=',
                eventDeleteClick: '='
            }
        };
    });
    'use strict';
    angular.module('mwl.calendar').directive('mwlCalendarMonth', function () {
        return {
            templateUrl: 'src/templates/calendarMonthView.html',
            restrict: 'EA',
            require: '^mwlCalendar',
            scope: {
                events: '=',
                currentDay: '=',
                eventClick: '=',
                eventEditClick: '=',
                eventDeleteClick: '=',
                editEventHtml: '=',
                deleteEventHtml: '=',
                autoOpen: '=',
                timespanClick: '='
            },
            controller: [
                '$scope',
                '$timeout',
                'moment',
                'calendarHelper',
                'eventCountBadgeTotalFilter',
                'calendarDebounce',
                function ($scope, $timeout, moment, calendarHelper, eventCountBadgeTotalFilter, calendarDebounce) {
                    var vm = this;
                    var firstRun = false;
                    vm.eventCountBadgeTotalFilter = eventCountBadgeTotalFilter;
                    var updateView = calendarDebounce(function () {
                        vm.view = calendarHelper.getMonthView($scope.events, $scope.currentDay);
                        var rows = Math.floor(vm.view.length / 7);
                        vm.monthOffsets = [];
                        for (var i = 0; i < rows; i++) {
                            vm.monthOffsets.push(i * 7);
                        }
                        //Auto open the calendar to the current day if set
                        if ($scope.autoOpen && !firstRun) {
                            vm.view.forEach(function (day) {
                                if (day.inMonth && moment($scope.currentDay).startOf('day').isSame(day.date)) {
                                    vm.dayClicked(day, true);
                                    $timeout(function () {
                                        firstRun = false;
                                    });
                                }
                            });
                        }
                    }, 50);
                    $scope.$watch('currentDay', updateView);
                    $scope.$watch('events', updateView, true);
                    vm.weekDays = calendarHelper.getWeekDayNames();
                    vm.dayClicked = function (day, dayClickedFirstRun) {
                        if (!dayClickedFirstRun) {
                            $scope.timespanClick({ calendarDate: day.date.toDate() });
                        }
                        vm.view.forEach(function (monthDay) {
                            monthDay.isOpened = false;
                        });
                        vm.openEvents = day.events;
                        vm.openRowIndex = null;
                        if (vm.openEvents.length > 0) {
                            var dayIndex = vm.view.indexOf(day);
                            vm.openRowIndex = Math.floor(dayIndex / 7);
                            day.isOpened = true;
                        }
                    };
                    vm.drillDown = function (day) {
                        var date = moment($scope.currentDay).clone().date(day.date.date()).toDate();
                        if ($scope.timespanClick({ calendarDate: date }) !== false) {
                            vm.calendarCtrl.changeView('day', date);
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
                }
            ],
            controllerAs: 'vm',
            link: function (scope, element, attrs, calendarCtrl) {
                scope.vm.calendarCtrl = calendarCtrl;
            }
        };
    });
    'use strict';
    angular.module('mwl.calendar').directive('mwlCalendarDay', function () {
        return {
            templateUrl: 'src/templates/calendarDayView.html',
            restrict: 'EA',
            require: '^mwlCalendar',
            scope: {
                events: '=',
                currentDay: '=',
                eventClick: '=',
                eventLabel: '@',
                timeLabel: '@',
                dayViewStart: '@',
                dayViewEnd: '@',
                dayViewSplit: '@'
            },
            controller: [
                '$scope',
                'moment',
                'calendarHelper',
                'calendarConfig',
                'calendarDebounce',
                function ($scope, moment, calendarHelper, calendarConfig, calendarDebounce) {
                    var dayViewStart = moment($scope.dayViewStart || '00:00', 'HH:mm');
                    var dayViewEnd = moment($scope.dayViewEnd || '23:00', 'HH:mm');
                    $scope.dayViewSplit = parseInt($scope.dayViewSplit);
                    $scope.dayHeight = 60 / $scope.dayViewSplit * 30;
                    $scope.days = [];
                    var dayCounter = moment(dayViewStart);
                    for (var i = 0; i <= dayViewEnd.diff(dayViewStart, 'hours'); i++) {
                        $scope.days.push({ label: dayCounter.format(calendarConfig.dateFormats.hour) });
                        dayCounter.add(1, 'hour');
                    }
                    var updateView = calendarDebounce(function () {
                        $scope.view = calendarHelper.getDayView($scope.events, $scope.currentDay, dayViewStart.hours(), dayViewEnd.hours(), $scope.dayHeight);
                    }, 50);
                    $scope.$watch('currentDay', updateView);
                    $scope.$watch('events', updateView, true);
                }
            ]
        };
    });
    'use strict';
    angular.module('mwl.calendar').directive('mwlCalendar', function () {
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
            controller: [
                '$scope',
                '$timeout',
                'moment',
                'calendarConfig',
                function ($scope, $timeout, moment, calendarConfig) {
                    var self = this;
                    var weekTitleLabel = $scope.weekTitleLabel || calendarConfig.titleFormats.week;
                    this.titleFunctions = {
                        day: function (currentDay) {
                            return moment(currentDay).format(calendarConfig.titleFormats.day);
                        },
                        week: function (currentDay) {
                            return weekTitleLabel.replace('{week}', moment(currentDay).week()).replace('{year}', moment(currentDay).format('YYYY'));
                        },
                        month: function (currentDay) {
                            return moment(currentDay).format(calendarConfig.titleFormats.month);
                        },
                        year: function (currentDay) {
                            return moment(currentDay).format(calendarConfig.titleFormats.year);
                        }
                    };
                    this.changeView = function (view, newDay) {
                        $scope.view = view;
                        $scope.currentDay = newDay;
                    };
                    $scope.control = $scope.control || {};
                    $scope.control.prev = function () {
                        $scope.currentDay = moment($scope.currentDay).subtract(1, $scope.view).toDate();
                    };
                    $scope.control.next = function () {
                        $scope.currentDay = moment($scope.currentDay).add(1, $scope.view).toDate();
                    };
                    $scope.control.getTitle = function () {
                        if (!self.titleFunctions[$scope.view]) {
                            return '';
                        }
                        return self.titleFunctions[$scope.view]($scope.currentDay);
                    };
                    //Auto update the calendar when the locale changes
                    var firstRunWatcher = true;
                    var unbindWatcher = $scope.$watch(function () {
                        return moment.locale();
                    }, function (locale) {
                        //Maintain backwards compatibility with the previous functionality of the calendar
                        if ($scope.useIsoWeek === true) {
                            moment.locale(locale, {
                                week: {
                                    dow: 1    //set monday as the first day of the week
                                }
                            });
                        }
                        if (firstRunWatcher) {
                            //dont run the first time the calendar is initialised
                            firstRunWatcher = false;
                            return;
                        }
                        var originalView = angular.copy($scope.view);
                        $scope.view = 'redraw';
                        $timeout(function () {
                            //bit of a hacky way to redraw the calendar, should be refactored at some point
                            $scope.view = originalView;
                        });
                    });
                    //Remove the watcher when the calendar is destroyed
                    var unbindDestroyListener = $scope.$on('$destroy', function () {
                        unbindDestroyListener();
                        unbindWatcher();
                    });
                }
            ]
        };
    });
}(window, angular));