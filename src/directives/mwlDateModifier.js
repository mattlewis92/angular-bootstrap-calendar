'use strict';

var angular = require('angular');

angular
  .module('mwl.calendar')
  .controller('MwlDateModifierCtrl', function($element, $attrs, $scope, moment) {

    var vm = this;

    function onClick() {
      if (angular.isDefined($attrs.setToToday)) {
        vm.date = new Date();
      } else if (angular.isDefined($attrs.increment)) {
        vm.date = moment(vm.date).add(1, vm.increment);
        if (vm.excludedDays && vm.increment.indexOf('day') > -1) {
          while (vm.excludedDays.indexOf(vm.date.day()) > -1) {
            vm.date.add(1, vm.increment);
          }
        }
        vm.date = vm.date.toDate();
      } else if (angular.isDefined($attrs.decrement)) {
        vm.date = moment(vm.date).subtract(1, vm.decrement);
        if (vm.excludedDays && vm.decrement.indexOf('day') > -1) {
          while (vm.excludedDays.indexOf(vm.date.day()) > -1) {
            vm.date.subtract(1, vm.decrement);
          }
        }
        vm.date = vm.date.toDate();
      }
      $scope.$apply();
    }

    $element.bind('click', onClick);

    $scope.$on('$destroy', function() {
      $element.unbind('click', onClick);
    });

  })
  .directive('mwlDateModifier', function() {

    return {
      restrict: 'A',
      controller: 'MwlDateModifierCtrl as vm',
      scope: {
        date: '=',
        increment: '=',
        decrement: '=',
        excludedDays: '=?'
      },
      bindToController: true
    };

  });
