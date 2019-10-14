const request = require('request');

const forecast = (latitude, longitude, callback) => {
  location = encodeURIComponent(`${latitude},${longitude}`);
  const url = `https://api.darksky.net/forecast/6641a36183381f4becf04bd78d105929/${location}?units=si`;

  request(
    {
      url,
      json: true
    },
    (error, { body }) => {
      if (error) {
        callback('There was an error getting the response from server');
      } else if (body.error) {
        callback('Unable to find location');
      } else {
        const currently = body.currently;
        const daily = body.daily;
        callback(
          undefined,
          `${body.daily.data[0].summary} It is currently ${currently.temperature} degrees out. The high today is ${daily.data[0].temperatureHigh} with a low of ${daily.data[0].temperatureLow}. There is a ${currently.precipProbability} % chance of rain.`
        );
      }
    }
  );
};

module.exports = forecast;
