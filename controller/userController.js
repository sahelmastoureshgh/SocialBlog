var mongoose = require('mongoose')
  , user = mongoose.model('User')
  
 
//create a new user
/**exports.create=function (req,res){
	var myuser=new user(req.body);
	myuser.save(function(err){
		if (err){
			console.log('Error on save')
		}
	})
	
};**/

// show signup page
exports.signup = function (req, res) {
  res.render('signup')
 
}


  