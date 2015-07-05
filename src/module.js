'use strict';

var angular = require('angular');
var MODULE_NAME = 'mwl.calendar';

function requireAll(r) {
  r.keys().forEach(r);
}

angular.module(MODULE_NAME, []);

requireAll(require.context('./directives', true, /\.js$/));
requireAll(require.context('./filters', true, /\.js$/));
requireAll(require.context('./services', true, /\.js$/));

module.exports = MODULE_NAME;
