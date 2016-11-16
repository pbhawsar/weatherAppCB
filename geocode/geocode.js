const request = require('request');
const geocode = {
    geocode: function geocode(address, callback) {
        request({
            url: 'http://maps.googleapis.com/maps/api/geocode/json?address=' + encodeURIComponent(address),
            json: true
        }, function(error, response, body) {
            if (error) {
                callback(error, null);
            } else if (body.status === 'ZERO_RESULTS') {
                callback('invalid address format', null);
            } else if (body.status === 'OK') {
                callback(error, {
                    address: body.results[0].formatted_address,
                    longitude: body.results[0].geometry.location.lng,
                    latitude: body.results[0].geometry.location.lat
                });
            }
        });
    }
};

module.exports = geocode;