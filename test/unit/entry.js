'use strict';
require('angular');
require('angular-mocks');
require('../../src/entry');

var testsContext = require.context('.', true, /\.spec/);
testsContext.keys().forEach(testsContext);
