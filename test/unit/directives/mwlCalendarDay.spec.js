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
    calendarHelper,
    template =
    '<mwl-calendar-day ' +
      'events="events" ' +
      'view-date="viewDate" ' +
      'on-event-click="onEventClick" ' +
      'on-event-times-changed="onEventTimesChanged" ' +
      'day-view-start="dayViewStart" ' +
      'day-view-end="dayViewEnd" ' +
      'day-view-split="dayViewSplit || 30" ' +
      'cell-modifier="cellModifier"' +
    '></mwl-calendar-day>';
  var calendarDay = new Date(2015, 4, 1);

  function prepareScope(vm) {
    //These variables MUST be set as a minimum for the calendar to work
    vm.viewDate = calendarDay;
    vm.dayViewStart = '06:00';
    vm.dayViewEnd = '22:59';
    vm.dayViewsplit = 30;
    vm.cellModifier = sinon.spy();
    vm.events = [
      {
        calendarEventId: 0,
        title: 'An event',
        type: 'warning',
        startsAt: moment(calendarDay).startOf('week').subtract(2, 'days').add(8, 'hours').toDate(),
        endsAt: moment(calendarDay).startOf('week').add(1, 'week').add(9, 'hours').toDate(),
        draggable: true,
        resizable: true
      }, {
        calendarEventId: 1,
        title: '<i class="glyphicon glyphicon-asterisk"></i> <span class="text-primary">Another event</span>, with a <i>html</i> title',
        type: 'info',
        startsAt: moment(calendarDay).subtract(1, 'day').toDate(),
        endsAt: moment(calendarDay).add(5, 'days').toDate(),
        draggable: true,
        resizable: true
      }, {
        calendarEventId: 2,
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

    element = $compile(template)(scope);
    scope.$apply();
    directiveScope = element.isolateScope();
    MwlCalendarCtrl = directiveScope.vm;
  }));

  it('should get the new day view when calendar refreshes', function() {
    sinon.stub(calendarHelper, 'getDayViewHeight').returns(1000);
    var event1 = {event: 'event1'};
    var event2 = {event: 'event2', allDay: true};
    sinon.stub(calendarHelper, 'getDayView').returns({events: [{event: event1}], allDayEvents: [event2]});
    scope.$broadcast('calendar.refreshView');
    expect(calendarHelper.getDayViewHeight).to.have.been.calledWith('06:00', '22:59', 30);
    expect(MwlCalendarCtrl.dayViewHeight).to.equal(1000);
    expect(calendarHelper.getDayView).to.have.been.calledWith(scope.events, scope.viewDate, '06:00', '22:59', 30);
    expect(MwlCalendarCtrl.nonAllDayEvents).to.eql([{event: event1}]);
    expect(MwlCalendarCtrl.allDayEvents).to.eql([event2]);
  });

  it('should call the callback function when you finish dragging and event', function() {
    MwlCalendarCtrl.eventDragComplete(scope.events[0], 1);
    expect(showModal).to.have.been.calledWith('Dropped or resized', {
      calendarEvent: scope.events[0],
      calendarNewEventStart: new Date(2015, 3, 24, 8, 30),
      calendarNewEventEnd: new Date(2015, 4, 3, 9, 30)
    });
  });

  it('should call the callback function when you finish dragging an event with no endsAt', function() {
    delete scope.events[0].endsAt;
    MwlCalendarCtrl.eventDragComplete(scope.events[0], 1);
    expect(showModal).to.have.been.calledWith('Dropped or resized', {
      calendarEvent: scope.events[0],
      calendarNewEventStart: new Date(2015, 3, 24, 8, 30),
      calendarNewEventEnd: null
    });
  });

  it('should update the temporary start position while dragging', function() {
      MwlCalendarCtrl.eventDragged(scope.events[0], 1);
      expect(scope.events[0].tempStartsAt).to.eql(new Date(2015, 3, 24, 8, 30));
  });

  it('should call the callback function when you finish resizing and event', function() {
    MwlCalendarCtrl.eventResizeComplete(scope.events[0], 'start', 1);
    expect(showModal).to.have.been.calledWith('Dropped or resized', {
      calendarEvent: scope.events[0],
      calendarNewEventStart: new Date(2015, 3, 24, 8, 30),
      calendarNewEventEnd: new Date(2015, 4, 3, 9, 0)
    });

    MwlCalendarCtrl.eventResizeComplete(scope.events[0], 'end', 1);
    expect(showModal).to.have.been.calledWith('Dropped or resized', {
      calendarEvent: scope.events[0],
      calendarNewEventStart: new Date(2015, 3, 24, 8, 0),
      calendarNewEventEnd: new Date(2015, 4, 3, 9, 30)
    });
  });

  it('should update the temporary start position while resizing', function() {
    MwlCalendarCtrl.eventResized(scope.events[0], 'start', 1);
    expect(scope.events[0].tempStartsAt).to.eql(new Date(2015, 3, 24, 8, 30));
  });

  it('should update the events when the day view split changes', function() {
    scope.viewDate = moment(calendarDay).startOf('day').add(1, 'hour').toDate();
    scope.$apply();
    scope.$broadcast('calendar.refreshView');
    scope.dayViewSplit = 15;
    scope.$apply();
    expect(MwlCalendarCtrl.nonAllDayEvents[0].height).to.equal(2038);
  });

});
