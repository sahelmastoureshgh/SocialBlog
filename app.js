var express = require('express')
    mongoose = require('mongoose'),
	bodyParser= require('body-parser'),
	cookieParser=require('cookie-parser'),
	cons=require('consolidate'),
	session = require('express-session'),
	mongoStore = require('connect-mongo')(session),
	flash = require('connect-flash'),
	passport = require('passport'),
	fs = require('fs');
	

mongoose.connect('mongodb://localhost', function(err) {
	if (err) throw err;
	
	//register models
	//model need to be registered before route
	var models_path = __dirname + '/model'
	fs.readdirSync(models_path).forEach(function (file) {
	  if (~file.indexOf('.js')) require(models_path + '/' + file)
	})
	// passport config
	require('./config/passport')(passport)

    // create web server 
	var app = express()

	
	//register template swig 
	app.engine('html',cons.swig);
	app.set('view engine', 'html');
	app.set('views',__dirname + "/view");
	
    // middleware to populate 'req.cookies' so we can access cookies
    app.use(cookieParser());
    // middleware to populate 'req.body' so we can access POST variables
    app.use(bodyParser());
   

    // express/mongo session storage
    app.use(session({
      secret: "something",
      store: new mongoStore({
        db: mongoose.connection.db,
        collection : 'sessions'
      })
    }))

    // use passport session
    app.use(passport.initialize())
    app.use(passport.session())

    // connect flash for flash messages - should be declared after sessions
    app.use(flash())

	
	// call routes
	require('./routes')(app, passport)

	// listening to the port
	var port = 3000
	app.listen(port, function() {
		console.log('Express app started on port ' + port);
	})


})


 
    