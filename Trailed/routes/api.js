var express = require('express');

var router = express.Router();

var mongoose = require('mongoose');

var helper = require('../node_modules/util/index.js');

var Trail = mongoose.model('Trail');
router.route('/trails')

	.get(function (request, response) {

		var query = Trail.find({"pubtype": request.query.key});

		query.exec(function (error, trails) {
  			if (error) {
  				return handleError(error);
  			}
  			if (request.query.lat === false || request.query.lng === false) {
  				return response.send(trails);
  			} else {
  				var aSortedTrails  = helper.orderByDistanceTrails({"latitude": request.query.lat , "longitude":request.query.lng}, trails);
  				return response.send(aSortedTrails);
  			}
  			//var aSortedTrails  = helper.orderByDistanceTrails({"latitude": request.query.lat , "longitude":request.query.lng}, trails);		
  			//return response.send(trails);
			})
	}); 

router.route('/trail/:id')	//api for specific post
	
	.get(function (request, response) {
		console.log(request);
		var query = Trail.findOne({
			"id": request.params.id
			})

		query.exec(function (error, trail) {
  			if (error) {
  				return handleError(error);
  			}
  			return response.send(trail);
			})
	}); //get specific trail

var PubType = mongoose.model('PubType');

router.route('/pubtypes')
	.get(function (request, response) {
		PubType.find(function(error, pubtypes) {
			if (error) {
				return response.send(500, error);
			}
			return response.send(pubtypes);
		})
	});

module.exports = router;
