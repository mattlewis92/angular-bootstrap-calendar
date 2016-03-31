'use strict';

var angular = require('angular');

describe('calendar config', function() {

  beforeEach(angular.mock.module('mwl.calendar', function($interpolateProvider) {
    $interpolateProvider.startSymbol('[[');
    $interpolateProvider.endSymbol(']]');
  }));

  var $templateCache;

  beforeEach(inject(function(_$templateCache_) {
    $templateCache = _$templateCache_;
  }));

  it('should replace the interpolation symbol with the user configured one in templates', function() {
    expect($templateCache.get('mwl/calendarMonthCell.html').indexOf('class="cal-month-day [[ day.cssClass ]]"') > -1).to.be.true;
  });

});
