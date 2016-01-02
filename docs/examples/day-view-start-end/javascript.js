angular
  .module('mwl.calendar.docs')
  .controller('DayViewStartEndCtrl', function(moment) {

    var vm = this;
    vm.events = [];
    vm.calendarView = 'day';
    vm.viewDate = moment().startOf('month').toDate();

  });
