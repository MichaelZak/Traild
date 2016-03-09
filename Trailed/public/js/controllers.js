var TraildControllers = angular.module('TraildControllers',['ngResource', 'ngAnimate'
  ]);

app.factory('trailsService', function($resource) {
	//return $resource('/api/trails');
	return {
	    query: function(query) {
	      return $resource('/api/trails', {}, {
	             query: { method: 'GET', params: query, isArray: true }
	      }).query();
	    }
	}
});
app.factory('trailService', function($resource) {
	//return $resource('/api/trails');
	return $resource('/api/trail/:id'); 
});
app.factory('menuService', function($resource) {
	return {
	    getPubTypes: function() {
	      return $resource('/api/pubtypes', {}, {
	             query: { method: 'GET', isArray: true }
	      }).query();
	    }
	}
});
app.service('helperService', function($resource) {
	var formSelection, viewTrailSelect, _trails, pubtypes;

	var location;
	var storeSelection = function(selection) {
		formSelection = selection;
	};
	var getSelection = function() {
		return formSelection;
	};
	var storeViewTrail = function(trail) {
		viewTrailSelect = trail;
	};
	var getViewTrail = function() {
		return viewTrailSelect;
	};
	var storeTrails = function(trails) {
		_trails = trails;
	};
	var getTrails = function() {
		return _trails;
	};
	var storePubTypes = function(pubTypes) {
		pubtypes = pubTypes;
	};
	var getPubTypes = function() {
		return pubtypes;
	};
	var storeLocation = function(location) {
		location = location;
	};
	var getLocation = function() {
		return location;
	};

	return {
		storeSelection: storeSelection,
		getSelection: getSelection,
		storeViewTrail: storeViewTrail,
		getViewTrail: getViewTrail,
		storeTrails: storeTrails,
		getTrails: getTrails,
		storePubTypes: storePubTypes,
		getPubTypes: getPubTypes,
		storeLocation: storeLocation,
		getLocation: getLocation
	};
});

TraildControllers.controller('HomeController', function($scope, $location, helperService, menuService, trailsService){

	$scope.disableButtons = true;

	$scope.dropdownHeading = "What would you like to do?"

	$scope.pubtypes = menuService.getPubTypes();
	helperService.storePubTypes($scope.pubtypes);

	var isSelect = false;
	$scope.onClickPubtype = function(pubtype){
		$scope.disableButtons = false;
		$scope.dropdownHeading = pubtype.type;
		helperService.storeSelection(pubtype);
		
		isSelect = true;
	}
  	$scope.onTrailMePress = function(path) {
  		if (isSelect) {

  			$('#idForTrailMeButton').toggleClass('active');
  	
  			var selection = helperService.getSelection();

  			var options = {
			  enableHighAccuracy: true,
			  
			  maximumAge: 0
			};

			function success(pos) {
			  var crd = pos.coords;
			  var myLocation = {
			  	"latitude": crd.latitude,
			  	"longitude": crd.longitude
			  };

			  	selection.lng = myLocation.longitude;
			  	selection.lat = myLocation.latitude;

				$scope.typeSelection = selection;
				$scope.trails = trailsService.query(selection);
				helperService.storeTrails($scope.trails);
			  	$('#idForTrailMeButton').toggleClass('active');
			  	$location.path('/trails/' + $scope.dropdownHeading);
			};

			function error(err) {
			  console.warn('ERROR(' + err.code + '): ' + err.message);
			};

			navigator.geolocation.getCurrentPosition(success, error, options);

  			
  		}
  	}
  	$scope.onHowItWorkClick = function(){
  		// $(".homeCollapse").animate({ "height": "3%" }, 500);
  		// $(".backImg").animate({ "height": "0%" }, 500);
  		// $(".homeCollapse").css({"overflow": "hidden"});
  		//  $(".howItWorks").css({"overflow": "inherit"});
  		// $(".backImg").css({ "background-image": "none" });
  	}
  	$scope.onBackToTheTop = function(){
  		// $(".homeCollapse").animate({ "height": "100%" }, 500);
  		// $(".backImg").animate({ "height": "100%" }, 500);
  		// $(".homeCollapse").css({"overflow": "auto"});
  		// $(".howItWorks").css({"overflow": "hidden"});
  		// $(".backImg").css({ "background-image": "url(../images/home.png)" });
  		
  	}
});
TraildControllers.controller('ListTrailsController', function($scope, $location, $routeParams, helperService, trailsService, menuService){
	// var tempMap = [	// REWRITE
	// 	{
	// 		"type": "Traditional",
	// 		"key": "trdtnl"
	// 	},
	// 	{
	// 		"type": "Live Music",
	// 		"key": "lvmsc"
	// 	},
	// 	{
	// 		"type": "Historic",
	// 		"key": "hstrc"
	// 	},
	// 	{
	// 		"type": "Food",
	// 		"key": "fd"
	// 	},
	// 	{
	// 		"type": "Guiness",
	// 		"key": "gnss"
	// 	},
	// 	{
	// 		"type": "Near me now",
	// 		"key": "nrmnw"
	// 	}
	// ];

	// $scope.pubtypes = helperService.getPubTypes();

	var selection = helperService.getSelection();
	// if (selection === undefined) {
	// 	var selection = {
	// 		"type": $routeParams.trailType,
	// 		"key" : ""
	// 	}

	// 	for (var i = 0; i < tempMap.length; i++) {
	// 		if (tempMap[i].type === selection.type) {
	// 			selection.key = tempMap[i].key;
	// 		}
	// 	}
		 
	// }
	
	// if (selection.type === "Near me now") {
	// 	//$scope.getDistanceFromLatLonInKm()
	// 	console.log(helperService.getLocation());
	// }


	 $scope.typeSelection = selection;
	// $scope.trails = trailsService.query(selection);
	// helperService.storeTrails($scope.trails);


	// if ($routeParams.trailType === "Food") {
	// 	var options = {
	// 	  enableHighAccuracy: true,
		  
	// 	  maximumAge: 0
	// 	};

	// 	function success(pos) {
	// 	  var crd = pos.coords;
	// 	  var myLocation = {
	// 	  	lat: crd.latitude,
	// 	  	lng: crd.longitude
	// 	  };

	// 	  	selection.myLocation = myLocation;

	// 		$scope.typeSelection = selection;
	// 		$scope.trails = trailsService.query(selection);
	// 		helperService.storeTrails($scope.trails);
		  
	// 	};

	// 	function error(err) {
	// 	  console.warn('ERROR(' + err.code + '): ' + err.message);
	// 	};

	// 	navigator.geolocation.getCurrentPosition(success, error, options);
	// }

	$scope.trails = helperService.getTrails();
	
	
	$scope.onTrailTypePressLeft = function(param){
		for (var i = 0; i < $scope.pubtypes.length; i++) {
			if ($scope.pubtypes[i].type === param.type) {
				if (i != 0) {
					$scope.typeSelection = $scope.pubtypes[i-1];
					$scope.trails = trailsService.query($scope.pubtypes[i-1]);
				}
				else {
					$scope.typeSelection = $scope.pubtypes[$scope.pubtypes.length-1];
					$scope.trails = trailsService.query($scope.pubtypes[$scope.pubtypes.length-1]);
				}
			}
		}
	}
	$scope.onTrailTypePressRight = function(param){
		for (var i = 0; i < $scope.pubtypes.length; i++) {
			if ($scope.pubtypes[i].type === param.type) {		
				if (i != $scope.pubtypes.length-1) {
					$scope.typeSelection = $scope.pubtypes[i+1];
					$scope.trails = trailsService.query($scope.pubtypes[i+1]);
				} else {
					$scope.typeSelection = $scope.pubtypes[0];
					$scope.trails = trailsService.query($scope.pubtypes[0]);
				}
			}
		}
	}
	$scope.onTrailPress = function(trail) {
		helperService.storeViewTrail(trail);
  		$location.path('/trail/' + trail.id);
  	}

  	$scope.getDistanceFromLatLonInKm = function (lat1,lon1,lat2,lon2) {
	  var R = 6371; // Radius of the earth in km
	  var dLat = deg2rad(lat2-lat1);  // deg2rad below
	  var dLon = deg2rad(lon2-lon1); 
	  var a = 
	    Math.sin(dLat/2) * Math.sin(dLat/2) +
	    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
	    Math.sin(dLon/2) * Math.sin(dLon/2)
	    ; 
	  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
	  var d = R * c; // Distance in km
	  return d;
	}

	$scope.deg2rad = function (deg) {
	  return deg * (Math.PI/180)
	}
});

