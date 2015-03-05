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

angular.module("mwl.calendar").run(["$templateCache", function($templateCache) {$templateCache.put("templates/day.html","<div class=\"cal-day-box\"><div class=\"row-fluid clearfix cal-row-head\"><div class=\"span1 col-xs-1 cal-cell\">{{ timeLabel || \'Time\' }}</div><div class=\"span11 col-xs-11 cal-cell\">{{ eventLabel || \'Events\' }}</div></div><div class=\"cal-day-panel\" ng-style=\"{height: (days.length * 60) + \'px\'}\"><div class=\"cal-day-panel-hour\"><div class=\"cal-day-hour\" ng-repeat=\"day in days\"><div class=\"row-fluid cal-day-hour-part\"><div class=\"span1 col-xs-1\"><b>{{ day.label }}</b></div><div class=\"span11 col-xs-11\"></div></div><div class=\"row-fluid cal-day-hour-part\"><div class=\"span1 col-xs-1\"></div><div class=\"span11 col-xs-11\"></div></div></div></div><div class=\"pull-left day-event day-highlight dh-event-{{ event.type }}\" ng-repeat=\"event in view track by $index\" ng-style=\"{top: event.top + \'px\', left: event.left + 60 + \'px\', height: event.height + \'px\'}\"><!--<span class=\"cal-hours\">{{ event.starts_at | date:\'d MMM HH:mm\' }} - {{ event.ends_at | date:\'d MMM HH:mm\' }}<br></span>--><a href=\"javascript:;\" class=\"event-item\" ng-click=\"eventClick({$event: event})\"><span>{{ event.title | truncateEventTitle:20:event.height }}</span></a></div></div></div>");
$templateCache.put("templates/main.html","<div class=\"cal-context\" style=\"width: 100%;\"><div class=\"alert alert-danger\" ng-if=\"!view\">The value passed to calendar-view is not set</div><mwl-calendar-year calendar-events=\"events\" calendar-current-day=\"currentDay\" calendar-event-click=\"eventClick\" calendar-edit-event-click=\"eventEditClick\" calendar-delete-event-click=\"eventDeleteClick\" calendar-edit-event-html=\"editEventHtml\" calendar-delete-event-html=\"deleteEventHtml\" calendar-auto-open=\"autoOpen\" calendar-timespan-click=\"timespanClick\" ng-if=\"view == \'year\'\"></mwl-calendar-year><mwl-calendar-month calendar-events=\"events\" calendar-current-day=\"currentDay\" calendar-event-click=\"eventClick\" calendar-edit-event-click=\"eventEditClick\" calendar-delete-event-click=\"eventDeleteClick\" calendar-edit-event-html=\"editEventHtml\" calendar-delete-event-html=\"deleteEventHtml\" calendar-auto-open=\"autoOpen\" calendar-use-iso-week=\"useIsoWeek\" calendar-timespan-click=\"timespanClick\" ng-if=\"view == \'month\'\"></mwl-calendar-month><mwl-calendar-week calendar-events=\"events\" calendar-current-day=\"currentDay\" calendar-event-click=\"eventClick\" calendar-use-iso-week=\"useIsoWeek\" calendar-week-title-label=\"{{ weekTitleLabel }}\" ng-if=\"view == \'week\'\"></mwl-calendar-week><mwl-calendar-day calendar-events=\"events\" calendar-current-day=\"currentDay\" calendar-event-click=\"eventClick\" calendar-event-label=\"{{ eventLabel }}\" calendar-time-label=\"{{ timeLabel }}\" calendar-day-view-start=\"{{ dayViewStart }}\" calendar-day-view-end=\"{{ dayViewEnd }}\" ng-if=\"view == \'day\'\"></mwl-calendar-day></div>");
$templateCache.put("templates/month.html","<div class=\"cal-row-fluid cal-row-head\"><div class=\"cal-cell1\" ng-repeat=\"day in weekDays\">{{ day }}</div></div><div class=\"cal-month-box\"><div ng-repeat=\"week in view track by $index\"><div class=\"cal-row-fluid cal-before-eventlist\"><div class=\"cal-cell1 cal-cell {{ day.highlightClass }}\" ng-repeat=\"day in week track by $index\" ng-click=\"dayClicked($parent.$index, $index)\" ng-class=\"{pointer: day.events.length > 0}\"><div class=\"cal-month-day\" ng-class=\"{\'cal-day-outmonth\': !day.inMonth, \'cal-day-inmonth\': day.inMonth, \'cal-day-weekend\': $index == 5 || $index == 6, \'cal-day-today\': day.isToday}\"><small class=\"cal-events-num badge badge-important pull-left\" ng-show=\"day.events.length > 0\">{{ day.events.length }}</small> <span class=\"pull-right\" data-cal-date=\"\" ng-click=\"drillDown(day.label)\">{{ day.label }}</span><div class=\"cal-day-tick\" ng-show=\"day.isOpened\"><i class=\"glyphicon glyphicon-chevron-up\"></i> <i class=\"fa fa-chevron-up\"></i></div><div class=\"events-list\" ng-show=\"day.events.length > 0\"><a href=\"javascript:;\" ng-click=\"eventClick({$event: event})\" ng-repeat=\"event in day.events track by $index\" class=\"pull-left event event-{{ event.type }}\" ng-mouseenter=\"highlightEvent(event, true)\" ng-mouseleave=\"highlightEvent(event, false)\" tooltip-append-to-body=\"true\" tooltip=\"{{ event.title }}\"></a></div></div></div></div><div class=\"cal-slide-box\" collapse=\"!week.isOpened\"><div class=\"cal-slide-content cal-event-list\"><ul class=\"unstyled list-unstyled\"><li ng-repeat=\"event in openEvents track by $index\"><span class=\"pull-left event event-{{ event.type }}\"></span> &nbsp; <a href=\"javascript:;\" class=\"event-item\" ng-click=\"eventClick({$event: event})\">{{ event.title }}</a> <a href=\"javascript:;\" class=\"event-item-edit\" ng-if=\"editEventHtml && event.editable !== false\" ng-bind-html=\"$sce.trustAsHtml(editEventHtml)\" ng-click=\"eventEditClick({$event: event})\"></a> <a href=\"javascript:;\" class=\"event-item-delete\" ng-if=\"deleteEventHtml && event.deletable !== false\" ng-bind-html=\"$sce.trustAsHtml(deleteEventHtml)\" ng-click=\"eventDeleteClick({$event: event})\"></a></li></ul></div></div></div></div>");
$templateCache.put("templates/week.html","<div class=\"cal-week-box\"><div class=\"cal-row-fluid cal-row-head\"><div class=\"cal-cell1\" ng-repeat=\"column in view.columns track by $index\" ng-class=\"{\'cal-day-weekend\': $index > 4, \'cal-day-today\': column.isToday}\">{{ column.weekDay }}<br><small><span data-cal-date=\"\" ng-click=\"drillDown(column.day)\" class=\"pointer\">{{ column.date }}</span></small></div></div><div class=\"cal-row-fluid\" ng-repeat=\"event in view.events track by $index\"><div class=\"cal-cell{{ event.daySpan }} cal-offset{{ event.dayOffset }} day-highlight dh-event-{{ event.type }}\" data-event-class=\"\"><a href=\"javascript:;\" ng-click=\"eventClick({$event: event})\" class=\"cal-event-week\">{{ event.title }}</a></div></div></div>");
$templateCache.put("templates/year.html","<div class=\"cal-year-box\"><div ng-repeat=\"year in view track by $index\"><div class=\"row cal-before-eventlist\"><div class=\"span3 col-md-3 col-xs-6 cal-cell\" ng-repeat=\"month in year track by $index\" ng-click=\"monthClicked($parent.$index, $index)\" ng-class=\"{pointer: month.events.length > 0, \'cal-day-today\': month.isToday}\"><span class=\"pull-right\" data-cal-date=\"\" ng-click=\"drillDown(month.monthIndex)\">{{ month.label }}</span> <small class=\"cal-events-num badge badge-important pull-left\" ng-show=\"month.events.length > 0\">{{ month.events.length }}</small><div class=\"cal-day-tick\" ng-show=\"month.isOpened\"><i class=\"glyphicon glyphicon-chevron-up\"></i> <i class=\"fa fa-chevron-up\"></i></div></div></div><div class=\"cal-slide-box\" collapse=\"!year.isOpened\"><span class=\"cal-slide-tick\"></span><div class=\"cal-slide-content\"><ul class=\"unstyled list-unstyled\"><li ng-repeat=\"event in openEvents track by $index\"><span class=\"pull-left event\" ng-class=\"\'event-\' + event.type\"></span> &nbsp; <a href=\"javascript:;\" class=\"event-item\" ng-click=\"eventClick({$event: event})\">{{ event.title }}</a> <a href=\"javascript:;\" class=\"event-item-edit\" ng-if=\"editEventHtml && event.editable !== false\" ng-bind-html=\"$sce.trustAsHtml(editEventHtml)\" ng-click=\"eventEditClick({$event: event})\"></a> <a href=\"javascript:;\" class=\"event-item-delete\" ng-if=\"deleteEventHtml && event.deletable !== false\" ng-bind-html=\"$sce.trustAsHtml(deleteEventHtml)\" ng-click=\"eventDeleteClick({$event: event})\"></a></li></ul></div></div></div></div>");}]);
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
