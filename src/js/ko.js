var Model = [
          {name: 'The Cedars Social', address_1: '1326 S Lamar', address_2: 'Dallas, TX 75215', phone: '(214) 928-7700', lat: 32.769119, lng: -96.795821,
          url: 'http://www.thecedarssocial.com', locationId: 236668314},
          {name: 'Dallas Museum of Art', address_1: '1717 N Harwood St', address_2: 'Dallas, TX 75201', phone: '(214) 922-1200', lat: 32.787814, lng: -96.800793,
          url: 'https://www.dma.org', locationId: 294352157},
          {name: 'Dolly Python', address_1: '1916 N Haskell Ave', address_2: 'Dallas, TX 75204', phone: '(214) 887-3434', lat: 32.802272, lng: -96.785943,
          url: 'http://www.dollypythonvintage.com', locationId: 567284},
          {name: 'Jimmys Food Store', address_1: '4901 Bryan St', address_2: 'Dallas, TX 75206', phone: '(214) 823-6180', lat: 32.804476, lng:  -96.773658,
          url: 'https://www.jimmysfoodstore.com', locationId: 122958},
          {name: 'Luschers Red Hots', address_1: '2653 Commerce St', address_2: 'Dallas, TX 75226', phone: '(214) 434-1006', lat: 32.783485, lng: -96.784181,
          url: 'http://www.luschers.com', locationId: 627073515},
          {name: 'Oddfellows', address_1: '316 W 7th St', address_2: 'Dallas, TX 75208', phone: '(214) 944-5958', lat: 32.748872, lng: -96.826812,
          url: 'http://oddfellowsdallas.com', locationId: 526179323},
          {name: 'Pecan Lodge', address_1: '2702 Main St', address_2: 'Dallas, TX 75226', phone: '(214) 748-8900', lat: 32.783925, lng: -96.783820,
          url: 'http://www.pecanlodge.com', locationId: 289297740},
          {name: 'Smoke', address_1: '901 Fort Worth Ave', address_2: 'Dallas, TX 75208', phone: '(214) 393-4141', lat: 32.769605, lng:  -96.837312,
          url: 'http://smokerestaurant.com', locationId: 152607},
          {name: 'The Samurai Collection', address_1: '2501 N Harwood St', address_2: 'Dallas, TX 75201', phone: '(214) 965-1032', lat: 32.791917, lng: -96.806217,
          url: 'http://www.samuraicollection.org', locationId: 91523867},
          {name: 'We are 1976', address_1: '313 N Bishop Ave', address_2: 'Dallas, TX 75208', phone: '(214) 821-1976', lat: 32.748334, lng: -96.829321,
          url: 'http://www.weare1976.com', locationId: 684487}

];

