export class BikeIndexAPI{
  getStolenBikes(lat, lng) {
    return new Promise(function(resolve, reject) {
      let request = new XMLHttpRequest();
      let url = `https://bikeindex.org:443/api/v2/bikes_search/stolen?page=1&proximity=${lat},${lng}&proximity_square=10`;

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
