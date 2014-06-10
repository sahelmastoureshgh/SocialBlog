//var userController = require('../controller/userController')

module.exports = function(app) {
	app.get('/', function(req, res) {
		res.render('signup');
	});
    //app.get('/signup', userController.signup)
	
}
