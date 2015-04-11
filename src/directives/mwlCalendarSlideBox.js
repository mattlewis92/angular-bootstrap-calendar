'use strict';

angular
  .module('mwl.calendar')
  .directive('mwlCalendarSlideBox', function() {

    return {
      restrict: 'EA',
      templateUrl: 'src/templates/calendarSlideBox.html',
      replace: true,
      controller: function($scope, $sce) {

        var vm = this;
        vm.$sce = $sce;

        var unbindWatcher = $scope.$watch('isOpen', function(isOpen) {
          vm.shouldCollapse = !isOpen;
        });

        var unbindDestroy = $scope.$on('$destroy', function() {
          unbindDestroy();
          unbindWatcher();
        });

      },
      controllerAs: 'vm',
      require: ['^?mwlCalendarMonth', '^?mwlCalendarYear'],
      link: function(scope, elm, attrs, ctrls) {
        scope.isMonthView = !!ctrls[0];
        scope.isYearView = !!ctrls[1];
      },
      scope: {
        isOpen: '=',
        events: '=',
        onEventClick: '=',
        editEventHtml: '=',
        onEditEventClick: '=',
        deleteEventHtml: '=',
        onDeleteEventClick: '='
      }
    };

  });
