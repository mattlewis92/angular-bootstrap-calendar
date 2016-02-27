angular
  .module('mwl.calendar.docs')
  .controller('i18nCtrl', function($scope, $window, $ocLazyLoad, calendarConfig, moment) {

    var vm = this;

    vm.events = [];
    vm.calendarView = 'month';
    vm.viewDate = moment().startOf('month').toDate();

    calendarConfig.dateFormatter = 'moment'; // use moment instead of angular for formatting dates
    var originali18n = angular.copy(calendarConfig.i18nStrings);
    calendarConfig.i18nStrings.weekNumber = 'Semaine {week}';

    $window.moment = $window.moment || moment;
    $ocLazyLoad.load('https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.10.6/locale/fr.js').then(function() {
      moment.locale('fr', {
        week: {
          dow: 1 // Monday is the first day of the week
        }
      });
      moment.locale('fr'); // change the locale to french
    });

    $scope.$on('$destroy', function() {
      moment.locale('en');
      calendarConfig.i18nStrings = originali18n;
    });

  });
