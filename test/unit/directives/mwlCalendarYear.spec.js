'use strict';

var angular = require('angular'),
  moment = require('moment');

describe('mwlCalendarYear directive', function() {
  var MwlCalendarCtrl,
    element,
    scope,
    $rootScope,
    directiveScope,
    showModal,
    calendarHelper,
    template =
      '<mwl-calendar-year ' +
      'events="events" ' +
      'view-date="viewDate" ' +
      'on-event-click="onEventClick" ' +
      'on-event-times-changed="onEventTimesChanged" ' +
      'day-view-start="dayViewStart" ' +
      'day-view-end="dayViewEnd" ' +
      'cell-is-open="cellIsOpen"' +
      'cell-auto-open-disabled="true"' +
      'on-timespan-click="onTimeSpanClick"' +
      'day-view-split="dayViewSplit || 30" ' +
      '></mwl-calendar-year>';
  var calendarDay = new Date(2015, 4, 1);

  function prepareScope(vm) {
    //These variables MUST be set as a minimum for the calendar to work
    vm.viewDate = calendarDay;
    vm.cellIsOpen = false;
    vm.dayViewStart = '06:00';
    vm.dayViewEnd = '22:59';
    vm.dayViewsplit = 30;
    vm.events = [
      {
        title: 'An event',
        type: 'warning',
        startsAt: moment(calendarDay).startOf('week').subtract(2, 'days').add(8, 'hours').toDate(),
        endsAt: moment(calendarDay).startOf('week').add(1, 'week').add(9, 'hours').toDate(),
        draggable: true,
        resizable: true
      }, {
        title: '<i class="glyphicon glyphicon-asterisk"></i> <span class="text-primary">Another event</span>, with a <i>html</i> title',
        type: 'info',
        startsAt: moment(calendarDay).subtract(1, 'day').toDate(),
        endsAt: moment(calendarDay).add(5, 'days').toDate(),
        draggable: true,
        resizable: true
      }, {
        title: 'This is a really long event title that occurs on every year',
        type: 'important',
        startsAt: moment(calendarDay).startOf('day').add(7, 'hours').toDate(),
        endsAt: moment(calendarDay).startOf('day').add(19, 'hours').toDate(),
        recursOn: 'year',
        draggable: true,
        resizable: true
      }
    ];

    showModal = sinon.spy();

    vm.onEventClick = function(event) {
      showModal('Clicked', event);
    };

    vm.onTimeSpanClick = function(event) {
      showModal('Day clicked', event);
    };

    vm.onEventTimesChanged = function(event) {
      showModal('Dropped or resized', event);
    };
  }

  beforeEach(angular.mock.module('mwl.calendar'));

  beforeEach(angular.mock.inject(function($compile, _$rootScope_, _calendarHelper_) {
    $rootScope = _$rootScope_;
    calendarHelper = _calendarHelper_;
    scope = $rootScope.$new();
    prepareScope(scope);
    element = angular.element(template);
    element.data('$mwlCalendarController', {});
    element = $compile(element)(scope);
    scope.$apply();
    directiveScope = element.isolateScope();
    MwlCalendarCtrl = directiveScope.vm;
  }));

  it('should get the new year view when calendar refreshes and show the list of events for the current month if required', function() {
    var yearView = [{date: moment(calendarDay), inMonth: true}];
    sinon.stub(calendarHelper, 'getYearView').returns(yearView);
    scope.$broadcast('calendar.refreshView');
    expect(calendarHelper.getYearView).to.have.been.calledWith(scope.events, scope.viewDate);
    expect(MwlCalendarCtrl.view).to.equal(yearView);
  });

  it('should toggle the event list for the selected month ', function() {
    MwlCalendarCtrl.view = [{date: moment(calendarDay), inMonth: true}];
    //Open event list
    MwlCalendarCtrl.cellIsOpen = true;
    scope.$apply();
    expect(MwlCalendarCtrl.openRowIndex).to.equal(0);
    expect(MwlCalendarCtrl.openMonthIndex).to.equal(0);

    //Close event list
    MwlCalendarCtrl.cellIsOpen = false;
    scope.$apply();
    expect(MwlCalendarCtrl.openRowIndex).to.equal(null);
    expect(MwlCalendarCtrl.openMonthIndex).to.equal(null);
  });

  it('should call the on time span clicked callback', function() {
    scope.onTimeSpanClick = sinon.spy();
    scope.$apply();
    MwlCalendarCtrl.view = [{date: moment(calendarDay), inMonth: true}];
    MwlCalendarCtrl.monthClicked(MwlCalendarCtrl.view[0], false);
    expect(scope.onTimeSpanClick).to.have.been.calledWith({
      calendarDate: MwlCalendarCtrl.view[0].date.toDate(),
      calendarCell: MwlCalendarCtrl.view[0],
      $event: undefined
    });
  });

  it('should call the callback function when you finish dropping an event', function() {
    MwlCalendarCtrl.handleEventDrop(scope.events[0], new Date(2015, 11, 1));
    expect(showModal).to.have.been.calledWith('Dropped or resized', {
      calendarEvent: scope.events[0],
      calendarDate: new Date(2015, 11, 1),
      calendarNewEventStart: new Date(2015, 11, 24, 8, 0),
      calendarNewEventEnd: new Date(2016, 0, 2, 9, 0)
    });
  });

  it('should call the callback function when you finish dropping an event with no end date', function() {
    delete scope.events[0].endsAt;
    MwlCalendarCtrl.handleEventDrop(scope.events[0], new Date(2015, 11, 1));
    expect(showModal).to.have.been.calledWith('Dropped or resized', {
      calendarEvent: scope.events[0],
      calendarDate: new Date(2015, 11, 1),
      calendarNewEventStart: new Date(2015, 11, 24, 8, 0),
      calendarNewEventEnd: null
    });
  });

});
