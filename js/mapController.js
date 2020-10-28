import { mapService } from './services/mapService.js'

var gMap;

// mapService.getLocs()
//     .then(locs => console.log('locs', locs))


function onAskLocation() {
    const elLocation = document.querySelector('input[name="location"]').value;
    mapService.askLocation(elLocation)
        .then(ans => {
            console.log('Controller Got:', ans);
            //TO DO REMOVE PREV MARKER
            addMarker(ans);
            panTo(ans);
            
            mapService.setLocation(ans);
            
        })
        .catch(err => {
            console.log('Had Issues', err);

            //TO DO ADD MODAL
            // alert('Please re-enter location');
        })
}

function onMapClick(lat, lng, map) {
    addMarker(lat, lng);
    panTo(lat, lng);
    var placeId = createPlace(lat, lng, name);
    // renderPlacesList(placeId);
}

window.onload = () => {
    initMap()
        .then(() => {

            addMarker({ lat: 32.0749831, lng: 34.9120554 });
        })
        .catch(console.log('INIT MAP ERROR'));

    getPosition()
        .then(pos => {

            console.log('User position is:', pos.coords);
        })
        .catch(err => {
            console.log('err!!!', err);
        })
}


document.querySelector('.go-btn').addEventListener('click', onAskLocation);
document.querySelector('#map').addEventListener('click', (ev, map) => {
    onMapClick(ev.latLng.lat(), ev.latLng.lng(), map);
});


export function initMap(lat = 32.0749831, lng = 34.9120554) {
    console.log('InitMap');
    return _connectGoogleApi()
        .then(() => {
            console.log('google available');
            gMap = new google.maps.Map(
                document.querySelector('#map'), {
                center: { lat, lng },
                zoom: 15
            })
            console.log('Map!', gMap);
        })
}

function addMarker(lat, lng) {
    var marker = new google.maps.Marker({
        position: { lat, lng },
        map: gMap,
        title: 'Hello World!'
    });
    return marker;
}

function panTo(lat, lng) {
    var laLatLng = new google.maps.LatLng(lat, lng);
    // console.log(laLatLng)
    gMap.panTo(laLatLng);
}

function getPosition() {
    console.log('Getting Pos');

    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })
}


function getLocation() {

}

function _connectGoogleApi() {
    if (window.google) return Promise.resolve()
    const API_KEY = 'AIzaSyDGypLOJoL1NOMoJRqBiGsUZa7aRlA0Snk';
    var elGoogleApi = document.createElement('script');
    elGoogleApi.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}`;
    elGoogleApi.async = true;
    document.body.append(elGoogleApi);

    return new Promise((resolve, reject) => {
        elGoogleApi.onload = resolve;
        elGoogleApi.onerror = () => reject('Google script failed to load')
    })
}



