angular
  .module('mwl.calendar.docs')
  .controller('RecurringEventsCtrl', function($scope, moment, calendarConfig) {

    var vm = this;

    vm.events = [];
    vm.calendarView = 'month';
    vm.viewDate = moment().toDate();
    vm.cellIsOpen = true;

    $scope.$watchGroup([
      'vm.calendarView',
      'vm.viewDate'
    ], function() {

      // Use the rrule library to generate recurring events: https://github.com/jkbrzt/rrule
      var rule = new RRule({
        freq: RRule.WEEKLY,
        interval: 1,
        byweekday: [RRule.MO],
        dtstart: moment(vm.viewDate).startOf(vm.calendarView).toDate(),
        until: moment(vm.viewDate).endOf(vm.calendarView).toDate()
      });

      vm.events = [{
        title: 'Recurs monthly',
        color: calendarConfig.colorTypes.warning,
        startsAt: moment().toDate(),
        recursOn: 'month'
      }, {
        title: 'Recurs yearly',
        color: calendarConfig.colorTypes.info,
        startsAt: moment().toDate(),
        recursOn: 'year'
      }];

      rule.all().forEach(function(date) {
        vm.events.push({
          title: 'Recurs weekly on mondays',
          color: calendarConfig.colorTypes.success,
          startsAt: new Date(date)
        });
      });

    });

    vm.timespanClicked = function(date, cell) {

      if (vm.calendarView === 'month') {
        if ((vm.cellIsOpen && moment(date).startOf('day').isSame(moment(vm.viewDate).startOf('day'))) || cell.events.length === 0 || !cell.inMonth) {
          vm.cellIsOpen = false;
        } else {
          vm.cellIsOpen = true;
          vm.viewDate = date;
        }
      } else if (vm.calendarView === 'year') {
        if ((vm.cellIsOpen && moment(date).startOf('month').isSame(moment(vm.viewDate).startOf('month'))) || cell.events.length === 0) {
          vm.cellIsOpen = false;
        } else {
          vm.cellIsOpen = true;
          vm.viewDate = date;
        }
      }

    };

  });
