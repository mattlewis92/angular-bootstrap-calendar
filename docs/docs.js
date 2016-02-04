'use strict';

angular
  .module('mwl.calendar.docs', ['mwl.calendar', 'ui.bootstrap', 'ngTouch', 'ngAnimate', 'oc.lazyLoad', 'hljs'])
  .controller('ExamplesCtrl', function($http, $rootScope, $compile, $q, $location, $ocLazyLoad, plunkGenerator) {

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
      plunkGenerator(angular.version.full, '3.3.6', '0.14.3', helpers, vm.activeExample);
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
  .factory('plunkGenerator', function ($document, $templateCache) {

    return function (ngVersion, bsVersion, uibVersion, helpers, content) {

      var form = angular.element('<form style="display: none;" method="post" action="http://plnkr.co/edit/?p=preview" target="_blank"></form>');
      var addField = function (name, value) {
        var input = angular.element('<input type="hidden" name="' + name + '">');
        input.attr('value', value);
        form.append(input);
      };

      var indexContent = function(content, uibVersion) {
        return '<!doctype html>\n' +
          '<html ng-app="mwl.calendar.docs">\n' +
          '  <head>\n' +
          '    <script src="//cdnjs.cloudflare.com/ajax/libs/moment.js/2.10.6/moment.min.js"></script>\n' +
          '    <script src="//cdnjs.cloudflare.com/ajax/libs/interact.js/1.2.4/interact.min.js"></script>\n' +
          '    <script src="//ajax.googleapis.com/ajax/libs/angularjs/'+ngVersion+'/angular.js"></script>\n' +
          '    <script src="//ajax.googleapis.com/ajax/libs/angularjs/'+ngVersion+'/angular-animate.js"></script>\n' +
          '    <script src="//cdnjs.cloudflare.com/ajax/libs/angular-ui-bootstrap/'+uibVersion+'/ui-bootstrap-tpls.min.js"></script>\n' +
          '    <script src="//mattlewis92.github.io/angular-bootstrap-calendar/dist/js/angular-bootstrap-calendar-tpls.min.js"></script>\n' +
          '    <script src="example.js"></script>\n' +
          '    <script src="helpers.js"></script>\n' +
          '    <link href="//netdna.bootstrapcdn.com/bootstrap/'+bsVersion+'/css/bootstrap.min.css" rel="stylesheet">\n' +
          '    <link href="//mattlewis92.github.io/angular-bootstrap-calendar/dist/css/angular-bootstrap-calendar.min.css" rel="stylesheet">\n' +
          '  </head>\n' +
          '  <body>\n\n' +
          content + '\n' +
          '  </body>\n' +
          '</html>\n';
      };

      var scriptContent = function(content) {
        return "angular.module('mwl.calendar.docs', ['mwl.calendar', 'ngAnimate', 'ui.bootstrap']);" + "\n" + content;
      };

      addField('description', 'http://mattlewis92.github.io/angular-bootstrap-calendar/');
      addField('files[index.html]', indexContent(content.markup, uibVersion));
      addField('files[helpers.js]', helpers.scripts);
      helpers.templates.forEach(function(templateName) {
        addField('files[' + templateName + ']', $templateCache.get(templateName));
      });
      addField('files[example.js]', scriptContent(content.javascript));

      $document.find('body').append(form);
      form[0].submit();
      form.remove();
    };
  });
