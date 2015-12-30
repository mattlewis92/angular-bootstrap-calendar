'use strict';

angular
  .module('mwl.calendar.docs', ['mwl.calendar', 'ui.bootstrap', 'ngTouch', 'ngAnimate', 'oc.lazyLoad', 'hljs'])
  .controller('ExamplesCtrl', function($http, $rootScope, $compile, $q, $ocLazyLoad) {

    var vm = this;

    function loadFile(path) {
      return $http.get(path, {
        transformResponse: function(data) {
          return data;
        }
      });
    }

    vm.loadDemo = function(demo) {
      vm.currentDemo = angular.copy(demo);
      vm.showDemoTab = true;
      var scriptPath = 'docs/examples/' + demo.key + '/javascript.js';
      var markupPath = 'docs/examples/' + demo.key + '/markup.html';

      loadFile(scriptPath).then(function(result) {
        vm.currentDemo.javascript = result.data;
      });

      $q.all({
        markup: loadFile(markupPath),
        script: $ocLazyLoad.load(scriptPath)
      }).then(function(result) {
        vm.currentDemo.markup = result.markup.data;
        var demoContainer = angular.element(document.getElementById('demoContainer'));
        demoContainer.html(vm.currentDemo.markup);
        var scope = $rootScope.$new();
        $compile(demoContainer)(scope);
      });

    };

    $http.get('docs/examples/examples.json').then(function(result) {
      vm.demos = result.data;
      vm.loadDemo(vm.demos[0]);
    });

  })
  .factory('alert', function($uibModal) {

    function show(action, event) {
      return $uibModal.open({
        templateUrl: 'modalContent.html',
        controller: function() {
          var vm = this;
          vm.action = action;
          vm.event = event;
        },
        controllerAs: 'vm'
      });
    }

    return {
      show: show
    };

  });
