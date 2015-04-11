describe('calendarHelper', function() {

  var calendarHelper;

  beforeEach(inject(function(_calendarHelper_) {
    calendarHelper = _calendarHelper_;
  }));

  describe('getWeekDayNames', function() {
    it('should get the days of the week starting at sunday', function() {
      var weekdays = calendarHelper.getWeekDayNames();
      expect(weekdays).to.eql(['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']);
    });
  });

});
