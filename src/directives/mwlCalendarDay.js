'use strict';

angular
  .module('mwl.calendar')
  .controller('MwlCalendarDayCtrl', function($scope, $timeout, moment, calendarHelper, calendarConfig) {

    var vm = this;

    vm.calendarConfig = calendarConfig;

    $scope.$on('calendar.refreshView', function() {
      var dayViewStart = moment($scope.dayViewStart || '00:00', 'HH:mm');
      var dayViewEnd = moment($scope.dayViewEnd || '23:00', 'HH:mm');
      var hourHeight = (60 / $scope.dayViewSplit) * 30;
      vm.dayViewHeight = (dayViewEnd.diff(dayViewStart, 'hours') * hourHeight) + 1;

      vm.view = calendarHelper.getDayView(
        $scope.events,
        $scope.currentDay,
        dayViewStart.hours(),
        dayViewEnd.hours(),
        hourHeight
      );

    });

  })
  .directive('mwlCalendarDay', function() {

    return {
      templateUrl: 'src/templates/calendarDayView.html',
      restrict: 'EA',
      require: '^mwlCalendar',
      scope: {
        events: '=',
        currentDay: '=',
        onEventClick: '=',
        dayViewStart: '=',
        dayViewEnd: '=',
        dayViewSplit: '='
      },
      controller: 'MwlCalendarDayCtrl as vm'
    };

  });
