'use strict';

angular
  .module('mwl.calendar')
  .directive('mwlCalendarDraggable', function() {

    return {
      restrict: 'A',
      controller: function($element, $scope, $window, $parse, $attrs, interact) {

        if (!interact) {
          return;
        }

        function translateElement(elm, transformValue) {
          return elm
            .css('transform', transformValue)
            .css('-ms-transform', transformValue)
            .css('-webkit-transform', transformValue);
        }

        function canDrag() {
          return $parse($attrs.mwlCalendarDraggable)($scope);
        }

        interact($element[0]).draggable({
          onstart: function(event) {
            if (canDrag()) {
              angular.element(event.target).addClass('dragging-active');
              event.target.dropData = $parse($attrs.dropData)($scope);
              event.target.style.pointerEvents = 'none';
            }
          },
          onmove: function(event) {

            if (canDrag()) {
              var elm = angular.element(event.target);
              var x = (parseFloat(elm.attr('data-x')) || 0) + event.dx;
              var y = (parseFloat(elm.attr('data-y')) || 0) + event.dy;

              translateElement(elm, 'translate(' + x + 'px, ' + y + 'px)')
                .css('z-index', 1000)
                .css('position', 'relative')
                .attr('data-x', x)
                .attr('data-y', y);
            }

          },
          onend: function(event) {

            if (canDrag()) {
              translateElement(angular.element(event.target), null)
                .removeAttr('data-x')
                .removeAttr('data-y')
                .removeClass('dragging-active');

              event.target.style.pointerEvents = 'auto';
            }

          }
        });

      }
    };

  });
