angular
  .module('mwl.calendar.docs')
  .controller('ViewChangeClickCtrl', function(moment) {

    var vm = this;

    vm.events = [];
    vm.calendarView = 'year';
    vm.viewDate = moment().startOf('month').toDate();
    vm.viewChangeEnabled = true;

    vm.viewChangeClicked = function(date, nextView) {
      console.log(date, nextView);
      return vm.viewChangeEnabled;
    };

  });
