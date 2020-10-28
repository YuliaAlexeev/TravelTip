import { storageService } from '../storage-service.js';
import {utils} from '../util-service.js'

const STORAGE_KEY = 'placesData';
var gPlacesData = createPlaces();

function createPlace(lat, lng, name){
    return {
        id: utils.makeId(), 
        name, 
        lat, 
        lng, 
        // weather, 
        // createdAt, 
        // updatedAt
    }
}

function createPlaces(){
    let placesData = storageService.loadFromStorage(STORAGE_KEY) || createPlace();
    return placesData;
}

function askLocation(location) {
    
    const prmRes = axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=AIzaSyDGypLOJoL1NOMoJRqBiGsUZa7aRlA0Snk`);
    
    const prmLoc = prmRes.then(res => {
        console.log('res', res.data);
        const { lat, lng } = res.data.results[0].geometry.location;
        return createPlace(lat, lng, res.data.results[0].formatted_address)
    });
    return prmLoc;
    
}

function setLocation(loc){
    console.log('loc', loc);
    storageService.saveToStorage(STORAGE_KEY, loc);
}

export const mapService = {
    getLocs,
    askLocation,
    setLocation
};

var locs = [{ lat: 11.22, lng: 22.11 }];

function getLocs() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(locs);
        }, 2000);
    });
}
