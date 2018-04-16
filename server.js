const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const fs = require("fs");
const flash = require("connect-flash");
const session = require("express-session");
const passport = require("passport");
const passportJWT = require("passport-jwt");
const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;
const expressVue = require('express-vue');
const expressVueMiddleware = expressVue.init();
const jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
jwtOptions.secretOrKey = 'thisisthesecretkey';
const User = require("./models/User");

const app = express();
const router = express.Router();
app.use(morgan('combined'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(passport.initialize());

app.use(flash());
app.use(expressVueMiddleware);

//connect to mongodb
mongoose.connect('mongodb://localhost/movie_rating_app');
mongoose.connection.once('open', () => {
 console.log('Connection has been made');
}).on('error', (error) => {
 console.log('connection error: '+ error);
})

// Include controllers
fs.readdirSync("controllers").forEach(function (file) {
 if(file.substr(-3) == ".js") {
   const route = require("./controllers/" + file)
   route.controller(app)
 }
})

router.get('/', function(req, res) {
 res.json({ message: 'API Initialized!'});
});

// use JWT strategy to authenticate requests
const strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next) {
 User.getUserById(jwt_payload.id, function(err, user) {
   if (user) {
     next(null, user);
   } else {
     next(null, false);
   }
 });
});
passport.use(strategy);


// facebook strategy
var Strategy = require('passport-facebook').Strategy;

passport.use(new Strategy({
 clientID: '2034689560080455',
 clientSecret: 'e5a5b2e42a6fb5263cb2af9c3cd534b3',
 callbackURL: 'http://127.0.0.1:8081/login/facebook/return',
 profileFields: ['emails']
},
function(accessToken, refreshToken, profile, cb) {
 return cb(null, profile);
}));

var GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
   clientID:'376641550633-3ibunjnmepiog8hhn7dv4k21jbqr3nan.apps.googleusercontent.com',
   clientSecret:'sUm89LXsIf4SLk0KwEJcbjTJ',
   callbackURL: "http://www.example.com/auth/google/callback"
 },
 function(accessToken, refreshToken, profile, cb) {
   User.findOrCreate({ googleId: profile.id }, function (err, user) {
     return cb(err, user);
   });
 }
));

// twitter strategy
var Strategy = require('passport-twitter').Strategy;

passport.use(new Strategy({
 consumerKey: 'R6D4aFRwwSNmUxA47wwSUbusA',
 consumerSecret: 'mQJ1p08ljt7T7EUjgwxk3WCzTUzv70rfOdKSaDELqXnZG77RCQ',
 callbackURL: 'http://127.0.0.1:8081/login/twitter/return'
},
function(accessToken, refreshToken, profile, cb) {
 return cb(null, profile);
}));

// linkedin strategy
var LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;

passport.use(new LinkedInStrategy({
 clientID:'86gjgx7alxw55a',
 clientSecret:'v6dI86dMNTWUim1M',
 callbackURL: "http://127.0.0.1:3000/auth/linkedin/callback",
 scope: ['r_emailaddress', 'r_basicprofile'],
}, function(accessToken, refreshToken, profile, done) {
 // asynchronous verification, for effect...
 process.nextTick(function () {
   // To keep the example simple, the user's LinkedIn profile is returned to
   // represent the logged-in user. In a typical application, you would want
   // to associate the LinkedIn account with a user record in your database,
   // and return that user instead.
   return done(null, profile);
 });
}));

passport.serializeUser(function(user, done) {
 done(null, user.id);
});

passport.deserializeUser(function(id, done) {
 User.findById(id, function(err, user){
   done(err, user)
 })
});


router.get('/login/facebook',
 passport.authenticate('facebook', { scope: ['email'] }));

router.get('/login/facebook/return',
 passport.authenticate('facebook', { failureRedirect: 'http://127.0.0.1:8080/users/login' }),
 function(req, res) {
   // console.log(req)
   res.redirect('http://127.0.0.1:8080');
 });

app.get('/login/twitter',
 passport.authenticate('twitter'));

app.get('/login/twitter/return',
 passport.authenticate('twitter', { failureRedirect: '/login' }),
 function(req, res) {
   // Successful authentication, redirect home.
   res.redirect('http://127.0.0.1:8080');
 });

app.get('/login/google',
 passport.authenticate('google'));

app.get('/login/google/return',
 passport.authenticate('google', { failureRedirect: '/login' }),
 function(req, res) {
   // Successful authentication, redirect home.
   res.redirect('http://127.0.0.1:8080');
 });

router.get('/login/linkedin',
 passport.authenticate('linkedin', { scope: ['email'] }));

router.get('/login/linkedin/return',
 passport.authenticate('linkedin', { failureRedirect: 'http://127.0.0.1:8080/users/login' }),
 function(req, res) {
   // console.log(req)
   res.redirect('http://127.0.0.1:8080');
 });

const port = process.env.API_PORT || 8081;
app.use('/', router);
app.listen(port, function() {
 console.log(`api running on port ${port}`);
})
  
