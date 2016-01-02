angular
  .module('mwl.calendar.docs')
  .controller('DisableViewsCtrl', function(moment) {

    var vm = this;

    vm.events = [];
    vm.calendarView = 'year';
    vm.viewDate = moment().startOf('month').toDate();

    vm.viewChangeClicked = function(nextView) {
      if (nextView === 'month') {
        return false;
      }
    };

  });
