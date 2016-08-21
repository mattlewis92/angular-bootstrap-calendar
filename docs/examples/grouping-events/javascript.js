angular
  .module('mwl.calendar.docs')
  .controller('GroupingEventsCtrl', function($scope, moment, calendarConfig) {

    var vm = this;

    calendarConfig.templates.calendarMonthCell = 'groupedMonthEvents.html';

    $scope.$on('$destroy', function() {
      calendarConfig.templates.calendarMonthCell = 'mwl/calendarMonthCell.html';
    });

    vm.events = [
      {
        title: 'Event 1',
        type: 'warning',
        color: calendarConfig.colorTypes.warning,
        startsAt: moment().startOf('month').toDate()
      }, {
        title: 'Event 2',
        type: 'info',
        color: calendarConfig.colorTypes.info,
        startsAt: moment().startOf('month').toDate()
      }, {
        title: 'Event 3',
        type: 'info',
        color: calendarConfig.colorTypes.info,
        startsAt: moment().startOf('month').toDate()
      }, {
        title: 'Event 4',
        type: 'danger',
        color: calendarConfig.colorTypes.important,
        startsAt: moment().startOf('month').toDate()
      }, {
        title: 'Event 5',
        type: 'success',
        color: calendarConfig.colorTypes.success,
        startsAt: moment().startOf('month').toDate()
      }
    ];

    vm.calendarView = 'month';
    vm.viewDate = moment().startOf('month').toDate();
    vm.cellIsOpen = true;

    vm.groupEvents = function(cell) {
      cell.groups = {};
      cell.events.forEach(function(event) {
        cell.groups[event.type] = cell.groups[event.type] || [];
        cell.groups[event.type].push(event);
      });
    };

  });
