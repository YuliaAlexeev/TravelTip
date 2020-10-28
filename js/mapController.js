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
            addMarker(ans, elLocation);
            panTo(ans);
            mapService.setPlaceToStorage(ans)


            // mapService.setLocation(ans);
            renderPlaces();
        })
    // .catch(err => {
    //     console.log('Had Issues', err);

    //     //TO DO ADD MODAL
    //     // alert('Please re-enter location');
    // })
}

function renderPlaces() {
    let places = mapService.createPlaces();
    console.log(places, 'places');
    console.log(typeof places)

    let htmlStrs = places.map(place => {
        return `
            <div class="location-item">
                <button class="location-item-go-btn">Go</button>
                <button class="location-item-delete-btn">X</button>
                <p>${place.name}</p>
            </div>`;
    });
    document.querySelector('.locations').innerHTML = htmlStrs.join('');
}

function onMapClick(lat, lng, map) {
    mapService.setPlace(lat, lng);
    const loc = { lat, lng };
    addMarker(loc, name);
    panTo(lat, lng);
    renderPlaces();
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
// document.querySelector('.my-loc-btn').addEventListener('click', onAskLocation);


// window.navigator.geolocation
//     .getCurrentPosition(console.log, console.log);


export function initMap(lat = 32.0749831, lng = 34.9120554) {
    return _connectGoogleApi()
        .then(() => {
            gMap = new google.maps.Map(
                document.querySelector('#map'), {
                center: { lat, lng },
                zoom: 15
            })
            gMap.addListener("click", (ev) => {
                onMapClick(ev.latLng.lat(), ev.latLng.lng(), gMap);
            })
        });
}

function addMarker(loc, title) {
    var marker = new google.maps.Marker({
        position: loc,
        map: gMap,
        title
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



