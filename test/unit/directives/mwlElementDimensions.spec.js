'use strict';

var angular = require('angular');

describe('mwlCalendarSlideBox directive', function() {
  var element,
    scope,
    $rootScope,
    $window,
    template = '<div style="width: 100px; height: 50px;" mwl-element-dimensions="elementDimensions"></div>';

  function prepareScope(vm) {
    //These variables MUST be set as a minimum for the calendar to work
    vm.elementDimensions = {};
  }

  beforeEach(angular.mock.module('mwl.calendar'));

  beforeEach(angular.mock.inject(function($compile, _$rootScope_, _$window_) {
    $window = _$window_;
    $rootScope = _$rootScope_;
    scope = $rootScope.$new();
    prepareScope(scope);
    element = angular.element(template);
    angular.element($window.document.body).append(element);
    element = $compile(element)(scope);
    scope.$apply();
  }));

  afterEach(function() {
    element.remove();
  });

  it('should initialise scope properties', function() {
    expect(scope.elementDimensions).to.eql({width: 100, height: 50});
  });

});