TraildControllers.controller('TrailController', function($scope, $location, $routeParams, trailService, helperService) {
	$scope.trail = helperService.getViewTrail();
	
	$scope.loadData = function() {
		$scope.headerImg = {'background-image':'linear-gradient(rgba(0, 0, 0, 0.5),rgba(0, 0, 0, 0.5)),url(' + $scope.trail.picture + ')'};
		$("#panelHeader").css($scope.headerImg);

		$scope.details = [];
		var stop = {
			name: $scope.trail.origin.name,
			description: $scope.trail.origin.description
		}
		$scope.details.push(stop);

		for (var i = 0; i < $scope.trail.waypoints.length; i++) {
			stop = {
				name: $scope.trail.waypoints[i].name,
				description: $scope.trail.waypoints[i].description
			}
			$scope.details.push(stop);
		}

		stop = {
			name: $scope.trail.destination.name,
			description: $scope.trail.destination.description
		}
		$scope.details.push(stop);
	}

	if ($scope.trail === undefined) {
		$scope.trail = trailService.get({id : $routeParams.trailId}, function() {
			helperService.storeViewTrail($scope.trail);
    		$scope.loadData();
  		});
	} else {
		$scope.loadData();
	}

	$scope.onTrailPressLeft = function(param){
		var aTrails = helperService.getTrails();

		for (var i = 0; i < aTrails.length; i++) {
			if (aTrails[i].id === param.id) {
				if (i != 0) {
					$scope.trail = aTrails[i - 1];
					$scope.loadData();
				}
				else {
					$scope.trail = aTrails[aTrails.length - 1];
					$scope.loadData();
				}
			}
		}
	}
	$scope.onTrailPressRight = function(param){
		var aTrails = helperService.getTrails();
		for (var i = 0; i < aTrails.length; i++) {
			if (aTrails[i].id === param.id) {		
				if (i != aTrails.length - 1) {
					$scope.trail = aTrails[i + 1];
					$scope.loadData();
				} else {
					$scope.trail = aTrails[0];
					$scope.loadData();
				}
			}
		}
	}
	$scope.onTrailStartPress = function() {
		$location.path('/trailmap');
	}
});

TraildControllers.controller('TrailMapController', function($scope, $location, trailsService, helperService) {
	$scope.trail = helperService.getViewTrail();

	$scope.origin = $scope.trail.origin;

	$scope.waypoints = [];

	for (var i = 0; i < $scope.trail.waypoints.length; i++ ) {
		var location = {
			"location": $scope.trail.waypoints[i].location,
			"stopover": $scope.trail.waypoints[i].stopover
		}
		$scope.waypoints.push(location);
	}

	$scope.destination = $scope.trail.destination;
});


TraildControllers.controller('noTrailsRouteFoundController', function() {
});






















