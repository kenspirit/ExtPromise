describe("Fake: Ajax should be now working in promise style", function() {
    var xhr, ajax,
        scopeObj = {
            name: ' In scope',
            getName: function(response) {
                return response.responseText + this.name;
            }
        };

    function successRepond() {
        ajax.respond(200, { 'Content-Type': 'application/json' }, 'Bar');
    }

    function failedRepond() {
        ajax.respond(500, { 'Content-Type': 'application/json' }, 'Error');
    }

    function normalSuccess(promiseFn, done) {
        promiseFn().request({url: 'foo'})
            .then(function(result) {
                expect(result.responseText).to.equal('Bar');
            })
            .then(done)
            .catch(function(e) {
                done(e);
            });

        successRepond();
    }

    function normalFailed(promiseFn, done) {
        promiseFn().request({url: 'foo'})
            .then(function(result) {
                expect(result.responseText).to.equal('dummy'); // Never called here
            }, function(result) {
                expect(result.status).to.equal(500);
            })
            .then(done)
            .catch(function(e) {
                done(e);
            });

        failedRepond();
    }

    function scopeSuccess(promiseFn, done) {
        promiseFn().request({url: 'foo', scope: scopeObj})
            .then(scopeObj.getName)
            .then(function(result) {
                expect(result).to.equal('Bar In scope');
            })
            .then(done);

        successRepond();
    }

    function scopeFailed(promiseFn, done) {
        promiseFn().request({url: 'foo', scope: scopeObj})
            .then(scopeObj.getName)
            .then(function(result) {
                expect(result).to.equal('Bar In scope');
            }, function(result) {
                expect(result.status).to.equal(500);
            })
            .then(done);

        failedRepond();
    }

    before(function() {
        xhr = sinon.useFakeXMLHttpRequest();
        xhr.onCreate = function(xhr) {
            ajax = xhr;
        }
    })

    after(function() {
        xhr.restore();
    });

    describe('ExtPromise.Ajax', function() {
        it("#success", function(done) {
            normalSuccess(ExtPromise.Ajax, done);
        });

        it("#failed", function(done) {
            normalFailed(ExtPromise.Ajax, done);
        });

        it("#success (different scope)", function(done) {
            scopeSuccess(ExtPromise.Ajax, done);
        });

        it("#failed (different scope)", function(done) {
            scopeFailed(ExtPromise.Ajax, done);
        });
    });

    describe('ExtPromise.Connection', function() {
        it("#success", function(done) {
            normalSuccess(ExtPromise.Connection, done);
        });

        it("#failed", function(done) {
            normalFailed(ExtPromise.Connection, done);
        });

        it("#success (different scope)", function(done) {
            scopeSuccess(ExtPromise.Connection, done);
        });

        it("#failed (different scope)", function(done) {
            scopeFailed(ExtPromise.Connection, done);
        });
    });
});
