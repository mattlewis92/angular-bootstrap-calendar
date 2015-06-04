'use strict';

angular
  .module('mwl.calendar')
  .directive('mwlElementDimensions', function() {

    return {
      restrict: 'A',
      controller: function($element, $scope, $parse, $attrs) {
        $parse($attrs.mwlElementDimensions).assign($scope, {
          width: $element[0].offsetWidth,
          height: $element[0].offsetHeight
        });
      }
    };

  });
