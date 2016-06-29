'use strict';

var angular = require('angular');
beforeEach(angular.mock.module('mwl.calendar'));

describe('calendarEventTitle', function() {

  var calendarEventTitle;
  beforeEach(inject(function(_calendarEventTitle_) {
    calendarEventTitle = _calendarEventTitle_;
  }));

  it('should get the year view title', function() {
    expect(calendarEventTitle.yearView({
      title: 'Event name',
      startsAt: new Date('October 20, 2015 02:00:00')
    })).to.equal('Event name (Oct 20, 2:00 AM)');
  });

  it('should get the month view title', function() {
    expect(calendarEventTitle.monthView({
      title: 'Event name',
      startsAt: new Date('October 20, 2015 02:00:00')
    })).to.equal('Event name (02:00)');
  });

  it('should get the month view tooltip', function() {
    expect(calendarEventTitle.monthViewTooltip({
      title: 'Event name',
      startsAt: new Date('October 20, 2015 02:00:00')
    })).to.equal('02:00 - Event name');
  });

  it('should get the week view title', function() {
    expect(calendarEventTitle.weekView({
      title: 'Event name',
      startsAt: new Date('October 20, 2015 02:00:00')
    })).to.equal('Event name');
  });

  it('should get the week view tooltip', function() {
    expect(calendarEventTitle.weekViewTooltip({
      title: 'Event name',
      startsAt: new Date('October 20, 2015 02:00:00')
    })).to.equal('Event name');
  });

  it('should get the day view title', function() {
    expect(calendarEventTitle.dayView({
      title: 'A really long event title that gets truncated',
      startsAt: new Date('October 20, 2015 02:00:00'),
      height: 10
    })).to.equal('A really long event ...');
  });

  it('should get the day view title for an all day event', function() {
    expect(calendarEventTitle.dayView({
      title: 'A really long event title thats not truncated',
      startsAt: new Date('October 20, 2015 02:00:00'),
      height: 10,
      allDay: true
    })).to.equal('A really long event title thats not truncated');
  });

});
