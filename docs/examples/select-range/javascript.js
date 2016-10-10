angular
  .module('mwl.calendar.docs')
  .controller('SelectRangeCtrl', function(moment) {

    var vm = this;

    vm.events = [];
    vm.calendarView = 'day';
    vm.viewDate = moment().startOf('month').toDate();

    vm.rangeSelected = function(startDate, endDate) {
      vm.firstDateClicked = startDate;
      vm.lastDateClicked = endDate;
    };

  });
