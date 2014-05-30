var mongoose=require('mongoose')
   ,Schema=mongoose.Schema
   
//user schema
var userSchema=new Schema({
	name: {type: String, default:''},
	email: {type: String , default:''}
});

mongoose.model('user', userSchema)   