import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";
import {debounceTime, distinctUntilChanged, Subject, takeUntil} from "rxjs";
import {CityService} from "../services/city.service";
import {City} from "../common/model";

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css']
})
export class CityComponent implements OnInit, OnDestroy {
  cityControl = new FormControl('');
  cities: City[] = [];
  destroy$ = new Subject<void>();

  constructor(private cityService: CityService) {
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

  searchWeather(cityName: string) {
    console.log(cityName)
  }
}
