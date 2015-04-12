describe('calendarHelper', function() {

  var calendarHelper, events;

  beforeEach(inject(function(_calendarHelper_) {
    calendarHelper = _calendarHelper_;

    events = [{
      title: 'My event title',
      type: 'info',
      startsAt: new Date(2015,0,1,1),
      endsAt: new Date(2015,0,1,15),
      incrementsBadgeTotal: true
    }];

  }));

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

    it('should give back 12 months', function() {
      expect(calendarHelper.getYearView(events, new Date()).length).to.equal(12);
    });

    it('should set the isToday flag to true on the current month', function() {

    });

    it('should set the isToday flag to false every month apart from the current one', function() {

    });

    it('should allocate the events to the correct month', function() {

    });

    it('should set the correct badge total', function() {

    });

    it('should set date field to the start of each month', function() {

    });

    it('should set the correct label for each month', function() {

    });

  });

  describe('getMonthView', function() {

    it('should give back the correct amount of days for the calendar', function() {

    });

    it('should set the correct label for each day', function() {

    });

    it('should set date field to the start of each day', function() {

    });

    it('should set the inMonth flag to true', function() {

    });

    it('should set the inMonth flag to false', function() {

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

    it('should allocate the events to the correct day', function() {

    });

    it('should set the correct badge total', function() {

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
