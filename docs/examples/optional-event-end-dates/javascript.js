angular
  .module('mwl.calendar.docs')
  .controller('OptionalEventEndDatesCtrl', function(moment, calendarConfig) {

    var vm = this;

    vm.events = [{
      title: 'No event end date',
      startsAt: moment().hours(3).minutes(0).toDate(),
      color: calendarConfig.colorTypes.info
    }, {
      title: 'No event end date',
      startsAt: moment().hours(5).minutes(0).toDate(),
      color: calendarConfig.colorTypes.warning
    }];

    vm.calendarView = 'day';
    vm.viewDate = new Date();

  });
