
var chai = require('chai');
var assert = chai.assert;

var server = require('../server');    /** import the Express app **/

var chaiHttp = require('chai-http');  /** require the chai-http plugin **/
chai.use(chaiHttp);


suite('functional Tests for Imperial Converter', () => {
    // Convert a valid input such as 10L: GET request to /api/convert.
    test('GET /api/convert 10L', function (done) {

        chai.request(server)
            .get('/api/convert?units=10L')
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.equal(res.type, 'text/html');
                done();
            });
    });

    test('GET /api/convert 32g', function (done) {
        // Convert an invalid input such as 32g: GET request to /api/convert.
        chai.request(server)
            .get('/api/convert?units=32g')
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.equal(res.type, 'text/html');
                done();
            });
    });

    test('GET /api/convert 3/7.2/4kg', function (done) {
        // Convert an invalid number such as 3/7.2/4kg: GET request to /api/convert.
        chai.request(server)
            .get('/api/convert?units=3/7.2/4kg')
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.equal(res.type, 'text/html');
                done();
            });

    });

    test('GET /api/convert 3/7.2/4kilomegagram', function (done) {
        // Convert an invalid number AND unit such as 3/7.2/4kilomegagram: GET request to /api/convert.
        chai.request(server)
            .get('/api/convert?units=3/7.2/4kilomegagram')
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.equal(res.type, 'text/html');
                done();
            });

    });

    test('GET /api/convert kg', function (done) {
        // Convert with no number such as kg: GET request to /api/convert.
        chai.request(server)
            .get('/api/convert?units=kg')
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.equal(res.type, 'text/html');
                done();
            });

    });






})