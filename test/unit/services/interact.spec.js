'use strict';

var angular = require('angular');
var interactLib = require('interactjs');
beforeEach(angular.mock.module('mwl.calendar'));

describe('interactjs', function() {

  describe('library exists', function() {
    it('should be the interactjs library', inject(function(interact) {

      expect(interact).to.eql(interactLib);

    }));
  });

});
