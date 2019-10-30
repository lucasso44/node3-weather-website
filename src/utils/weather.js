const request = require('request');

const getGeocode = (address, callback) => {
    const mapboxUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoibHVjYXNsYXdlc2Nsb3VkIiwiYSI6ImNrMmQ3ZWt3ZDBjcmMzbnFiNGx2ZmllanEifQ.kFTesTF65vu732Spap1hkQ&limit=1`;   
    request({ url: mapboxUrl }, (err, res) => {
        const data = JSON.parse(res.body);
        const placeName = data.features[0].place_name;
        const lng = data.features[0].center[0];
        const lat = data.features[0].center[1];
        callback({
            placeName,
            lng,
            lat
        });
    });    
};

const getWeather = (address, callback) => {
    getGeocode(address, (geoCode) => {
        const weatherUrl = `https://api.darksky.net/forecast/7d2226ff88a79d4c4652e3e3e84e0820/${geoCode.lat},${geoCode.lng}`;
        request({ url: weatherUrl }, (err, res) => {
            const data = JSON.parse(res.body);
            callback({
                placeName: geoCode.placeName,
                temperature: data.currently.temperature
            });
        });    
    });
};

module.exports = getGeocode;
module.exports = getWeather;