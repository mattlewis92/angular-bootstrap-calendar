'use strict';
require('angular');
require('angular-mocks');
require('../../src/module');

var testsContext = require.context('.', true, /\.spec/);
testsContext.keys().forEach(testsContext);
