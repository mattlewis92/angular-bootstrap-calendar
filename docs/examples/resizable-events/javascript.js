angular
  .module('mwl.calendar.docs')
  .controller('ResizableEventsCtrl', function(moment, alert, calendarConfig) {

    var vm = this;

    vm.events = [
      {
        title: 'Resizable event',
        color: calendarConfig.colorTypes.warning,
        startsAt: moment().startOf('month').toDate(),
        endsAt: moment().startOf('month').add(1, 'hour').toDate(), //ends at is required
        resizable: true
      },
      {
        title: 'Non-resizeable event',
        color: calendarConfig.colorTypes.info,
        startsAt: moment().startOf('month').toDate(),
        endsAt: moment().startOf('month').add(1, 'hour').toDate(), //ends at is required
        resizable: false
      }
    ];

    vm.calendarView = 'week';
    vm.viewDate = moment().startOf('month').toDate();

    vm.eventTimesChanged = function(event) {
      alert.show('Resized', event);
    };

  });
