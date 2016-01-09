angular
  .module('mwl.calendar.docs')
  .controller('RecurringEventsCtrl', function(moment) {

    var vm = this;

    vm.events = [
      {
        title: 'Recurs monthly',
        type: 'warning',
        startsAt: moment().toDate(),
        recursOn: 'month'
      },
      {
        title: 'Recurs yearly',
        type: 'info',
        startsAt: moment().toDate(),
        recursOn: 'year'
      }
    ];

    // Looking for weekly recurring events?
    // See here: https://github.com/mattlewis92/angular-bootstrap-calendar/issues/127#issuecomment-136022090

    vm.calendarView = 'month';
    vm.viewDate = moment().toDate();
    vm.isCellOpen = true;

  });
