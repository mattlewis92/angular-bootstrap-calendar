'use strict';

var angular = require('angular');

angular
  .module('mwl.calendar')
  .controller('MwlResizableCtrl', function($element, $scope, $parse, $attrs, $timeout, interact) {

    if (!interact) {
      return;
    }

    var snap, snapGridDimensions;
    if ($attrs.snapGrid) {
      snapGridDimensions = $parse($attrs.snapGrid)($scope);
      snap = {
        targets: [
          interact.createSnapGrid(snapGridDimensions)
        ]
      };
    }

    var originalDimensions = {};
    var originalDimensionsStyle = {};
    var resizeEdge;

    function canResize() {
      return $parse($attrs.mwlResizable)($scope);
    }

    function getUnitsResized(edge, elm, gridDimensions) {
      var unitsResized = {};
      unitsResized.edge = edge;
      if (edge === 'start') {
        unitsResized.x = elm.data('x');
        unitsResized.y = elm.data('y');
      } else if (edge === 'end') {
        unitsResized.x = parseFloat(elm.css('width').replace('px', '')) - originalDimensions.width;
        unitsResized.y = parseFloat(elm.css('height').replace('px', '')) - originalDimensions.height;
      }
      if (gridDimensions && gridDimensions.x) {
        unitsResized.x = Math.round(unitsResized.x / gridDimensions.x);
      }
      if (gridDimensions && gridDimensions.y) {
        unitsResized.y = Math.round(unitsResized.y / gridDimensions.y);
      }
      return unitsResized;
    }

    interact($element[0]).resizable({
      edges: $parse($attrs.resizeEdges)($scope),
      snap: snap,
      onstart: function(event) {

        if (canResize()) {
          resizeEdge = 'end';
          var elm = angular.element(event.target);
          originalDimensions.height = elm[0].offsetHeight;
          originalDimensions.width = elm[0].offsetWidth;
          originalDimensionsStyle.height = elm.css('height');
          originalDimensionsStyle.width = elm.css('width');
        }

      },
      onmove: function(event) {

        if (canResize()) {
          var elm = angular.element(event.target);
          var x = parseFloat(elm.data('x') || 0);
          var y = parseFloat(elm.data('y') || 0);

          elm.css({
            width: event.rect.width + 'px',
            height: event.rect.height + 'px'
          });

          // translate when resizing from top or left edges
          x += event.deltaRect.left;
          y += event.deltaRect.top;

          elm.css('transform', 'translate(' + x + 'px,' + y + 'px)');

          elm.data('x', x);
          elm.data('y', y);

          if (event.deltaRect.left !== 0 || event.deltaRect.top !== 0) {
            resizeEdge = 'start';
          }

          if ($attrs.onResize) {
            $parse($attrs.onResize)($scope, getUnitsResized(resizeEdge, elm, snapGridDimensions));
            $scope.$apply();
          }

        }

      },
      onend: function(event) {

        if (canResize()) {

          var elm = angular.element(event.target);
          var unitsResized = getUnitsResized(resizeEdge, elm, snapGridDimensions);

          $timeout(function() {
            elm
              .data('x', null)
              .data('y', null)
              .css({
                transform: '',
                width: originalDimensionsStyle.width,
                height: originalDimensionsStyle.height
              });
          });

          if ($attrs.onResizeEnd) {
            $parse($attrs.onResizeEnd)($scope, unitsResized);
            $scope.$apply();
          }
        }

      }
    });

    $scope.$on('$destroy', function() {
      interact($element[0]).unset();
    });

  })
  .directive('mwlResizable', function() {

    return {
      restrict: 'A',
      controller: 'MwlResizableCtrl'
    };

  });
