angular
  .module('mwl.calendar.docs')
  .controller('CellIsOpenCtrl', function(moment) {

    var vm = this;

    vm.events = [
      {
        title: 'Draggable event',
        type: 'warning',
        startsAt: moment().startOf('month').toDate()
      },
      {
        title: 'Non-draggable event',
        type: 'info',
        startsAt: moment().startOf('month').add(1, 'day').toDate()
      }
    ];

    vm.calendarView = 'month';
    vm.viewDate = moment().startOf('month').toDate();
    vm.isCellOpen = true;

  });
