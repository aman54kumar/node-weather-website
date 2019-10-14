const request = require('request');

const geoCode = (address, callback) => {
  address = encodeURIComponent(address);
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoiYW1hbjU0a3VtYXIiLCJhIjoiY2sxbzFqajFzMGMzMzNicWZxZXlnZmJpYyJ9.cbscnRErFuU_nUrJ9z11Vg&limit=1`;

  request(
    {
      url,
      json: true
    },
    (error, { body }) => {
      if (error) {
        callback('Unable to connect to the location services');
      } else if (body.features.length === 0) {
        callback('Unable to find the location. Please enter a valid location.');
      } else {
        callback(undefined, {
          latitude: body.features[0].center[1],
          longitude: body.features[0].center[0],
          location: body.features[0].place_name
        });
      }
    }
  );
};

module.exports = geoCode;
