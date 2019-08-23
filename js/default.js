// Default JavaScript Functions and Initiations

// Load Custom Google Font
WebFont.load({
  google: {
    families: ['Ubuntu:300,400,500,700', 'Montserrat:400,700']
  }
});

// Google Map -- currently unused
/*
function googleMap() {
  var map = document.getElementById('google-map');

  var map_options = {
    center: new google.maps.LatLng(38.8343675,-77.3137736,17),
    scrollwheel: false,
    zoom: 15,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  }
  var map = new google.maps.Map(map, map_options)

  // Map Marker
  var myLatlng = new google.maps.LatLng(38.8343675,-77.3137736,17);
  var marker = new google.maps.Marker({
    position: myLatlng,
    map: map,
    icon: 'img/location-pin.svg'
  });
}
google.maps.event.addDomListener(window, 'load', googleMap);
*/

//metismenu
$("#metismenu").metisMenu();