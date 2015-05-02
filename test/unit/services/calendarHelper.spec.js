describe('calendarHelper', function() {

  var calendarHelper, events, clock, calendarDay;

  beforeEach(inject(function(_calendarHelper_) {
    calendarHelper = _calendarHelper_;

    events = [{
      title: 'Event 1',
      type: 'info',
      startsAt: new Date(2015, 9, 5, 1),
      endsAt: new Date(2015, 9, 5, 15),
      incrementsBadgeTotal: true
    }, {
      title: 'Event 2',
      type: 'info',
      startsAt: new Date(2015, 9, 5, 1),
      endsAt: new Date(2015, 9, 5, 15),
      incrementsBadgeTotal: false
    }];

    clock = sinon.useFakeTimers(new Date('October 20, 2015 11:13:00').getTime());

    calendarDay = new Date();

  }));

  afterEach(function() {
    clock.restore();
  });

  describe('getWeekDayNames', function() {

    it('should get the days of the week starting at sunday', function() {
      var weekdays = calendarHelper.getWeekDayNames();
      expect(weekdays).to.eql(['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']);
    });

    it('should get the days of the week starting at monday', inject(function(moment) {
      moment.locale('en', {
        week : {
          dow : 1 // Monday is the first day of the week
        }
      });

      var weekdays = calendarHelper.getWeekDayNames();
      expect(weekdays).to.eql(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']);

      moment.locale('en', {
        week : {
          dow : 0 // Sunday is the first day of the week
        }
      });
    }));

  });

  describe('getYearView', function() {

    var yearView;

    beforeEach(function() {
      yearView = calendarHelper.getYearView(events, calendarDay);
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
      monthView = calendarHelper.getMonthView(events, calendarDay);
    });

    it('should give back the correct amount of days for the calendar', function() {
      expect(monthView.length).to.equal(35);
    });

    it('should set the correct label for each day', function() {
      var expectedLabels = [27, 28, 29, 30];
      for(var i = 1; i <= 31; i++) {
        expectedLabels.push(i);
      }
      monthView.forEach(function(month, index) {
        expect(month.label).to.equal(expectedLabels[index]);
      });
    });

    it('should set date field to the start of each day', function() {
      var startDate = moment('September 27, 2015').startOf('day');
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
        if (index != 23) {
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
      expect(monthView[8].events).to.eql([events[0], events[1]]);
    });

    it('should set the correct badge total', function() {
      expect(monthView[8].badgeTotal).to.equal(1);
    });

  });

  describe('getWeekView', function() {

    it('should set the weekDayLabel', function() {

    });

    it('should set the dayLabel', function() {

    });

    it('should set date field to the start of each day', function() {

    });

    it('should set the isPast flag to true', function() {

    });

    it('should set the isPast flag to false', function() {

    });

    it('should set the isToday flag to true', function() {

    });

    it('should set the isToday flag to false', function() {

    });

    it('should set the isFuture flag to true', function() {

    });

    it('should set the isFuture flag to false', function() {

    });

    it('should set the isWeekend flag to true', function() {

    });

    it('should set the isWeekend flag to false', function() {

    });

    it('should only contain events for that week', function() {

    });

    describe('setting the correct span and offset', function() {

      it('should pass when the event is contained within the current week view', function() {

      });

      it('should pass when the event starts before the current week view and ends within it', function() {

      });

      it('should pass when the event starts before the current week view and ends after the end of the week', function() {

      });

      it('should pass when the event starts within the current week but ends after it', function() {

      });

    });

  });

  describe('getDayView', function() {

    it('should only contain events for that day', function() {

    });

    it('should set the top to 0 if the event starts before the start of the day', function() {

    });

    it('should set the top correctly if the event starts after the start of the day', function() {

    });

    it('should set the height correctly if the event finishes after the end of the day', function() {

    });

    it('should set the height correctly if the event finishes before the end of the day', function() {

    });

    it('should never exceed the maximum height of the calendar', function() {

    });

    it('should remove events that start and end at the same time', function() {

    });

    it('should move events across if there are multiple ones on the same line', function() {

    });

  });

});
