angular
  .module('mwl.calendar.docs')
  .controller('SlideBoxDisabledCtrl', function(moment) {

    var vm = this;

    vm.events = [
      {
        title: 'Event 1',
        type: 'warning',
        startsAt: moment().startOf('month').toDate()
      },
      {
        title: 'Event 2',
        type: 'info',
        startsAt: moment().startOf('month').toDate()
      }
    ];

    vm.calendarView = 'month';
    vm.viewDate = moment().startOf('month').toDate();

  });
