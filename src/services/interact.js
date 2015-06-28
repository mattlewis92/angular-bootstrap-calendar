'use strict';

var angular = require('angular');
var interact;
try {
  interact = require('interact.js');
} catch (e) {
  interact = null;
}

angular
  .module('mwl.calendar')
  .constant('interact', interact);
