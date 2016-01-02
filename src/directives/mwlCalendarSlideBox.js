'use strict';

var angular = require('angular');

angular
  .module('mwl.calendar')
  .controller('MwlCalendarSlideBoxCtrl', function($sce, $scope, $timeout, calendarConfig) {

    var vm = this;
    vm.$sce = $sce;
    vm.calendarConfig = calendarConfig;

    vm.isCollapsed = true;
    $scope.$watch('vm.isOpen', function(isOpen) {
      //events must be populated first to set the element height before animation will work
      $timeout(function() {
        vm.isCollapsed = !isOpen;
      });
    });

  })
  .directive('mwlCalendarSlideBox', function(calendarConfig) {

    return {
      restrict: 'E',
      templateUrl: calendarConfig.templates.calendarSlideBox,
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
      },
      bindToController: true
    };

  });
