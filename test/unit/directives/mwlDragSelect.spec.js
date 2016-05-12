'use strict';

var angular = require('angular');

describe('mwlDragSelect directive', function() {

  beforeEach(angular.mock.module('mwl.calendar'));

  var elm, scope;
  beforeEach(angular.mock.inject(function($compile, $rootScope, $document) {
    scope = $rootScope.$new();
    scope.onStart = sinon.spy();
    scope.onMove = sinon.spy();
    scope.onEnd = sinon.spy();
    elm = $compile(
      '<div mwl-drag-select="isEnabled" on-drag-select-start="onStart()" ' +
      'on-drag-select-move="onMove()" on-drag-select-end="onEnd()"></div>'
    )(scope);
    $document.find('body').append(elm);
    scope.$apply();
  }));

  afterEach(function() {
    scope.$destroy();
    elm.remove();
  });

  function triggerEvent(type) {
    /* global document */
    var event = document.createEvent('Event');
    event.initEvent(type, true, true);
    elm[0].dispatchEvent(event);
  }

  describe('isEnabled = true', function() {

    beforeEach(function() {
      scope.isEnabled = true;
      scope.$apply();
    });

    it('should call the mousedown callback when the drag select', function() {
      triggerEvent('mousedown');
      expect(scope.onStart).to.have.been.calledOnce;
    });

    it('should call the mousemove callback when the drag select', function() {
      triggerEvent('mousemove');
      expect(scope.onMove).to.have.been.calledOnce;
    });

    it('should call the mouseup callback when the drag select', function() {
      triggerEvent('mouseup');
      expect(scope.onEnd).to.have.been.calledOnce;
    });

  });

  describe('isEnabled = false', function() {

    beforeEach(function() {
      scope.isEnabled = false;
      scope.$apply();
    });

    it('should not call the mousedown callback when the drag select', function() {
      triggerEvent('mousedown');
      expect(scope.onStart).not.to.have.been.called;
    });

    it('should not call the mousemove callback when the drag select', function() {
      triggerEvent('mousemove');
      expect(scope.onMove).not.to.have.been.called;
    });

    it('should not call the mouseup callback when the drag select', function() {
      triggerEvent('mouseup');
      expect(scope.onEnd).not.to.have.been.called;
    });

  });

});
