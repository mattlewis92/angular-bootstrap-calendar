'use strict';

require('./less/calendar.less');

var angular = require('angular');

function requireAll(r) {
  r.keys().forEach(r);
}

var templates = {};

if (EXCLUDE_TEMPLATES === false) {

  var templatesContext = require.context('./templates', false, /\.html/);

  templatesContext.keys().forEach(function(templateName) {
    var templateNameWithoutPrefix = templateName.replace('./', '');
    var cacheTemplateName = 'mwl/' + templateNameWithoutPrefix;
    var configTemplateName = templateNameWithoutPrefix.replace('.html', '');
    templates[configTemplateName] = {
      cacheTemplateName: cacheTemplateName,
      template: templatesContext(templateName)
    };
  });

}

module.exports = angular
  .module('mwl.calendar', [])
  .config(function(calendarConfig) {
    angular.forEach(templates, function(template, templateName) {
      if (!calendarConfig.templates[templateName]) {
        calendarConfig.templates[templateName] = template.cacheTemplateName;
      }
    });
  })
  .run(function($templateCache, $interpolate) {

    angular.forEach(templates, function(template) {
      if (!$templateCache.get(template.cacheTemplateName)) {
        var templateContents = template.template
          .replace('{{', $interpolate.startSymbol())
          .replace('}}', $interpolate.endSymbol());
        $templateCache.put(template.cacheTemplateName, templateContents);
      }
    });

  }).name;

requireAll(require.context('./directives', true, /\.js$/));
requireAll(require.context('./filters', true, /\.js$/));
requireAll(require.context('./services', true, /\.js$/));
