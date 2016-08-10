'use strict';

var angular = require('angular');

angular
  .module('mwl.calendar')
  .controller('MwlDynamicDirectiveTemplateCtrl', function($compile, $scope, $attrs, $element, $templateCache, $log, calendarConfig) {

    $scope.$watch($attrs.overrides, function(overrides) {

      var templateName = calendarConfig.templates[$attrs.name];
      if (
        overrides &&
        angular.isObject(overrides) &&
        overrides[$attrs.name]
      ) {
        if ($templateCache.get(overrides[$attrs.name])) {
          templateName = overrides[$attrs.name];
        } else {
          $log.warn('Bootstrap Calendar', 'The custom template for ' + overrides[$attrs.name] +
            ' was not found in the template cache. Please ensure it is pre-loaded via a script tag ' +
            '<script type="text/ng-template" id="' + overrides[$attrs.name] + '">Custom template content</script> or ' +
            'via a tool such as https://www.npmjs.com/package/gulp-angular-templatecache');
        }
      }
      var template = $templateCache.get(templateName);
      $element.html(template);
      $compile($element.contents())($scope);

    });

  })
  .directive('mwlDynamicDirectiveTemplate', function() {

    return {
      restrict: 'A',
      controller: 'MwlDynamicDirectiveTemplateCtrl'
    };

  });
