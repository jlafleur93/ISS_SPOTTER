const request = require('request');

const fetchMyIP = function(callback) {
  request('https://api.ipify.org/?format=json',(error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    // if non-200 status, assume server error
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    let ip = JSON.parse(body).ip;
    console.log(body);
    (callback(null,ip));
  });
};

const fetchCoordsByIP = function(ip, callback) {
  request(`https://ipvigilante.com/json/${ip}`, (error, response, body) =>{
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `status code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    // Accesses the Latitude/Longitude of the body.data object //
    const {latitude, longitude} =  JSON.parse(body).data;
    callback(null, {latitude, longitude});
  });
};

const fetchISSFlyOverTimes = function(coords, callback) {
  let nasaURL = `http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}`;
  request(nasaURL,(error, response, body) =>{
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `status code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const passes = JSON.parse(body).response;
    callback(null,passes);
  });
};
module.exports = { fetchMyIP,
  fetchCoordsByIP,
  fetchISSFlyOverTimes
};
//IF no error is found passes ip/whatever data onto the next point
//
const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error, ip) => {
    console.log(`ip in fetchmy ip`, ip);
    if (error) {
      return callback(error, null)
    }
    fetchCoordsByIP(ip, (error, coords) => {
      console.log(`ip in fetch coords`,ip);
      console.log(`coords in fetch my coords byip`,coords);
      if (error) {
        return callback(error, null);
      }
      fetchISSFlyOverTimes(coords,(error, passes) => {
        console.log(`coords in fetchISS`,coords);
        if (error) {
          return callback(error, null);
        }
        callback(null,passes);
      });
    });

  });
};

module.exports = {nextISSTimesForMyLocation};