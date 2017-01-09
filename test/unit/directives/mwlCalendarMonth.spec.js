'use strict';

var angular = require('angular'),
  moment = require('moment');

describe('mwlCalendarMonth directive', function() {
  var MwlCalendarCtrl,
    element,
    scope,
    $rootScope,
    directiveScope,
    showModal,
    calendarHelper,
    calendarConfig,
    $templateCache,
    clock,
    template =
      '<mwl-calendar-month ' +
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
      'cell-template-url="{{ monthCellTemplateUrl }}" ' +
      'cell-events-template-url="{{ monthCellEventsTemplateUrl }}" ' +
      'template-scope="templateScope"' +
      'custom-template-urls="customTemplateUrls"' +
      '></mwl-calendar-month>';
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

    vm.onTimeSpanClick = function(event) {
      showModal('Day clicked', event);
    };

    vm.onEventTimesChanged = function(event) {
      showModal('Dropped or resized', event);
    };
  }

  beforeEach(angular.mock.module('mwl.calendar'));

  beforeEach(angular.mock.inject(function($compile, _$rootScope_, _calendarHelper_, _calendarConfig_, _$templateCache_) {
    clock = sinon.useFakeTimers(new Date('October 20, 2016 11:10:00').getTime());
    $rootScope = _$rootScope_;
    calendarHelper = _calendarHelper_;
    calendarConfig = _calendarConfig_;
    $templateCache = _$templateCache_;
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

  it('should get the new month view when calendar refreshes and show the list of events for the current day if required', function() {
    var monthView = {days: [{date: moment(calendarDay), inMonth: true}], rowOffsets: []};
    sinon.stub(calendarHelper, 'getWeekDayNames').returns(['Mon', 'Tu']);
    sinon.stub(calendarHelper, 'getMonthView').returns(monthView);
    sinon.stub(calendarHelper, 'getWeekViewWithTimes').returns({event: 'event2'});
    scope.$broadcast('calendar.refreshView');
    expect(calendarHelper.getWeekDayNames).to.have.been.called;
    expect(calendarHelper.getMonthView).to.have.been.calledWith(scope.events, scope.viewDate);
    expect(MwlCalendarCtrl.weekDays).to.eql(['Mon', 'Tu']);
    expect(MwlCalendarCtrl.view).to.equal(monthView.days);
    expect(MwlCalendarCtrl.monthOffsets).to.equal(monthView.rowOffsets);
  });

  it('should call the on timespan clicked callback ', function() {
    MwlCalendarCtrl.view = [{date: moment(calendarDay), inMonth: true}];
    MwlCalendarCtrl.dayClicked(MwlCalendarCtrl.view[0]);
    expect(showModal).to.have.been.calledWith('Day clicked', {
      calendarDate: MwlCalendarCtrl.view[0].date.toDate(),
      $event: undefined,
      calendarCell: MwlCalendarCtrl.view[0]
    });
  });

  it('should toggle the event list for the selected day ', function() {

    MwlCalendarCtrl.view = [{date: moment(calendarDay), inMonth: true}];
    //Open event list
    MwlCalendarCtrl.cellIsOpen = true;
    scope.$apply();
    expect(MwlCalendarCtrl.openRowIndex).to.equal(0);
    expect(MwlCalendarCtrl.openDayIndex).to.equal(0);

    //Close event list
    MwlCalendarCtrl.cellIsOpen = false;
    scope.$apply();
    expect(MwlCalendarCtrl.openRowIndex).to.equal(null);
    expect(MwlCalendarCtrl.openDayIndex).to.equal(null);
  });

  it('should highlight the month with the events color', function() {

    scope.events[0].color = {
      secondary: 'pink'
    };

    var monthView = [{
      date: moment(calendarDay),
      inMonth: true,
      events: [scope.events[0]]
    }, {
      date: moment(calendarDay),
      inMonth: true,
      events: [scope.events[0]]
    }, {
      date: moment(calendarDay),
      inMonth: true,
      events: [scope.events[1]]
    }];

    MwlCalendarCtrl.view = monthView;
    MwlCalendarCtrl.highlightEvent(scope.events[0], true);
    expect(monthView[0].backgroundColor).to.equal('pink');
    expect(monthView[1].backgroundColor).to.equal('pink');

  });

  it('should call the callback function when you finish dropping an event', function() {
    var draggedFromDate = new Date();
    MwlCalendarCtrl.handleEventDrop(scope.events[0], calendarDay, draggedFromDate);
    expect(showModal).to.have.been.calledWith('Dropped or resized', {
      calendarEvent: scope.events[0],
      calendarDate: new Date(2015, 4, 1),
      calendarNewEventStart: new Date(2015, 4, 1, 8, 0),
      calendarNewEventEnd: new Date(2015, 4, 10, 9, 0),
      calendarDraggedFromDate: draggedFromDate
    });
  });

  it('should call the callback function when you finish dropping an event with no end date', function() {
    delete scope.events[0].endsAt;
    var draggedFromDate = new Date();
    MwlCalendarCtrl.handleEventDrop(scope.events[0], calendarDay, draggedFromDate);
    expect(showModal).to.have.been.calledWith('Dropped or resized', {
      calendarEvent: scope.events[0],
      calendarDate: new Date(2015, 4, 1),
      calendarNewEventStart: new Date(2015, 4, 1, 8, 0),
      calendarNewEventEnd: null,
      calendarDraggedFromDate: draggedFromDate
    });
  });

  it('should get the week label', function() {
    expect(MwlCalendarCtrl.getWeekNumberLabel({date: moment().startOf('year').endOf('week').add(1, 'day')})).to.equal('Week 1');
  });

  it('should allow the week label option to be a function', function() {
    calendarConfig.i18nStrings.weekNumber = function(params) {
      return 'My custom function ' + params.weekNumber;
    };
    expect(MwlCalendarCtrl.getWeekNumberLabel({date: moment().startOf('year').endOf('week').add(1, 'day')})).to.equal('My custom function 1');
  });

  it('should initialise the date range select', function() {

    var date = moment();
    MwlCalendarCtrl.onDragSelectStart({date: date});
    expect(MwlCalendarCtrl.dateRangeSelect).to.deep.equal({
      startDate: date,
      endDate: date
    });

  });

  it('should update the date ranges end date', function() {
    var date = moment();
    MwlCalendarCtrl.dateRangeSelect = {
      startDate: 'date1',
      endDate: 'date2'
    };
    MwlCalendarCtrl.onDragSelectMove({date: date});
    expect(MwlCalendarCtrl.dateRangeSelect).to.deep.equal({
      startDate: 'date1',
      endDate: date
    });
  });

  it('should not throw if there is no date range being selected', function() {
    var date = moment();
    MwlCalendarCtrl.dateRangeSelect = null;
    expect(function() {
      MwlCalendarCtrl.onDragSelectMove({date: date});
    }).not.to.throw();
  });

  it('should call the onDateRangeSelect callback if there is a valid date range', function() {
    MwlCalendarCtrl.onDateRangeSelect = sinon.spy();
    var date1 = moment();
    var date2 = moment().add(1, 'day');
    MwlCalendarCtrl.dateRangeSelect = {
      startDate: date1,
      endDate: moment().add(1, 'second')
    };
    MwlCalendarCtrl.onDragSelectEnd({date: date2});
    expect(MwlCalendarCtrl.onDateRangeSelect).to.have.been.calledWith({
      calendarRangeStartDate: date1.startOf('day').toDate(),
      calendarRangeEndDate: date2.endOf('day').toDate()
    });
    expect(MwlCalendarCtrl.dateRangeSelect).to.be.undefined;
  });

  it('should not call the onDateRangeSelect callback if there is an invalid date range', function() {
    MwlCalendarCtrl.onDateRangeSelect = sinon.spy();
    var date1 = moment();
    var date2 = moment().subtract(1, 'day');
    MwlCalendarCtrl.dateRangeSelect = {
      startDate: date1,
      endDate: moment().subtract(1, 'second')
    };
    MwlCalendarCtrl.onDragSelectEnd({date: date2});
    expect(MwlCalendarCtrl.onDateRangeSelect).not.to.have.been.called;
    expect(MwlCalendarCtrl.dateRangeSelect).to.be.undefined;
  });

  it('should pass in a scope object that is accessible from the custom template', function() {
    scope.templateScope = {
      foo: 'world'
    };
    $templateCache.put('customMonth.html', 'Hello {{ vm.templateScope.foo }}');
    scope.customTemplateUrls = {calendarMonthView: 'customMonth.html'};
    scope.$apply();
    expect(element.text()).to.deep.equal('Hello world');
  });

});
