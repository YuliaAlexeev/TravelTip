

// function createPlace(lat, lng, name){
//     return {
//         id: makeId(), 
//         name, 
//         lat, 
//         lng, 
//         // weather, 
//         // createdAt, 
//         // updatedAt
//     }
// }

function askLocation(location) {
    
    const prmRes = axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=AIzaSyDGypLOJoL1NOMoJRqBiGsUZa7aRlA0Snk`);
  
    const prmLoc = prmRes.then(res => {return res.data.results[0].geometry.location});
    return prmLoc;

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

// function createPlaces(){
//     let placesData = loadFromStorage(STORAGE_PLACES_KEY) || createPlace();
//     return placesData;
// }



export const mapService = {
    getLocs: getLocs,
    askLocation: askLocation
};
var locs = [{ lat: 11.22, lng: 22.11 }];

function getLocs() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(locs);
        }, 2000);
    });
}
