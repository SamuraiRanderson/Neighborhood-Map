var model = [
	{
		name: 'Dolly Python',
		locationId: 567284,
		pic: ''
	},
	{
		name: 'The Samurai Collection',
		locationId: 91523867,
		pic: ''
	},
	{
		name: 'Dallas Museum of Art',
		locationId: 81723,
		pic: ''
	},
	{
		name: 'Pecan Lodge',
		locationId: 289297740,
		pic: ''
	},
	{
		name: 'We are 1976',
		locationId: 684487,
		pic: ''
	},
	{
		name: 'Luscher\'s Red Hots',
		locationId: 627073515,
		pic: ''
	},
	{
		name: 'Oddfellows',
		locationId: 526179323,
		pic: ''
	},
	{
		name: 'Smoke',
		locationId: 152607,
		pic: ''
	},
];


//console.table(model);

function loadData() {

	var url = 'https://api.instagram.com/v1/locations/'; // locationId url
	var key = '/media/recent?access_token=1962684669.6f4a010.676642d0021149d7b7d58a8cec924c0d'; // locationId url
	var locations = []; // Array of location url's
	for (var i = 0; i < model.length; i++){
		locations.push(url + model[i].locationId + key);
	}

	var instagramRequestTO = setTimeout (function(){
		$body.text("Instagram information is not available at this time... Please try again later.");
	}, 3000);

	var $body = $('body');
	var $pics = $('#pics');

$.each(locations, function(i,u){ // ** u = url **
	$.ajax(u,
		{
		type: "GET",
		dataType: "jsonp",
		cache: false,
		jsonp: "callback",
		success: function (response) {

// ***************************** John Mav **************************** //
// ** Here is where I am severely stuck in the mud on this project. ** //
// ** I am able to pass multiple urls for my location and retrieve  ** //
// ** the data and now I'm trying to place this retrived data back  ** //
// ** into my model so I can include it within each locations		** //
// ** infoWindow. The code now appends the data to the end of the   ** //
// ** array and I would like the photo's retrieved to attach with   ** //
// ** their repesective locations with my location array. Can you   ** //
// ** help me with this? Is this even possible? I've spent a ton of ** //
// ** time on this and it's extremely discouraging/frustrating!!    ** //

			model.push({pic: response.data[i].images.low_resolution.url});
			//console.table(model);
			$pics.append('<img src=' + response.data[i].images.low_resolution.url + ' width=200px height=200px>');

			clearTimeout(instagramRequestTO);

	}
console.table(model)
});


});

return false;

}




$(loadData);