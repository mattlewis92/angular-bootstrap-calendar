'use strict';

var angular = require('angular');

describe('mwlDroppable directive', function() {
  var element,
    scope,
    $rootScope,
    interact,
    interactInstance,
    dropzoneOptions,
    $compile,
    template = '<div mwl-droppable on-drop="onDrop(dropData)"></div>';

  function prepareScope(vm) {
    //These variables MUST be set as a minimum for the calendar to work
    vm.dropData = 'myData';
    vm.onDrop = sinon.spy();
  }

  beforeEach(angular.mock.module('mwl.calendar'));

  beforeEach(angular.mock.module(function($provide) {
    interact = sinon.stub();
    $provide.constant('interact', interact);
  }));

  beforeEach(angular.mock.inject(function(_$compile_, _$rootScope_) {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    scope = $rootScope.$new();
    prepareScope(scope);

    interactInstance = {
      dropzone: sinon.spy(),
      unset: sinon.spy()
    };
    interact.returns(interactInstance);
    element = $compile(template)(scope);
    dropzoneOptions = interactInstance.dropzone.args[0][0];
  }));

  it('should initialise interact', function() {
    expect(interact).to.have.been.calledWith(element[0]);
  });

  it('should handle on drag enter', function() {
    var event = {
      target: angular.element('<div></div>')[0],
      relatedTarget: {dropData: scope.dropData}
    };

    dropzoneOptions.ondragenter(event);
    expect(angular.element(event.target).hasClass('drop-active')).to.be.true;
  });

  it('should handle on drag leave', function() {
    var event = {
      target: angular.element('<div></div>')[0],
      relatedTarget: {dropData: scope.dropData}
    };

    dropzoneOptions.ondragenter(event);
    dropzoneOptions.ondragleave(event);
    expect(angular.element(event.target).hasClass('drop-active')).to.be.false;
  });

  it('should handle on drop', function() {
    var event = {
      target: angular.element('<div></div>')[0],
      relatedTarget: {dropData: scope.dropData}
    };

    dropzoneOptions.ondrop(event);
    expect(scope.onDrop).to.have.been.calledWith('myData');
  });

  it('should handle on drop deactivate', function() {
    var event = {
      target: angular.element('<div></div>')[0],
      relatedTarget: {dropData: scope.dropData}
    };

    dropzoneOptions.ondragenter(event);
    dropzoneOptions.ondropdeactivate(event);
    expect(angular.element(event.target).hasClass('drop-active')).to.be.false;
  });

  it('should unset interact when scope gets destroyed', function() {
    scope.$destroy();
    expect(interactInstance.unset).to.have.been.called;
  });

});
