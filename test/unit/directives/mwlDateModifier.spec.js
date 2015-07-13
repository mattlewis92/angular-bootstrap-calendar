'use strict';

var angular = require('angular');

describe('mwlDateModifier directive', function() {
  var element,
    scope,
    $rootScope,
    $compile,
    template =
      '<button ' +
        'mwl-date-modifier ' +
        'date="date" ' +
        'set-to-today ' +
        'increment="increment" ' +
        'decrement="decrement" ' +
      '></button>';

  function prepareScope(vm) {
    //These variables MUST be set as a minimum for the calendar to work
    vm.date = new Date(2015, 0, 5);
    vm.increment = 'days';
    vm.decrement = 'months';
  }

  beforeEach(angular.mock.module('mwl.calendar'));

  beforeEach(angular.mock.inject(function(_$compile_, _$rootScope_) {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    scope = $rootScope.$new();
    prepareScope(scope);

  }));

  it('should increment the date by one unit of the provided attribute value', function() {
    element = angular.element(template).removeAttr('set-to-today');
    element = $compile(element)(scope);
    scope.$apply();
    element.triggerHandler('click');
    expect(scope.date).to.eql(new Date(2015, 0, 6));
  });

  it('should decrement the date by one unit of the provided attribute value', function() {
    element = angular.element(template).removeAttr('set-to-today').removeAttr('increment');
    element = $compile(element)(scope);
    scope.$apply();
    element.triggerHandler('click');
    expect(scope.date).to.eql(new Date(2014, 11, 5));
  });

  it('should set the date to today', function() {
    element = $compile(template)(scope);
    scope.$apply();
    element.triggerHandler('click');
    expect(scope.date.toString()).to.equal((new Date()).toString());
  });

});
