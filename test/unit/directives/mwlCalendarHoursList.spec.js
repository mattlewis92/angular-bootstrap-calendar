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
        'day-view-start="dayViewStart" ' +
        'day-view-end="dayViewEnd" ' +
        'day-view-split="dayViewSplit || 30" ' +
      '></mwl-calendar-hour-list>';

  function prepareScope(vm) {
    //These variables MUST be set as a minimum for the calendar to work
    vm.dayViewStart = '06:00';
    vm.dayViewEnd = '22:00';
    vm.dayViewsplit = 30;

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
