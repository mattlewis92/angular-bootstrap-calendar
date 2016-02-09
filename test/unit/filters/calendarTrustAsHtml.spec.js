'use strict';

var angular = require('angular');

beforeEach(angular.mock.module('mwl.calendar'));

describe('calendarTrustAsHtml', function() {

  var calendarTrustAsHtml, $sce;

  beforeEach(inject(function($filter, _$sce_) {
    calendarTrustAsHtml = $filter('calendarTrustAsHtml');
    $sce = _$sce_;
  }));

  it('should mark the text as html', function() {
    sinon.spy($sce, 'trustAsHtml');
    var htmlString = '<b>text</b>';
    calendarTrustAsHtml(htmlString);
    expect($sce.trustAsHtml).to.have.been.calledWith(htmlString);
  });

});
