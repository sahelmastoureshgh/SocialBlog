var mongoose = require('mongoose')
  , LocalStrategy = require('passport-local').Strategy
  , userController = require('../controller/userController')
  , User = mongoose.model('User')



module.exports = function (passport, config) {

  // serialize user for sessions
 /**
   After creating session in db
   We can access to session by
   req.session and we can access to user id with req.session.passport.id
   or with req.user.id
 **/
  passport.serializeUser(function(user, done) {
    done(null, user.id)
  })

  passport.deserializeUser(function(id, done) {
    User.findOne({ _id: id }, function (err, user) {
      done(err, user)
    })
  })

  // use local strategy
  passport.use('local-signup',new LocalStrategy({
  		usernameField: 'email',
  		passwordField: 'password',
  		passReqToCallback: true // allows us to pass back the entire request to the callback

  	},
  	function(req, email, password, done) {
  		userController.handleSignup(req,done, function(err, user) {
  			if (err) {
  				return done(err)
  			}
			
            console.log("hello");
  			return done(null, user)
  		})
  	}
  ));

  }
  
  
  // use local strategy handle login
  passport.use('local-login',new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password',
	  passReqToCallback: true // allows us to pass back the entire request to the callback
	  
    },
    function(email, password, done) {
      User.findOne({ email: email }, function (err, user) {
        if (err) { return done(err) }
        if (!user) {
          return done(null, false, { message: 'Unknown user' })
        }
        if (!user.validPassword(password)) {
          return done(null, false, { message: 'Invalid password' })
        }
        return done(null, user)
      })
    }
  ))