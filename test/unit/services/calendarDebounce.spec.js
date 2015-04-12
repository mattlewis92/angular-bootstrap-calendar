describe('calendarDebounce', function() {

  var calendarDebounce, $timeout;

  beforeEach(inject(function(_calendarDebounce_, _$timeout_) {
    calendarDebounce = _calendarDebounce_;
    $timeout = _$timeout_;
  }));

  it('should only be called once', function() {
    var spy = sinon.spy();
    var myDebounce = calendarDebounce(spy, 10);
    myDebounce();
    myDebounce();
    myDebounce();
    $timeout.flush();
    expect(spy).to.have.been.called.once;
  });

});
