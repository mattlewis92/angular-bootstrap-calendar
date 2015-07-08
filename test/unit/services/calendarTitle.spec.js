'use strict';

var angular = require('angular');
beforeEach(angular.mock.module('mwl.calendar'));

describe('calendarConfig', function() {

  var calendarTitle;
  var calendarDay = new Date(2015, 4, 1);

  beforeEach(inject(function(_calendarTitle_) {
    calendarTitle = _calendarTitle_;
  }));

  it('should give the correct day title', function() {
    expect(calendarTitle.day(calendarDay)).to.equal('Friday 1 May, 2015');
  });

  it('should give the correct week title', function() {
    expect(calendarTitle.week(calendarDay)).to.equal('Week 18 of 2015');
  });

  it('should give the correct month title', function() {
    expect(calendarTitle.month(calendarDay)).to.equal('May 2015');
  });

  it('should give the correct year title', function() {
    expect(calendarTitle.year(calendarDay)).to.equal('2015');
  });

});
