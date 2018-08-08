import {BikeIndexAPI} from './bike-index';
import {GeocoderAPI} from './geocoder';
import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

$(document).ready(function() {
  $(".bike-zip").submit(function(event){
    event.preventDefault();
    let zip = $("#zip").val();
    $('#results').text("");
    $('#zip').val("");
    let newGeoCoder = new GeocoderAPI();  // create instance of WeatherService class
    let latLong = newGeoCoder.getLatLong(zip);

    latLong.then(function(response) {
      let body = JSON.parse(response);
      let lat = body.results["0"].geometry.location.lat;
      let long = body.results["0"].geometry.location.lng;
      let newBikeIndex = new BikeIndexAPI();
      let stolenBikes = newBikeIndex.getStolenBikes(lat, long);

      stolenBikes.then(function(response) {
        let body = JSON.parse(response);
debugger;
        for (let i = 0; i <= body.bikes.length; i++){
          console.log(i);
          $('#results').append("<li>" + body.bikes[i].title + "</li>");
        }
      }, function(error) {
        console.log(error);
      });

    }, function(error) {
      console.log(error);
    });
  });
});
