'use strict';

angular
  .module('mwl.calendar')
  .directive('mwlCollapseFallback', function($injector) {

    if ($injector.has('collapseDirective')) {
      return {};
    }

    return {
      restrict: 'A',
      controller: function($scope, $attrs, $element) {
        var unbindWatcher = $scope.$watch($attrs.mwlCollapseFallback, function(shouldCollapse) {
          if (shouldCollapse) {
            $element.addClass('ng-hide');
          } else {
            $element.removeClass('ng-hide');
          }
        });

        var unbindDestroy = $scope.$on('$destroy', function() {
          unbindDestroy();
          unbindWatcher();
        });

      }
    };

  });
