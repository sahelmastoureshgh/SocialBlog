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




// methods to check password, create hashed password, create new user

UserSchema.methods = {

  /**
   * Authenticate - check if the passwords are the same
   * @param {String} plainText
   * @return {Boolean}
   * @api public
   */

  authenticate: function (plainText) {
    return this.encryptPassword(plainText) === this.hashed_password
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


}

module.exports =mongoose.model('User', userSchema)   