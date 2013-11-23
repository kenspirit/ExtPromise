ExtPromise = (function() {
    function factory(conn, fulfilledHandler, rejectedHandler) {
        this.options.success = null;
        this.options.failure = null;

        this.options.callback = function(options, success, response) {
            if (success) {
                fulfilledHandler(response, options);
            } else {
                rejectedHandler(response, options);
            }
        }

        conn.request(this.options);
    };

    function AjaxPromise(conn) {
        this.options = {};

        this.request = function(options) {
            this.options = options || {};

            var promise = new Promise(factory.bind(this, conn));
            if (this.options.scope) {
                return promise.bind(this.options.scope);
            }
            return promise;
        }

        return this;
    };

    return {
        /**
         * Calling sample:
         * ExtPromise.Ajax().request(options).then(fulfilledHandler, rejectedHandler);
         */
        Ajax: function() {
            return new AjaxPromise(Ext.Ajax);
        },

        /**
         * Calling sample:
         * ExtPromise.Connection().request(options).then(fulfilledHandler, rejectedHandler);
         */
        Connection: function() {
            return new AjaxPromise(new Ext.data.Connection());
        }
    };

})();
