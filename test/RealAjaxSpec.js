describe("Real: Ajax should be now working in promise style", function() {
    var postData = {"name": "Ken"},
        scopeObj = {
            name: ' is in scope',
            getName: function(response) {
                var json = JSON.parse(response.responseText);
                return json.name  + this.name;
            }
        };

    function normalSuccess(promiseFn, done) {
        promiseFn().request({url: 'echo', method: 'POST', params: postData})
            .then(function(result) {
                var json = JSON.parse(result.responseText);
                expect(json).to.deep.equal(postData);
            })
            .then(done)
            .catch(done);
    }

    function normalFailed(promiseFn, done) {
        promiseFn().request({url: 'error', method: 'POST', params: postData})
            .then(function(result) {
                expect(result.responseText).to.equal('dummy'); // Never called here
            }, function(result) {
                expect(result.status).to.equal(500);
            })
            .then(done)
            .catch(done);
    }

    function scopeSuccess(promiseFn, done) {
        promiseFn().request({url: 'echo', scope: scopeObj, method: 'POST', params: postData})
            .then(scopeObj.getName)
            .then(function(result) {
                expect(result).to.equal('Ken is in scope');
            })
            .then(done)
            .catch(done);
    }

    function scopeFailed(promiseFn, done) {
        promiseFn().request({url: 'error', scope: scopeObj, method: 'POST', params: postData})
            .then(scopeObj.getName)
            .then(function(result) {
                expect(result).to.equal('dummy');
            }, function(result) {
                expect(result.status).to.equal(500);
            })
            .then(done)
            .catch(done);
    }

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
