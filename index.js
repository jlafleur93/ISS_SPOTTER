const {nextISSTimesForMyLocation} = require('./iss.js');

/* fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }

  console.log('It worked! Returned IP:' , ip);
}); */

/* fetchCoordsByIP('173.180.233.63', (error,coords) =>{
  if (error) {
    console.log("it didn't work", error);
    return;
  }
  console.log("it worked", coords);
});
 */
/* const testCords = { latitude: '50.88690', longitude: '-120.73570' };
fetchISSFlyOverTimes(testCords, (error, passes) => {
  if (error) {
    console.log("it didnt work", error);
    return;
  }
  console.log("it worked", passes);
});
 */
const printPassTimes = function(passTimes) {
  for (const pass of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};
nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work", error);
  }
  printPassTimes(passTimes);
});


