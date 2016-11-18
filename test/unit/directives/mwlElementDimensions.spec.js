'use strict';

var angular = require('angular');

describe('mwlElementDimensions directive', function() {
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
    expect(scope.elementDimensions).to.eql({width: 99, height: 50});
  });

  it('should update the element dimensions when the window is resized', function() {
    element[0].style.width = '150px';
    element[0].style.height = '20px';
    $window.dispatchEvent(new $window.Event('resize'));
    expect(scope.elementDimensions).to.eql({width: 149, height: 20});
  });

});
