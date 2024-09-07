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
        debounceTime(500),
        distinctUntilChanged(),
        takeUntil(this.destroy$)
      )
      .subscribe((cityName) => {
        this.cities = this.cityService.findCityGeoLocations(cityName);
      })
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
