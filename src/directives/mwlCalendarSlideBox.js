'use strict';

angular
  .module('mwl.calendar')
  .directive('mwlCalendarSlideBox', function() {

    return {
      restrict: 'EA',
      templateUrl: 'templates/calendarSlideBox.html',
      replace: true,
      controller: function($scope, $attrs) {
        var unbindWatcher = $scope.$watch($attrs.isOpen, function(shouldCollapse) {
          $scope.shouldCollapse = shouldCollapse;
        });

        var unbindDestroy = $scope.$on('$destroy', function() {
          unbindDestroy();
          unbindWatcher();
        });

      },
      require: ['^?mwlCalendarMonth', '^?mwlCalendarYear'],
      link: function(scope, elm, attrs, ctrls) {
        scope.isMonthView = !!ctrls[0];
        scope.isYearView = !!ctrls[1];
      }
    };

  });
