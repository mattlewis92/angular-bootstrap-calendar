'use strict';

var angular = require('angular'),
  moment = require('moment');

describe('mwlCalendarDay directive', function() {
  var MwlCalendarCtrl,
    element,
    scope,
    $rootScope,
    directiveScope,
    showModal,
    template =
      '<mwl-calendar-hour-list ' +
      'events="events" ' +
      'current-day="currentDay" ' +
      'on-event-click="onEventClick" ' +
      'on-event-times-changed="onEventTimesChanged" ' +
      'day-view-start="dayViewStart" ' +
      'day-view-end="dayViewEnd" ' +
      'day-view-split="dayViewSplit || 30" ' +
      '></mwl-calendar-hour-list>';
  var calendarDay = new Date(2015, 4, 1);

  function prepareScope(vm) {
    //These variables MUST be set as a minimum for the calendar to work
    vm.currentDay = calendarDay;
    vm.dayViewStart = '06:00';
    vm.dayViewEnd = '22:00';
    vm.dayViewsplit = 30;
    vm.events = [
      {
        title: 'An event',
        type: 'warning',
        startsAt: moment().startOf('week').subtract(2, 'days').add(8, 'hours').toDate(),
        endsAt: moment().startOf('week').add(1, 'week').add(9, 'hours').toDate(),
        draggable: true,
        resizable: true
      }, {
        title: '<i class="glyphicon glyphicon-asterisk"></i> <span class="text-primary">Another event</span>, with a <i>html</i> title',
        type: 'info',
        startsAt: moment().subtract(1, 'day').toDate(),
        endsAt: moment().add(5, 'days').toDate(),
        draggable: true,
        resizable: true
      }, {
        title: 'This is a really long event title that occurs on every year',
        type: 'important',
        startsAt: moment().startOf('day').add(7, 'hours').toDate(),
        endsAt: moment().startOf('day').add(19, 'hours').toDate(),
        recursOn: 'year',
        draggable: true,
        resizable: true
      }
    ];

    showModal = sinon.spy();

    vm.onEventClick = function(event) {
      showModal('Clicked', event);
    };

    vm.onEventTimesChanged = function(event) {
      showModal('Dropped or resized', event);
    };
  }

  beforeEach(angular.mock.module('mwl.calendar'));

  beforeEach(angular.mock.inject(function($compile, _$rootScope_) {
    $rootScope = _$rootScope_;
    scope = $rootScope.$new();
    prepareScope(scope);

    element = $compile(template)(scope);
    scope.$apply();
    directiveScope = element.isolateScope();
    MwlCalendarCtrl = directiveScope.vm;
  }));

  it('should define a list of hours', function() {
    expect(MwlCalendarCtrl.hours.length).to.equal(17);
  });

  it('should update the list of hours when the calendar refreshes if the locale changes', function() {
    sinon.stub(moment, 'locale').returns('another locale');
    scope.dayViewStart = '00:00';
    scope.$apply();
    scope.$broadcast('calendar.refreshView');
    expect(MwlCalendarCtrl.hours.length).to.equal(23);
    moment.locale.restore();
  });

});
