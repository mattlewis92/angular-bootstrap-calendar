'use strict';

var angular = require('angular');
beforeEach(angular.mock.module('mwl.calendar'));

describe('calendarLimitToFilter', function() {

  var originalMinorVersion = angular.version.minor;

  describe('angular < ng 1.4', function() {

    beforeEach(function() {
      angular.version.minor = 3;
    });

    //borrowed from the angular source

    var items;
    var str;
    var number;
    var limitTo;

    beforeEach(inject(function($filter) {
      items = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
      str = 'tuvwxyz';
      number = 100.045;
      limitTo = $filter('calendarLimitTo');
    }));

    it('should return the first X items when X is positive', function() {
      expect(limitTo(items, 3)).to.eql(['a', 'b', 'c']);
      expect(limitTo(items, '3')).to.eql(['a', 'b', 'c']);
      expect(limitTo(str, 3)).to.eql('tuv');
      expect(limitTo(str, '3')).to.eql('tuv');
      expect(limitTo(number, 3)).to.eql('100');
      expect(limitTo(number, '3')).to.eql('100');
    });

    it('should return the first X items beginning from index Y when X and Y are positive', function() {
      expect(limitTo(items, 3, '3')).to.eql(['d', 'e', 'f']);
      expect(limitTo(items, '3', 3)).to.eql(['d', 'e', 'f']);
      expect(limitTo(str, 3, 3)).to.eql('wxy');
      expect(limitTo(str, '3', '3')).to.eql('wxy');
    });

    it('should return the first X items beginning from index Y when X is positive and Y is negative', function() {
      expect(limitTo(items, 3, '-3')).to.eql(['f', 'g', 'h']);
      expect(limitTo(items, '3', -3)).to.eql(['f', 'g', 'h']);
      expect(limitTo(str, 3, -3)).to.eql('xyz');
      expect(limitTo(str, '3', '-3')).to.eql('xyz');
    });

    it('should return the last X items when X is negative', function() {
      expect(limitTo(items, -3)).to.eql(['f', 'g', 'h']);
      expect(limitTo(items, '-3')).to.eql(['f', 'g', 'h']);
      expect(limitTo(str, -3)).to.eql('xyz');
      expect(limitTo(str, '-3')).to.eql('xyz');
      expect(limitTo(number, -3)).to.eql('045');
      expect(limitTo(number, '-3')).to.eql('045');
    });

    it('should return the last X items until index Y when X and Y are negative', function() {
      expect(limitTo(items, -3, '-3')).to.eql(['c', 'd', 'e']);
      expect(limitTo(items, '-3', -3)).to.eql(['c', 'd', 'e']);
      expect(limitTo(str, -3, -3)).to.eql('uvw');
      expect(limitTo(str, '-3', '-3')).to.eql('uvw');
    });

    it('should return the last X items until index Y when X is negative and Y is positive', function() {
      expect(limitTo(items, -3, '4')).to.eql(['b', 'c', 'd']);
      expect(limitTo(items, '-3', 4)).to.eql(['b', 'c', 'd']);
      expect(limitTo(str, -3, 4)).to.eql('uvw');
      expect(limitTo(str, '-3', '4')).to.eql('uvw');
    });

    it('should return an empty array when X = 0', function() {
      expect(limitTo(items, 0)).to.eql([]);
      expect(limitTo(items, '0')).to.eql([]);
    });

    it('should return entire array when X cannot be parsed', function() {
      expect(limitTo(items, 'bogus')).to.eql(items);
      expect(limitTo(items, 'null')).to.eql(items);
      expect(limitTo(items, 'undefined')).to.eql(items);
      expect(limitTo(items, null)).to.eql(items);
      expect(limitTo(items, undefined)).to.eql(items);
    });

    it('should return an empty string when X = 0', function() {
      expect(limitTo(str, 0)).to.eql('');
      expect(limitTo(str, '0')).to.eql('');
    });

    it('should return entire string when X cannot be parsed', function() {
      expect(limitTo(str, 'bogus')).to.eql(str);
      expect(limitTo(str, 'null')).to.eql(str);
      expect(limitTo(str, 'undefined')).to.eql(str);
      expect(limitTo(str, null)).to.eql(str);
      expect(limitTo(str, undefined)).to.eql(str);
    });

    it('should take 0 as beginning index value when Y cannot be parsed', function() {
      expect(limitTo(items, 3, 'bogus')).to.eql(limitTo(items, 3, 0));
      expect(limitTo(items, -3, 'null')).to.eql(limitTo(items, -3));
      expect(limitTo(items, '3', 'undefined')).to.eql(limitTo(items, '3', 0));
      expect(limitTo(items, '-3', null)).to.eql(limitTo(items, '-3'));
      expect(limitTo(items, 3, undefined)).to.eql(limitTo(items, 3, 0));
      expect(limitTo(str, 3, 'bogus')).to.eql(limitTo(str, 3));
      expect(limitTo(str, -3, 'null')).to.eql(limitTo(str, -3, 0));
      expect(limitTo(str, '3', 'undefined')).to.eql(limitTo(str, '3'));
      expect(limitTo(str, '-3', null)).to.eql(limitTo(str, '-3', 0));
      expect(limitTo(str, 3, undefined)).to.eql(limitTo(str, 3));
    });

    it('should return input if not String or Array or Number', function() {
      expect(limitTo(null, 1)).to.eql(null);
      expect(limitTo(undefined, 1)).to.eql(undefined);
      expect(limitTo({}, 1)).to.eql({});
    });

    it('should return a copy of input array if X is exceeds array length', function() {
      expect(limitTo(items, 9)).to.eql(items);
      expect(limitTo(items, '9')).to.eql(items);
      expect(limitTo(items, -9)).to.eql(items);
      expect(limitTo(items, '-9')).to.eql(items);

      expect(limitTo(items, 9)).to.not.equal(items);
    });

    it('should return the entire string if X exceeds input length', function() {
      expect(limitTo(str, 9)).to.eql(str);
      expect(limitTo(str, '9')).to.eql(str);
      expect(limitTo(str, -9)).to.eql(str);
      expect(limitTo(str, '-9')).to.eql(str);
      expect(limitTo(number, 9)).to.eql(number.toString());
      expect(limitTo(number, '-9')).to.eql(number.toString());
    });

    it('should return entire input array when limited by Infinity', function() {
      expect(limitTo(items, Infinity)).to.eql(items);
      expect(limitTo(items, 'Infinity')).to.eql(items);
      expect(limitTo(items, -Infinity)).to.eql(items);
      expect(limitTo(items, '-Infinity')).to.eql(items);
    });

    it('should return the entire string when limited by Infinity', function() {
      expect(limitTo(str, Infinity)).to.eql(str);
      expect(limitTo(str, 'Infinity')).to.eql(str);
      expect(limitTo(str, -Infinity)).to.eql(str);
      expect(limitTo(str, '-Infinity')).to.eql(str);
    });

    it('should return an empty array if Y exceeds input length', function() {
      expect(limitTo(items, '3', 12)).to.eql([]);
      expect(limitTo(items, 4, '-12')).to.eql([]);
      expect(limitTo(items, -3, '12')).to.eql([]);
      expect(limitTo(items, '-4', -12)).to.eql([]);
    });

    it('should return an empty string if Y exceeds input length', function() {
      expect(limitTo(str, '3', 12)).to.eql('');
      expect(limitTo(str, 4, '-12')).to.eql('');
      expect(limitTo(str, -3, '12')).to.eql('');
      expect(limitTo(str, '-4', -12)).to.eql('');
    });

    it('should return the entire string beginning from Y if X is positive and X+Y exceeds input length', function() {
      expect(limitTo(items, 7, 3)).to.eql(['d', 'e', 'f', 'g', 'h']);
      expect(limitTo(items, 7, -3)).to.eql(['f', 'g', 'h']);
      expect(limitTo(str, 6, 3)).to.eql('wxyz');
      expect(limitTo(str, 6, -3)).to.eql('xyz');
    });

    it('should return the entire string until index Y if X is negative and X+Y exceeds input length', function() {
      expect(limitTo(items, -7, 3)).to.eql(['a', 'b', 'c']);
      expect(limitTo(items, -7, -3)).to.eql(['a', 'b', 'c', 'd', 'e']);
      expect(limitTo(str, -6, 3)).to.eql('tuv');
      expect(limitTo(str, -6, -3)).to.eql('tuvw');
    });
  });

  describe('angular < ng 1.4', function() {

    var limitTo, ngLimitTo;

    beforeEach(function() {
      angular.version.minor = 4;
    });

    beforeEach(inject(function(_calendarLimitToFilter_, _limitToFilter_) {
      limitTo = _calendarLimitToFilter_;
      ngLimitTo = _limitToFilter_;
    }));

    it('should be the limitTo filter if the angular version is >= 1.4', function() {
      expect(limitTo).to.equal(ngLimitTo);
    });

  });

  afterEach(function() {
    angular.version.minor = originalMinorVersion;
  });

});
