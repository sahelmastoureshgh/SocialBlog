var mongoose = require('mongoose')
  , user = mongoose.model('user')
  
 
//create a new user
exports.create=function (req,res){
	var myuser=new user({name:"sahel",email:"myeamil@test.org"});
	myuser.save(function(err){
		if (err){
			console.log('Error on save')
		}
	})
	
};
  