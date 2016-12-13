angular
  .module('mwl.calendar.docs')
  .controller('RecurringEventsCtrl', function($scope, moment, calendarConfig) {

    var vm = this;

    vm.events = [];
    vm.calendarView = 'month';
    vm.viewDate = moment().toDate();
    vm.cellIsOpen = true;

    var events = [{
      title: 'Recurs on the 5th of each month',
      color: calendarConfig.colorTypes.warning,
      rrule: {
        freq: RRule.MONTHLY,
        bymonthday: 5
      }
    }, {
      title: 'Recurs yearly on the 10th of the current month',
      color: calendarConfig.colorTypes.info,
      rrule: {
        freq: RRule.YEARLY,
        bymonth: moment().month() + 1,
        bymonthday: 10
      }
    }, {
      title: 'Recurs weekly on mondays',
      color: calendarConfig.colorTypes.success,
      rrule: {
        freq: RRule.WEEKLY,
        byweekday: [RRule.MO],
      }
    }];

    $scope.$watchGroup([
      'vm.calendarView',
      'vm.viewDate'
    ], function() {

      vm.events = [];

      events.forEach(function(event) {

        // Use the rrule library to generate recurring events: https://github.com/jkbrzt/rrule
        var rule = new RRule(angular.extend({}, event.rrule, {
          dtstart: moment(vm.viewDate).startOf(vm.calendarView).toDate(),
          until: moment(vm.viewDate).endOf(vm.calendarView).toDate()
        }));

        rule.all().forEach(function(date) {
          vm.events.push(angular.extend({}, event, {
            startsAt: new Date(date)
          }));
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
