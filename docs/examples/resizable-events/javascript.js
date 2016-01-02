angular
  .module('mwl.calendar.docs')
  .controller('ResizableEventsCtrl', function(moment, alert) {

    var vm = this;

    vm.events = [
      {
        title: 'Resizable event',
        type: 'warning',
        startsAt: moment().startOf('month').toDate(),
        endsAt: moment().startOf('month').add(1, 'hour').toDate(), //ends at is required
        resizable: true
      },
      {
        title: 'Non-resizeable event',
        type: 'info',
        startsAt: moment().startOf('month').toDate(),
        endsAt: moment().startOf('month').add(1, 'hour').toDate(), //ends at is required
        resizable: false
      }
    ];

    vm.calendarView = 'week';
    vm.viewDate = moment().startOf('month').toDate();
    vm.isCellOpen = true;

    vm.eventTimesChanged = function(event) {
      alert.show('Resized', event);
    };

  });
