'use strict';

var angular = require('angular');

angular
  .module('mwl.calendar')
  .controller('MwlElementDimensionsCtrl', function($element, $scope, $parse, $attrs, $window) {

    function setDimensions() {
      $parse($attrs.mwlElementDimensions).assign($scope, {
        width: $element[0].offsetWidth - 1,
        height: $element[0].offsetHeight
      });
      $scope.$applyAsync();
    }

    var win = angular.element($window);

    win.bind('resize', setDimensions);

    setDimensions();

    $scope.$on('$destroy', function() {
      win.unbind('resize', setDimensions);
    });

  })
  .directive('mwlElementDimensions', function() {

    return {
      restrict: 'A',
      controller: 'MwlElementDimensionsCtrl'
    };

  });
