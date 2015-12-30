'use strict';

angular
  .module('mwl.calendar.docs', ['mwl.calendar', 'ui.bootstrap', 'ngTouch', 'ngAnimate', 'oc.lazyLoad'])
  .controller('DocsCtrl', function($http, $rootScope, $compile, $ocLazyLoad) {

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
      var scriptPath = 'docs/examples/' + demo.key + '/javascript.js';
      var markupPath = 'docs/examples/' + demo.key + '/markup.html';

      loadFile(scriptPath).then(function(result) {
        vm.currentDemo.javascript = result.data;
      });

      loadFile(markupPath).then(function(result) {
        vm.currentDemo.markup = result.data;
        return $ocLazyLoad.load(scriptPath);
      }).then(function() {
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

  });
