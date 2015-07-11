'use strict';

var angular = require('angular');

angular
  .module('mwl.calendar')
  .controller('MwlCalendarSlideBoxCtrl', function($scope, $sce) {

    var vm = this;
    vm.$sce = $sce;

    $scope.$watch('isOpen', function(isOpen) {
      vm.shouldCollapse = !isOpen;
    });

  })
  .directive('mwlCalendarSlideBox', function() {

    return {
      restrict: 'EA',
      template: require('./../templates/calendarSlideBox.html'),
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
