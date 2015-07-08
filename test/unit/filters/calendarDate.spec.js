'use strict';

var angular = require('angular');

beforeEach(angular.mock.module('mwl.calendar'));

describe('calendarDateFilter', function() {

  var dateFilter, calendarHelper;

  beforeEach(inject(function($filter, _calendarHelper_) {
    dateFilter = $filter('calendarDate');
    calendarHelper = _calendarHelper_;
  }));

  it('should be marked as stateful', function() {
    expect(dateFilter.$stateful).to.be.true;
  });

  it('should should call calendarHelper.formatDate with the given date and format', function() {
    var spy = sinon.spy(calendarHelper, 'formatDate');
    var date = new Date();
    dateFilter(date, 'yyyy');
    expect(spy).to.have.been.calledWith(date, 'yyyy');
  });

  it('should should use the prdefined format from calendarConfig.dateFormats if getFromConfig is passed', function() {
    var spy = sinon.spy(calendarHelper, 'formatDate');
    var date = new Date();
    dateFilter(date, 'hour', true);
    expect(spy).to.have.been.calledWith(date, 'ha');
  });

});
