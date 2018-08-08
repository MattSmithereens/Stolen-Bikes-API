export class GeocoderAPI{
  getLatLong(zip) {
    return new Promise(function(resolve, reject) {
      let request = new XMLHttpRequest();
      let url = `https://maps.googleapis.com/maps/api/geocode/json?address=${zip}&key=${process.env.API_KEY}`;

      request.onload = function() {
        if (this.status === 200) {
          resolve(request.response);
        } else {
          reject(Error(request.statusText));
        }
      };
      request.open("GET", url, true);
      request.send();
    });
  }
}
