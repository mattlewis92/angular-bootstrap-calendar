'use strict';

var angular = require('angular');
var calendarUtils = require('calendar-utils');

angular
  .module('mwl.calendar')
  .factory('calendarHelper', function($q, $templateRequest, dateFilter, moment, calendarConfig) {

    function formatDate(date, format) {
      if (calendarConfig.dateFormatter === 'angular') {
        return dateFilter(moment(date).toDate(), format);
      } else if (calendarConfig.dateFormatter === 'moment') {
        return moment(date).format(format);
      } else {
        throw new Error('Unknown date formatter: ' + calendarConfig.dateFormatter);
      }
    }

    function adjustEndDateFromStartDiff(oldStart, newStart, oldEnd) {
      if (!oldEnd) {
        return oldEnd;
      }
      var diffInSeconds = moment(newStart).diff(moment(oldStart));
      return moment(oldEnd).add(diffInSeconds);
    }

    function getRecurringEventPeriod(eventPeriod, recursOn, containerPeriodStart) {

      var eventStart = moment(eventPeriod.start);
      var eventEnd = moment(eventPeriod.end);
      var periodStart = moment(containerPeriodStart);

      if (recursOn) {

        switch (recursOn) {
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
            throw new Error('Invalid value (' + recursOn + ') given for recurs on. Can only be year or month.');
        }

        eventEnd = adjustEndDateFromStartDiff(eventPeriod.start, eventStart, eventEnd);

      }

      return {start: eventStart, end: eventEnd};

    }

    function eventIsInPeriod(event, periodStart, periodEnd) {

      periodStart = moment(periodStart);
      periodEnd = moment(periodEnd);

      var eventPeriod = getRecurringEventPeriod({start: event.startsAt, end: event.endsAt || event.startsAt}, event.recursOn, periodStart);
      var eventStart = eventPeriod.start;
      var eventEnd = eventPeriod.end;

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

    function getYearView(events, viewDate, cellModifier) {

      var view = [];
      var eventsInPeriod = getEventsInPeriod(viewDate, 'year', events);
      var month = moment(viewDate).startOf('year');
      var count = 0;
      while (count < 12) {
        var startPeriod = month.clone();
        var endPeriod = startPeriod.clone().endOf('month');
        var periodEvents = filterEventsInPeriod(eventsInPeriod, startPeriod, endPeriod);
        var cell = {
          label: formatDate(startPeriod, calendarConfig.dateFormats.month),
          isToday: startPeriod.isSame(moment().startOf('month')),
          events: periodEvents,
          date: startPeriod,
          badgeTotal: getBadgeTotal(periodEvents)
        };

        cellModifier({calendarCell: cell});
        view.push(cell);
        month.add(1, 'month');
        count++;
      }

      return view;

    }

    function getMonthView(events, viewDate, cellModifier) {

      var startOfMonth = moment(viewDate).startOf('month');
      var day = startOfMonth.clone().startOf('week');
      var endOfMonthView = moment(viewDate).endOf('month').endOf('week');
      var eventsInPeriod;
      if (calendarConfig.displayAllMonthEvents) {
        eventsInPeriod = filterEventsInPeriod(events, day, endOfMonthView);
      } else {
        eventsInPeriod = filterEventsInPeriod(events, startOfMonth, startOfMonth.clone().endOf('month'));
      }
      var view = [];
      var today = moment().startOf('day');

      while (day.isBefore(endOfMonthView)) {

        var inMonth = day.month() === moment(viewDate).month();
        var monthEvents = [];
        if (inMonth || calendarConfig.displayAllMonthEvents) {
          monthEvents = filterEventsInPeriod(eventsInPeriod, day, day.clone().endOf('day'));
        }

        var cell = {
          label: day.date(),
          date: day.clone(),
          inMonth: inMonth,
          isPast: today.isAfter(day),
          isToday: today.isSame(day),
          isFuture: today.isBefore(day),
          isWeekend: [0, 6].indexOf(day.day()) > -1,
          events: monthEvents,
          badgeTotal: getBadgeTotal(monthEvents)
        };

        cellModifier({calendarCell: cell});

        view.push(cell);

        day.add(1, 'day');
      }

      return view;

    }

    function getWeekView(events, viewDate) {

      var startOfWeek = moment(viewDate).startOf('week');
      var endOfWeek = moment(viewDate).endOf('week');
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

      var eventRows = calendarUtils.getWeekView({
        viewDate: viewDate,
        events: filterEventsInPeriod(events, startOfWeek, endOfWeek).map(function(event) {

          var weekViewStart = moment(startOfWeek).startOf('day');

          var eventPeriod = getRecurringEventPeriod({
            start: moment(event.startsAt).startOf('day'),
            end: moment(event.endsAt || event.startsAt).startOf('day').add(1, 'second')
          }, event.recursOn, weekViewStart);

          eventPeriod.originalEvent = event;

          return eventPeriod;

        })
      }).map(function(eventRow) {

        eventRow.row = eventRow.row.map(function(rowEvent) {
          rowEvent.event = rowEvent.event.originalEvent;
          return rowEvent;
        });

        return eventRow;

      });

      return {days: days, eventRows: eventRows};

    }

    function getDayView(events, viewDate, dayViewStart, dayViewEnd, dayViewSplit) {

      var dayStart = (dayViewStart || '00:00').split(':');
      var dayEnd = (dayViewEnd || '23:59').split(':');

      var allDayEvents = events.filter(function(event) {
        return event.allDay;
      });

      var nonAllDayEvents = events.filter(function(event) {
        return !event.allDay;
      });

      var view = calendarUtils.getDayView({
        events: nonAllDayEvents.map(function(event) { // hack required to work with event API
          event.start = event.startsAt;
          event.end = event.endsAt;
          return event;
        }),
        viewDate: viewDate,
        hourSegments: 60 / dayViewSplit,
        dayStart: {
          hour: dayStart[0],
          minute: dayStart[1]
        },
        dayEnd: {
          hour: dayEnd[0],
          minute: dayEnd[1]
        },
        eventWidth: 150,
        segmentHeight: 30
      });

      // remove hack to work with new event API
      nonAllDayEvents.forEach(function(event) {
        delete event.start;
        delete event.end;
      });

      view.allDayEvents = allDayEvents;

      return view;

    }

    function getWeekViewWithTimes(events, viewDate, dayViewStart, dayViewEnd, dayViewSplit) {
      var weekView = getWeekView(events, viewDate);
      var newEvents = [];
      var flattenedEvents = [];
      weekView.eventRows.forEach(function(row) {
        row.row.forEach(function(eventRow) {
          flattenedEvents.push(eventRow.event);
        });
      });
      weekView.days.forEach(function(day) {
        var dayEvents = flattenedEvents.filter(function(event) {
          return moment(event.startsAt).startOf('day').isSame(moment(day.date).startOf('day'));
        });
        var newDayEvents = getDayView(
          dayEvents,
          day.date,
          dayViewStart,
          dayViewEnd,
          dayViewSplit
        ).events;
        newEvents = newEvents.concat(newDayEvents);
      });
      weekView.eventRows = [{
        row: newEvents.map(function(dayEvent) {
          var event = dayEvent.event;
          return {
            event: event,
            top: dayEvent.top,
            offset: calendarUtils.getDayOffset(
              {start: event.startsAt, end: event.endsAt},
              moment(viewDate).startOf('week')
            )
          };
        })
      }];
      return weekView;
    }

    function getDayViewHeight(dayViewStart, dayViewEnd, dayViewSplit) {
      var dayViewStartM = moment(dayViewStart || '00:00', 'HH:mm');
      var dayViewEndM = moment(dayViewEnd || '23:59', 'HH:mm');
      var hourHeight = (60 / dayViewSplit) * 30;
      return ((dayViewEndM.diff(dayViewStartM, 'minutes') / 60) * hourHeight) + 3;
    }

    function loadTemplates() {

      var templatePromises = Object.keys(calendarConfig.templates).map(function(key) {
        var templateUrl = calendarConfig.templates[key];
        return $templateRequest(templateUrl);
      });

      return $q.all(templatePromises);

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
      loadTemplates: loadTemplates,
      eventIsInPeriod: eventIsInPeriod //expose for testing only
    };

  });
