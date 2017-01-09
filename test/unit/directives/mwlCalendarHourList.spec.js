'use strict';

var angular = require('angular'),
  moment = require('moment');

describe('mwlCalendarHourList directive', function() {
  var MwlCalendarCtrl,
    element,
    scope,
    $rootScope,
    directiveScope,
    calendarConfig,
    showModal,
    clock,
    template =
      '<mwl-calendar-hour-list ' +
        'day-view-start="dayViewStart" ' +
        'day-view-end="dayViewEnd" ' +
        'day-view-split="dayViewSplit || 30" ' +
        'on-event-times-changed="eventDropped(calendarEvent, calendarDate, calendarNewEventStart, calendarNewEventEnd)" ' +
        'cell-modifier="cellModifier"' +
        'day-width="dayWidth"' +
      '></mwl-calendar-hour-list>';

  function prepareScope(vm) {
    //These variables MUST be set as a minimum for the calendar to work
    vm.dayViewStart = '06:00';
    vm.dayViewEnd = '22:59';
    vm.dayViewsplit = 30;
    vm.cellModifier = sinon.stub();

    showModal = sinon.spy();

    vm.onEventClick = function(event) {
      showModal('Clicked', event);
    };

    vm.onEventTimesChanged = function(event) {
      showModal('Dropped or resized', event);
    };
  }

  beforeEach(angular.mock.module('mwl.calendar'));

  beforeEach(angular.mock.inject(function($compile, _$rootScope_, _calendarConfig_) {
    calendarConfig = _calendarConfig_;
    clock = sinon.useFakeTimers(new Date('October 20, 2015 11:10:00').getTime());
    $rootScope = _$rootScope_;
    scope = $rootScope.$new();
    prepareScope(scope);

    element = $compile(template)(scope);
    scope.$apply();
    directiveScope = element.isolateScope();
    MwlCalendarCtrl = directiveScope.vm;
  }));

  afterEach(function() {
    clock.restore();
  });

  it('should define a list of hours', function() {
    expect(MwlCalendarCtrl.hourGrid.length).to.equal(17);
  });

  it('should update the list of hours when the calendar refreshes if the locale changes', function() {
    sinon.stub(moment, 'locale').returns('another locale');
    scope.dayViewStart = '00:00';
    scope.$apply();
    scope.$broadcast('calendar.refreshView');
    expect(MwlCalendarCtrl.hourGrid.length).to.equal(23);
    moment.locale.restore();
  });

  it('should call the event times changed callback when an event is dropped', function() {
    var event = {
      startsAt: moment().toDate(),
      endsAt: moment().add(1, 'day').toDate()
    };
    var date = moment().add(2, 'days').toDate();
    MwlCalendarCtrl.onEventTimesChanged = sinon.spy();
    MwlCalendarCtrl.eventDropped(event, date);
    var calledWith = MwlCalendarCtrl.onEventTimesChanged.getCall(0).args[0];
    expect(calledWith.calendarEvent).to.equal(event);
    expect(calledWith.calendarDate.getTime()).to.equal(date.getTime());
    expect(calledWith.calendarNewEventStart.getTime()).to.equal(date.getTime());
    expect(calledWith.calendarNewEventEnd.getTime()).to.equal(moment().add(3, 'days').toDate().getTime());
  });

  it('should initialise the date range select', function() {

    var date = new Date();
    MwlCalendarCtrl.onDragSelectStart(date, 1);
    expect(MwlCalendarCtrl.dateRangeSelect).to.deep.equal({
      active: true,
      startDate: date,
      endDate: date,
      dayIndex: 1
    });

  });

  it('should update the date ranges end date', function() {
    var date = new Date();
    MwlCalendarCtrl.dateRangeSelect = {
      startDate: 'date1',
      endDate: 'date2'
    };
    MwlCalendarCtrl.onDragSelectMove(date);
    expect(MwlCalendarCtrl.dateRangeSelect).to.deep.equal({
      startDate: 'date1',
      endDate: date
    });
  });

  it('should not throw if there is no date range being selected', function() {
    var date = new Date();
    MwlCalendarCtrl.dateRangeSelect = null;
    expect(function() {
      MwlCalendarCtrl.onDragSelectMove(date);
    }).not.to.throw();
  });

  it('should call the onDateRangeSelect callback if there is a valid date range', function() {
    MwlCalendarCtrl.onDateRangeSelect = sinon.spy();
    var date1 = moment();
    var date2 = moment(Date.now() + 100000);
    MwlCalendarCtrl.dateRangeSelect = {
      startDate: date1,
      endDate: moment(Date.now() + 10)
    };
    MwlCalendarCtrl.onDragSelectEnd(date2);
    expect(MwlCalendarCtrl.onDateRangeSelect).to.have.been.calledWith({
      calendarRangeStartDate: date1.toDate(),
      calendarRangeEndDate: date2.toDate()
    });
    expect(MwlCalendarCtrl.dateRangeSelect).to.be.undefined;
  });

  it('should not call the onDateRangeSelect callback if there is an invalid date range', function() {
    MwlCalendarCtrl.onDateRangeSelect = sinon.spy();
    var date1 = moment();
    var date2 = moment(Date.now() - 100000);
    MwlCalendarCtrl.dateRangeSelect = {
      startDate: date1,
      endDate: moment(Date.now() - 10)
    };
    MwlCalendarCtrl.onDragSelectEnd(date2);
    expect(MwlCalendarCtrl.onDateRangeSelect).not.to.have.been.called;
    expect(MwlCalendarCtrl.dateRangeSelect).to.be.undefined;
  });

  it('should allow the hour segments to have their CSS class overridden', function() {
    sinon.stub(moment, 'locale').returns('another locale');
    scope.cellModifier = function(args) {
      args.calendarCell.cssClass = 'foo';
    };
    scope.$apply();
    scope.$broadcast('calendar.refreshView');
    scope.$apply();
    moment.locale.restore();
    expect(element[0].querySelector('.cal-day-hour-part.foo')).to.be.ok;
  });

  it('should allow the week view with times day segments CSS classes to be customised', function() {
    calendarConfig.showTimesOnWeekView = true;
    scope.dayWidth = 50;
    sinon.stub(moment, 'locale').returns('another locale');
    scope.cellModifier = function(args) {
      args.calendarCell.cssClass = 'foo';
    };
    scope.$apply();
    scope.$broadcast('calendar.refreshView');
    scope.$apply();
    calendarConfig.showTimesOnWeekView = false;
    moment.locale.restore();
    expect(element[0].querySelector('.cal-day-hour-part-spacer.foo')).to.be.ok;
  });

  it('should not throw if there is no current range being selected', function() {
    expect(function() {
      MwlCalendarCtrl.onDragSelectEnd(new Date());
    }).not.to.throw();
  });

});
