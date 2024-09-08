import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";
import {debounceTime, distinctUntilChanged, Subject, takeUntil} from "rxjs";
import {CityService} from "../services/city.service";
import {City} from "../common/model";
import {WeatherService} from "../services/weather.service";

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css']
})
export class CityComponent implements OnInit, OnDestroy {
  cityControl = new FormControl('');
  cities: City[] = [];
  showSuggestions = false;
  destroy$ = new Subject<void>();

  constructor(private cityService: CityService, private weatherService: WeatherService) {
  }

  ngOnInit(): void {
    this.cityControl.valueChanges
      .pipe(
        debounceTime(1000),
        distinctUntilChanged(),
        takeUntil(this.destroy$)
      )
      .subscribe((cityName) => {
        this.cities = this.cityService.findCityGeoLocations(cityName);
        console.log(this.cities)
      })
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  searchWeather(city: City) {
    console.log(city.displayName)
    this.cityControl.setValue(city.displayName);
    this.cities = [];
    this.showSuggestions = false;
    this.weatherService.findWeatherDetailsByCity(city);
  }

  onFocus(): void {
    this.showSuggestions = true;
  }

  onBlur(): void {
    setTimeout(() => {
      this.showSuggestions = false;
    }, 500)
  }
}
