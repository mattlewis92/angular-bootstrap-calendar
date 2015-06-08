'use strict';

angular
  .module('mwl.calendar')
  .factory('calendarHelper', function(dateFilter, moment, calendarConfig) {

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
            throw new Error('Invalid value (' + event.recursOn + ') given for recurs on. Can only be year, month or week.');
        }

        eventEnd = adjustEndDateFromStartDiff(event.startsAt, eventStart, eventEnd);

      }

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

      var eventsSorted = filterEventsInPeriod(events, startOfWeek, endOfWeek).map(function(event) {

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

      return {days: days, events: eventsSorted};

    }

    function getDayView(events, currentDay, dayViewStart, dayViewEnd, dayViewSplit) {

      var dayStartHour = moment(dayViewStart || '00:00', 'HH:mm').hours();
      var dayEndHour = moment(dayViewEnd || '23:00', 'HH:mm').hours();
      var hourHeight = (60 / dayViewSplit) * 30;
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
      }).filter(function(event) {
        return event.height > 0;
      }).map(function(event) {

        var cannotFitInABucket = true;
        buckets.forEach(function(bucket, bucketIndex) {
          var canFitInThisBucket = true;

          bucket.forEach(function(bucketItem) {
            if (eventIsInPeriod(event, bucketItem.startsAt, bucketItem.endsAt || bucketItem.startsAt) ||
              eventIsInPeriod(bucketItem, event.startsAt, event.endsAt || event.startsAt)) {
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
      weekView.days.forEach(function(day) {
        var dayEvents = weekView.events.filter(function(event) {
          return moment(event.startsAt).startOf('day').isSame(moment(day.date).startOf('day'));
        });
        var newDayEvents = getDayView(
          dayEvents,
          day.date,
          dayViewStart,
          dayViewEnd,
          dayViewSplit
        );
        newEvents = newEvents.concat(newDayEvents);
      });
      weekView.events = newEvents;
      return weekView;
    }

    function getDayViewHeight(dayViewStart, dayViewEnd, dayViewSplit) {
      var dayViewStartM = moment(dayViewStart || '00:00', 'HH:mm');
      var dayViewEndM = moment(dayViewEnd || '23:00', 'HH:mm');
      var hourHeight = (60 / dayViewSplit) * 30;
      return ((dayViewEndM.diff(dayViewStartM, 'hours') + 1) * hourHeight) + 2;
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
      eventIsInPeriod: eventIsInPeriod //expose for testing only
    };

  });
