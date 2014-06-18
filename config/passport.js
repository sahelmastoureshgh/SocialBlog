var mongoose = require('mongoose')
  , LocalStrategy = require('passport-local').Strategy
  , userController = require('../controller/userController')



module.exports = function (passport, config) {

  // serialize sessions
  passport.serializeUser(function(user, done) {
    done(null, user.id)
  })

  passport.deserializeUser(function(id, done) {
    User.findOne({ _id: id }, function (err, user) {
      done(err, user)
    })
  })

  // use local strategy
  passport.use(new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password', 
	  passReqToCallback : true // allows us to pass back the entire request to the callback
	  
    },
    function(req,email, password, done) {
		userController.handleSignup(req, function (err, user) {
           if (err) {
			    return done(err) 
			}
 
            return done(null, user)
      })
    }
  ))