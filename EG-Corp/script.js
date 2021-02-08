// Google Maps API

var map;

function createMap () {
    var options = {
        center: { lat: 53.483959, lng: -2.244644 },
        zoom: 11,
    };

    map = new google.maps.Map(document.getElementById('map'), options);
}