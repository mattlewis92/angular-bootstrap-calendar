'use strict';

var angular = require('angular');

angular
  .module('mwl.calendar')
  .controller('MwlDynamicDirectiveTemplateCtrl', function($compile, $scope, $attrs, $element, $templateCache, calendarConfig) {

    $scope.$watch($attrs.overrides, function(overrides) {

      var templateName = calendarConfig.templates[$attrs.name];
      if (
        overrides &&
        angular.isObject(overrides) &&
        overrides[$attrs.name] &&
        $templateCache.get(overrides[$attrs.name])
      ) {
        templateName = overrides[$attrs.name];
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
