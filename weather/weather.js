const request = require('request');
const getWeather = {
    getWeather: function geocode(lat, long, callback) {
        request({
            url: `https://api.darksky.net/forecast/82619e570ab3ce516fe9019d5e1e9923/${lat},${long}`,
            json: true
        }, function(error, response, body) {
            if (error) {
                callback('unable to contact forecast.io server.', null);
            } else if (response.statusCode === 400) {
                callback('unable to fetch weather', null);
            } else if (response.statusCode === 200) {
                callback(undefined, body.currently.temperature);
            }
        });
    }
};

module.exports = getWeather;