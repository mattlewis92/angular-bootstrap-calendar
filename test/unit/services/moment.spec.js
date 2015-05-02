describe('moment', function() {

  it('should be the window moment object', inject(function($window, moment) {

    expect(moment).to.eql($window.moment);

  }));

});
