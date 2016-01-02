angular
  .module('mwl.calendar.docs')
  .controller('DraggableEventsCtrl', function(moment, alert) {

    var vm = this;

    vm.events = [
      {
        title: 'Draggable event',
        type: 'warning',
        startsAt: moment().startOf('month').toDate(),
        draggable: true
      },
      {
        title: 'Non-draggable event',
        type: 'info',
        startsAt: moment().startOf('month').toDate(),
        draggable: false
      }
    ];

    vm.calendarView = 'month';
    vm.viewDate = moment().startOf('month').toDate();
    vm.isCellOpen = true;

    vm.eventTimesChanged = function(event) {
      alert.show('Dragged and dropped', event);
    };

  });
