describe('calendarLimitToFilter', function() {

  var limitToFilter;

  beforeEach(inject(function(_calendarLimitToFilter_) {
    limitToFilter = _calendarLimitToFilter_;
  }));

  it('should return the first 2 items of the array', function() {

    var result = limitToFilter([1, 2, 3, 4], 2);
    expect(result).to.eql([1, 2]);

  });

  it('should return the second 2 items of the array', function() {

    var result = limitToFilter([1, 2, 3, 4], 2, 2);
    expect(result).to.eql([3, 4]);

  });

});
