 

 
	var mongoose = require('mongoose');

	var Schema  = mongoose.Schema;

	var taxonomySchema = new Schema({ 
		specie: 'string', 
		popular_name: 'string' 
	});

	var BearSchema = new Schema({
		name: String,
		taxonomy: taxonomySchema
	});

	module.exports = mongoose.model('Bear', BearSchema);
