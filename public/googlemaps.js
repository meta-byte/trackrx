// This example requires the Places library. Include the libraries=places
// parameter when you first load the API. For example:
{/* <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDwKWWEaxaECwm7_z9_AeUr2s_PZ0YZ7xs&libraries=places"> */ }

var map;

function getPosition() {
    if (navigator.geolocation)
        navigator.geolocation.getCurrentPosition(function (position) {
            console.log(position);
            initMap(position);

        });
    else
        console.log("geolocation is not supported");
}
getPosition();





function initMap(position) {

    var curLoc = { lat: position.coords.latitude, lng: position.coords.longitude }


    // Create the map.
    map = new google.maps.Map(document.getElementById('map'), {
        center: curLoc,
        zoom: 13

    });

    // Create the places service.
    var service = new google.maps.places.PlacesService(map);
    var getNextPage = null;
    var moreButton = document.getElementById('more');
    moreButton.onclick = function () {
        moreButton.disabled = true;
        if (getNextPage) getNextPage();
    };



    // Perform a nearby search.
    service.nearbySearch(
        { location: curLoc, radius: 5000, type: ['pharmacy'] },
        function (results, status, pagination) {
            if (status !== 'OK') return;

            createMarkers(results);
            moreButton.disabled = !pagination.hasNextPage;
            getNextPage = pagination.hasNextPage && function () {
                pagination.nextPage();
            };
        });
}

function createMarkers(places) {
    var bounds = new google.maps.LatLngBounds();
    var placesList = document.getElementById('places');

    for (var i = 0, place; place = places[i]; i++) {
        var image = {
            url: place.icon,
            size: new google.maps.Size(71, 71),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(17, 34),
            scaledSize: new google.maps.Size(25, 25)
        };

        var marker = new google.maps.Marker({
            map: map,
            icon: image,
            title: place.name,
            position: place.geometry.location
        });

        var li = document.createElement('li');
        li.textContent = place.name, place.adr_address;
        placesList.appendChild(li);

        bounds.extend(place.geometry.location);
    }
    map.fitBounds(bounds);
};
