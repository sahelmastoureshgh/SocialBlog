var mongoose = require('mongoose')
  , Posts = mongoose.model('Posts')
/**
 * Create a post
 */

exports.create = function (req, res) {
    var myposts = new Posts(req.body)
     myposts.user = req.user;
 
}



/**
 * Update a post
 */

exports.update = function(req, res){

}



/**
 * Delete a post
 */

exports.delete = function(req, res){

}
/**
 Show main page
**/
exports.show=function(req,res){
	res.render('mainPage');
	
}
