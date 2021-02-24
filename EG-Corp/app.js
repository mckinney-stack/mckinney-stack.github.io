// Google Maps API

let map;

function createMap () {
    let options = {
        center: { lat: 53.483959, lng: -2.244644 },
        zoom: 11,
    };

    map = new google.maps.Map(document.getElementById('map'), options);
}
