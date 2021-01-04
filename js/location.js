var mapOptions = {
    center: [54.68673, 25.29754],
    zoom: 10,
    zoomControl: false
};

var map = L.map('map', mapOptions).fitWorld();

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
    position: 'bottomright',
    showPopup: false
}

map_base.addTo(map);

var scale = L.control.scale().addTo(map);
var zoom = L.control.zoom(zoomOptions).addTo(map);
var lc = L.control.locate(locateOptions).addTo(map);
lc.start();

iconParking = L.divIcon({
    className: 'custom-div-icon',
    html: "<div style='background-color:blue;' class='marker-pin'></div><i class='fa fa-car awesome'>",
    iconSize: [30, 42],
    iconAnchor: [15, 42]
});

iconStart = L.divIcon({
    className: 'custom-div-icon',
    html: "<div style='background-color:green;' class='marker-pin'></div><i class='fa fa-play awesome'>",
    iconSize: [30, 42],
    iconAnchor: [15, 42]
});

iconFinish = L.divIcon({
    className: 'custom-div-icon',
    html: "<div style='background-color:red;' class='marker-pin'></div><i class='fa fa-flag-checkered awesome'>",
    iconSize: [30, 42],
    iconAnchor: [15, 42]
});

new L.GPX(url, {
  async: true,
  polyline_options: {
    color: 'red',
    opacity: 0.5,
    weight: 6,
    lineCap: 'round'
  },
  marker_options: {
    shadowUrl: '',
    clickable: false,
    startIcon: iconStart,
    endIcon: iconFinish
  }
}).on('loaded', function(e) {
  map.fitBounds(e.target.getBounds());
}).addTo(map);

L.marker(parking, {icon: iconParking}).addTo(map);
