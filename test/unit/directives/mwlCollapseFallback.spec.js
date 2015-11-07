'use strict';

var angular = require('angular');

describe('mwlCollapseFallback directive', function() {
  var element,
    scope,
    $rootScope,
    template = '<div mwl-collapse-fallback="isCollapsed"></div>';

  function prepareScope(vm) {
    //These variables MUST be set as a minimum for the calendar to work
    vm.isCollapsed = true;
  }

  beforeEach(angular.mock.module('mwl.calendar'));

  describe('when acting as a fallback', function() {
    beforeEach(angular.mock.inject(function($compile, _$rootScope_) {
      $rootScope = _$rootScope_;
      scope = $rootScope.$new();
      prepareScope(scope);
      element = $compile(template)(scope);
      scope.$apply();
    }));

    it('should initialise toggle the ng-hide class', function() {
      expect(element.hasClass('ng-hide')).to.be.true;
      scope.isCollapsed = false;
      scope.$apply();
      expect(element.hasClass('ng-hide')).to.be.false;
    });
  });

  describe('when it is not required', function() {
    beforeEach(angular.mock.module(function($provide) {
      $provide.value('uibCollapseDirective', {});
    }));

    beforeEach(angular.mock.inject(function($compile, _$rootScope_) {
      $rootScope = _$rootScope_;
      scope = $rootScope.$new();
      sinon.spy(scope, '$watch');
      prepareScope(scope);
      element = $compile(template)(scope);
      scope.$apply();
    }));

    it('should not set any watches', function() {
      expect(scope.$watch).not.to.have.been.called;
    });
  });

});
