'use strict';

var angular = require('angular');

angular
  .module('mwl.calendar')
  .controller('MwlElementDimensionsCtrl', function($element, $scope, $parse, $attrs) {

    $parse($attrs.mwlElementDimensions).assign($scope, {
      width: $element[0].offsetWidth,
      height: $element[0].offsetHeight
    });

  })
  .directive('mwlElementDimensions', function() {

    return {
      restrict: 'A',
      controller: 'MwlElementDimensionsCtrl'
    };

  });
