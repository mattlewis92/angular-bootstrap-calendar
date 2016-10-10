'use strict';

var angular = require('angular');
var moment = require('moment');
beforeEach(angular.mock.module('mwl.calendar'));

describe('calendarHelper', function() {

  var calendarHelper, events, clock, calendarDay, calendarConfig, $templateCache, $rootScope;

  beforeEach(inject(function(_calendarHelper_, _calendarConfig_, _$templateCache_, _$rootScope_) {
    calendarHelper = _calendarHelper_;
    calendarConfig = _calendarConfig_;
    $templateCache = _$templateCache_;
    $rootScope = _$rootScope_;

    events = [{
      title: 'Event 1',
      type: 'info',
      startsAt: new Date('October 20, 2015 02:00:00'),
      endsAt: new Date('October 20, 2015 15:00:00'),
      incrementsBadgeTotal: true
    }, {
      title: 'Event 2',
      type: 'info',
      startsAt: new Date('October 20, 2015 01:00:00'),
      endsAt: new Date('October 20, 2015 15:00:00'),
      incrementsBadgeTotal: false
    }];

    clock = sinon.useFakeTimers(new Date('October 20, 2015 11:10:00').getTime());

    calendarDay = new Date();

  }));

  afterEach(function() {
    clock.restore();
  });

  describe('eventIsInPeriod', function() {

    var periodStart, periodEnd;

    beforeEach(function() {
      periodStart = new Date('January 1, 2015 00:00:00');
      periodEnd = new Date('January 31, 2015 00:00:00');
    });

    it('should be true when the event starts within the period', function() {

      var isInPeriod = calendarHelper.eventIsInPeriod({
        startsAt: new Date('January 2, 2015 00:00:00'),
        endsAt: new Date('January 3, 2016 00:00:00')
      }, periodStart, periodEnd);

      expect(isInPeriod).to.be.true;

    });

    it('should be true when the event ends within the period', function() {
      var isInPeriod = calendarHelper.eventIsInPeriod({
        startsAt: new Date('January 2, 2014 00:00:00'),
        endsAt: new Date('January 3, 2015 00:00:00')
      }, periodStart, periodEnd);

      expect(isInPeriod).to.be.true;
    });

    it('should be true when the event starts before the period and ends after it', function() {
      var isInPeriod = calendarHelper.eventIsInPeriod({
        startsAt: new Date('January 2, 2014 00:00:00'),
        endsAt: new Date('January 3, 2016 00:00:00')
      }, periodStart, periodEnd);

      expect(isInPeriod).to.be.true;
    });

    it('should be true when the event starts at the same time as the period start', function() {
      var isInPeriod = calendarHelper.eventIsInPeriod({
        startsAt: new Date('January 1, 2015 00:00:00'),
        endsAt: new Date('January 3, 2015 00:00:00')
      }, periodStart, periodEnd);

      expect(isInPeriod).to.be.true;
    });

    it('should be true when the event ends at the same time as the period end', function() {
      var isInPeriod = calendarHelper.eventIsInPeriod({
        startsAt: new Date('January 3, 2015 00:00:00'),
        endsAt: new Date('January 31, 2015 00:00:00')
      }, periodStart, periodEnd);

      expect(isInPeriod).to.be.true;
    });

    it('should be false when the event doesn\'t overlap the period', function() {
      var isInPeriod = calendarHelper.eventIsInPeriod({
        startsAt: new Date('January 3, 2014 00:00:00'),
        endsAt: new Date('January 31, 2014 00:00:00')
      }, periodStart, periodEnd);

      expect(isInPeriod).to.be.false;
    });

    it('should be true when the event occurs yearly and the event start and end times don\'t overlap', function() {
      var isInPeriod = calendarHelper.eventIsInPeriod({
        startsAt: new Date('January 3, 2014 00:00:00'),
        endsAt: new Date('January 31, 2014 00:00:00'),
        recursOn: 'year'
      }, periodStart, periodEnd);

      expect(isInPeriod).to.be.true;
    });

    it('should be true when the event occurs monthly and the event start and end times don\'t overlap', function() {
      var isInPeriod = calendarHelper.eventIsInPeriod({
        startsAt: new Date('March 3, 2014 00:00:00'),
        endsAt: new Date('March 31, 2014 00:00:00'),
        recursOn: 'month'
      }, periodStart, periodEnd);

      expect(isInPeriod).to.be.true;
    });

    it('should throw an error when recursOn is an invalid value', function() {

      expect(function() {
        calendarHelper.eventIsInPeriod({
          startsAt: new Date(),
          endsAt: new Date(),
          recursOn: 'invalid'
        }, periodStart, periodEnd);
      }).to.throw();

    });

    it('should not throw an error when recursOn is an empty string', function() {

      expect(function() {
        calendarHelper.eventIsInPeriod({
          startsAt: new Date(),
          endsAt: new Date(),
          recursOn: ''
        }, periodStart, periodEnd);
      }).not.to.throw();

    });

    it('should use the event start time as the end time when no end time is passed', function() {

      var isInPeriod = calendarHelper.eventIsInPeriod({
        startsAt: new Date('January 3, 2015 00:00:00')
      }, periodStart, periodEnd);

      expect(isInPeriod).to.be.true;

    });

  });

  describe('getWeekDayNames', function() {

    it('should get the days of the week starting at sunday', function() {
      var weekdays = calendarHelper.getWeekDayNames();
      expect(weekdays).to.eql(['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']);
    });

    it('should get the days of the week starting at monday', inject(function() {
      moment.locale('en_gb', {
        week: {
          dow: 1 // Monday is the first day of the week
        }
      });

      var weekdays = calendarHelper.getWeekDayNames();
      expect(weekdays).to.eql(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']);

      moment.locale('en');
    }));

  });

  describe('getYearView', function() {

    var yearView;

    beforeEach(function() {
      yearView = calendarHelper.getYearView(events, calendarDay, angular.noop);
    });

    it('should give back 12 months', function() {
      expect(yearView.length).to.equal(12);
    });

    it('should set the isToday flag to true on the current month', function() {
      expect(yearView[9].isToday).to.be.true;
    });

    it('should set the isToday flag to false every month apart from the current one', function() {
      yearView.forEach(function(month, index) {
        if (index !== 9) {
          expect(month.isToday).to.be.false;
        }
      });
    });

    it('should allocate the events to the correct month', function() {
      expect(yearView[9].events).to.eql([events[0], events[1]]);
    });

    it('should set the correct badge total', function() {
      expect(yearView[9].badgeTotal).to.eql(1);
    });

    it('should set date field to the start of each month', function() {
      yearView.forEach(function(month, index) {
        expect(month.date.toDate().getTime()).to.equal(moment(calendarDay).month(index).startOf('month').toDate().getTime());
      });
    });

    it('should set the correct label for each month', function() {
      yearView.forEach(function(month, index) {
        expect(month.label).to.equal(moment().month(index).format('MMMM'));
      });
    });

  });

  describe('getMonthView', function() {

    var monthView;

    beforeEach(function() {
      monthView = calendarHelper.getMonthView(events, calendarDay, angular.noop).days;
    });

    it('should give back the correct amount of days for the calendar', function() {
      expect(monthView.length).to.equal(35);
    });

    it('should set the correct label for each day', function() {
      var expectedLabels = [27, 28, 29, 30];
      for (var i = 1; i <= 31; i++) {
        expectedLabels.push(i);
      }
      monthView.forEach(function(month, index) {
        expect(month.label).to.equal(expectedLabels[index]);
      });
    });

    it('should set date field to the start of each day', function() {
      var startDate = moment('September 27, 2015', 'MMMM DD, YYYY').startOf('day');
      monthView.forEach(function(month) {
        expect(startDate.toDate().getTime()).to.equal(month.date.toDate().getTime());
        startDate.add(1, 'day');
      });
    });

    it('should set the inMonth flag to true', function() {
      monthView.forEach(function(month, index) {
        if (index > 3) {
          expect(month.inMonth).to.be.true;
        }
      });
    });

    it('should set the inMonth flag to false', function() {
      monthView.forEach(function(month, index) {
        if (index <= 3) {
          expect(month.inMonth).to.be.false;
        }
      });
    });

    it('should set the isPast flag to true', function() {
      monthView.forEach(function(month, index) {
        if (index <= 22) {
          expect(month.isPast).to.be.true;
        }
      });
    });

    it('should set the isPast flag to false', function() {
      monthView.forEach(function(month, index) {
        if (index > 22) {
          expect(month.isPast).to.be.false;
        }
      });
    });

    it('should set the isToday flag to true', function() {
      expect(monthView[23].isToday).to.be.true;
    });

    it('should set the isToday flag to false', function() {
      monthView.forEach(function(month, index) {
        if (index !== 23) {
          expect(month.isToday).to.be.false;
        }
      });
    });

    it('should set the isFuture flag to true', function() {
      monthView.forEach(function(month, index) {
        if (index > 23) {
          expect(month.isFuture).to.be.true;
        }
      });
    });

    it('should set the isFuture flag to false', function() {
      monthView.forEach(function(month, index) {
        if (index <= 23) {
          expect(month.isFuture).to.be.false;
        }
      });
    });

    it('should set the isWeekend flag to true', function() {
      monthView.forEach(function(month, index) {
        if (index % 7 === 0 || index % 7 === 6) {
          expect(month.isWeekend).to.be.true;
        }
      });
    });

    it('should set the isWeekend flag to false', function() {
      monthView.forEach(function(month, index) {
        if (index % 7 !== 0 && index % 7 !== 6) {
          expect(month.isWeekend).to.be.false;
        }
      });
    });

    it('should allocate the events to the correct day', function() {
      expect(monthView[23].events).to.eql([events[0], events[1]]);
    });

    it('should set the correct badge total', function() {
      expect(monthView[23].badgeTotal).to.equal(1);
    });

    it('should add events to days that display on the calendar but are outside of the current month when set in the calendarConfig service', function() {
      calendarConfig.displayAllMonthEvents = true;
      var eventsOffCalendar = [{
        startsAt: new Date('September 29, 2015 02:00:00'),
        endsAt: new Date('September 29, 2015 03:00:00')
      }];
      monthView = calendarHelper.getMonthView(eventsOffCalendar, calendarDay, angular.noop).days;
      expect(monthView[2].events).to.eql(eventsOffCalendar);
      calendarConfig.displayAllMonthEvents = false;
    });

  });

  describe('getWeekView', function() {

    var weekView;

    beforeEach(function() {
      weekView = calendarHelper.getWeekView(events, calendarDay);
    });

    it('should set the weekDayLabel', function() {
      expect(weekView.days[0].weekDayLabel).to.equal('Sunday');
      expect(weekView.days[1].weekDayLabel).to.equal('Monday');
      expect(weekView.days[2].weekDayLabel).to.equal('Tuesday');
      expect(weekView.days[3].weekDayLabel).to.equal('Wednesday');
      expect(weekView.days[4].weekDayLabel).to.equal('Thursday');
      expect(weekView.days[5].weekDayLabel).to.equal('Friday');
      expect(weekView.days[6].weekDayLabel).to.equal('Saturday');
    });

    it('should set the dayLabel', function() {
      expect(weekView.days[0].dayLabel).to.equal('18 Oct');
      expect(weekView.days[1].dayLabel).to.equal('19 Oct');
      expect(weekView.days[2].dayLabel).to.equal('20 Oct');
      expect(weekView.days[3].dayLabel).to.equal('21 Oct');
      expect(weekView.days[4].dayLabel).to.equal('22 Oct');
      expect(weekView.days[5].dayLabel).to.equal('23 Oct');
      expect(weekView.days[6].dayLabel).to.equal('24 Oct');
    });

    it('should set date field to the start of each day', function() {
      expect(weekView.days[0].date.toDate().getTime()).to.equal(moment('October 18, 2015', 'MMMM DD, YYYY').startOf('day').toDate().getTime());
      expect(weekView.days[1].date.toDate().getTime()).to.equal(moment('October 19, 2015', 'MMMM DD, YYYY').startOf('day').toDate().getTime());
      expect(weekView.days[2].date.toDate().getTime()).to.equal(moment('October 20, 2015', 'MMMM DD, YYYY').startOf('day').toDate().getTime());
      expect(weekView.days[3].date.toDate().getTime()).to.equal(moment('October 21, 2015', 'MMMM DD, YYYY').startOf('day').toDate().getTime());
      expect(weekView.days[4].date.toDate().getTime()).to.equal(moment('October 22, 2015', 'MMMM DD, YYYY').startOf('day').toDate().getTime());
      expect(weekView.days[5].date.toDate().getTime()).to.equal(moment('October 23, 2015', 'MMMM DD, YYYY').startOf('day').toDate().getTime());
      expect(weekView.days[6].date.toDate().getTime()).to.equal(moment('October 24, 2015', 'MMMM DD, YYYY').startOf('day').toDate().getTime());
    });

    it('should set the isPast flag to true', function() {
      expect(weekView.days[0].isPast).to.be.true;
      expect(weekView.days[1].isPast).to.be.true;
    });

    it('should set the isPast flag to false', function() {
      expect(weekView.days[2].isPast).to.be.false;
      expect(weekView.days[3].isPast).to.be.false;
      expect(weekView.days[4].isPast).to.be.false;
      expect(weekView.days[5].isPast).to.be.false;
      expect(weekView.days[6].isPast).to.be.false;
    });

    it('should set the isToday flag to true', function() {
      expect(weekView.days[2].isToday).to.be.true;
    });

    it('should set the isToday flag to false', function() {
      expect(weekView.days[0].isToday).to.be.false;
      expect(weekView.days[1].isToday).to.be.false;
      expect(weekView.days[3].isToday).to.be.false;
      expect(weekView.days[4].isToday).to.be.false;
      expect(weekView.days[5].isToday).to.be.false;
      expect(weekView.days[6].isToday).to.be.false;
    });

    it('should set the isFuture flag to true', function() {
      expect(weekView.days[3].isFuture).to.be.true;
      expect(weekView.days[4].isFuture).to.be.true;
      expect(weekView.days[5].isFuture).to.be.true;
      expect(weekView.days[6].isFuture).to.be.true;
    });

    it('should set the isFuture flag to false', function() {
      expect(weekView.days[0].isFuture).to.be.false;
      expect(weekView.days[1].isFuture).to.be.false;
      expect(weekView.days[2].isFuture).to.be.false;
    });

    it('should set the isWeekend flag to true', function() {
      expect(weekView.days[0].isWeekend).to.be.true;
      expect(weekView.days[6].isWeekend).to.be.true;
    });

    it('should set the isWeekend flag to false', function() {
      expect(weekView.days[1].isWeekend).to.be.false;
      expect(weekView.days[2].isWeekend).to.be.false;
      expect(weekView.days[3].isWeekend).to.be.false;
      expect(weekView.days[4].isWeekend).to.be.false;
      expect(weekView.days[5].isWeekend).to.be.false;
    });

    it('should only contain events for that week', function() {
      expect(weekView.eventRows[0].row[0].event).to.eql(events[1]);
      expect(weekView.eventRows[1].row[0].event).to.eql(events[0]);
    });

    describe('setting the correct span and offset', function() {

      it('should pass when the event is contained within the current week view', function() {
        weekView = calendarHelper.getWeekView([{
          startsAt: new Date(2015, 9, 20, 1),
          endsAt: new Date(2015, 9, 21, 15)
        }], calendarDay);
        expect(weekView.eventRows[0].row[0].span).to.equal(2);
        expect(weekView.eventRows[0].row[0].offset).to.equal(2);
      });

      it('should pass when the event starts before the current week view and ends within it', function() {
        weekView = calendarHelper.getWeekView([{
          startsAt: new Date(2015, 8, 20, 1),
          endsAt: new Date(2015, 9, 21, 15)
        }], calendarDay);
        expect(weekView.eventRows[0].row[0].span).to.equal(4);
        expect(weekView.eventRows[0].row[0].offset).to.equal(0);
      });

      it('should pass when the event starts before the current week view and ends after the end of the week', function() {
        weekView = calendarHelper.getWeekView([{
          startsAt: new Date(2015, 8, 20, 1),
          endsAt: new Date(2015, 10, 21, 15)
        }], calendarDay);
        expect(weekView.eventRows[0].row[0].span).to.equal(7);
        expect(weekView.eventRows[0].row[0].offset).to.equal(0);
      });

      it('should pass when the event starts within the current week but ends after it', function() {
        weekView = calendarHelper.getWeekView([{
          startsAt: new Date(2015, 9, 20, 1),
          endsAt: new Date(2015, 10, 21, 15)
        }], calendarDay);
        expect(weekView.eventRows[0].row[0].span).to.equal(5);
        expect(weekView.eventRows[0].row[0].offset).to.equal(2);
      });

      it('should pass when the event spans exactly one day', function() {
        weekView = calendarHelper.getWeekView([{
          startsAt: moment(new Date(2015, 9, 20)).startOf('day').toDate(),
          endsAt: moment(new Date(2015, 9, 20)).endOf('day').toDate()
        }], calendarDay);
        expect(weekView.eventRows[0].row[0].span).to.equal(1);
        expect(weekView.eventRows[0].row[0].offset).to.equal(2);
      });

    });

    describe('recurring events', function() {

      it('should display recuring events', function() {
        weekView = calendarHelper.getWeekView([{
          startsAt: new Date(2016, 0, 9, 1),
          recursOn: 'month'
        }], new Date(2016, 1, 9, 1));
        expect(weekView.eventRows[0].row[0].span).to.equal(1);
        expect(weekView.eventRows[0].row[0].offset).to.equal(2);
      });

    });

  });

  describe('getDayView', function() {

    var dayView, dayEvents;

    beforeEach(function() {
      dayEvents = [{
        startsAt: new Date('October 19, 2015 11:00:00'),
        endsAt: new Date('October 21, 2015 11:00:00')
      }, {
        startsAt: new Date('October 20, 2015 11:00:00'),
        endsAt: new Date('October 21, 2015 11:00:00')
      }, {
        startsAt: new Date('October 20, 2015 11:00:00'),
        endsAt: new Date('October 20, 2015 12:00:00')
      }, {
        startsAt: new Date('October 20, 2015 22:00:00'),
        endsAt: new Date('October 20, 2015 23:30:00')
      }];

      dayView = calendarHelper.getDayView(
        dayEvents,
        calendarDay,
        '00:00',
        '23:59',
        30
      );
    });

    it('should only contain events for that day', function() {
      expect(dayView.events[0].event).to.eql(dayEvents[0]);
      expect(dayView.events[1].event).to.eql(dayEvents[1]);
      expect(dayView.events[2].event).to.eql(dayEvents[2]);
      expect(dayView.events[3].event).to.eql(dayEvents[3]);
    });

    it('should set the top to 0 if the event starts before the start of the day', function() {
      expect(dayView.events[0].top).to.equal(0);
    });

    it('should set the top correctly if the event starts after the start of the day', function() {
      expect(dayView.events[1].top).to.equal(660);
    });

    it('should set the height correctly if the event finishes after the end of the day', function() {
      expect(dayView.events[1].height).to.equal(779);
    });

    it('should set the height correctly if the event finishes before the end of the day', function() {
      expect(dayView.events[2].height).to.equal(60);
    });

    it('should set the height correctly of events that finish within an hour after the day view end', function() {
      expect(dayView.events[3].height).to.equal(90);
    });

    it('should never exceed the maximum height of the calendar', function() {
      expect(dayView.events[0].height).to.equal(1439);
    });

    it('should remove events that start and end at the same time', function() {
      dayView = calendarHelper.getDayView(
        [{
          startsAt: new Date('October 20, 2015 11:00:00'),
          endsAt: new Date('October 20, 2015 11:00:00')
        }],
        calendarDay,
        '00:00',
        '23:59',
        30
      );
      expect(dayView.events).to.eql([]);
    });

    it('should move events across if there are multiple ones on the same line', function() {
      expect(dayView.events[0].left).to.equal(0);
      expect(dayView.events[1].left).to.equal(150);
      expect(dayView.events[2].left).to.equal(300);
    });

  });

  describe('getDayViewHeight', function() {

    it('should calculate the height of the day view', function() {
      var dayViewHeight = calendarHelper.getDayViewHeight('01:00', '22:59', 10);
      expect(dayViewHeight).to.equal(3960);
    });

    it('should support partial hours', function() {
      var dayViewHeight = calendarHelper.getDayViewHeight('01:00', '22:29', 10);
      expect(dayViewHeight).to.equal(3870);
    });

  });

  describe('getWeekViewWithTimes', function() {
    var weekViewWithTimes;

    beforeEach(function() {
      var dayEvents = [{
        startsAt: new Date('October 19, 2015 11:00:00'),
        endsAt: new Date('October 21, 2015 11:00:00')
      }, {
        startsAt: new Date('October 20, 2015 11:00:00'),
        endsAt: new Date('October 21, 2015 11:00:00')
      }, {
        startsAt: new Date('October 20, 2015 11:00:00'),
        endsAt: new Date('October 20, 2015 12:00:00')
      }];

      weekViewWithTimes = calendarHelper.getWeekViewWithTimes(
        dayEvents,
        calendarDay,
        '00:00',
        '23:59',
        30
      );
    });

    it('should calculate the week view with times', function() {
      var expectedEventsWeekView = [
        {
          event: {
            startsAt: new Date('October 19, 2015 11:00:00'),
            endsAt: new Date('October 21, 2015 11:00:00')
          },
          offset: 1,
          top: 660
        },
        {
          event: {
            startsAt: new Date('October 20, 2015 11:00:00'),
            endsAt: new Date('October 21, 2015 11:00:00')
          },
          offset: 2,
          top: 660,
        },
        {
          event: {
            startsAt: new Date('October 20, 2015 11:00:00'),
            endsAt: new Date('October 20, 2015 12:00:00')
          },
          offset: 2,
          top: 660,
        }
      ];
      expect(weekViewWithTimes.days.length).to.equal(7);
      expect(weekViewWithTimes.eventRows[0].row).to.eql(expectedEventsWeekView);
    });
  });

  describe('formatDate', function() {

    var defaultFormat;
    beforeEach(function() {
      defaultFormat = calendarConfig.dateFormatter;
    });

    it('should format a date using angular dateFilter', function() {
      calendarConfig.dateFormatter = 'angular';
      var formattedDate = calendarHelper.formatDate(new Date(), 'yyyy-mm-dd');
      expect(formattedDate).to.equal('2015-10-20');
    });

    it('should format a date using moment format', function() {
      calendarConfig.dateFormatter = 'moment';
      var formattedDate = calendarHelper.formatDate(new Date(), 'YYYY-MM-DD');
      expect(formattedDate).to.equal('2015-10-20');
    });

    it('should throw an error when given an invalid date formatter', function() {
      calendarConfig.dateFormatter = 'unknown';
      expect(function() {
        calendarHelper.formatDate(new Date(), 'YYYY-MM-DD');
      }).to.throw();
    });

    afterEach(function() {
      calendarConfig.dateFormatter = defaultFormat;
    });

  });

  describe('loadTemplates', function() {

    it('should return a promise with all loaded templates', function(done) {
      calendarConfig.templates = {
        template: 'test.html'
      };
      $templateCache.put('test.html', 'contents');
      calendarHelper.loadTemplates().then(function(result) {
        expect(result).to.deep.equal(['contents']);
        done();
      });
      $rootScope.$apply();
    });

  });

});
