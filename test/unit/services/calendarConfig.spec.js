'use strict';

var angular = require('angular');
beforeEach(angular.mock.module('mwl.calendar'));

describe('calendarConfig', function() {

  var calendarConfig;

  beforeEach(angular.mock.module('mwl.calendar', function(calendarConfigProvider) {
    expect(function() {
      calendarConfigProvider.setDateFormatter('this-will-throw');
    }).to.throw();

    calendarConfigProvider.setDateFormatter('moment')
    .setDateFormats({
      hour: 'HA'
    }).setTitleFormats({
      month: 'MMMM'
    }).setI18nStrings({
      eventsLabel: 'Changed'
    }).setDisplayAllMonthEvents(true)
      .showTimesOnWeekView(true);
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

  describe('setDisplayAllMonthEvents ', function() {
    it('should have changed the visibility of all month event', function() {
      expect(calendarConfig.displayAllMonthEvents).to.be.true;
    });
  });

  describe('showTimesOnWeekView', function() {
    it('should have changed the visibility of times on the week view', function() {
      expect(calendarConfig.showTimesOnWeekView).to.be.true;
    });
  });

  describe('setDateFormatter', function() {
    it('should have changed the default date formatter', function() {
      expect(calendarConfig.dateFormatter).to.equal('moment');
    });
  });

});
