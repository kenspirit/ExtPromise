var express = require('express');

var app = module.exports = express();

app.configure(function() {
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.static(__dirname + '/'));
    app.use(app.router);
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); //logErrors
});

app.post('/echo', function(req, res) {
    res.json(200, req.body);
});

app.post('/error', function(req, res) {
    res.json(500, {error: 'Server Error'})
});

app.listen(3000);

console.log('Express server listening on port %d in %s mode', 3000, app.settings.env);
