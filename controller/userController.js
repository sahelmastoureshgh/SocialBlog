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
 **/
exports.handleSignup=function (req,res){
    "use strict";
     var email = req.body.email
     var password = req.body.password

	 if (validateSignup(password, email)) {

 	    res.send("Hello");
 	    var myuser = new user(req.body);

 	    myuser.addUser(function(err, user) {
 		   if (err) {
 		   	console.log("error");

 		    }
 	   });

    }

};

// signup page
exports.signup = function (req, res) {
  res.render('signup',{user: new user() })

 
}


  