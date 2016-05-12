'use strict';

var angular = require('angular');

describe('mwlresizable directive', function() {
  var element,
    scope,
    $rootScope,
    interact,
    interactInstance,
    resizableOptions,
    $compile,
    $timeout,
    template =
      '<div ' +
      'mwl-resizable="resizable" ' +
      'snap-grid="{y: 30}" ' +
      'resize-edges="{top: true, bottom: true}" ' +
      'on-resize-start="onResizeStart()" ' +
      'on-resize-end="onResizeEnd(x, y / 30)" ' +
      'on-resize="onResize(x, y / 30)" ' +
      '></div>';

  function prepareScope(vm) {
    //These variables MUST be set as a minimum for the calendar to work
    vm.resizable = true;
    vm.dropData = 'myData';
    vm.onResizeStart = sinon.spy();
    vm.onResize = sinon.spy();
    vm.onResizeEnd = sinon.spy();
  }

  beforeEach(angular.mock.module('mwl.calendar'));

  beforeEach(angular.mock.module(function($provide) {
    interact = sinon.stub();
    interact.createSnapGrid = sinon.spy();
    $provide.constant('interact', interact);
  }));

  beforeEach(angular.mock.inject(function(_$compile_, _$rootScope_, _$timeout_) {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    $timeout = _$timeout_;
    scope = $rootScope.$new();
    prepareScope(scope);

    interactInstance = {
      resizable: sinon.spy(),
      unset: sinon.spy()
    };
    interact.returns(interactInstance);
    element = $compile(template)(scope);
    resizableOptions = interactInstance.resizable.args[0][0];
  }));

  it('should initialise interact', function() {
    expect(interact.createSnapGrid).to.have.been.calledWith({y: 30});
    expect(interact).to.have.been.calledWith(element[0]);
  });

  it('should handle on resize start', function() {
    var event = {
      target: angular.element('<div></div>')[0]
    };

    resizableOptions.onstart(event);
  });

  it('should handle on resize move', function() {
    var event = {
      target: angular.element('<div></div>')[0],
      rect: {
        width: 100,
        height: 50
      },
      deltaRect: {
        left: 0,
        top: -30
      }
    };

    resizableOptions.onstart(event);
    resizableOptions.onmove(event);
    expect(angular.element(event.target).data('y')).to.equal(-30);
    expect(angular.element(event.target).data('x')).to.equal(0);
    expect(scope.onResize).to.have.been.calledWith(0, -1);

    event = {
      target: angular.element('<div></div>')[0],
      rect: {
        width: 100,
        height: 50
      },
      deltaRect: {
        left: 0,
        top: 60
      }
    };

    scope.onResize.reset();
    resizableOptions.onmove(event);
    expect(angular.element(event.target).data('y')).to.equal(60);
    expect(angular.element(event.target).data('x')).to.equal(0);
    expect(scope.onResize).to.have.been.calledWith(0, 2);
  });

  it('should not resize the element to height 0', function() {

    var event = {
      target: angular.element('<div></div>')[0],
      rect: {
        width: 100,
        height: 0
      },
      deltaRect: {
        left: 0,
        top: -30
      }
    };
    resizableOptions.onmove(event);
    expect(angular.element(event.target).data('x')).to.be.undefined;
    expect(angular.element(event.target).data('y')).to.be.undefined;
    expect(angular.element(event.target).css('height')).to.equal('');
    expect(angular.element(event.target).css('width')).to.equal('');
    expect(angular.element(event.target).css('transform')).to.be.undefined;
    expect(scope.onResize).not.to.have.been.called;

  });

  it('should not resize the element to width 0', function() {

    var event = {
      target: angular.element('<div></div>')[0],
      rect: {
        width: 0,
        height: 100
      },
      deltaRect: {
        left: 0,
        top: -30
      }
    };
    resizableOptions.onmove(event);
    expect(angular.element(event.target).data('x')).to.be.undefined;
    expect(angular.element(event.target).data('y')).to.be.undefined;
    expect(angular.element(event.target).css('height')).to.equal('');
    expect(angular.element(event.target).css('width')).to.equal('');
    expect(angular.element(event.target).css('transform')).to.be.undefined;
    expect(scope.onResize).not.to.have.been.called;

  });

  it('should handle on resize end', function() {
    var event = {
      target: angular.element('<div style="width: 30px; height: 30px;"></div>')[0],
      rect: {
        width: 1,
        height: 120
      },
      deltaRect: {
        left: 0,
        top: 0
      }
    };

    resizableOptions.onstart(event);
    resizableOptions.onmove(event);
    resizableOptions.onend(event);
    $timeout.flush();
    expect(scope.onResizeEnd).to.have.been.calledWith(1, 4);
    expect(angular.element(event.target).css('transform')).to.eql('');
    expect(angular.element(event.target).css('width')).to.eql('30px');
    expect(angular.element(event.target).css('height')).to.eql('30px');
  });

  it('should unset interact when scope gets destroyed', function() {
    scope.$destroy();
    expect(interactInstance.unset).to.have.been.called;
  });

  it('should disable resizing on the event', function() {
    scope.resizable = false;
    scope.$apply();
    expect(interactInstance.resizable).to.have.been.calledWith({enabled: false});
  });

});
