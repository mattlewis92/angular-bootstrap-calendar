'use strict';

angular
  .module('mwl.calendar')
  .service('calendarHelper', function (moment, calendarConfig) {

    var self = this;

    function isISOWeekBasedOnLocale() {
      return moment().startOf('week').day() === 1;
    }

    function getEventsInPeriod(calendarDate, period, allEvents) {
      var startPeriod = moment(calendarDate).startOf(period);
      var endPeriod = moment(calendarDate).endOf(period);
      return allEvents.filter(function(event) {
        return self.eventIsInPeriod(event.starts_at, event.ends_at, startPeriod, endPeriod);
      });
    }

    this.getWeekDayNames = function() {

      var weekdays = [];
      var count = 0;
      while(count < 7) {
        weekdays.push(moment().weekday(count++).format(calendarConfig.dateFormats.weekDay));
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
          events: eventsInPeriod.filter(function(event) {
            return self.eventIsInPeriod(event.starts_at, event.ends_at, startPeriod, endPeriod);
          }),
          date: startPeriod
        });

        month.add(1, 'month');
        count++;
      }

      return view;

    };

    this.getMonthView = function(events, currentDay) {

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
          monthEvents = eventsInPeriod.filter(function(event) {
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
          isWeekend: [0, 6].indexOf(day.day()) > -1,
          events: monthEvents
        });

        day.add(1, 'day');
      }

      return view;

    };

    this.getWeekView = function(events, currentDay) {

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
        return self.eventIsInPeriod(
          event.starts_at,
          event.ends_at,
          moment(currentDay).startOf('day').toDate(),
          moment(currentDay).endOf('day').toDate()
        );
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
            if (self.eventIsInPeriod(event.starts_at, event.ends_at, bucketItem.starts_at, bucketItem.ends_at) ||
              self.eventIsInPeriod(bucketItem.starts_at, bucketItem.ends_at, event.starts_at, event.ends_at)) {
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

  });
