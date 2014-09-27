'use strict';

describe('Service: moment', function () {

  // load the service's module
  beforeEach(module('angularBootstrapCalendarApp'));

  // instantiate service
  var moment;
  beforeEach(inject(function (_moment_) {
    moment = _moment_;
  }));

  it('should do something', function () {
    expect(!!moment).toBe(true);
  });

});
