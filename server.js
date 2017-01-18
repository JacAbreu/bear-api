// server.js

// call the packages we need

	var express = require('express');
	var app = express();
	var bodyParser = require('body-parser');
	var mongoose = require('mongoose');

	// configure app to use bodyParser()
	// this will let us get the data from a POST

	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(bodyParser.json());

	var port = process.env.PORT || 8080; 

	//should only call once.
	mongoose.Promise = global.Promise;
	mongoose.connect('mongodb://localhost:27017/bearAPI');

	app.use(require('./app/controllers/bear'));



	// START THE SERVER
	// =============================================================================
	app.listen(port);
	console.log('Magic happens on port ' + port);

