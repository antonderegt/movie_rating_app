const Movie = require("../models/Movie");
const passport = require("passport");

module.exports.controller = (app) => {
 // send a dummy test
 app.get("/dummy_test", function(req, res) {
   res.status(200).send({
     name: 'John'
   })
 })

 // fetch all movies
  app.get("/api/movies", function(req, res) {
   Movie.find({}, 'name description release_year genre', function (error, movies) {
     if (error) { console.log(error); }
      res.send({
       movies: movies
     })
   })
 })

 // add a new movie
  app.post('/api/movies', (req, res) => {
   const movie = new Movie({
     name: req.body.name,
     description: req.body.description,
     release_year: req.body.release_year,
     genre: req.body.genre
   })

   movie.save(function (error, movie) {
     if (error) { console.log(error); }
     res.send({
       name: movie.name,
       description: movie.description,
       release_year: movie.release_year,
       genre: movie.genre
     })
   })
 })
}

