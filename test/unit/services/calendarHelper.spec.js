describe('calendarHelper', function() {

  var calendarHelper, events;

  beforeEach(inject(function(_calendarHelper_) {
    calendarHelper = _calendarHelper_;

    events = [{
      title: 'My event title',
      type: 'info',
      startsAt: new Date(2013,5,1,1),
      endsAt: new Date(2014,8,26,15),
      incrementsBadgeTotal: true
    }, {
      title: 'My event title',
      type: 'info',
      startsAt: new Date(2013,5,1,1),
      endsAt: new Date(2014,8,26,15),
      incrementsBadgeTotal: false
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

    //TODO

  });

  describe('getMonthView', function() {

    //TODO

  });

  describe('getWeekView', function() {

    //TODO

  });

  describe('getDayView', function() {

    //TODO

  });

});
