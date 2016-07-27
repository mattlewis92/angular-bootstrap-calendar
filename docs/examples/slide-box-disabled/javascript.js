angular
  .module('mwl.calendar.docs')
  .controller('SlideBoxDisabledCtrl', function(moment, calendarConfig) {

    var vm = this;

    vm.events = [
      {
        title: 'Event 1',
        color: calendarConfig.colorTypes.warning,
        startsAt: moment().startOf('month').toDate()
      },
      {
        title: 'Event 2',
        color: calendarConfig.colorTypes.info,
        startsAt: moment().startOf('month').toDate()
      }
    ];

    vm.calendarView = 'month';
    vm.viewDate = moment().startOf('month').toDate();

  });
