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

angular.module("mwl.calendar").run(["$templateCache", function($templateCache) {$templateCache.put("templates/day.html","<div class=\"cal-day-box\"><div class=\"row-fluid clearfix cal-row-head\"><div class=\"span1 col-xs-1 cal-cell\">Time</div><div class=\"span11 col-xs-11 cal-cell\">Events</div></div><div class=\"cal-day-panel\" style=\"height: 960px;\"><div class=\"cal-day-panel-hour\"><div class=\"cal-day-hour\"><div class=\"row-fluid cal-day-hour-part\"><div class=\"span1 col-xs-1\"><b>06:00</b></div><div class=\"span11 col-xs-11\"></div></div><div class=\"row-fluid cal-day-hour-part\"><div class=\"span1 col-xs-1\"><b>06:30</b></div><div class=\"span11 col-xs-11\"></div></div></div><div class=\"cal-day-hour\"><div class=\"row-fluid cal-day-hour-part\"><div class=\"span1 col-xs-1\"><b>07:00</b></div><div class=\"span11 col-xs-11\"></div></div><div class=\"row-fluid cal-day-hour-part\"><div class=\"span1 col-xs-1\"><b>07:30</b></div><div class=\"span11 col-xs-11\"></div></div></div><div class=\"cal-day-hour\"><div class=\"row-fluid cal-day-hour-part\"><div class=\"span1 col-xs-1\"><b>08:00</b></div><div class=\"span11 col-xs-11\"></div></div><div class=\"row-fluid cal-day-hour-part\"><div class=\"span1 col-xs-1\"><b>08:30</b></div><div class=\"span11 col-xs-11\"></div></div></div><div class=\"cal-day-hour\"><div class=\"row-fluid cal-day-hour-part\"><div class=\"span1 col-xs-1\"><b>09:00</b></div><div class=\"span11 col-xs-11\"></div></div><div class=\"row-fluid cal-day-hour-part\"><div class=\"span1 col-xs-1\"><b>09:30</b></div><div class=\"span11 col-xs-11\"></div></div></div><div class=\"cal-day-hour\"><div class=\"row-fluid cal-day-hour-part\"><div class=\"span1 col-xs-1\"><b>10:00</b></div><div class=\"span11 col-xs-11\"></div></div><div class=\"row-fluid cal-day-hour-part\"><div class=\"span1 col-xs-1\"><b>10:30</b></div><div class=\"span11 col-xs-11\"></div></div></div><div class=\"cal-day-hour\"><div class=\"row-fluid cal-day-hour-part\"><div class=\"span1 col-xs-1\"><b>11:00</b></div><div class=\"span11 col-xs-11\"></div></div><div class=\"row-fluid cal-day-hour-part\"><div class=\"span1 col-xs-1\"><b>11:30</b></div><div class=\"span11 col-xs-11\"></div></div></div><div class=\"cal-day-hour\"><div class=\"row-fluid cal-day-hour-part\"><div class=\"span1 col-xs-1\"><b>12:00</b></div><div class=\"span11 col-xs-11\"></div></div><div class=\"row-fluid cal-day-hour-part\"><div class=\"span1 col-xs-1\"><b>12:30</b></div><div class=\"span11 col-xs-11\"></div></div></div><div class=\"cal-day-hour\"><div class=\"row-fluid cal-day-hour-part\"><div class=\"span1 col-xs-1\"><b>13:00</b></div><div class=\"span11 col-xs-11\"></div></div><div class=\"row-fluid cal-day-hour-part\"><div class=\"span1 col-xs-1\"><b>13:30</b></div><div class=\"span11 col-xs-11\"></div></div></div><div class=\"cal-day-hour\"><div class=\"row-fluid cal-day-hour-part\"><div class=\"span1 col-xs-1\"><b>14:00</b></div><div class=\"span11 col-xs-11\"></div></div><div class=\"row-fluid cal-day-hour-part\"><div class=\"span1 col-xs-1\"><b>14:30</b></div><div class=\"span11 col-xs-11\"></div></div></div><div class=\"cal-day-hour\"><div class=\"row-fluid cal-day-hour-part\"><div class=\"span1 col-xs-1\"><b>15:00</b></div><div class=\"span11 col-xs-11\"></div></div><div class=\"row-fluid cal-day-hour-part\"><div class=\"span1 col-xs-1\"><b>15:30</b></div><div class=\"span11 col-xs-11\"></div></div></div><div class=\"cal-day-hour\"><div class=\"row-fluid cal-day-hour-part\"><div class=\"span1 col-xs-1\"><b>16:00</b></div><div class=\"span11 col-xs-11\"></div></div><div class=\"row-fluid cal-day-hour-part\"><div class=\"span1 col-xs-1\"><b>16:30</b></div><div class=\"span11 col-xs-11\"></div></div></div><div class=\"cal-day-hour\"><div class=\"row-fluid cal-day-hour-part\"><div class=\"span1 col-xs-1\"><b>17:00</b></div><div class=\"span11 col-xs-11\"></div></div><div class=\"row-fluid cal-day-hour-part\"><div class=\"span1 col-xs-1\"><b>17:30</b></div><div class=\"span11 col-xs-11\"></div></div></div><div class=\"cal-day-hour\"><div class=\"row-fluid cal-day-hour-part\"><div class=\"span1 col-xs-1\"><b>18:00</b></div><div class=\"span11 col-xs-11\"></div></div><div class=\"row-fluid cal-day-hour-part\"><div class=\"span1 col-xs-1\"><b>18:30</b></div><div class=\"span11 col-xs-11\"></div></div></div><div class=\"cal-day-hour\"><div class=\"row-fluid cal-day-hour-part\"><div class=\"span1 col-xs-1\"><b>19:00</b></div><div class=\"span11 col-xs-11\"></div></div><div class=\"row-fluid cal-day-hour-part\"><div class=\"span1 col-xs-1\"><b>19:30</b></div><div class=\"span11 col-xs-11\"></div></div></div><div class=\"cal-day-hour\"><div class=\"row-fluid cal-day-hour-part\"><div class=\"span1 col-xs-1\"><b>20:00</b></div><div class=\"span11 col-xs-11\"></div></div><div class=\"row-fluid cal-day-hour-part\"><div class=\"span1 col-xs-1\"><b>20:30</b></div><div class=\"span11 col-xs-11\"></div></div></div><div class=\"cal-day-hour\"><div class=\"row-fluid cal-day-hour-part\"><div class=\"span1 col-xs-1\"><b>21:00</b></div><div class=\"span11 col-xs-11\"></div></div><div class=\"row-fluid cal-day-hour-part\"><div class=\"span1 col-xs-1\"><b>21:30</b></div><div class=\"span11 col-xs-11\"></div></div></div></div><div class=\"pull-left day-event day-highlight dh-event-{{ event.type }}\" ng-repeat=\"event in view\" ng-style=\"{\'margin-top\': event.marginTop + \'px\', height: event.height + \'px\'}\"><span class=\"cal-hours\">{{ event.starts_at | date:\'d MMM HH:mm\' }} - {{ event.ends_at | date:\'d MMM HH:mm\' }}</span><br><a href=\"javascript:;\" class=\"event-item\" ng-click=\"eventClick({$event: event})\">{{ event.title }}</a></div></div></div>");
$templateCache.put("templates/main.html","<div class=\"cal-context\" style=\"width: 100%;\"><mwl-calendar-year calendar-events=\"events\" calendar-current-day=\"currentDay\" calendar-control=\"subControls.year\" calendar-event-click=\"eventClickHandler($event)\" ng-show=\"view == \'year\'\"></mwl-calendar-year><mwl-calendar-month calendar-events=\"events\" calendar-current-day=\"currentDay\" calendar-control=\"subControls.month\" calendar-event-click=\"eventClickHandler($event)\" ng-show=\"view == \'month\'\"></mwl-calendar-month><mwl-calendar-week calendar-events=\"events\" calendar-current-day=\"currentDay\" calendar-control=\"subControls.week\" calendar-event-click=\"eventClickHandler($event)\" ng-show=\"view == \'week\'\"></mwl-calendar-week><mwl-calendar-day calendar-events=\"events\" calendar-current-day=\"currentDay\" calendar-control=\"subControls.day\" calendar-event-click=\"eventClickHandler($event)\" ng-show=\"view == \'day\'\"></mwl-calendar-day></div>");
$templateCache.put("templates/month.html","<div class=\"cal-row-fluid cal-row-head\"><div class=\"cal-cell1\" ng-repeat=\"day in weekDays\">{{ day }}</div></div><div class=\"cal-month-box\"><div ng-repeat=\"week in view\"><div class=\"cal-row-fluid cal-before-eventlist\"><div class=\"cal-cell1 cal-cell\" ng-repeat=\"day in week track by $index\" ng-click=\"dayClicked($parent.$index, $index)\" ng-class=\"{pointer: day.events.length > 0}\"><div class=\"cal-month-day\" ng-class=\"{\'cal-day-outmonth\': !day.inMonth, \'cal-day-inmonth\': day.inMonth, \'cal-day-weekend\': $index == 5 || $index == 6}\"><span class=\"pull-right\" data-cal-date=\"\">{{ day.label }}</span><div class=\"cal-day-tick\" ng-show=\"day.isOpened\"><i class=\"icon-chevron-down glyphicon glyphicon-chevron-down\"></i></div><div class=\"events-list\" ng-show=\"day.events.length > 0\"><a href=\"javascript:;\" ng-click=\"eventClick({$event: event})\" ng-repeat=\"event in day.events\" class=\"pull-left event event-{{ event.type }}\" tooltip-append-to-body=\"true\" tooltip=\"{{ event.title }}\"></a></div></div></div></div><div class=\"cal-slide-box\" ng-show=\"week.isOpened\"><div class=\"cal-slide-content cal-event-list\"><ul class=\"unstyled list-unstyled\"><li ng-repeat=\"event in openEvents\"><span class=\"pull-left event event-{{ event.type }}\"></span> &nbsp; <a href=\"javascript:;\" class=\"event-item\" ng-click=\"eventClick({$event: event})\">{{ event.title }}</a></li></ul></div></div></div></div>");
$templateCache.put("templates/week.html","<div class=\"cal-week-box\"><div class=\"cal-row-fluid cal-row-head\"><div class=\"cal-cell1\" ng-repeat=\"column in view.columns\" ng-class=\"{\'cal-day-weekend\': $index > 4}\">{{ column.weekDay }}<br><small><span data-cal-date=\"2013-03-10\">{{ column.date }}</span></small></div></div><hr><div class=\"cal-row-fluid\" ng-repeat=\"event in view.events\"><div class=\"cal-cell{{ event.daySpan }} cal-offset{{ event.dayOffset }} day-highlight dh-event-{{ event.type }}\" data-event-class=\"\"><a href=\"javascript:;\" ng-click=\"eventClick({$event: event})\" class=\"cal-event-week\">{{ event.title }}</a></div></div></div>");
$templateCache.put("templates/year.html","<div class=\"cal-year-box\"><div ng-repeat=\"year in view\"><div class=\"row cal-before-eventlist\"><div class=\"span3 col-md-3 col-xs-6 cal-cell\" ng-repeat=\"month in year\" ng-click=\"monthClicked($parent.$index, $index)\" ng-class=\"{pointer: month.events.length > 0}\"><span class=\"pull-right\" data-cal-date=\"\">{{ month.label }}</span> <small class=\"cal-events-num badge badge-important pull-left\" ng-show=\"month.events.length > 0\">{{ month.events.length }}</small><div class=\"cal-day-tick\" ng-show=\"month.isOpened\"><i class=\"icon-chevron-down glyphicon glyphicon-chevron-down\"></i></div></div></div><div class=\"cal-slide-box\" ng-show=\"year.isOpened\"><span class=\"cal-slide-tick\"></span><div class=\"cal-slide-content\"><ul class=\"unstyled list-unstyled\"><li ng-repeat=\"event in openEvents\"><span class=\"pull-left event\" ng-class=\"\'event-\' + event.type\"></span> &nbsp; <a href=\"javascript:;\" class=\"event-item\" ng-click=\"eventClick({$event: event})\">{{ event.title }}</a></li></ul></div></div></div></div>");}]);
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

    this.getMonthNames = function(short) {

      var format = short ? 'MMM' : 'MMMM';

      var months = [];
      for (var i = 0; i <= 11; i++) {
        months.push($filter('date')(new Date(2014, i), format));
      }

      return months;

    };

    this.getWeekDayNames = function(short) {

      var format = short ? 'EEE' : 'EEEE';

      var weekdays = [];
      for (var i = 0; i <= 6; i++) {
        weekdays.push($filter('date')(new Date(2014, 8, 22 + i), format));
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
      );

    };

    this.getYearView = function(events, currentDay) {

      var grid = [];
      var months = self.getMonthNames();

      for (var i = 0; i < 3; i++) {
        var row = [];
        for (var j = 0; j < 4; j++) {
          var monthIndex = 12 - months.length;
          row.push({
            label: months.shift(),
            events: events.filter(function(event) {
              var startPeriod = new Date(moment(currentDay).format('YYYY'), monthIndex, 1);
              var endPeriod = moment(startPeriod).add(1, 'month').subtract(1, 'second').toDate();

              return self.eventIsInPeriod(event.starts_at, event.ends_at, startPeriod, endPeriod);
            })
          });
        }
        grid.push(row);
      }

      return grid;

    };

    this.getMonthView = function(events, currentDay) {

      function getWeekDayIndex(date) {
        var day = startOfMonth.day() - 1;
        if (day < 0) day = 6;
        return day;
      }

      var startOfMonth = moment(currentDay).startOf('month');
      var numberOfDaysInMonth = moment(currentDay).endOf('month').date();

      var grid = [];
      var buildRow = new Array(7);

      for (var i = 1; i <= numberOfDaysInMonth; i++) {

        if (i == 1) {
          var weekdayIndex = getWeekDayIndex(startOfMonth);
          var prefillMonth = startOfMonth.clone();
          while (weekdayIndex > 0) {
            weekdayIndex--;
            prefillMonth = prefillMonth.subtract(1, 'day');
            buildRow[weekdayIndex] = {
              label: prefillMonth.date(),
              inMonth: false,
              events: []
            };
          }
        }

        buildRow[getWeekDayIndex(startOfMonth)] = {
          label: startOfMonth.date(),
          inMonth: true,
          events: events.filter(function(event) {
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

    this.getWeekView = function(events, currentDay) {

      var columns = new Array(7);
      var weekDays = self.getWeekDayNames();
      var currentWeekDayIndex = currentDay.getDay();
      var beginningOfWeek, endOfWeek;

      for (var i = currentWeekDayIndex; i >= 0; i--) {
        var date = moment(currentDay).subtract(currentWeekDayIndex - i, 'days').add(1, 'day').toDate();
        columns[i] = {
          weekDay: weekDays[i],
          date: $filter('date')(date, 'd MMM')
        };
        if (i == 0) {
          beginningOfWeek = date;
        } else if (i == 6) {
          endOfWeek = date;
        }
      }

      for (var i = currentWeekDayIndex + 1; i < 7; i++) {
        var date = moment(currentDay).add(i - currentWeekDayIndex, 'days').add(1, 'day').toDate();
        columns[i] = {
          weekDay: weekDays[i],
          date: $filter('date')(date, 'd MMM')
        };
        if (i == 0) {
          beginningOfWeek = date;
        } else if (i == 6) {
          endOfWeek = date;
        }
      }

      endOfWeek = moment(endOfWeek).add(1, 'day').subtract(1, 'second').toDate();

      var eventsSorted = events.filter(function(event) {
        return self.eventIsInPeriod(event.starts_at, event.ends_at, beginningOfWeek, endOfWeek);
      }).map(function(event) {
        var span = moment(event.ends_at).diff(moment(event.starts_at), 'days') + 1;
        if (span > 7) {
          span = 7;
          if (moment(event.ends_at).diff(moment(endOfWeek), 'days') < 0) {
            span += moment(event.ends_at).diff(moment(endOfWeek), 'days') + 1;
          }
        }

        var offset = moment(event.starts_at).diff(moment(beginningOfWeek), 'days');
        if (offset < 0) offset = 0;
        if (offset > 6) offset = 6;

        if (span - offset > 0) {
          span -= offset;
        }

        event.daySpan = span;
        event.dayOffset = offset;
        return event;
      });

      return {columns: columns, events: eventsSorted};

    };

    this.getDayView = function(events, currentDay) {

      var calendarStart = moment(currentDay).startOf('day').add(6, 'hours');
      var calendarEnd = moment(currentDay).startOf('day').add(22, 'hours');
      var calendarHeight = 16 * 60;

      return events.filter(function(event) {
        return self.eventIsInPeriod(event.starts_at, event.ends_at, moment(currentDay).startOf('day').toDate(), moment(currentDay).endOf('day').toDate());
      }).map(function(event) {
        if (moment(event.starts_at).isBefore(calendarStart)) {
          event.marginTop = '0';
        } else {
          event.marginTop = moment(event.starts_at).diff(calendarStart, 'minutes');
        }

        if (moment(event.ends_at).isAfter(calendarEnd)) {
          event.height = calendarHeight - event.marginTop;
        } else {
          var diffStart = event.starts_at;
          if (moment(event.starts_at).isBefore(calendarStart)) {
            diffStart = calendarStart.toDate();
          }
          event.height = moment(event.ends_at).diff(diffStart, 'minutes');
        }

        if (event.marginTop - event.height > calendarHeight) {
          event.height = 0;
        }

        return event;
      }).filter(function(event) {
        return event.height > 0;
      });

    };

    this.toggleEventBreakdown = function(view, rowIndex, cellIndex) {

      var openEvents = [];

      if (view[rowIndex][cellIndex].events.length > 0) {

        var isCellOpened = view[rowIndex][cellIndex].isOpened;

        view = view.map(function(row) {
          row.isOpened = false;
          return row.map(function(cell) {
            cell.isOpened = false;
            return cell;
          });
        });

        view[rowIndex][cellIndex].isOpened = !isCellOpened;
        view[rowIndex].isOpened = !isCellOpened;
        openEvents = view[rowIndex][cellIndex].events;
      }

      return {view: view, openEvents: openEvents};

    };

  }]);

'use strict';

/**
 * @ngdoc directive
 * @name angularBootstrapCalendarApp.directive:mwlCalendarYear
 * @description
 * # mwlCalendarYear
 */
angular.module('mwl.calendar')
  .directive('mwlCalendarYear', ["calendarHelper", "moment", function(calendarHelper, moment) {
    return {
      templateUrl: 'templates/year.html',
      restrict: 'EA',
      scope: {
        events: '=calendarEvents',
        currentDay: '=calendarCurrentDay',
        control: '=calendarControl',
        eventClick: '&calendarEventClick'
      },
      link: function postLink(scope, element, attrs) {

        scope.control = scope.control || {};

        scope.control.getTitle = function() {
          return moment(scope.currentDay).format('YYYY');
        };

        scope.control.updateView = function() {
          scope.view = calendarHelper.getYearView(scope.events, scope.currentDay);
        };

        scope.monthClicked = function(yearIndex, monthIndex) {

          var handler = calendarHelper.toggleEventBreakdown(scope.view, yearIndex, monthIndex);
          scope.view = handler.view;
          scope.openEvents = handler.openEvents;

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
      scope: {
        events: '=calendarEvents',
        currentDay: '=calendarCurrentDay',
        control: '=calendarControl',
        eventClick: '&calendarEventClick'
      },
      link: function postLink(scope, element, attrs) {

        scope.control = scope.control || {};

        scope.control.getTitle = function() {
          return 'Week ' + moment(scope.currentDay).week() + ' of ' + moment(scope.currentDay).format('YYYY');
        };

        scope.control.updateView = function() {
          scope.view = calendarHelper.getWeekView(scope.events, scope.currentDay);
        };

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
  .directive('mwlCalendarMonth', ["calendarHelper", function (calendarHelper) {
    return {
      templateUrl: 'templates/month.html',
      restrict: 'EA',
      scope: {
        events: '=calendarEvents',
        currentDay: '=calendarCurrentDay',
        control: '=calendarControl',
        eventClick: '&calendarEventClick'
      },
      link: function postLink(scope, element, attrs) {

        scope.control = scope.control || {};

        scope.control.getTitle = function() {
          return moment(scope.currentDay).format('MMMM YYYY');
        };

        scope.control.updateView = function() {
          scope.view = calendarHelper.getMonthView(scope.events, scope.currentDay);
        };

        scope.weekDays = calendarHelper.getWeekDayNames();

        scope.dayClicked = function(rowIndex, cellIndex) {

          var handler = calendarHelper.toggleEventBreakdown(scope.view, rowIndex, cellIndex);
          scope.view = handler.view;
          scope.openEvents = handler.openEvents;

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
  .directive('mwlCalendarDay', ["calendarHelper", function(calendarHelper) {
    return {
      templateUrl: 'templates/day.html',
      restrict: 'EA',
      scope: {
        events: '=calendarEvents',
        currentDay: '=calendarCurrentDay',
        control: '=calendarControl',
        eventClick: '&calendarEventClick'
      },
      link: function postLink(scope, element, attrs) {

        scope.control = scope.control || {};

        scope.control.getTitle = function() {
          return moment(scope.currentDay).format('dddd DD MMMM, YYYY');
        };

        scope.control.updateView = function() {
          scope.view = calendarHelper.getDayView(scope.events, scope.currentDay);
        };

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
  .directive('mwlCalendar', ["$timeout", "moment", function ($timeout, moment) {
    return {
      templateUrl: 'templates/main.html',
      restrict: 'EA',
      scope: {
        events: '=calendarEvents',
        view: '=calendarView',
        currentDay: '=calendarCurrentDay',
        control: '=calendarControl',
        title: '=calendarTitle',
        eventClick: '&calendarEventClick'
      },
      link: function postLink(scope, element, attrs) {

        scope.subControls = {};

        scope.control = scope.control || {};

        scope.control.prev = function() {
          scope.currentDay = moment(scope.currentDay).subtract(1, scope.view).toDate();
        };

        scope.control.next = function() {
          scope.currentDay = moment(scope.currentDay).add(1, scope.view).toDate();
        };

        scope.eventClickHandler = function(event) {
          scope.eventClick({$event: event});
        }

        function updateView() {
          $timeout(function() {
            if (scope.subControls[scope.view]) {
              scope.title = scope.subControls[scope.view].getTitle();
              scope.subControls[scope.view].updateView();
            } else {
              updateView();
            }
          });
        }

        $timeout(function() {
          scope.$watch('view', updateView);
          scope.$watch('currentDay', updateView);
          scope.$watch('events', updateView);
        });


      }
    };
  }]);
