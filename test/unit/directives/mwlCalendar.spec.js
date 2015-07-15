'use strict';

var angular = require('angular'),
  moment = require('moment');

describe('mwlCalendar directive', function() {
  var MwlCalendarCtrl,
    element,
    scope,
    $rootScope,
    directiveScope,
    template =
    '<mwl-calendar ' +
      'events="vm.events" ' +
      'view="vm.calendarView" ' +
      'view-title="vm.calendarTitle" ' +
      'current-day="vm.calendarDay" ' +
      'on-event-click="vm.eventClicked(calendarEvent)" ' +
      'on-event-times-changed="vm.eventTimesChanged(calendarEvent); ' +
      'calendarEvent.startsAt = calendarNewEventStart; calendarEvent.endsAt = calendarNewEventEnd" ' +
      'on-edit-event-click="vm.eventEdited(calendarEvent)" ' +
      'on-delete-event-click="vm.eventDeleted(calendarEvent)" ' +
      'auto-open="true" ' +
      'day-view-start="06:00" ' +
      'day-view-end="22:00" ' +
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

  beforeEach(angular.mock.inject(function($compile, _$rootScope_) {
    $rootScope = _$rootScope_;
    scope = $rootScope.$new();
    scope.vm = {};
    prepareScope(scope.vm);

    element = $compile(template)(scope);
    scope.$apply();
    directiveScope = element.isolateScope();
    MwlCalendarCtrl = directiveScope.vm;
  }));

  it('allow to change the view', function() {
    var myDate = new Date();
    MwlCalendarCtrl.changeView('day', myDate);
    expect(MwlCalendarCtrl.view).to.equal('day');
    expect(MwlCalendarCtrl.currentDay).to.equal(myDate);
  });

  it('should allow to drill down', function() {
    var myDate = new Date();
    MwlCalendarCtrl.drillDown(myDate);
    expect(MwlCalendarCtrl.view).to.equal('day');
    expect(MwlCalendarCtrl.currentDay).to.eql(myDate);
  });

  it('should refresh the calendar when appropriate', function() {
    var spy = sinon.spy(directiveScope, '$broadcast');
    scope.vm.calendarDay = new Date();
    scope.vm.events[0].title = 'hello event 1';
    scope.$apply();
    expect(spy).to.have.been.calledWith('calendar.refreshView');

    scope.vm.events[0].title = 'hello event 01';
    scope.$apply();
  });

});
