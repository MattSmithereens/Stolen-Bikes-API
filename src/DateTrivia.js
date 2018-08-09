export class DateFactAPI{
  getTriviaFact(month, day) {
    return new Promise(function(resolve, reject) {
      let request = new XMLHttpRequest();
      let url = `http://numbersapi.com/${month}/${day}/date?json`
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
