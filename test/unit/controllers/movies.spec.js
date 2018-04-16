var controller = require("./../../../controllers/movies.js");
let chaiHttp = require('chai-http');
let chai = require('chai');
let sinon = require('sinon');
var expect = chai.expect;
var should = chai.should();
var express = require("express");
let server = require('./../../../server.js');
var app = express();
chai.use(chaiHttp);

var Movie = require("./../../../models/Movie.js");


function buildResponse() {
 return http_mocks.createResponse({eventEmitter: require('events').EventEmitter})
}

describe('controllers.movies', function(){
 it('exists', function(){
   expect(controller).to.exist
 })
})

describe('/GET dummy_test', () => {
 it('it should respond with a name object', (done) => {
   chai.request('http://localhost:8081')
   //   chai.request(server)
     .get('/dummy_test')
     .end((err, res) => {
         res.should.have.status(200);
         res.body.should.be.an('object');
         expect(res.body).to.deep.equal({ name: 'John' });
       done();
     });
 });
});

describe('/GET movies', () => {
 it('it should send all movies', (done) => {
   var movie1 = {
     name: 'test1',
     description: 'test1',
     release_year: 1234,
     genre: 'test1'
   };
   var movie2 = {
     name: 'test2',
     description: 'test2',
     release_year: 1234,
     genre: 'test2'
   };
   var expectedMovies = [movie1, movie2];

   sinon.mock(Movie)
     .expects('find')
     .yields('', expectedMovies);
chai.request('http://localhost:8081')
   //   chai.request(server)
     .get('/movies')
     .end((err, res) => {
       res.should.have.status(200);
       res.body.should.be.an('object');
       expect(res.body).to.eql({
         movies: expectedMovies
       });
       done();
     });
 });
});

