'use strict';

var angular = require('angular');
beforeEach(angular.mock.module('mwl.calendar'));

describe('calendarTruncateEventTitleFilter', function() {

  var eventTitleFilter;

  beforeEach(inject(function(_calendarTruncateEventTitleFilter_) {
    eventTitleFilter = _calendarTruncateEventTitleFilter_;
  }));

  it('should return an empty string when passed a false value', function() {
    expect(eventTitleFilter(null)).to.equal('');
  });

  it('should return the original string', function() {
    expect(eventTitleFilter('test', 10, 100)).to.equal('test');
  });

  it('should return a truncated string for the first 5 characters', function() {
    expect(eventTitleFilter('A really long string', 5, 10)).to.equal('A rea...');
  });

});
