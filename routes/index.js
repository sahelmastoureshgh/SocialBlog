var userController = require('../controller/userController')
var postsController = require('../controller/postsController')

module.exports = function(app) {
	app.get('/',postsController.show);
    app.get('/signup', userController.signup)
	app.post('/signup', passport.authenticate('local-signup', {
		successRedirect : '/login', // redirect to the secure profile section
		failureRedirect : '/error', // redirect back to the signup page if there is an error
		failureFlash : true // allow flash messages
	}));
	app.post('/login', passport.authenticate('local', {
		successRedirect : '/login', // redirect to the secure profile section
		failureRedirect : '/error', // redirect back to the signup page if there is an error
		failureFlash : true // allow flash messages
	}));
	app.get('/login', userController.login)
	app.get('/error', userController.error)
	
}
