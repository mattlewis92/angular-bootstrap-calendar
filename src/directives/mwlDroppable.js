'use strict';

var angular = require('angular');

angular
  .module('mwl.calendar')
  .controller('MwlDroppableCtrl', function($element, $scope, $parse, $attrs, interact) {

    if (!interact) {
      return;
    }

    interact($element[0]).dropzone({
      ondragenter: function(event) {
        angular.element(event.target).addClass('drop-active');
      },
      ondragleave: function(event) {
        angular.element(event.target).removeClass('drop-active');
      },
      ondropdeactivate: function(event) {
        angular.element(event.target).removeClass('drop-active');
      },
      ondrop: function(event) {
        if (event.relatedTarget.dropData) {
          $parse($attrs.onDrop)($scope, {dropData: event.relatedTarget.dropData});
          $scope.$apply();
        }
      }
    });

    $scope.$on('$destroy', function() {
      interact($element[0]).unset();
    });

  })
  .directive('mwlDroppable', function() {

    return {
      restrict: 'A',
      controller: 'MwlDroppableCtrl'
    };

  });
