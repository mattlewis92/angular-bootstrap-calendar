angular
  .module('mwl.calendar.docs')
  .controller('TimespanClickCtrl', function(moment) {

    var vm = this;

    vm.events = [];
    vm.calendarView = 'month';
    vm.viewDate = moment().startOf('month').toDate();
    vm.isCellOpen = true;

    vm.timespanClicked = function(date) {
      vm.lastDateClicked = date;
    };

  });
