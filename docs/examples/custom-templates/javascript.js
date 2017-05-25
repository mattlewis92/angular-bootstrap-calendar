angular
  .module('mwl.calendar.docs')
  .controller('CustomTemplatesCtrl', function($scope, moment) {

    var vm = this;
    vm.events = [];
    vm.calendarView = 'month';
    vm.viewDate = moment().startOf('month').toDate();
    vm.cellModifier = function(cell) {
        cell.cssClass = 'custom-template-cell';      
    };
  });
