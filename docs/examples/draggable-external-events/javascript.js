angular
  .module('mwl.calendar.docs')
  .controller('DraggableExternalEventsCtrl', function(moment) {

    var vm = this;

    vm.events = [];

    vm.externalEvents = [
      {
        title: 'Event 1',
        type: 'warning',
        startsAt: moment().startOf('month').toDate(),
        draggable: true
      },
      {
        title: 'Event 2',
        type: 'danger',
        startsAt: moment().startOf('month').toDate(),
        draggable: true
      }
    ];

    vm.calendarView = 'month';
    vm.viewDate = moment().startOf('month').toDate();
    vm.isCellOpen = true;

    vm.eventDropped = function(event, start, end) {
      var externalIndex = vm.externalEvents.indexOf(event);
      if (externalIndex > -1) {
        vm.externalEvents.splice(externalIndex, 1);
        vm.events.push(event);
      }
      event.startsAt = start;
      if (end) {
        event.endsAt = end;
      }
    };

  });
