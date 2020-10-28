import { storageService } from '../storage-service.js';
import { utils } from '../util-service.js';

const STORAGE_KEY = 'placesData';
var gPlacesData = [];

function createPlace(lat, lng, name) {
    return {
        id: utils.makeId(),
        name,
        lat,
        lng,
        // weather,
        // createdAt,
        // updatedAt
    };
}

function createPlaces() {
    let placesData = storageService.loadFromStorage(STORAGE_KEY);
    return placesData;
}

function setPlaceToStorage(location){
    gPlacesData.push(location)
    storageService.saveToStorage(STORAGE_KEY,gPlacesData);
}

function askLocation(location) {
    const prmRes = axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=AIzaSyDGypLOJoL1NOMoJRqBiGsUZa7aRlA0Snk`
    );

    const prmLoc = prmRes.then((res) => {
        console.log('res', res.data);
        const { lat, lng } = res.data.results[0].geometry.location;
        let place = createPlace(lat, lng, res.data.results[0].formatted_address);
        console.log('place', place)
       return place;
    });
    return prmLoc;
}

// function setLocation(loc) {
//     console.log('fffffff', loc);
//     return loc;
// }

export const mapService = {
    getLocs,
    askLocation,
    setPlaceToStorage,
    createPlaces
};

var locs = [{ lat: 11.22, lng: 22.11 }];

function getLocs() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(locs);
        }, 2000);
    });
}

// function onAddPlace(positionName, positionOnMap){
//     let place =  createPlace(positionOnMap.lat, positionOnMap.lng, positionName);
//     gUserData.places.push(place);
//     _saveUserToStorage();
// }

// function removePlace(id){
//     var placeIdx = gUserData.places.findIndex(place => id === place.id);
//     gUserData.places.splice(placeIdx, 1)
//     _saveUserToStorage();
// }
