var express = require('express')
    mongoose = require('mongoose'),
	routes = require('./routes'); // Routes for our application

mongoose.connect('mongodb://localhost', function(err) {
	if (err) throw err;

	var app = express();
	// call routes
	routes(app);

	// listening to the port
	var port = 3000
	app.listen(port, function() {
		console.log('Express app started on port ' + port);
	})


})

	/**app.get('/', function(req, res) {
		res.send('Hello You what is up');
	});


// listening to the port
var port = 3000
app.listen(port)
console.log('Express app started on port ' + port)**/
 
    