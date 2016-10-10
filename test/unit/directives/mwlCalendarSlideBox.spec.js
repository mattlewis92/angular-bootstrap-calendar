'use strict';

var angular = require('angular'),
  moment = require('moment');

describe('mwlCalendarSlideBox directive', function() {
  var element,
    scope,
    $rootScope,
    directiveScope,
    template =
      '<mwl-calendar-slide-box ' +
      'events="events" ' +
      'is-open="isOpen"' +
      '></mwl-calendar-slide-box>';

  function prepareScope(vm) {
    //These variables MUST be set as a minimum for the calendar to work
    vm.isOpen = false;
    vm.events = [
      {
        calendarEventId: 0,
        title: 'An event',
        type: 'warning',
        startsAt: moment().startOf('week').subtract(2, 'days').add(8, 'hours').toDate(),
        endsAt: moment().startOf('week').add(1, 'week').add(9, 'hours').toDate(),
        draggable: true,
        resizable: true
      }, {
        calendarEventId: 1,
        title: '<i class="glyphicon glyphicon-asterisk"></i> <span class="text-primary">Another event</span>, with a <i>html</i> title',
        type: 'info',
        startsAt: moment().subtract(1, 'day').toDate(),
        endsAt: moment().add(5, 'days').toDate(),
        draggable: true,
        resizable: true
      }, {
        calendarEventId: 2,
        title: 'This is a really long event title that occurs on every year',
        type: 'important',
        startsAt: moment().startOf('day').add(7, 'hours').toDate(),
        endsAt: moment().startOf('day').add(19, 'hours').toDate(),
        recursOn: 'year',
        draggable: true,
        resizable: true
      }
    ];
  }

  beforeEach(angular.mock.module('mwl.calendar'));

  beforeEach(angular.mock.inject(function($compile, _$rootScope_) {
    $rootScope = _$rootScope_;
    scope = $rootScope.$new();
    prepareScope(scope);

    element = $compile(template)(scope);
    scope.$apply();
    directiveScope = element.isolateScope();
  }));

  it('should initialise scope properties', function() {
    expect(directiveScope.isMonthView).to.be.false;
    expect(directiveScope.isYearView).to.be.false;
  });

});
