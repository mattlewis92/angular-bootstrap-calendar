'use strict';

var angular = require('angular');
var MODULE_NAME = 'mwl.calendar';

function requireAll(r) {
  r.keys().forEach(r);
}

angular //eslint-disable-line angular/ng_module_getter
  .module(MODULE_NAME, [])
  .constant('calendarUseTemplates', EXCLUDE_TEMPLATES === false)
  .run(function($templateCache, calendarUseTemplates) {
    if (calendarUseTemplates) {
      $templateCache.put('calendarMonthEventsList.html', require('./templates/calendarMonthEventsList.html'));
      $templateCache.put('calendarMonthDay.html', require('./templates/calendarMonthDay.html'));
    }
  });

requireAll(require.context('./directives', true, /\.js$/));
requireAll(require.context('./filters', true, /\.js$/));
requireAll(require.context('./services', true, /\.js$/));

module.exports = MODULE_NAME;
