import {Injectable} from "@angular/core";
import {fetchWeatherApi} from "openmeteo";
import {WEATHER_URL} from "../common/constants";
import {City, WeatherParams} from "../common/model";
import {getWeatherData} from "../common/weather.helper";

@Injectable({
  providedIn: "root"
})
export class WeatherService {

  async fetchWeatherApi(city: City) {
    return await fetchWeatherApi(WEATHER_URL, this.buildParameters(city));
  }

  findWeatherDetailsByCity(city: City) {
    this.fetchWeatherApi(city).then(response => console.log(getWeatherData(response).daily.temperatureMax))
  }

  private buildParameters(city: City): WeatherParams {
    return {
      latitude: [parseFloat(city.lat)],
      longitude: [parseFloat(city.lon)],
      current: 'temperature_2m,weather_code,wind_speed_10m,wind_direction_10m',
      hourly: 'temperature_2m,precipitation',
      daily: 'weather_code,temperature_2m_max,temperature_2m_min'
    }
  }
}
