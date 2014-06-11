var userController = require('../controller/userController')

module.exports = function(app) {
	
    app.get('/', userController.signup)
	app.post('/signup',userController.handleSignup)
	
}
