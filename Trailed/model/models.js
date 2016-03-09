var mongoose = require('mongoose');
// var Schema = mongoose.Schema;
// var ObjectID = Schema.ObjectID;


var pubTypeSchema = new mongoose.Schema({
	type: String
});
mongoose.model('PubType', pubTypeSchema);


var trailDurationSchema = new mongoose.Schema({
	duration: String
});
mongoose.model('TrailDuration', trailDurationSchema);


var trailScheme = new mongoose.Schema({	
	id: String,
	name: String,
	longDescription: String,
	shorDescription: String,
	totalDistance: String,
	totalPubs: String,
	foodAve: Boolean,
	picture: String,
	origin: {
		name: String, picture: String, lat: Number, lng: Number, description: String},
	waypoints: [
		{
			name: String, 
			picture: String, 
			location: {
				lat: Number, 
				lng: Number
			},
			description: String,
			stopOver: Boolean,
		}
	],
	destination: {name: String, picture: String, lat: Number, lng: Number, description: String},
	pubtype: [String]
});
mongoose.model('Trail', trailScheme);


