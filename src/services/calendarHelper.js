'use strict';

angular
  .module('mwl.calendar')
  .factory('calendarHelper', function (moment, calendarConfig) {

    function eventIsInPeriod(eventStart, eventEnd, periodStart, periodEnd) {

      eventStart = moment(eventStart);
      eventEnd = moment(eventEnd);
      periodStart = moment(periodStart);
      periodEnd = moment(periodEnd);

      return (eventStart.isAfter(periodStart) && eventStart.isBefore(periodEnd)) ||
        (eventEnd.isAfter(periodStart) && eventEnd.isBefore(periodEnd)) ||
        (eventStart.isBefore(periodStart) && eventEnd.isAfter(periodEnd)) ||
        eventStart.isSame(periodStart) ||
        eventEnd.isSame(periodEnd);

    }

    function getEventsInPeriod(calendarDate, period, allEvents) {
      var startPeriod = moment(calendarDate).startOf(period);
      var endPeriod = moment(calendarDate).endOf(period);
      return allEvents.filter(function(event) {
        return eventIsInPeriod(event.startsAt, event.endsAt, startPeriod, endPeriod);
      });
    }

    function getBadgeTotal(events) {
      return events.filter(function(event) {
        return event.incrementsBadgeTotal !== false;
      }).length;
    }

    function getWeekDayNames() {
      var weekdays = [];
      var count = 0;
      while(count < 7) {
        weekdays.push(moment().weekday(count++).format(calendarConfig.dateFormats.weekDay));
      }
      return weekdays;
    }

    function filterEventsInPeriod(events, startPeriod, endPeriod) {
      return events.filter(function(event) {
        return eventIsInPeriod(event.startsAt, event.endsAt, startPeriod, endPeriod);
      });
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
          label: startPeriod.format(calendarConfig.dateFormats.month),
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
          monthEvents = filterEventsInPeriod(eventsInPeriod, day, day.clone().endOf('day'));
        }

        view.push({
          label: day.date(),
          date: day.clone(),
          inMonth: inMonth,
          isPast: today.isAfter(day),
          isToday: today.isSame(day),
          isFuture: today.isBefore(day),
          isWeekend: [0, 6].indexOf(day.day()) > -1,
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
      while(days.length < 7) {
        days.push({
          weekDayLabel: dayCounter.format(calendarConfig.dateFormats.weekDay),
          date: dayCounter.clone(),
          dayLabel: dayCounter.format(calendarConfig.dateFormats.day),
          isPast: dayCounter.isBefore(today),
          isToday: dayCounter.isSame(today),
          isFuture: dayCounter.isAfter(today),
          isWeekend: [0, 6].indexOf(dayCounter.day()) > -1
        });
        dayCounter.add(1, 'day');
      }

      var eventsSorted = filterEventsInPeriod(events, startOfWeek, endOfWeek).map(function(event) {

        var eventStart = moment(event.startsAt).startOf('day');
        var eventEnd = moment(event.endsAt).startOf('day');
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

    function getDayView(events, currentDay, dayStartHour, dayEndHour, hourHeight) {

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

        if (moment(event.endsAt).isAfter(calendarEnd)) {
          event.height = calendarHeight - event.top;
        } else {
          var diffStart = event.startsAt;
          if (moment(event.startsAt).isBefore(calendarStart)) {
            diffStart = calendarStart.toDate();
          }
          event.height = moment(event.endsAt).diff(diffStart, 'minutes') * hourHeightMultiplier;
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
            if (eventIsInPeriod(event.startsAt, event.endsAt, bucketItem.startsAt, bucketItem.endsAt) ||
              eventIsInPeriod(bucketItem.startsAt, bucketItem.endsAt, event.startsAt, event.endsAt)) {
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

  });
