var userController = require('../controller/userController')

module.exports = function(app) {
	
    app.get('/', userController.signup)
	app.post('/signup', passport.authenticate('local', {
		successRedirect : '/welcome', // redirect to the secure profile section
		failureRedirect : '/error', // redirect back to the signup page if there is an error
		failureFlash : true // allow flash messages
	}));
	app.get('/welcome', userController.welcome)
	app.get('/error', userController.error)
	
}
