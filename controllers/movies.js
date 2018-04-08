var Movie = require("../models/Movie");
const passport = require("passport");

module.exports.controller = (app) => {

  // fetch all movies
 app.get("/movies", passport.authenticate('jwt', { session: false }), function(req, res){
   console.log(req.user.email);
   Movie.find({}, 'name description release_year genre', function (error, movies) {
     if (error) { console.log(error); }
      res.send({
       movies: movies,
       current_user: {
         name: req.user.name,
         email: req.user.email
       }
     })
   })
 })


 // add a new movie
 app.post('/movies', (req, res) => {
   const movie = new Movie({
     name: req.body.name,
     description: req.body.description,
     release_year: req.body.release_year,
     genre: req.body.genre
   })

   movie.save(function (error, movie) {
     if (error) { console.log(error); }
     res.send(movie)
   })
 })
}

