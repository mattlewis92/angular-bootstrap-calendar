'use strict';

angular
  .module('mwl.calendar.docs')
  .controller('OptionalEventEndDatesCtrl', function(moment) {

    var vm = this;

    vm.events = [{
      title: 'No event end date',
      startsAt: moment().hours(3).minutes(0).toDate(),
      type: 'info'
    }, {
      title: 'No event end date',
      startsAt: moment().hours(5).minutes(0).toDate(),
      type: 'warning'
    }];

    vm.calendarView = 'day';
    vm.calendarDay = new Date();

  });
