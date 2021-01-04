var mapOptions = {
    center: [54.68673, 25.29754],
    zoom: 10,
    zoomControl: false
};

var map_base = L.tileLayer('https://tiles.wmflabs.org/hikebike/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
});

var zoomOptions = {
    position: 'bottomright'
};

var locateOptions = {
    flyTo: true,
    clickBehavior: {inView: 'setView', outOfView: 'setView', inViewNotFollowing: 'inView'},
    position: 'bottomright'
}

var map = L.map('map', mapOptions).fitWorld();
map_base.addTo(map);

var scale = L.control.scale().addTo(map);
var zoom = L.control.zoom(zoomOptions).addTo(map);
var lc = L.control.locate(locateOptions).addTo(map);
lc.start();


var url = 'https://e7296787-046b-4f04-b201-e452f79c4204.usrfiles.com/ugd/e72967_06b7b5e173054c6eb8c19683edd8e879.gpx'; // URL to your GPX file
new L.GPX(url, {
  async: true,
  marker_options: {
    startIconUrl: '',
    endIconUrl: '',
    shadowUrl: '',
    iconSize: [30, 30], // size of the icon
    shadowSize: [0, 0], // size of the shadow
    iconAnchor: [15, 15], // point of the icon which will correspond to marker's location
    shadowAnchor: [0, 0], // the same for the shadow
  }
}).on('loaded', function(e) {
  map.fitBounds(e.target.getBounds());
}).addTo(map);

// var navIcon = L.icon({
//   iconUrl: 'https://static.wixstatic.com/media/e72967_2f70cc846d30428aa7fd389d0dc0f8f4~mv2.png',
//   iconSize: [26, 36],
//   iconAnchor: [13, 18],
//   popupAnchor: [0, 0],
//   shadowUrl: '',
//   shadowSize: [0, 0],
//   shadowAnchor: [0, 0]
// });

// placeholders for the L.marker and L.circle representing user's current position and accuracy    
// var current_position, current_accuracy;

// function onLocationFound(e) {
//   // if position defined, then remove the existing position marker and accuracy circle from the map
//   if (current_position) {
//     map.removeLayer(current_position);
//     //map.removeLayer(current_accuracy);
//   }
  
//   //var radius = e.accuracy / 2;
  
//   current_position = L.marker(e.latlng, {icon: navIcon}).addTo(map);
//   //current_accuracy = L.circle(e.latlng, radius).addTo(map);
// }

// // wrap map.locate in a function    
// function locate() {
//   map.locate({
//     setView: true,
//     maxZoom: 19
//   });
// }

// // call locate every 3 seconds... forever
// //setInterval(locate, 3000);

// function onLocationError(e) {
//   alert(e.message);
// }

// map.on('locationfound', onLocationFound);
// map.on('locationerror', onLocationError);
