'use strict';

angular
  .module('mwl.calendar.docs', ['mwl.calendar', 'ui.bootstrap', 'ngTouch', 'ngAnimate', 'oc.lazyLoad', 'hljs', 'colorpicker.module'])
  .controller('ExamplesCtrl', function($http, $rootScope, $compile, $q, $location, $ocLazyLoad, plunkGenerator, moment) {

    var vm = this;

    function loadFile(path) {
      return $http.get(path, {
        transformResponse: function(data) {
          return data;
        }
      });
    }

    var helpers = {
      templates: [
        'modalContent.html',
        'calendarControls.html'
      ]
    };

    loadFile('docs/examples/helpers.js').then(function(result) {
      helpers.scripts = result.data;
    });

    var previousScope;

    vm.loadExample = function(demo) {
      vm.activeExample = angular.copy(demo);
      vm.showDemoTab = true;
      $location.search('example', demo.key);
      var scriptPath = 'docs/examples/' + demo.key + '/javascript.js';
      var markupPath = 'docs/examples/' + demo.key + '/markup.html';

      loadFile(scriptPath).then(function(result) {
        vm.activeExample.javascript = result.data;
      });

      $q.all({
        markup: loadFile(markupPath),
        script: $ocLazyLoad.load(scriptPath)
      }).then(function(result) {
        vm.activeExample.markup = result.markup.data;
        var demoContainer = angular.element(document.getElementById('demoContainer'));
        demoContainer.html(vm.activeExample.markup);
        var scope = $rootScope.$new();
        $compile(demoContainer)(scope);
        if (previousScope) {
          previousScope.$destroy();
        }
        previousScope = scope;
      });

    };

    vm.editActiveExample = function() {
      plunkGenerator(angular.version.full, '3', '2', moment.version, helpers, vm.activeExample);
    };

    $http.get('docs/examples/examples.json').then(function(result) {
      vm.examples = result.data;
      if ($location.search().example) {
        var exampleToLoad = vm.examples.filter(function(example) {
          return example.key === $location.search().example;
        })[0];
        vm.loadExample(exampleToLoad);
      } else {
        vm.loadExample(vm.examples[0]);
      }
    });

  })
  .factory('plunkGenerator', function($templateCache, $window) {

    return function(ngVersion, bsVersion, uibVersion, momentVersion, helpers, content) {

      var scriptContent = function(content) {
        return "angular.module('mwl.calendar.docs', ['mwl.calendar', 'ngAnimate', 'ui.bootstrap', 'colorpicker.module']);" + "\n" + content;
      };

      $window.createPlunker.Plunker.create()
        .setDescription('http://mattlewis92.github.io/angular-bootstrap-calendar/')
        .addIndexHtmlAttribute('ng-app', 'mwl.calendar.docs')
        .addNpmPackage('moment', {version: momentVersion})
        .addNpmPackage('interactjs', {version: 1})
        .addNpmPackage('angular', {version: ngVersion, filename: 'angular.js'})
        .addNpmPackage('angular-animate', {version: ngVersion, filename: 'angular-animate.js'})
        .addNpmPackage('angular-ui-bootstrap', {version: uibVersion, filename: 'dist/ui-bootstrap-tpls.js'})
        .addNpmPackage('rrule', {version: 2})
        .addNpmPackage('angular-bootstrap-colorpicker', {version: 3})
        .addNpmPackage('angular-bootstrap-calendar')
        .addNpmPackage('bootstrap', {filename: 'dist/css/bootstrap.css', version: bsVersion})
        .addNpmPackage('angular-bootstrap-colorpicker', {version: 3, filename: 'css/colorpicker.min.css'})
        .addNpmPackage('angular-bootstrap-calendar', {filename: 'dist/css/angular-bootstrap-calendar.min.css'})
        .addFile({name: 'example.js', contents: scriptContent(content.javascript)})
        .addFile({name: 'helpers.js', contents: helpers.scripts})
        .setIndexBody(content.markup)
        .addFiles(helpers.templates.map(function(templateName) {
          return {name: templateName, contents: $templateCache.get(templateName)};
        }))
        .save();
    };
  })
  .config(function($touchProvider) {
    $touchProvider.ngClickOverrideEnabled(true);
  });
