const request = require('postman-request');

const geocode = (address, callback) => {
    const locationUrl = 'https://api.maptiler.com/geocoding/'+encodeURIComponent(address)+'.json?key=11qKSZ2Tk8h56AgK5HdE&fuzzyMatch=false&limit=1';

    request({url: locationUrl, json: true},(error, {body}) => {
        if(error){
            callback('Unable to connect geocode!!', undefined);
            return;
        } else if(body.features.length === 0){
            callback('Unable to find locaion!!', undefined);
            return;
        }
        
        callback(undefined, {
            latitude: body.features[0].center[1],
            longitude: body.features[0].center[0],
            location: body.features[0].place_name
        });
    });
};

module.exports = geocode;