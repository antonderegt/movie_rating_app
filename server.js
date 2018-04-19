const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const fs = require("fs");
const config = require('./config/Config');
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
jwtOptions.secretOrKey = config.SECRET 
const User = require("./models/User");

const app = express();
const router = express.Router();

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
});

app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());
app.use(session({
     secret: config.SECRET,
     resave: true,
     saveUninitialized: true,
     cookie: { httpOnly: false }
   }))
   app.use(passport.initialize());
   app.use(passport.session());

//connect to mongodb
   mongoose.connect(mongoose.connect(config.DB));
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

 router.get('/api/current_user', isLoggedIn, function(req, res) {
     if(req.user) {
       res.send({ current_user: req.user })
     } else {
       res.status(403).send({ success: false, msg: 'Unauthorized.' });
     }
})

   router.get('/api/logout', function(req, res){
     req.logout();
     res.send();
});

  function isLoggedIn(req, res, next) {
     if (req.isAuthenticated())
       return next();
     res.redirect('/#/');
     console.log('error! auth failed')
   }

router.get('/', function(req, res) {
 res.json({ message: 'API Initialized!'});
});


const port = process.env.API_PORT || 8081;
app.use('/', router);
app.listen(port, function() {
 console.log(`api running on port ${port}`);
})
  
