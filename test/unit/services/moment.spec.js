'use strict';

var angular = require('angular');
var momentLib = require('moment');
beforeEach(angular.mock.module('mwl.calendar'));

describe('moment', function() {

  it('should be the window moment object', inject(function(moment) {

    expect(moment).to.eql(momentLib);

  }));

});
