angular
  .module('mwl.calendar.docs')
  .controller('DayViewAllTimesCtrl', function($scope, moment, calendarConfig) {

    var vm = this;
    vm.events = [];
    vm.calendarView = 'day';
    vm.viewDate = moment().startOf('month').toDate();
    var originalFormat = calendarConfig.dateFormats.hour;
    calendarConfig.dateFormats.hour = 'HH:mm';

    $scope.$on('$destroy', function() {
      calendarConfig.dateFormats.hour = originalFormat; // reset for other demos
    });

  });
