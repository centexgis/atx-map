//create var bounds
var northWest = L.latLng(30.52, -98.03),
    southEast = L.latLng(30.00, -97.50),
    bounds = L.latLngBounds(northWest, southEast);

//create map - zoom to var bounds
var map = L.map('map');
map.fitBounds(bounds);

//load osm basemap tiles
L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

//custom easy button control, zoom to var bounds
L.easyButton('fa-globe fa-lg', function(){
    map.fitBounds(bounds)
}).addTo(map);

//load adelberts marker location and popup info
var marker = L.marker([30.27384, -97.74058], {title: "Austin, TX"});

var markerContent = "<strong>CenTexGIS</strong>" + "<br>" + "Austin, TX";

marker.bindPopup(markerContent).addTo(map);
