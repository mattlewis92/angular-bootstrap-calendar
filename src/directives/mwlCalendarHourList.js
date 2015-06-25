'use strict';

angular
  .module('mwl.calendar')
  .controller('MwlCalendarHourListCtrl', function($scope, moment, calendarConfig, calendarHelper) {
    var vm = this;
    var dayViewStart, dayViewEnd;

    function updateDays() {
      dayViewStart = moment($scope.dayViewStart || '00:00', 'HH:mm');
      dayViewEnd = moment($scope.dayViewEnd || '23:00', 'HH:mm');
      vm.dayViewSplit = parseInt($scope.dayViewSplit);
      vm.hours = [];
      var dayCounter = moment(dayViewStart);
      for (var i = 0; i <= dayViewEnd.diff(dayViewStart, 'hours'); i++) {
        vm.hours.push({
          label: calendarHelper.formatDate(dayCounter, calendarConfig.dateFormats.hour)
        });
        dayCounter.add(1, 'hour');
      }
    }

    var originalLocale = moment.locale();

    var unbindListener = $scope.$on('calendar.refreshView', function() {

      if (originalLocale !== moment.locale()) {
        originalLocale = moment.locale();
        updateDays();
      }

    });

    $scope.$on('$destroy', function() {
      unbindListener();
    });

    updateDays();

  })
  .directive('mwlCalendarHourList', function() {

    return {
      restrict: 'EA',
      templateUrl: 'src/templates/calendarHourList.html',
      controller: 'MwlCalendarHourListCtrl as vm',
      scope: {
        dayViewStart: '=',
        dayViewEnd: '=',
        dayViewSplit: '='
      }
    };

  });
