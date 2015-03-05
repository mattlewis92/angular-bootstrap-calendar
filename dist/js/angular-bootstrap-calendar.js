'use strict';

/**
 * @ngdoc overview
 * @name angularBootstrapCalendarApp
 * @description
 * # angularBootstrapCalendarApp
 *
 * Main module of the application.
 */
angular
  .module('mwl.calendar', [
    'ui.bootstrap'
  ]);

'use strict';

/**
 * @ngdoc service
 * @name angularBootstrapCalendarApp.moment
 * @description
 * # moment
 * Constant in the angularBootstrapCalendarApp.
 */
angular.module('mwl.calendar')
  .constant('moment', window.moment);

'use strict';

/**
 * @ngdoc service
 * @name angularBootstrapCalendarApp.calendarHelper
 * @description
 * # calendarHelper
 * Service in the angularBootstrapCalendarApp.
 */
angular.module('mwl.calendar')
  .service('calendarHelper', ["$filter", "moment", function calendarHelper($filter, moment) {

    var self = this;

    function isISOWeekBasedOnLocale() {
      return moment().startOf('week').day() === 1;
    }

    function isISOWeek(userValue) {
      //If a manual override has been set in the directive, use that
      if (angular.isDefined(userValue)) return userValue;
      //Otherwise fallback to the locale
      return isISOWeekBasedOnLocale();
    }

    this.getMonthNames = function(short) {

      var format = short ? 'MMM' : 'MMMM';

      var months = [];
      for (var i = 0; i <= 11; i++) {
        months.push($filter('date')(new Date(2014, i), format));
      }

      return months;

    };

    this.getWeekDayNames = function(short, useISOWeek) {

      var format = short ? 'EEE' : 'EEEE';

      var weekdays = [];
      var startDay = isISOWeek(useISOWeek) ? 22 : 21;
      for (var i = 0; i <= 6; i++) {
        weekdays.push($filter('date')(new Date(2014, 8, startDay + i), format));
      }

      return weekdays;

    };

    this.eventIsInPeriod = function(eventStart, eventEnd, periodStart, periodEnd) {

      return (
          moment(eventStart).isAfter(moment(periodStart)) &&
          moment(eventStart).isBefore(moment(periodEnd))
        ) || (
          moment(eventEnd).isAfter(moment(periodStart)) &&
          moment(eventEnd).isBefore(moment(periodEnd))
        ) || (
          moment(eventStart).isBefore(moment(periodStart)) &&
          moment(eventEnd).isAfter(moment(periodEnd))
        ) || (
          moment(eventStart).isSame(moment(periodStart))
        ) || (
          moment(eventEnd).isSame(moment(periodEnd))
      );

    };

    this.getYearView = function(events, currentDay) {

      var grid = [];
      var months = self.getMonthNames();

      for (var i = 0; i < 3; i++) {
        var row = [];
        for (var j = 0; j < 4; j++) {
          var monthIndex = 12 - months.length;
          var startPeriod = new Date(moment(currentDay).format('YYYY'), monthIndex, 1);
          var endPeriod = moment(startPeriod).add(1, 'month').subtract(1, 'second').toDate();

          row.push({
            label: months.shift(),
            monthIndex: monthIndex,
            isToday: moment(startPeriod).startOf('month').isSame(moment().startOf('month')),
            events: events.filter(function(event) {
              return self.eventIsInPeriod(event.starts_at, event.ends_at, startPeriod, endPeriod);
            }),
            date: moment(startPeriod).startOf('month')
          });
        }
        grid.push(row);
      }

      return grid;

    };

    this.getMonthView = function(events, currentDay, useISOWeek) {

      var dateOffset = isISOWeek(useISOWeek) ? 1 : 0;

      function getWeekDayIndex() {
        var day = startOfMonth.day() - dateOffset;
        if (day < 0) day = 6;
        return day;
      }

      var startOfMonth = moment(currentDay).startOf('month');
      var numberOfDaysInMonth = moment(currentDay).endOf('month').date();

      var grid = [];
      var buildRow = new Array(7);
      var eventsWithIds = events.map(function(event, index) {
        event.$id = index;
        return event;
      });

      for (var i = 1; i <= numberOfDaysInMonth; i++) {

        if (i == 1) {
          var weekdayIndex = getWeekDayIndex(startOfMonth);
          var prefillMonth = startOfMonth.clone();
          while (weekdayIndex > 0) {
            weekdayIndex--;
            prefillMonth = prefillMonth.subtract(1, 'day');
            buildRow[weekdayIndex] = {
              label: prefillMonth.date(),
              date: prefillMonth.clone(),
              inMonth: false,
              events: []
            };
          }
        }

        buildRow[getWeekDayIndex(startOfMonth)] = {
          label: startOfMonth.date(),
          inMonth: true,
          isToday: moment().startOf('day').isSame(startOfMonth),
          date: startOfMonth.clone(),
          events: eventsWithIds.filter(function(event) {
            return self.eventIsInPeriod(event.starts_at, event.ends_at, startOfMonth.clone().startOf('day'), startOfMonth.clone().endOf('day'));
          })
        };

        if (i == numberOfDaysInMonth) {
          var weekdayIndex = getWeekDayIndex(startOfMonth);
          var postfillMonth = startOfMonth.clone();
          while (weekdayIndex < 6) {
            weekdayIndex++;
            postfillMonth = postfillMonth.add(1, 'day');
            buildRow[weekdayIndex] = {
              label: postfillMonth.date(),
              date: postfillMonth.clone(),
              inMonth: false,
              events: []
            };
          }
        }

        if (getWeekDayIndex(startOfMonth) === 6 || i == numberOfDaysInMonth) {
          grid.push(buildRow);
          buildRow = new Array(7);
        }

        startOfMonth = startOfMonth.add(1, 'day');

      }

      return grid;

    };

    this.getWeekView = function(events, currentDay, useISOWeek) {

      var dateOffset = isISOWeek(useISOWeek) ? 1 : 0;
      var columns = new Array(7);
      var weekDays = self.getWeekDayNames(false, useISOWeek);
      var currentWeekDayIndex = currentDay.getDay();
      var beginningOfWeek, endOfWeek;

      for (var i = currentWeekDayIndex; i >= 0; i--) {
        var date = moment(currentDay).subtract(currentWeekDayIndex - i, 'days').add(dateOffset, 'day').toDate();
        columns[i] = {
          weekDay: weekDays[i],
          day: $filter('date')(date, 'd'),
          date: $filter('date')(date, 'd MMM'),
          isToday: moment(date).startOf('day').isSame(moment().startOf('day'))
        };
        if (i == 0) {
          beginningOfWeek = date;
        } else if (i == 6) {
          endOfWeek = date;
        }
      }

      for (var i = currentWeekDayIndex + 1; i < 7; i++) {
        var date = moment(currentDay).add(i - currentWeekDayIndex, 'days').add(dateOffset, 'day').toDate();
        columns[i] = {
          weekDay: weekDays[i],
          day: $filter('date')(date, 'd'),
          date: $filter('date')(date, 'd MMM'),
          isToday: moment(date).startOf('day').isSame(moment().startOf('day'))
        };
        if (i == 0) {
          beginningOfWeek = date;
        } else if (i == 6) {
          endOfWeek = date;
        }
      }

      endOfWeek = moment(endOfWeek).endOf('day').toDate();
      beginningOfWeek = moment(beginningOfWeek).startOf('day').toDate();

      var eventsSorted = events.filter(function(event) {
        return self.eventIsInPeriod(event.starts_at, event.ends_at, beginningOfWeek, endOfWeek);
      }).map(function(event) {

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

      return {columns: columns, events: eventsSorted};

    };

    this.getDayView = function(events, currentDay, dayStartHour, dayEndHour) {

      var calendarStart = moment(currentDay).startOf('day').add(dayStartHour, 'hours');
      var calendarEnd = moment(currentDay).startOf('day').add(dayEndHour, 'hours');
      var calendarHeight = (dayEndHour - dayStartHour + 1) * 60;
      var buckets = [];

      return events.filter(function(event) {
        return self.eventIsInPeriod(event.starts_at, event.ends_at, moment(currentDay).startOf('day').toDate(), moment(currentDay).endOf('day').toDate());
      }).map(function(event) {
        if (moment(event.starts_at).isBefore(calendarStart)) {
          event.top = 0;
        } else {
          event.top = moment(event.starts_at).startOf('minute').diff(calendarStart.startOf('minute'), 'minutes') - 2;
        }

        if (moment(event.ends_at).isAfter(calendarEnd)) {
          event.height = calendarHeight - event.top;
        } else {
          var diffStart = event.starts_at;
          if (moment(event.starts_at).isBefore(calendarStart)) {
            diffStart = calendarStart.toDate();
          }
          event.height = moment(event.ends_at).diff(diffStart, 'minutes');
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

    this.toggleEventBreakdown = function(view, rowIndex, cellIndex) {

      var openEvents = [];

      function closeAllOpenItems() {
        view = view.map(function(row) {
          row.isOpened = false;
          return row.map(function(cell) {
            cell.isOpened = false;
            return cell;
          });
        });
      }

      if (view[rowIndex][cellIndex].events.length > 0) {

        var isCellOpened = view[rowIndex][cellIndex].isOpened;

        closeAllOpenItems();

        view[rowIndex][cellIndex].isOpened = !isCellOpened;
        view[rowIndex].isOpened = !isCellOpened;
        openEvents = view[rowIndex][cellIndex].events;
      } else {
        closeAllOpenItems();
      }

      return {view: view, openEvents: openEvents};

    };

  }]);

'use strict';


angular.module('mwl.calendar')
  .filter('truncateEventTitle', function() {

    return function(string, length, boxHeight) {
      if (!string) return '';

      //Only truncate if if actually needs truncating
      if (string.length >= length && string.length / 20 > boxHeight / 30) {
        return string.substr(0, length) + '...';
      } else {
        return string;
      }
    };

  });

'use strict';

/**
 * @ngdoc directive
 * @name angularBootstrapCalendarApp.directive:mwlCalendarYear
 * @description
 * # mwlCalendarYear
 */
angular.module('mwl.calendar')
  .directive('mwlCalendarYear', ["$sce", "$timeout", "calendarHelper", "moment", function($sce, $timeout, calendarHelper, moment) {
    return {
      templateUrl: 'templates/year.html',
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
      link: function postLink(scope, element, attrs, calendarCtrl) {

        var firstRun = false;

        scope.$sce = $sce;

        calendarCtrl.titleFunctions.year = function(currentDay) {
          return moment(currentDay).format('YYYY');
        };

        function updateView() {
          scope.view = calendarHelper.getYearView(scope.events, scope.currentDay);

          //Auto open the calendar to the current day if set
          if (scope.autoOpen && !firstRun) {
            scope.view.forEach(function(row, rowIndex) {
              row.forEach(function(year, cellIndex) {
                if (year.label == moment(scope.currentDay).format('MMMM')) {
                  scope.monthClicked(rowIndex, cellIndex, true);
                  $timeout(function() {
                    firstRun = false;
                  });
                }
              });
            });
          }
        }

        scope.$watch('currentDay', updateView);
        scope.$watch('events', updateView, true);

        scope.monthClicked = function(yearIndex, monthIndex, firstRun) {

          if (!firstRun) {
            scope.timespanClick({$date: scope.view[yearIndex][monthIndex].date.startOf('month').toDate()});
          }

          var handler = calendarHelper.toggleEventBreakdown(scope.view, yearIndex, monthIndex);
          scope.view = handler.view;
          scope.openEvents = handler.openEvents;

        };

        scope.drillDown = function(month) {
          calendarCtrl.changeView('month', moment(scope.currentDay).clone().month(month).toDate());
        };

      }
    };
  }]);

'use strict';

/**
 * @ngdoc directive
 * @name angularBootstrapCalendarApp.directive:mwlCalendarWeek
 * @description
 * # mwlCalendarWeek
 */
angular.module('mwl.calendar')
  .directive('mwlCalendarWeek', ["moment", "calendarHelper", function(moment, calendarHelper) {
    return {
      templateUrl: 'templates/week.html',
      restrict: 'EA',
      require: '^mwlCalendar',
      scope: {
        events: '=calendarEvents',
        currentDay: '=calendarCurrentDay',
        eventClick: '=calendarEventClick',
        useIsoWeek: '=calendarUseIsoWeek',
        weekTitleLabel: '@calendarWeekTitleLabel'
      },
      link: function postLink(scope, element, attrs, calendarCtrl) {

        var titleLabel = scope.weekTitleLabel || 'Week {week} of {year}';

        calendarCtrl.titleFunctions.week = function(currentDay) {
          return titleLabel.replace('{week}', moment(currentDay).week()).replace('{year}', moment(currentDay).format('YYYY'));
        };

        function updateView() {
          scope.view = calendarHelper.getWeekView(scope.events, scope.currentDay, scope.useIsoWeek);
        }

        scope.drillDown = function(day) {
          calendarCtrl.changeView('day', moment(scope.currentDay).clone().date(day).toDate());
        };

        scope.$watch('currentDay', updateView);
        scope.$watch('events', updateView, true);

      }
    };
  }]);

'use strict';

/**
 * @ngdoc directive
 * @name angularBootstrapCalendarApp.directive:mwlCalendarMonth
 * @description
 * # mwlCalendarMonth
 */
angular.module('mwl.calendar')
  .directive('mwlCalendarMonth', ["$sce", "$timeout", "$filter", "moment", "calendarHelper", function ($sce, $timeout, $filter, moment, calendarHelper) {
    return {
      templateUrl: 'templates/month.html',
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
        useIsoWeek: '=calendarUseIsoWeek',
        timespanClick: '=calendarTimespanClick'
      },
      link: function postLink(scope, element, attrs, calendarCtrl) {

        var firstRun = false;

        scope.$sce = $sce;

        calendarCtrl.titleFunctions.month = function(currentDay) {
          return $filter('date')(currentDay, 'MMMM yyyy');
        };

        function updateView() {
          scope.view = calendarHelper.getMonthView(scope.events, scope.currentDay, scope.useIsoWeek);

          //Auto open the calendar to the current day if set
          if (scope.autoOpen && !firstRun) {
            scope.view.forEach(function(week, rowIndex) {
              week.forEach(function(day, cellIndex) {
                if (day.inMonth && moment(scope.currentDay).startOf('day').isSame(day.date.startOf('day'))) {
                  scope.dayClicked(rowIndex, cellIndex, true);
                  $timeout(function() {
                    firstRun = false;
                  });
                }
              });
            });
          }

        }

        scope.$watch('currentDay', updateView);
        scope.$watch('events', updateView, true);

        scope.weekDays = calendarHelper.getWeekDayNames(false, scope.useIsoWeek);

        scope.dayClicked = function(rowIndex, cellIndex, firstRun) {

          if (!firstRun) {
            scope.timespanClick({$date: scope.view[rowIndex][cellIndex].date.startOf('day').toDate()});
          }

          var handler = calendarHelper.toggleEventBreakdown(scope.view, rowIndex, cellIndex);
          scope.view = handler.view;
          scope.openEvents = handler.openEvents;

        };

        scope.drillDown = function(day) {
          calendarCtrl.changeView('day', moment(scope.currentDay).clone().date(day).toDate());
        };

        scope.highlightEvent = function(event, shouldAddClass) {

          scope.view = scope.view.map(function(week) {

            week.isOpened = false;

            return week.map(function(day) {

              delete day.highlightClass;
              day.isOpened = false;

              if (shouldAddClass) {
                var dayContainsEvent = day.events.filter(function(e) {
                  return e.$id == event.$id;
                }).length > 0;

                if (dayContainsEvent) {
                  day.highlightClass = 'day-highlight dh-event-' + event.type;
                }
              }

              return day;

            });

          });

        };

      }
    };
  }]);

'use strict';

/**
 * @ngdoc directive
 * @name angularBootstrapCalendarApp.directive:mwlCalendarDay
 * @description
 * # mwlCalendarDay
 */
angular.module('mwl.calendar')
  .directive('mwlCalendarDay', ["$filter", "moment", "calendarHelper", function($filter, moment, calendarHelper) {
    return {
      templateUrl: 'templates/day.html',
      restrict: 'EA',
      require: '^mwlCalendar',
      scope: {
        events: '=calendarEvents',
        currentDay: '=calendarCurrentDay',
        eventClick: '=calendarEventClick',
        eventLabel: '@calendarEventLabel',
        timeLabel: '@calendarTimeLabel',
        dayViewStart:'@calendarDayViewStart',
        dayViewEnd:'@calendarDayViewEnd'
      },
      link: function postLink(scope, element, attrs, calendarCtrl) {

        var dayViewStart = moment(scope.dayViewStart || '00:00', 'HH:mm');
        var dayViewEnd = moment(scope.dayViewEnd || '23:00', 'HH:mm');

        scope.days = [];
        var dayCounter = moment(dayViewStart);
        for (var i = 0; i <= dayViewEnd.diff(dayViewStart, 'hours'); i++) {
          scope.days.push({
            label: dayCounter.format('ha')
          });
          dayCounter.add(1, 'hour');
        }

        calendarCtrl.titleFunctions.day = function(currentDay) {
          return $filter('date')(currentDay, 'EEEE d MMMM, yyyy');
        };

        function updateView() {
          scope.view = calendarHelper.getDayView(scope.events, scope.currentDay, dayViewStart.hours(), dayViewEnd.hours());
        }

        scope.$watch('currentDay', updateView);
        scope.$watch('events', updateView, true);

      }
    };
  }]);

'use strict';

/**
 * @ngdoc directive
 * @name angularBootstrapCalendarApp.directive:mwlCalendar
 * @description
 * # mwlCalendar
 */
angular.module('mwl.calendar')
  .directive('mwlCalendar', function () {
    return {
      templateUrl: 'templates/main.html',
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
        dayViewStart:'@calendarDayViewStart',
        dayViewEnd:'@calendarDayViewEnd',
        weekTitleLabel: '@calendarWeekTitleLabel',
        timespanClick: '&calendarTimespanClick'
      },
      controller: ["$scope", "$timeout", "$locale", "moment", function($scope, $timeout, $locale, moment) {

        var self = this;

        this.titleFunctions = {};

        this.changeView = function(view, newDay) {
          $scope.view = view;
          $scope.currentDay = newDay;
        };

        $scope.control = $scope.control || {};

        $scope.control.prev = function() {
          $scope.currentDay = moment($scope.currentDay).subtract(1, $scope.view).toDate();
        };

        $scope.control.next = function() {
          $scope.currentDay = moment($scope.currentDay).add(1, $scope.view).toDate();
        };

        $scope.control.getTitle = function() {
          if (!self.titleFunctions[$scope.view]) {
            return '';
          }
          return self.titleFunctions[$scope.view]($scope.currentDay);
        };

        //Auto update the calendar when the locale changes
        var firstRunWatcher = true;
        var unbindWatcher = $scope.$watch(function() {
          return moment.locale() + $locale.id;
        }, function() {
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

      }]
    };
  });
