'use strict';

var angular = require('angular');

describe('dynamicDirectiveTemplate directive', function() {

  beforeEach(angular.mock.module('mwl.calendar'));

  var scope, elm, calendarConfig, $templateCache, $log;
  beforeEach(inject(function($rootScope, $compile, _$templateCache_, _calendarConfig_, _$log_) {
    $templateCache = _$templateCache_;
    calendarConfig = _calendarConfig_;
    $log = _$log_;
    scope = $rootScope.$new();
    calendarConfig.templates = {
      foo: 'foo.html'
    };
    scope.baz = 'baz';
    $templateCache.put('foo.html', 'foo {{ baz }}');
    elm = $compile('<div mwl-dynamic-directive-template name="foo" overrides="overrides"></div>')(scope);
    scope.$apply();
  }));

  afterEach(function() {
    elm.remove();
    scope.$destroy();
  });

  it('should fallback to the default template if no custom templates are set', function() {
    expect(elm.text()).to.equal('foo baz');
  });

  it('should fallback to the default template if the custom template name doesnt exist in the cache', function() {
    scope.overrides = {
      foo: 'bam.html'
    };
    scope.$apply();
    expect(elm.text()).to.equal('foo baz');
  });

  it('should use the custom template', function() {
    $templateCache.put('bar.html', 'bar {{ baz }}');
    scope.overrides = {
      foo: 'bar.html'
    };
    scope.$apply();
    expect(elm.text()).to.equal('bar baz');
  });

  it('should log a warning when the template is not in the cache', function() {
    $log.warn = sinon.spy();
    scope.overrides = {
      foo: 'bam.html'
    };
    scope.$apply();
    expect($log.warn).to.have.been.calledOnce;
  });

});
