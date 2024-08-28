import {Component, OnInit} from '@angular/core';
import {fetchWeatherApi} from "openmeteo";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'weather-dashboard-app';
  params = {
    latitude: [52.54],
    longitude: [13.41],
    current: 'temperature_2m,weather_code,wind_speed_10m,wind_direction_10m',
    hourly: 'temperature_2m,precipitation',
    daily: 'weather_code,temperature_2m_max,temperature_2m_min'
  };
  url = 'https://api.open-meteo.com/v1/forecast';

  async fetchWeatherApi() {
    return await fetchWeatherApi(this.url, this.params);
  }

  ngOnInit(): void {
    this.fetchWeatherApi().then(response => console.log(response[0].daily()?.variables(1)?.valuesArray()))
  }
}
