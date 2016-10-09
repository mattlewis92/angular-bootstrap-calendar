'use strict';

var angular = require('angular'),
  moment = require('moment');

describe('mwlCalendar directive', function() {
  var MwlCalendarCtrl,
    element,
    scope,
    $rootScope,
    $q,
    $log,
    $timeout,
    calendarHelper,
    directiveScope,
    MwlCalendarMonthCtrl,
    clock,
    template =
    '<mwl-calendar ' +
      'events="vm.events" ' +
      'view="vm.calendarView" ' +
      'view-title="vm.calendarTitle" ' +
      'view-date="vm.calendarDay" ' +
      'on-event-click="vm.eventClicked(calendarEvent)" ' +
      'on-event-times-changed="vm.eventTimesChanged(calendarEvent); ' +
      'calendarEvent.startsAt = calendarNewEventStart; calendarEvent.endsAt = calendarNewEventEnd" ' +
      'cell-is-open="true" ' +
      'day-view-start="06:00" ' +
      'day-view-end="22:59" ' +
      'day-view-split="30" ' +
      'cell-modifier="vm.modifyCell(calendarCell)"> ' +
    '</mwl-calendar>';
  var calendarDay = new Date(2015, 4, 1);

  function prepareScope(vm) {
    //These variables MUST be set as a minimum for the calendar to work
    vm.calendarView = 'month';
    vm.calendarDay = calendarDay;
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

    var showModal = sinon.spy();

    vm.eventClicked = function(event) {
      showModal('Clicked', event);
    };

    vm.eventEdited = function(event) {
      showModal('Edited', event);
    };

    vm.eventDeleted = function(event) {
      showModal('Deleted', event);
    };

    vm.eventTimesChanged = function(event) {
      showModal('Dropped or resized', event);
    };

    vm.toggle = function($event, field, event) {
      $event.preventDefault();
      $event.stopPropagation();
      event[field] = !event[field];
    };
  }

  beforeEach(angular.mock.module('mwl.calendar'));

  beforeEach(angular.mock.inject(function($compile, _$rootScope_, _$timeout_, _$q_, _calendarHelper_, _$log_) {
    $q = _$q_;
    $rootScope = _$rootScope_;
    $timeout = _$timeout_;
    calendarHelper = _calendarHelper_;
    scope = $rootScope.$new();
    $log = _$log_;
    scope.vm = {};
    clock = sinon.useFakeTimers(new Date(2015, 4, 1).getTime());
    calendarHelper.loadTemplates = sinon.stub().returns($q.when());
    prepareScope(scope.vm);

    element = $compile(template)(scope);
    scope.$apply();
    directiveScope = element.isolateScope();
    MwlCalendarCtrl = directiveScope.vm;
    MwlCalendarMonthCtrl = element.find('mwl-calendar-month').isolateScope().vm;
  }));

  it('allow to change the view', function() {
    var myDate = new Date();
    MwlCalendarCtrl.changeView('day', myDate);
    expect(MwlCalendarCtrl.view).to.equal('day');
    expect(MwlCalendarCtrl.viewDate).to.equal(myDate);
  });

  it('should change the current view', function() {
    var myDate = new Date();
    MwlCalendarCtrl.dateClicked(myDate);
    expect(MwlCalendarCtrl.view).to.equal('day');
    expect(MwlCalendarCtrl.viewDate).to.eql(myDate);
  });

  it('should refresh the calendar when appropriate', function() {
    var spy = sinon.spy(directiveScope, '$broadcast');
    scope.vm.calendarDay = new Date();
    scope.vm.events[0].title = 'hello event 1';
    scope.$apply();
    $timeout.flush();
    expect(spy).to.have.been.calledWith('calendar.refreshView');
    scope.vm.events[0].title = 'hello event 01';
    scope.$apply();
  });

  it('should allow a new event reference to be set', function() {
    scope.vm.events = [];
    scope.$apply();
    $timeout.flush();
    MwlCalendarMonthCtrl.view.forEach(function(day) {
      expect(day.events).to.eql([]);
    });
  });

  it('should load all templates', function() {
    expect(calendarHelper.loadTemplates).to.have.been.calledOnce;
  });

  it('should set templates loaded to true', function() {
    expect(MwlCalendarCtrl.templatesLoaded).to.be.true;
  });

  it('should log a warning if the event starts at is not set', function() {
    $log.warn = sinon.spy();
    scope.vm.events = [{title: 'title'}];
    scope.$apply();
    expect($log.warn).to.have.been.called;
  });

  it('should log a warning if the event starts at is not a valid date object', function() {
    $log.warn = sinon.spy();
    scope.vm.events = [{title: 'title', startsAt: '2016-06-01'}];
    scope.$apply();
    expect($log.warn).to.have.been.called;
  });

  it('should log a warning if the event ends at is not a valid date object', function() {
    $log.warn = sinon.spy();
    scope.vm.events = [{title: 'title', startsAt: new Date(), endsAt: '2016-01-01'}];
    scope.$apply();
    expect($log.warn).to.have.been.called;
  });

  it('should not log a warning if the event ends at is set to a falsey value', function() {
    $log.warn = sinon.spy();
    scope.vm.events = [{title: 'title', startsAt: new Date(), endsAt: null}];
    scope.$apply();
    expect($log.warn).not.to.have.been.called;
  });

  it('should log a warning if the event ends after it starts', function() {
    $log.warn = sinon.spy();
    scope.vm.events = [{title: 'title', startsAt: new Date(), endsAt: new Date(Date.now() - 1)}];
    scope.$apply();
    expect($log.warn).to.have.been.called;
  });

  afterEach(function() {
    clock.restore();
  });

});
