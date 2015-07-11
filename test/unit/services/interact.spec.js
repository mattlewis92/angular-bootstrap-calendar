'use strict';

var angular = require('angular');
var interactLib = require('interact.js');
beforeEach(angular.mock.module('mwl.calendar'));

describe('interact.js', function() {

  describe('library exists', function() {
    it('should be the interact.js library', inject(function(interact) {

      expect(interact).to.eql(interactLib);

    }));
  });

});
