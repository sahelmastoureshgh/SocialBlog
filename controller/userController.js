var mongoose = require('mongoose')
  , user = mongoose.model('User')
  
  //Handle validation for sign up
function validateSignup( password, email) {
          "use strict";

          var PASS_RE = /^.{3,20}$/;
          var EMAIL_RE = /^[\S]+@[\S]+\.[\S]+$/;

          if (!PASS_RE.test(password)) {
              console.log( "invalid password.");
              return false;
          }
         
          if (email != "") {
              if (!EMAIL_RE.test(email)) {
                  console.log( "invalid email address");
                  return false;
              }
          }
          return true;
 }

 /**check if email is valid in terms of syntax
   check if email address exist in the database 
   create a new user and get sign up information
   call done to go with this new user to create session in passport
 **/
exports.handleSignup = function(req,done) {
	"use strict";
	var email = req.body.email
	var password = req.body.password
	// wont fire untill data is sent back
	process.nextTick(function() {
        // just validate syntax for input for email
		if (validateSignup(password, email)) {

			//res.send("Hello");
			// create new user 
			var myuser = new user(req.body);

			myuser.save(function(err,user){
               if (err){
                 console.log('Error on save')
               }
			   done(null, user);
            })
		

		}
	});


};


// signup page
exports.signup = function (req, res) {
  res.render('signup',{user: new user() })

 
}

// welcome page
exports.login = function (req, res) {
	
    res.render('login');

 
}
// signup page
exports.error = function (req, res) {
   res.send("Error");

 
}


  