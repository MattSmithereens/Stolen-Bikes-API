import {BikeIndexAPI} from './bike-index';
import {GeocoderAPI} from './geocoder';
import {WeatherServiceAPI} from './weather';
import {DateFactAPI} from './DateTrivia';
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
      let newWeatherForecast = new WeatherServiceAPI();
      let forecast = newWeatherForecast.getForecast(lat, long);
      forecast.then(function(response) {
        let body = JSON.parse(response);
        console.log(body);
        let sunrise = new Date(body.sys.sunrise * 1000);
        let sunset = new Date(body.sys.sunset * 1000);
        let sunriseTime = sunrise.toLocaleTimeString();
        let sunsetTime = sunset.toLocaleTimeString();
        let iconurl = `http://openweathermap.org/img/w/${body.weather["0"].icon}.png`;
        $('.weatherIcon').attr('src', iconurl);
        $('.city').text(body.name);
        $('.main').text(body.weather["0"].main);
        $('.temp').text(body.main.temp);
        $('.temp_min').text(body.main.temp_min);
        $('.temp_max').text(body.main.temp_max);
        $('.pressure').text(body.main.pressure);
        $('.humidity').text(body.main.humidity);
        $('.speed').text(body.wind.speed);
        $('.sunrise').text(sunriseTime);
        $('.sunset').text(sunsetTime);
        $('.weather').show();

        let newBikeIndex = new BikeIndexAPI();
        let stolenBikes = newBikeIndex.getStolenBikes(lat, long);

        stolenBikes.then(function(response) {
          let body = JSON.parse(response);
          for (let i = 0; i <= body.bikes.length; i++){
            let date = new Date(body.bikes[i].date_stolen * 1000);
            let dateFact = new DateFactAPI();
            let month = date.getMonth;
            let day = date.getDay;
            let triviaFact = dateFact.getTriviaFact(month, day);
              triviaFact.then(function(response) {
                let body = JSON.parse(response);
                console.log(body);
                  //$('#results').append(body.triviaFact);
              //})

            }, function(error) {
              console.log(error);
            });

            $('#results').append("<div class='col-md-6'><h3>" + body.bikes[i].title + "</h3> Frame Color: " + body.bikes[i].title +"<br>Last Known Location: " + body.bikes[i].stolen_location + "<br>Date Stolen: " + date + "</div>" );
          }

        }, function(error) {
          console.log(error);
        });
      }, function(error) {
        console.log(error);
      });
    }, function(error) {
      console.log(error);
    });
  });
});
