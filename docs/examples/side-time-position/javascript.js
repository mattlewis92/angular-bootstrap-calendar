angular
  .module('mwl.calendar.docs')
  .controller('SideTimePositionCtrl', function ($scope, moment, calendarConfig) {

    var vm = this;

    var actions = [{
      label: '<i class=\'fa fa-pencil\'></i>'
    }, {
      label: '<i class=\'fa fa-times\'></i>'
    }];

    vm.events = [{
      title: 'An event',
      startsAt: moment().hours(3).minutes(0).toDate(),
      endsAt: moment().hours(7).minutes(0).toDate(),
      actions: actions,
      color: calendarConfig.colorTypes.warning
    }, {
      title: 'Another event',
      startsAt: moment().hours(5).minutes(0).toDate(),
      endsAt: moment().hours(12).minutes(0).toDate(),
      actions: actions,
      color: calendarConfig.colorTypes.important
    }];

    vm.calendarView = 'day';
    vm.viewDate = new Date();

  });
