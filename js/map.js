//create var bounds
var northWest = L.latLng(30.404, -97.815),
    southEast = L.latLng(30.189, -97.660),
    bounds = L.latLngBounds(northWest, southEast);

//create map - zoom to var bounds
var map = L.map('map', { dragging: !L.Browser.mobile });
map.fitBounds(bounds);

//load osm basemap tiles
L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

//custom easy button control, zoom to var bounds
L.easyButton('fa-globe fa-lg', function(){
    map.fitBounds(bounds)
}).addTo(map);

//load centexgis marker location and popup info
var marker = L.marker([30.27384, -97.74058]);
var markerContent = "<strong>CenTex GIS</strong><br>" + "<i>in Austin, TX</i>";
marker.addTo(map).bindPopup(markerContent, {autoClose:false}).openPopup();

//geocode last meeting location from address
var request = "https://nominatim.openstreetmap.org/search?q=10431+Morado+Circle,+Austin&format=json&polygon=1&addressdetails=1";	
$(document).ready(function(){
    $.ajax({
        url: request,
        dataType: 'json',
        success: function(response) {
            //Add last meeting popup to map
            var popupLocation = new L.LatLng(response[0].lat, response[0].lon);
            var popupContent = "<span style='color:steelblue;'>Last Meeting:</span><br><span style='color:steelblue;'>Freese & Nichols - 4/3/18</span>";
            var popup = new L.Popup();
            popup.setLatLng(popupLocation);
            popup.setContent(popupContent);
            map.addLayer(popup);

            //Add last meeting marker to map
            var marker = L.marker([response[0].lat, response[0].lon]);
            map.addLayer(marker);
        },
        error: function(xhr, st, et) {
        console.warn(et);
        }
    });
});

