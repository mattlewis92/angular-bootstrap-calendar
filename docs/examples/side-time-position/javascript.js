angular
  .module('mwl.calendar.docs')
  .controller('SideTimePositionCtrl', function($scope, moment, calendarConfig) {

    var vm = this;
    vm.calendarView = 'day';
    vm.viewDate = moment().startOf('month').toDate();
  });
