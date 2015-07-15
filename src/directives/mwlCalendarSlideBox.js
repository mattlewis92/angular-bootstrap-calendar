'use strict';

var angular = require('angular');

angular
  .module('mwl.calendar')
  .controller('MwlCalendarSlideBoxCtrl', function($sce) {

    var vm = this;
    vm.$sce = $sce;

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
      },
      bindToController: true
    };

  });
