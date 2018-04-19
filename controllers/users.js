const User = require("../models/User");
   const jwt = require("jsonwebtoken");
   const passportJWT = require("passport-jwt");
   const ExtractJwt = passportJWT.ExtractJwt;
   const JwtStrategy = passportJWT.Strategy;
   const jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
const config = require('./../config/Config');
const passport = require('passport');
require('./../config/passport')(passport);

module.exports.controller = (app) => {
 // local strategy
     const LocalStrategy = require('passport-local').Strategy;
     passport.use(new LocalStrategy({

  passwordField: 'password'
},
function(email, password, done) {
  User.getUserByEmail(email, function(err, user){
    if (err) { return done(err); }
    if (!user) { return done(null, false); }
    User.comparePassword(password, user.password, function(err,
isMatch){
if(isMatch) {
  return done(null, user);
} else {
  return done(null, false);
} })
}); }
));
app.post('/api/users/login',
  passport.authenticate('local', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });
passport.serializeUser(function(user, done) {
  done(null, user.id);
});
passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user){
    done(err, user)
  })
});




  // register a user
app.post('/api/users/register', (req, res) => {
    const email = req.body.email;
    const fullname = req.body.fullname;
    const password = req.body.password;
    const role = req.body.role || 'user';
    const newUser = new User({
      email: email,
      fullname: fullname,
      role: role,
      password: password
    })
    User.createUser(newUser, function(error, user) {
      if (error) {
        res.status(422).json({
          message: "Something went wrong. Please try again after sometime!"
});
}
res.send({ user: user })
       })
}) 



  getToken = function (headers) {
    if (headers && headers.authorization) {
      var parted = headers.authorization.split(' ');
      if (parted.length === 2) {
        return parted[1];
      } else {
        return null;
      }
    } else {
      return null;
    } 
  };

  app.get('/api/current_user', passport.authenticate('jwt', { session: false }),
  function(req, res) {
    const token = getToken(req.headers);
    console.log("currentuser: "+ token)
    if (token) {
      res.send({ current_user: req.user })
    } else {
      res.status(403).send({ success: false, msg: 'Unauthorized.' });
    }
  })
}
