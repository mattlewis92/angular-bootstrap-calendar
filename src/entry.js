'use strict';

require('./less/calendar.less');

var angular = require('angular');

function requireAll(r) {
  r.keys().forEach(r);
}

module.exports = angular
  .module('mwl.calendar', [])
  .run(function($templateCache, calendarConfig) {

    if (EXCLUDE_TEMPLATES === false) {

      var templatesContext = require.context('./templates', false, /\.html/);

      templatesContext.keys().forEach(function(templateName) {
        var templateNameWithoutPrefix = templateName.replace('./', '');
        var cacheTemplateName = 'mwl/' + templateNameWithoutPrefix;
        if (!$templateCache.get(cacheTemplateName)) {
          $templateCache.put(cacheTemplateName, templatesContext(templateName));
          calendarConfig.templates[templateNameWithoutPrefix.replace('.html', '')] = cacheTemplateName;
        }
      });

    }

  }).name;

requireAll(require.context('./directives', true, /\.js$/));
requireAll(require.context('./filters', true, /\.js$/));
requireAll(require.context('./services', true, /\.js$/));
