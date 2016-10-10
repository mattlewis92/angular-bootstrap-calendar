angular
  .module('mwl.calendar.docs')
  .controller('BadgeTotalCtrl', function(moment, calendarConfig) {

    var vm = this;

    vm.events = [
      {
        title: 'Increments the badge total on the day cell',
        color: calendarConfig.colorTypes.warning,
        startsAt: moment().startOf('month').toDate(),
        incrementsBadgeTotal: true
      },
      {
        title: 'Does not increment the badge total ',
        color: calendarConfig.colorTypes.info,
        startsAt: moment().startOf('month').toDate(),
        incrementsBadgeTotal: false
      }
    ];

    vm.calendarView = 'month';
    vm.viewDate = moment().startOf('month').toDate();
    vm.cellIsOpen = true;

  });
