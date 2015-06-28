function requireAll(r) {
  r.keys().forEach(r);
}

module.exports = require('./src/module');

requireAll(require.context('./src/directives', true, /\.js$/));
requireAll(require.context('./src/filters', true, /\.js$/));
requireAll(require.context('./src/services', true, /\.js$/));
