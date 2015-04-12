describe('calendarConfig', function() {

  var calendarConfig;

  beforeEach(module('mwl.calendar', function(calendarConfigProvider) {
    calendarConfigProvider.setDateFormats({
      hour: 'HA'
    }).setTitleFormats({
      month: 'MMMM'
    }).setI18nStrings({
      eventsLabel: 'Changed'
    });
  }));

  beforeEach(inject(function(_calendarConfig_) {
    calendarConfig = _calendarConfig_;
  }));

  describe('setDateFormats', function() {
    it('should have changed the hour format', function() {
      expect(calendarConfig.dateFormats.hour).to.equal('HA');
    });
  });

  describe('setTitleFormats', function() {
    it('should have changed the title format', function() {
      expect(calendarConfig.titleFormats.month).to.equal('MMMM');
    });
  });

  describe('setI18nStrings', function() {
    it('should have changed the i18n strings', function() {
      expect(calendarConfig.i18nStrings.eventsLabel).to.equal('Changed');
    });
  });

});
