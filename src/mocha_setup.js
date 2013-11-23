mocha.setup({
    ui: 'bdd',
    globals: ['ExtPromise', 'Ext', 'sinon']
}).timeout(200);

var expect = chai.expect;
