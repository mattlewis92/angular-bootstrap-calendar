'use strict';

/**
 * @ngdoc service
 * @name angularBootstrapCalendarApp.calendarHelper
 * @description
 * # calendarHelper
 * Service in the angularBootstrapCalendarApp.
 */
angular.module('mwl.calendar')
  .service('calendarHelper', function (moment, calendarConfig) {

    var self = this;

    function isISOWeekBasedOnLocale() {
      return moment().startOf('week').day() === 1;
    }

    function isISOWeek(userValue) {
      //If a manual override has been set in the directive, use that
      if (angular.isDefined(userValue)) {
        return userValue;
      }
      //Otherwise fallback to the locale
      return isISOWeekBasedOnLocale();
    }

    function getEventsInPeriod(calendarDate, period, allEvents) {
      var startPeriod = moment(calendarDate).startOf(period);
      var endPeriod = moment(calendarDate).endOf(period);
      return allEvents.filter(function(event) {
        return self.eventIsInPeriod(event.starts_at, event.ends_at, startPeriod, endPeriod);
      });
    }

    this.getMonthNames = function() {

      var months = [];
      for (var i = 0; i <= 11; i++) {
        months.push(moment(new Date(2014, i)).format(calendarConfig.dateFormats.month));
      }

      return months;

    };

    this.getWeekDayNames = function(short, useISOWeek) {

      var weekdays = [];
      var startDay = isISOWeek(useISOWeek) ? 22 : 21;
      for (var i = 0; i <= 6; i++) {
        weekdays.push(moment(new Date(2014, 8, startDay + i)).format(calendarConfig.dateFormats.weekDay));
      }

      return weekdays;

    };

    this.eventIsInPeriod = function(eventStart, eventEnd, periodStart, periodEnd) {

      eventStart = moment(eventStart);
      eventEnd = moment(eventEnd);
      periodStart = moment(periodStart);
      periodEnd = moment(periodEnd);

      return (eventStart.isAfter(periodStart) && eventStart.isBefore(periodEnd)) ||
        (eventEnd.isAfter(periodStart) && eventEnd.isBefore(periodEnd)) ||
        (eventStart.isBefore(periodStart) && eventEnd.isAfter(periodEnd)) ||
        eventStart.isSame(periodStart) ||
        eventEnd.isSame(periodEnd);

    };

    this.getYearView = function(events, currentDay) {

      var grid = [];
      var months = self.getMonthNames();
      var eventsInPeriod = getEventsInPeriod(currentDay, 'year', events);

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
            events: eventsInPeriod.filter(function(event) {
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

      var eventsInPeriod = getEventsInPeriod(currentDay, 'month', events);

      var dateOffset = isISOWeek(useISOWeek) ? 1 : 0;

      var startOfMonth = moment(currentDay).startOf('month');
      var numberOfDaysInMonth = moment(currentDay).endOf('month').date();

      var grid = [];
      var buildRow = new Array(7);
      var eventsWithIds = eventsInPeriod.map(function(event, index) {
        event.$id = index;
        return event;
      });

      function getWeekDayIndex() {
        var day = startOfMonth.day() - dateOffset;
        if (day < 0) {
          day = 6;
        }
        return day;
      }

      for (var i = 1; i <= numberOfDaysInMonth; i++) {

        if (i === 1) {
          var weekdayIndex = getWeekDayIndex(startOfMonth);
          var prefillMonth = startOfMonth.clone();
          while (weekdayIndex > 0) {
            weekdayIndex--;
            prefillMonth = prefillMonth.subtract(1, 'day');
            buildRow[weekdayIndex] = {
              label: prefillMonth.date(),
              date: prefillMonth.clone(),
              inMonth: false,
              isPast: moment().startOf('day').isAfter(prefillMonth),
              isToday: moment().startOf('day').isSame(prefillMonth),
              isFuture: moment().startOf('day').isBefore(prefillMonth),
              events: []
            };
          }
        }

        buildRow[getWeekDayIndex(startOfMonth)] = {
          label: startOfMonth.date(),
          inMonth: true,
          isPast: moment().startOf('day').isAfter(startOfMonth),
          isToday: moment().startOf('day').isSame(startOfMonth),
          isFuture: moment().startOf('day').isBefore(startOfMonth),
          isWeekend: [0, 6].indexOf(moment(startOfMonth).day()) > -1,
          date: startOfMonth.clone(),
          events: eventsWithIds.filter(function(event) {
            return self.eventIsInPeriod(event.starts_at, event.ends_at, startOfMonth.clone().startOf('day'), startOfMonth.clone().endOf('day'));
          })
        };

        if (i === numberOfDaysInMonth) {
          weekdayIndex = getWeekDayIndex(startOfMonth);
          var postfillMonth = startOfMonth.clone();
          while (weekdayIndex < 6) {
            weekdayIndex++;
            postfillMonth = postfillMonth.add(1, 'day');
            buildRow[weekdayIndex] = {
              label: postfillMonth.date(),
              date: postfillMonth.clone(),
              inMonth: false,
              isPast: moment().startOf('day').isAfter(postfillMonth),
              isToday: moment().startOf('day').isSame(postfillMonth),
              isFuture: moment().startOf('day').isBefore(postfillMonth),
              events: []
            };
          }
        }

        if (getWeekDayIndex(startOfMonth) === 6 || i === numberOfDaysInMonth) {
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
          isWeekend: [0, 6].indexOf(moment(date).day()) > -1
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
          isWeekend: [0, 6].indexOf(moment(date).day()) > -1
        };
        if (i === 0) {
          beginningOfWeek = date;
        } else if (i === 6) {
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

    this.getDayView = function(events, currentDay, dayStartHour, dayEndHour, dayHeight) {

      var eventsInPeriod = getEventsInPeriod(currentDay, 'day', events);
      var calendarStart = moment(currentDay).startOf('day').add(dayStartHour, 'hours');
      var calendarEnd = moment(currentDay).startOf('day').add(dayEndHour, 'hours');
      var calendarHeight = (dayEndHour - dayStartHour + 1) * dayHeight;
      var dayHeightMultiplier = dayHeight / 60;
      var buckets = [];

      return eventsInPeriod.filter(function(event) {
        return self.eventIsInPeriod(event.starts_at, event.ends_at, moment(currentDay).startOf('day').toDate(), moment(currentDay).endOf('day').toDate());
      }).map(function(event) {
        if (moment(event.starts_at).isBefore(calendarStart)) {
          event.top = 0;
        } else {
          event.top = (moment(event.starts_at).startOf('minute').diff(calendarStart.startOf('minute'), 'minutes') * dayHeightMultiplier) - 2;
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

  });