var ViewModel = function (){

     var self = this;

/* self.markerList is an empty array that is populated the google map markers information */

     self.markerList = ko.observableArray([]);
     self.query = ko.observable('');

     function loadData(){

/* locations array holds the instagram api url to be passed into the ajax call */

          var url = 'https://api.instagram.com/v1/locations/';
          var key = '/media/recent?access_token=1962684669.6f4a010.676642d0021149d7b7d58a8cec924c0d';
          var locations = [];
               for (var i = 0; i < Model.length; i++){
               locations.push(url + Model[i].locationId + key);
               }

/* Var instagramRequestTO in the event of an ajax request error */

          var instagramRequestTO = setTimeout (function(){
          $body.text("Instagram information is not available at this time... Please try again later.");
          }, 3000);

          var $body = $('body');

/* Ajax Request */

          $.each(locations, function(i,u){
               $.ajax(u, /* u = instagram api urls to be passed into the ajax request */
                    {
                    type: "Get",
                    dataType: "jsonp",
                    cache: false,
                    jasonp: "callback",
                    asynch: true,
                    success: function (response){
                         self.markerList()[i].pic = response.data[i].images.low_resolution.url;
                         clearTimeout(instagramRequestTO);
                    },
                    error: function(xhr, status, error){
                         alert(xhr.responseText);
                    }
               });
          });

          return false;

     }

     $(loadData);

/* Add custom marker icon to replace default google maps marker */

     var pinIcon = new google.maps.MarkerImage('images/pegasus.png', /* Custom map marker */
     null, /* size is determined at runtime */
     null, /* origin is 0,0 */
     null, /* anchor is bottom center of the scaled image */
     new google.maps.Size(42, 42)
     );

/* Adding the markers to the map for each location in the array */

     var marker;
          for (var i = 0; i < Model.length; i ++){
               marker = new google.maps.Marker({
                    position: new google.maps.LatLng(Model[i].lat, Model[i].lng),
                    map: map,
                    icon: pinIcon,
                    title: Model[i].name,
                    address_1: Model[i].address_1,
                    address_2: Model[i].address_2,
                    phone: Model[i].phone,
                    url: Model[i].url,
                    animation: google.maps.Animation.DROP
               });

          self.markerList.push(marker); /* Populate self.markerList array with marker information */


/* Initialize the Google Maps InfoWindow for display, when needed */

     var infoWindow = new google.maps.InfoWindow({
          maxWidth: 250,
     });

     google.maps.event.addListener(infoWindow, 'domready', function (){
        $('#div-main-infoWindow').closest('.gm-style-iw').parent().addClass('custom-iw');
     });

/**
* activeMarker() is called when either an item clicked on in our list
* or when a marked location is clicked on the map
*
* infowindow content is set
*
* m = the Google Maps marker passed to this function
*/

     var activeMarker = function(m){
          infoWindow.setContent('<h1>' + m.title + '</h1>' + '<h2>' + m.address_1 +
               '<br>' + m.address_2 + '<br>' + m.phone + '<br>' + '<br>' +
               '<a href=' + m.url + '>' + m.url + '</a>' + '</h2>' + '<br>' +
               '<img src=' + m.pic + ' height=150px width=150px>' + '</br>');

          infoWindow.open(map, m);

/* Sets the marker in motion by checking it's status and animating it if it's idle */

          if (m.getAnimation() !== null){
               m.setAnimation(null);
          } else {
               m.setAnimation(google.maps.Animation.BOUNCE);
          }

/* Map.panTo moves the map to the markers location and assigns the new current marker */

          map.panTo(m.position);
     }

/* setTimeout() added to keep the markers from bouncing infinitely and set timing */

     var stopAnimation = function(m){
          setTimeout (function(){
               m.setAnimation(null);
          }, 3500);
     };

     google.maps.event.addListener(marker, 'click', function(){
          activeMarker(this);
          stopAnimation(this);
     });

/* Google maps listener to animate markers when clicked */

     self.listMarker = function(){
          activeMarker(this);
          stopAnimation(this);
     };

/* Filter/Search functionality */

//console.table(self.markerList());


     self.searchArray = ko.computed(function(){
          return ko.utils.arrayFilter(self.markerList(), function(m){
               return m.title.toLowerCase().indexOf(self.query().toLowerCase()) !== -1;
          });
     }, self);

     self.searchArray.subscribe(function(){
          var diffArray = ko.utils.compareArrays(self.markerList(), self.searchArray());
          ko.utils.arrayForEach(diffArray, function(m){
               if (m.status === 'deleted'){
                    m.value.setMap(null);
               } else {
                    m.value.setMap(map);
               }
          });
     });

}
     $('#uiList').click(function () {
          $('.dropdown-menu').toggle().addClass('slideDown');
     });

};// End ViewModel

/* Initialize Google Maps */

var map;
function initMap(){
     map = new google.maps.Map(document.getElementById('map-canvas'),{
          center: new google.maps.LatLng(32.789356, -96.801788),
          zoom: 13,
          disableDefaultUI: true,
     });
}

$(window).load(function() {
    ko.applyBindings(new ViewModel());
});