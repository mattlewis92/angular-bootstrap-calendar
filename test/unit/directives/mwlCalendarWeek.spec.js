'use strict';

var angular = require('angular'),
  moment = require('moment');

describe('mwlCalendarWeek directive', function() {
  var MwlCalendarCtrl,
    element,
    scope,
    $rootScope,
    directiveScope,
    showModal,
    calendarHelper,
    clock,
    template =
      '<mwl-calendar-week ' +
      'events="events" ' +
      'view-date="viewDate" ' +
      'on-event-click="onEventClick" ' +
      'on-event-times-changed="onEventTimesChanged" ' +
      'day-view-start="dayViewStart" ' +
      'day-view-end="dayViewEnd" ' +
      'day-view-split="dayViewSplit || 30" ' +
      '></mwl-calendar-week>';
  var calendarDay = new Date(2015, 4, 1);

  function prepareScope(vm) {
    //These variables MUST be set as a minimum for the calendar to work
    vm.viewDate = calendarDay;
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

    vm.onEventTimesChanged = function(event) {
      showModal('Dropped or resized', event);
    };
  }

  beforeEach(angular.mock.module('mwl.calendar'));

  beforeEach(angular.mock.inject(function($compile, _$rootScope_, _calendarHelper_) {
    clock = sinon.useFakeTimers(new Date('October 20, 2015 11:10:00').getTime());
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

  afterEach(function() {
    clock.restore();
  });

  it('should get the new week view when calendar refreshes', function() {
    sinon.stub(calendarHelper, 'getDayViewHeight').returns(1000);
    sinon.stub(calendarHelper, 'getWeekView').returns({event: 'event1'});
    sinon.stub(calendarHelper, 'getWeekViewWithTimes').returns({event: 'event2'});
    scope.$broadcast('calendar.refreshView');
    expect(calendarHelper.getDayViewHeight).to.have.been.calledWith('06:00', '22:59', 30);
    expect(MwlCalendarCtrl.dayViewHeight).to.equal(1000);
    expect(calendarHelper.getWeekView).to.have.been.calledWith(scope.events, scope.viewDate);
    expect(MwlCalendarCtrl.view).to.eql({event: 'event1'});

    MwlCalendarCtrl.showTimes = true;
    scope.$broadcast('calendar.refreshView');
    expect(calendarHelper.getWeekViewWithTimes).to.have.been.calledWith(scope.events, scope.viewDate, '06:00', '22:59', 30);
    expect(MwlCalendarCtrl.view).to.eql({event: 'event2'});
  });

  it('should call the callback function when you finish dragging and event', function() {
    MwlCalendarCtrl.weekDragged(scope.events[0], 1, 0);
    expect(showModal).to.have.been.calledWith('Dropped or resized', {
      calendarEvent: scope.events[0],
      calendarNewEventStart: new Date(2015, 3, 25, 8, 0),
      calendarNewEventEnd: new Date(2015, 4, 4, 9, 0)
    });

    showModal.reset();
    MwlCalendarCtrl.weekDragged(scope.events[0], 1, -1);
    expect(showModal).to.have.been.calledWith('Dropped or resized', {
      calendarEvent: scope.events[0],
      calendarNewEventStart: new Date(2015, 3, 25, 7, 30),
      calendarNewEventEnd: new Date(2015, 4, 4, 8, 30)
    });
  });

  it('should call the callback function when you finish dragging and event with no ends at', function() {
    delete scope.events[0].endsAt;
    MwlCalendarCtrl.weekDragged(scope.events[0], 1, 0);
    expect(showModal).to.have.been.calledWith('Dropped or resized', {
      calendarEvent: scope.events[0],
      calendarNewEventStart: new Date(2015, 3, 25, 8, 0),
      calendarNewEventEnd: null
    });
  });

  it('should update the temporary start position while dragging', function() {
    MwlCalendarCtrl.tempTimeChanged(scope.events[0], 1);
    expect(scope.events[0].tempStartsAt).to.eql(new Date(2015, 3, 24, 8, 30));
  });

  it('should call the callback function when you finish resizing and event', function() {
    MwlCalendarCtrl.weekResized(scope.events[0], 'start', 1);
    expect(showModal).to.have.been.calledWith('Dropped or resized', {
      calendarEvent: scope.events[0],
      calendarNewEventStart: new Date(2015, 3, 25, 8, 0),
      calendarNewEventEnd: new Date(2015, 4, 3, 9, 0)
    });

    showModal.reset();
    MwlCalendarCtrl.weekResized(scope.events[0], 'end', 1);
    expect(showModal).to.have.been.calledWith('Dropped or resized', {
      calendarEvent: scope.events[0],
      calendarNewEventStart: new Date(2015, 3, 24, 8, 0),
      calendarNewEventEnd: new Date(2015, 4, 4, 9, 0)
    });
  });

  it('should allow events to be dropped on days', function() {
    var event = {startsAt: moment().add(1, 'day').toDate()};
    MwlCalendarCtrl.weekDragged = sinon.spy();
    MwlCalendarCtrl.eventDropped(event, new Date());
    expect(MwlCalendarCtrl.weekDragged).to.have.been.calledWith(event, -1);
  });

});
