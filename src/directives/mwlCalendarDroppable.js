'use strict';

angular
  .module('mwl.calendar')
  .directive('mwlCalendarDroppable', function() {

    return {
      restrict: 'A',
      controller: function($element, $scope, $window, $parse, $attrs) {

        $window.interact($element[0]).dropzone({
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
            event.relatedTarget.dropData = $parse($attrs.dropData)($scope);
          }
        });

      }
    };

  });
