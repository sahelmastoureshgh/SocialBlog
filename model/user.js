var mongoose=require('mongoose')
   ,Schema=mongoose.Schema
    bcrypt = require('bcrypt-nodejs');
   
//user schema
var userSchema=new Schema({
	name: {type: String, default:''},
	email: {type: String , default:''},
    hashed_password: { type: String, default: '' }
})





// virtual method for get and set password
userSchema
  .virtual('password')
  .set(function(password) {
    this._password = password
    this.hashed_password = this.encryptPassword(password)
  })
  .get(function() { return this._password })




//validations for signing up

  userSchema.path('email').validate(function (email) {
  
	   var EMAIL_RE = /^[\S]+@[\S]+\.[\S]+$/;  
	   return (EMAIL_RE.test(email)); 

 
  }, 'Please enter valid Email')
  
// checking to see if the user already exists
  userSchema.path('email').validate(function (email, fn) {
    var User = mongoose.model('User');
    // Check only when it is a new user or when email field is modified
    if (this.isNew || this.isModified('email')) {
      User.find({ email: email }).exec(function (err, users) {
        fn(!err && users.length === 0)
      })
    } else fn(true)
  }, 'Email already exists')


  userSchema.path('hashed_password').validate(function (hashed_password){ 
      return hashed_password.length;

  }, 'Password cannot be blank')
  
  
  

// methods to check password, create hashed password, create new user

userSchema.methods = {

  /**
   * validPassword - check if the passwords are the same
   * @param {String} plainText
   * @return {Boolean}
   * @api public
   */

  validPassword: function (plainText){ 
    return bcrypt.compareSync(plainText, this.hashed_password);
  },


  /**
   * Generate password hash by bcrypt
   * @param {String} password
   * @return {String}
   * @api public
   */

  encryptPassword: function (password) {
    if (!password) return ''
    var password_hash
    try {
		// Generate password hash
		 var salt = bcrypt.genSaltSync();
		 password_hash = bcrypt.hashSync(password, salt);
         return password_hash
    } catch (err) {
      return ''
    }
  },

  /**
   Create new User
  **/
  addUser :function()
  {
    this.save(function(err){
      if (err){
        console.log('Error on save')
      }
    })
  } 


}

mongoose.model('User', userSchema)   