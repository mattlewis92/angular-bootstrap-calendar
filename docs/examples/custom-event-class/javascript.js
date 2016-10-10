angular
  .module('mwl.calendar.docs')
  .controller('CustomEventClassCtrl', function(moment, calendarConfig) {

    var vm = this;

    vm.events = [
      {
        title: 'Has custom class',
        color: calendarConfig.colorTypes.warning,
        startsAt: moment().startOf('month').toDate(),
        cssClass: 'my-custom-class'
      }
    ];

    vm.calendarView = 'month';
    vm.viewDate = moment().startOf('month').toDate();
    vm.cellIsOpen = true;

  });
