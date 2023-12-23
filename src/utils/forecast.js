const request = require('postman-request');

const forecast = (lat, long, callback) => {
    url = 'http://api.weatherapi.com/v1/current.json?key=bc2cb7a20ee340ac89c63828232112&q='+lat+','+long;

    request({url, json: true}, (error, {body}) => {
        if(error){
            callback('Unable to connect weather service!!', undefined);
            return;
        } else if(body.error){
            callback('Unable to find location!!', undefined);
            return;
        }

        callback(undefined, body.current.condition.text+'. It is '+body.current.temp_c+' degree celcious and it feels like '+body.current.feelslike_c+' degree celcious currently.');
    });
};

module.exports = forecast;