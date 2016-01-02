angular
  .module('mwl.calendar.docs')
  .controller('CustomTemplatesCtrl', function($scope, moment, calendarConfig) {

    var vm = this;

    calendarConfig.templates.calendarMonthCell = 'customMonthCell.html';

    vm.events = [];
    vm.calendarView = 'month';
    vm.viewDate = moment().startOf('month').toDate();

    $scope.$on('$destroy', function() {
      calendarConfig.templates.calendarMonthCell = 'mwl/calendarMonthCell.html';
    });

  });
