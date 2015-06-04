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

        interact($element[0]).draggable({
          onstart: function(event) {
            angular.element(event.target).addClass('dragging-active');
            event.target.dropData = $parse($attrs.dropData)($scope);
            event.target.style.pointerEvents = 'none';
          },
          onmove: function(event) {

            var elm = angular.element(event.target);
            var x = (parseFloat(elm.attr('data-x')) || 0) + event.dx;
            var y = (parseFloat(elm.attr('data-y')) || 0) + event.dy;

            elm
              .css('transform', 'translate(' + x + 'px, ' + y + 'px)')
              .css('z-index', 1000)
              .css('position', 'relative')
              .attr('data-x', x)
              .attr('data-y', y);
          },
          onend: function(event) {

            angular
              .element(event.target)
              .css('transform', null)
              .removeAttr('data-x')
              .removeAttr('data-y')
              .removeClass('dragging-active');

            event.target.style.pointerEvents = 'auto';

          }
        });

      }
    };

  });
