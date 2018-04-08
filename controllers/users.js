const User = require("../models/User");
const passport = require("passport")
const passportJWT = require("passport-jwt");
const ExtractJwt = passportJWT.ExtractJwt;
const jwt = require("jsonwebtoken");
const jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
jwtOptions.secretOrKey = 'thisisthesecretkey';

module.exports.controller = (app) => {
 // register a user
 app.post('/users/register', (req, res) => {
   const name = req.body.name;
   const email = req.body.email;
   const password = req.body.password;
   const newUser = new User({
     name: name,
     email: email,
     password: password
   })
   User.createUser(newUser, function(error, user){
     if (error) {
        res.status(422).json({
          message: "Something went wrong. Please try again after some time!"
        });
      }
     res.send({ user: user })
   })
 })

  // login a user
 app.post("/users/login", function(req, res) {
   if(req.body.email && req.body.password){
     const email = req.body.email;
     const password = req.body.password;
     User.getUserByEmail(email, function(err, user){
       if( ! user ){
         res.status(404).json({ message:"The user does not exist!" });
       } else {
         User.comparePassword(password, user.password, function(err, isMatch){
           if(err) throw err;
           if(isMatch){
             const payload = {id: user.id};
             const token = jwt.sign(payload, jwtOptions.secretOrKey);
             res.json({ message: "ok", token: token });
           } else {
             res.status(401).json({ message: "The password is incorrect!" });
           }
         })
       }
     });
   }
 });
}

