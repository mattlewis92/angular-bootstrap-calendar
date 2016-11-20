angular
  .module('mwl.calendar.docs')
  .controller('SideTimePositionCtrl', function($scope, moment, calendarConfig) {

    var vm = this;
    vm.events = [{
      title: 'Event 1',
      startsAt: moment().hours(3).minutes(0).toDate(),
    }, {
      title: 'Event 2',
      startsAt: moment().hours(5).minutes(0).toDate(),
    }];
    vm.calendarView = 'day';
    vm.viewDate = new Date();
  });
