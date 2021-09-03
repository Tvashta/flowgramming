var assert = require('assert')
var chai = require('chai')
var app = require('../backend/server')
var chaiHttp = require('chai-http')
var should = chai.should()
var Contest = require('../models/contest')

chai.use(chaiHttp)

describe('Contest Routes', function () {
    this.timeout(10000)

    describe('GET /contest/all', function () {
        it('it should GET all contests', function (done) {
            chai.request(app)
                .get('/contest/all')
                .end(function (err, res) {
                    res.should.have.status(200)
                    done()
                })
        })
    })

    describe('POST /contest/new', function () {
        it('it should POST new contest', function (done) {
            chai.request(app)
                .post('/contest/new')
                .send({
                    contestID: 'TEST01',
                    name: 'Test contest',
                    description: 'This is a test contest',
                    judges: [],
                    contestStartTime: new Date(),
                    contestEndTime: new Date(),
                    password: 'password',
                    problems: [],
                })
                .end(function (err, res) {
                    res.should.have.status(200)
                    done()
                })
        })
    })

    describe('PUT /contest/edit', function () {
        it('it should PUT updated information about contest', function (done) {
            chai.request(app)
                .put('/contest/edit')
                .send({
                    contestID: 'TEST01',
                    name: 'Test contest',
                    description: 'This is a test contest 2',
                    judges: [],
                    contestStartTime: new Date(),
                    contestEndTime: new Date(),
                    password: 'password',
                    problems: [],
                })
                .end(function (err, res) {
                    res.should.have.status(200)
                    done()
                })
        })
    })
})
