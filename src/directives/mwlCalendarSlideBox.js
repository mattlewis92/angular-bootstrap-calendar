'use strict';

angular
  .module('mwl.calendar')
  .controller('MwlCalendarSlideBoxCtrl', function($scope, $sce) {

    var vm = this;
    vm.$sce = $sce;

    var unbindWatcher = $scope.$watch('isOpen', function(isOpen) {
      vm.shouldCollapse = !isOpen;
    });

    var unbindDestroy = $scope.$on('$destroy', function() {
      unbindDestroy();
      unbindWatcher();
    });

  })
  .directive('mwlCalendarSlideBox', function() {

    return {
      restrict: 'EA',
      templateUrl: 'src/templates/calendarSlideBox.html',
      replace: true,
      controller: 'MwlCalendarSlideBoxCtrl as vm',
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
