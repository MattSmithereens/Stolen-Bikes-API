import {BikeIndexAPI} from './bike-index';
import {GeocoderAPI} from './geocoder';
import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

$(document).ready(function() {
  let newGeoCoder = new GeocoderAPI();  // create instance of WeatherService class
  let latLong = newGeoCoder.getLatLong("97203");

  latLong.then(function(response) {
    let body = JSON.parse(response);
    let lat = body.results["0"].geometry.location.lat;
    let long = body.results["0"].geometry.location.lng;
    let newBikeIndex = new BikeIndexAPI();
    let stolenBikes = newBikeIndex.getStolenBikes(lat, long);

    stolenBikes.then(function(response) {
      let body = JSON.parse(response);
      console.log(body);
    }, function(error) {
      console.log(error);
    });

  }, function(error) {
    console.log(error);
  });
});
