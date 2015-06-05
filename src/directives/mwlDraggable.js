'use strict';

angular
  .module('mwl.calendar')
  .directive('mwlDraggable', function() {

    return {
      restrict: 'A',
      controller: function($element, $scope, $window, $parse, $attrs, interact) {

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

        function translateElement(elm, transformValue) {
          return elm
            .css('transform', transformValue)
            .css('-ms-transform', transformValue)
            .css('-webkit-transform', transformValue);
        }

        function canDrag() {
          return $parse($attrs.mwlDraggable)($scope);
        }

        function getUnitsMoved(x, y, gridDimensions) {

          var result = {x: x, y: y};

          if (gridDimensions && gridDimensions.x) {
            result.x /= gridDimensions.x;
          }

          if (gridDimensions && gridDimensions.y) {
            result.y /= gridDimensions.y;
          }

          return result;

        }

        interact($element[0]).draggable({
          snap: snap,
          onstart: function(event) {
            if (canDrag()) {
              angular.element(event.target).addClass('dragging-active');
              event.target.dropData = $parse($attrs.dropData)($scope);
              event.target.style.pointerEvents = 'none';
              if ($attrs.onDragStart) {
                $parse($attrs.onDragStart)($scope);
                $scope.$apply();
              }
            }
          },
          onmove: function(event) {

            if (canDrag()) {
              var elm = angular.element(event.target);
              var x = (parseFloat(elm.attr('data-x')) || 0) + event.dx;
              var y = (parseFloat(elm.attr('data-y')) || 0) + event.dy;

              switch ($attrs.axis) {
                case 'x':
                  y = 0;
                  break;

                case 'y':
                  x = 0;
                  break;

                default:
              }

              if (!$window.getComputedStyle(elm[0]).position) {
                elm.css('position', 'relative');
              }

              translateElement(elm, 'translate(' + x + 'px, ' + y + 'px)')
                .css('z-index', 1000)
                .attr('data-x', x)
                .attr('data-y', y);

              if ($attrs.onDrag) {
                $parse($attrs.onDrag)($scope, getUnitsMoved(x, y, snapGridDimensions));
                $scope.$apply();
              }
            }

          },
          onend: function(event) {

            if (canDrag()) {
              var elm = angular.element(event.target);
              var x = elm.attr('data-x');
              var y = elm.attr('data-y');
              translateElement(elm, null)
                .removeAttr('data-x')
                .removeAttr('data-y')
                .removeClass('dragging-active');

              event.target.style.pointerEvents = 'auto';
              if ($attrs.onDragEnd) {
                $parse($attrs.onDragEnd)($scope, getUnitsMoved(x, y, snapGridDimensions));
                $scope.$apply();
              }
            }

          }
        });

        var unbindDestroy = $scope.$on('$destroy', function() {
          unbindDestroy();
          interact($element[0]).unset();
        });

      }
    };

  });
