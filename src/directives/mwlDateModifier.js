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
        vm.date = moment(vm.date).add(1, vm.increment).toDate();
      } else if (angular.isDefined($attrs.decrement)) {
        vm.date = moment(vm.date).subtract(1, vm.decrement).toDate();
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
        decrement: '='
      },
      bindToController: true
    };

  });
