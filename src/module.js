'use strict';

var angular = require('angular');

function requireAll(r) {
  r.keys().forEach(r);
}

module.exports = angular
  .module('mwl.calendar', [])
  .constant('calendarUseTemplates', EXCLUDE_TEMPLATES === false)
  .run(function($templateCache, calendarUseTemplates) {
    if (calendarUseTemplates) {
      $templateCache.put('calendarMonthEventsList.html', require('./templates/calendarMonthEventsList.html'));
      $templateCache.put('calendarMonthDay.html', require('./templates/calendarMonthDay.html'));
    }
  }).name;

requireAll(require.context('./directives', true, /\.js$/));
requireAll(require.context('./filters', true, /\.js$/));
requireAll(require.context('./services', true, /\.js$/));
