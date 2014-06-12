var mongoose = require('mongoose')
  , user = mongoose.model('User')
  
 
//create a new user and get sign up information
exports.handleSignup=function (req,res){
	res.send("Hello");
	var myuser=new user(req.body);
	myuser.addUser( function(err, user) {

                if (err) {
                	console.log("error");
                  
                }
    });
	
};

// signup page
exports.signup = function (req, res) {
  res.render('signup',{user: new user() })

 
}


  