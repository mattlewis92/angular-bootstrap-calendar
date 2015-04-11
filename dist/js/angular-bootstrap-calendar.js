/**
 * angular-bootstrap-calendar - A pure AngularJS bootstrap themed responsive calendar that can display events and has views for year, month, week and day
 * @version v0.9.2
 * @link https://github.com/mattlewis92/angular-bootstrap-calendar
 * @license MIT
 */
(function (window, angular) {
    'use strict';
    angular.module('mwl.calendar', []);
    'use strict';
    angular.module('mwl.calendar').constant('moment', window.moment);
    'use strict';
    angular.module('mwl.calendar').service('calendarHelper', [
        'moment',
        'calendarConfig',
        function (moment, calendarConfig) {
            var self = this;
            function isISOWeekBasedOnLocale() {
                return moment().startOf('week').day() === 1;
            }
            function getEventsInPeriod(calendarDate, period, allEvents) {
                var startPeriod = moment(calendarDate).startOf(period);
                var endPeriod = moment(calendarDate).endOf(period);
                return allEvents.filter(function (event) {
                    return self.eventIsInPeriod(event.starts_at, event.ends_at, startPeriod, endPeriod);
                });
            }
            this.getWeekDayNames = function () {
                var weekdays = [];
                var count = 0;
                while (count < 7) {
                    weekdays.push(moment().weekday(count++).format(calendarConfig.dateFormats.weekDay));
                }
                return weekdays;
            };
            this.eventIsInPeriod = function (eventStart, eventEnd, periodStart, periodEnd) {
                eventStart = moment(eventStart);
                eventEnd = moment(eventEnd);
                periodStart = moment(periodStart);
                periodEnd = moment(periodEnd);
                return eventStart.isAfter(periodStart) && eventStart.isBefore(periodEnd) || eventEnd.isAfter(periodStart) && eventEnd.isBefore(periodEnd) || eventStart.isBefore(periodStart) && eventEnd.isAfter(periodEnd) || eventStart.isSame(periodStart) || eventEnd.isSame(periodEnd);
            };
            this.getYearView = function (events, currentDay) {
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
                            return self.eventIsInPeriod(event.starts_at, event.ends_at, startPeriod, endPeriod);
                        }),
                        date: startPeriod
                    });
                    month.add(1, 'month');
                    count++;
                }
                return view;
            };
            this.getMonthView = function (events, currentDay) {
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
                            return self.eventIsInPeriod(event.starts_at, event.ends_at, day, day.clone().endOf('day'));
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
            };
            this.getWeekView = function (events, currentDay) {
                var dateOffset = isISOWeekBasedOnLocale() ? 1 : 0;
                var columns = new Array(7);
                var weekDays = self.getWeekDayNames();
                var currentWeekDayIndex = currentDay.getDay();
                var beginningOfWeek, endOfWeek, i, date;
                for (i = currentWeekDayIndex; i >= 0; i--) {
                    date = moment(currentDay).subtract(currentWeekDayIndex - i, 'days').add(dateOffset, 'day').toDate();
                    columns[i] = {
                        weekDay: weekDays[i],
                        day: moment(date).format('D'),
                        date: moment(date).format(calendarConfig.dateFormats.day),
                        isPast: moment(date).startOf('day').isBefore(moment().startOf('day')),
                        isToday: moment(date).startOf('day').isSame(moment().startOf('day')),
                        isFuture: moment(date).startOf('day').isAfter(moment().startOf('day')),
                        isWeekend: [
                            0,
                            6
                        ].indexOf(moment(date).day()) > -1
                    };
                    if (i === 0) {
                        beginningOfWeek = date;
                    } else if (i === 6) {
                        endOfWeek = date;
                    }
                }
                for (i = currentWeekDayIndex + 1; i < 7; i++) {
                    date = moment(currentDay).add(i - currentWeekDayIndex, 'days').add(dateOffset, 'day').toDate();
                    columns[i] = {
                        weekDay: weekDays[i],
                        day: moment(date).format('D'),
                        date: moment(date).format(calendarConfig.dateFormats.day),
                        isPast: moment(date).startOf('day').isBefore(moment().startOf('day')),
                        isToday: moment(date).startOf('day').isSame(moment().startOf('day')),
                        isFuture: moment(date).startOf('day').isAfter(moment().startOf('day')),
                        isWeekend: [
                            0,
                            6
                        ].indexOf(moment(date).day()) > -1
                    };
                    if (i === 0) {
                        beginningOfWeek = date;
                    } else if (i === 6) {
                        endOfWeek = date;
                    }
                }
                endOfWeek = moment(endOfWeek).endOf('day').toDate();
                beginningOfWeek = moment(beginningOfWeek).startOf('day').toDate();
                var eventsSorted = events.filter(function (event) {
                    return self.eventIsInPeriod(event.starts_at, event.ends_at, beginningOfWeek, endOfWeek);
                }).map(function (event) {
                    var eventStart = moment(event.starts_at).startOf('day');
                    var eventEnd = moment(event.ends_at).startOf('day');
                    var weekViewStart = moment(beginningOfWeek).startOf('day');
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
                    columns: columns,
                    events: eventsSorted
                };
            };
            this.getDayView = function (events, currentDay, dayStartHour, dayEndHour, dayHeight) {
                var eventsInPeriod = getEventsInPeriod(currentDay, 'day', events);
                var calendarStart = moment(currentDay).startOf('day').add(dayStartHour, 'hours');
                var calendarEnd = moment(currentDay).startOf('day').add(dayEndHour, 'hours');
                var calendarHeight = (dayEndHour - dayStartHour + 1) * dayHeight;
                var dayHeightMultiplier = dayHeight / 60;
                var buckets = [];
                return eventsInPeriod.filter(function (event) {
                    return self.eventIsInPeriod(event.starts_at, event.ends_at, moment(currentDay).startOf('day').toDate(), moment(currentDay).endOf('day').toDate());
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
    angular.module('mwl.calendar').directive('mwlCalendarYear', [
        'moment',
        function (moment) {
            return {
                templateUrl: 'src/templates/calendarYearView.html',
                restrict: 'EA',
                require: '^mwlCalendar',
                scope: {
                    events: '=calendarEvents',
                    currentDay: '=calendarCurrentDay',
                    eventClick: '=calendarEventClick',
                    eventEditClick: '=calendarEditEventClick',
                    eventDeleteClick: '=calendarDeleteEventClick',
                    editEventHtml: '=calendarEditEventHtml',
                    deleteEventHtml: '=calendarDeleteEventHtml',
                    autoOpen: '=calendarAutoOpen',
                    timespanClick: '=calendarTimespanClick'
                },
                controller: [
                    '$scope',
                    '$timeout',
                    'calendarHelper',
                    'eventCountBadgeTotalFilter',
                    'calendarDebounce',
                    function ($scope, $timeout, calendarHelper, eventCountBadgeTotalFilter, calendarDebounce) {
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
        }
    ]);
    'use strict';
    angular.module('mwl.calendar').directive('mwlCalendarWeek', function () {
        return {
            templateUrl: 'src/templates/calendarWeekView.html',
            restrict: 'EA',
            require: '^mwlCalendar',
            scope: {
                events: '=calendarEvents',
                currentDay: '=calendarCurrentDay',
                eventClick: '=calendarEventClick',
                timespanClick: '=calendarTimespanClick'
            },
            controller: [
                '$scope',
                'moment',
                'calendarHelper',
                'calendarDebounce',
                function ($scope, moment, calendarHelper, calendarDebounce) {
                    var updateView = calendarDebounce(function () {
                        $scope.view = calendarHelper.getWeekView($scope.events, $scope.currentDay);
                    }, 50);
                    $scope.drillDown = function (day) {
                        var date = moment($scope.currentDay).clone().date(day).toDate();
                        if ($scope.timespanClick({ calendarDate: date }) !== false) {
                            $scope.calendarCtrl.changeView('day', date);
                        }
                    };
                    $scope.$watch('currentDay', updateView);
                    $scope.$watch('events', updateView, true);
                }
            ],
            link: function (scope, element, attrs, calendarCtrl) {
                scope.calendarCtrl = calendarCtrl;
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
                isMonthView: '=?',
                isYearView: '=?',
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
                events: '=calendarEvents',
                currentDay: '=calendarCurrentDay',
                eventClick: '=calendarEventClick',
                eventEditClick: '=calendarEditEventClick',
                eventDeleteClick: '=calendarDeleteEventClick',
                editEventHtml: '=calendarEditEventHtml',
                deleteEventHtml: '=calendarDeleteEventHtml',
                autoOpen: '=calendarAutoOpen',
                timespanClick: '=calendarTimespanClick'
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
                events: '=calendarEvents',
                currentDay: '=calendarCurrentDay',
                eventClick: '=calendarEventClick',
                eventLabel: '@calendarEventLabel',
                timeLabel: '@calendarTimeLabel',
                dayViewStart: '@calendarDayViewStart',
                dayViewEnd: '@calendarDayViewEnd',
                dayViewSplit: '@calendarDayViewSplit'
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