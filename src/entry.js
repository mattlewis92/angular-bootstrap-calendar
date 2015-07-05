'use strict';

require('./less/calendar.less');

function requireAll(r) {
  r.keys().forEach(r);
}

module.exports = require('./module');

requireAll(require.context('./directives', true, /\.js$/));
requireAll(require.context('./filters', true, /\.js$/));
requireAll(require.context('./services', true, /\.js$/));
