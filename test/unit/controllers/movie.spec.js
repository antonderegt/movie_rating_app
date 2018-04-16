var Movie = require("./../../../models/Movie.js");
let chaiHttp = require('chai-http');
let chai = require('chai');
let sinon = require('sinon');
var expect = chai.expect;
var should = chai.should();
var express = require("express");
let server = require('./../../../server.js');
var app = express();
chai.use(chaiHttp);

describe('models.Movie', function(){
 it('exists', function(){
   expect(Movie).to.exist
 })
})

describe('Movie', function() {
 it('should be invalid if release_year is not an integer', function(done){
   var movie = new Movie({
     name: 'test',
     description: 'test',
     release_year: 'test',
     genre: 'test'
   });

   movie.validate(function(err){
     expect(err.errors.release_year).to.exist;
     done();
   })
 })
})

