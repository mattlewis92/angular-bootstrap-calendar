angular
  .module('mwl.calendar.docs')
  .controller('EditableDeletableEventsCtrl', function(moment, alert, calendarConfig) {

    var vm = this;

    vm.events = [
      {
        title: 'Editable event',
        color: calendarConfig.colorTypes.warning,
        startsAt: moment().startOf('month').toDate(),
        actions: [{
          label: '<i class=\'glyphicon glyphicon-pencil\'></i>',
          onClick: function(args) {
            alert.show('Edited', args.calendarEvent);
          }
        }]
      }, {
        title: 'Deletable event',
        color: calendarConfig.colorTypes.info,
        startsAt: moment().startOf('month').toDate(),
        actions: [{
          label: '<i class=\'glyphicon glyphicon-remove\'></i>',
          onClick: function(args) {
            alert.show('Deleted', args.calendarEvent);
          }
        }]
      }, {
        title: 'Non editable and deletable event',
        color: calendarConfig.colorTypes.important,
        startsAt: moment().startOf('month').toDate()
      }
    ];

    vm.calendarView = 'month';
    vm.viewDate = moment().startOf('month').toDate();
    vm.cellIsOpen = true;

  });
