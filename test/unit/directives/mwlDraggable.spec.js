'use strict';

var angular = require('angular');

describe('mwlDraggable directive', function() {
  var element,
    scope,
    $rootScope,
    interact,
    interactInstance,
    draggableOptions,
    elementTarget,
    $timeout,
    $window,
    $compile,
    template =
      '<div ' +
      'mwl-draggable="draggable" ' +
      'axis="\'y\'" ' +
      'snap-grid="{x: 30, y: 30}" ' +
      'on-drag-start="onDragStart()" ' +
      'on-drag-end="onDragEnd(x, y)" ' +
      'on-drag="onDrag(x, y)" ' +
      'drop-data="dropData"' +
      '></div>';

  function prepareScope(vm) {
    //These variables MUST be set as a minimum for the calendar to work
    vm.draggable = true;
    vm.dropData = 'myData';
    vm.onDragStart = sinon.spy();
    vm.onDrag = sinon.spy();
    vm.onDragEnd = sinon.spy();
  }

  beforeEach(angular.mock.module('mwl.calendar'));

  beforeEach(angular.mock.module(function($provide) {
    interact = sinon.stub();
    interact.createSnapGrid = sinon.spy();
    $provide.constant('interact', interact);
  }));

  beforeEach(angular.mock.inject(function(_$compile_, _$rootScope_, _$window_, _$timeout_) {
    $timeout = _$timeout_;
    $window = _$window_;
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    scope = $rootScope.$new();
    prepareScope(scope);

    interactInstance = {
      draggable: sinon.spy(),
      unset: sinon.spy()
    };
    interact.returns(interactInstance);
    element = $compile(template)(scope);
    draggableOptions = interactInstance.draggable.args[0][0];

    elementTarget = angular.element('<div></div>');
    angular.element($window.document.body).append(elementTarget);
  }));

  afterEach(function() {
    elementTarget.remove();
  });

  it('should initialise interact', function() {
    expect(interact.createSnapGrid).to.have.been.calledWith({x: 30, y: 30});
    expect(interact).to.have.been.calledWith(element[0]);
  });

  it('should handle on drag start', function() {
    var event = {
      target: elementTarget[0]
    };

    draggableOptions.onstart(event);
    expect(angular.element(event.target).hasClass('dragging-active')).to.be.true;
    expect(angular.element(event.target).css('pointerEvents')).to.equal('none');
    expect(scope.onDragStart).to.have.been.called;
  });

  it('should handle on drag move', function() {
    var event = {
      target: elementTarget[0],
      dx: 0,
      dy: 30
    };

    draggableOptions.onstart(event);
    draggableOptions.onmove(event);
    expect(angular.element(event.target).css('z-index')).to.equal('1000');
    expect(angular.element(event.target).attr('data-y')).to.equal('30');
    expect(angular.element(event.target).attr('data-x')).to.equal('0');
    expect(scope.onDrag).to.have.been.calledWith(0, 1);
  });

  it('should handle on drag end', function() {
    var event = {
      target: elementTarget[0],
      dx: 0,
      dy: 180
    };

    draggableOptions.onstart(event);
    draggableOptions.onmove(event);
    draggableOptions.onend(event);
    $timeout.flush();
    expect(angular.element(event.target).hasClass('dragging-active')).to.be.false;
    expect(angular.element(event.target).css('pointerEvents')).to.equal('auto');
    expect(scope.onDragEnd).to.have.been.calledWith(0, 6);
  });

  it('should unset interact when scope gets destroyed', function() {
    scope.$destroy();
    expect(interactInstance.unset).to.have.been.called;
  });

});
