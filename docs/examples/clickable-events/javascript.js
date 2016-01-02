angular
  .module('mwl.calendar.docs')
  .controller('ClickableEventsCtrl', function(moment, alert) {

    var vm = this;

    vm.events = [
      {
        title: 'Click me',
        type: 'warning',
        startsAt: moment().startOf('month').toDate()
      },
      {
        title: 'Or click me',
        type: 'info',
        startsAt: moment().startOf('month').toDate()
      }
    ];

    vm.calendarView = 'month';
    vm.viewDate = moment().startOf('month').toDate();
    vm.isCellOpen = true;

    vm.eventClicked = function(event) {
      alert.show('Clicked', event);
    };

  });
