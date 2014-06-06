var express = require('express')
    mongoose = require('mongoose'),
	cons=require('consolidate'),
	routes = require('./routes'); // Routes for our application
	

mongoose.connect('mongodb://localhost', function(err) {
	if (err) throw err;

	var app = express();
	
	//register template swig 
	app.engine('html',cons.swig);
	app.set('view engine', 'html');
	app.set('views',__dirname + "/view");
	
	// call routes
	routes(app);

	// listening to the port
	var port = 3000
	app.listen(port, function() {
		console.log('Express app started on port ' + port);
	})


})


 
    