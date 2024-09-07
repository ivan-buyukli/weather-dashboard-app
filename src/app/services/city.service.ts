import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {CITY_API_KEY_TOKEN, CITY_AUTOCOMPLETE_URL, CITY_QUERY_PARAMS} from "../common/constants";
import {Observable} from "rxjs";
import {City} from "../common/model";
import {plainToInstance} from "class-transformer";

@Injectable(
    {
        providedIn: "root"
    })
export class CityService {

    constructor(private httpClient: HttpClient) {
    }

    findCityGeoLocations(cityName: string | null): any[] {
        let response: Observable<any> = new Observable();
        if (this.isNotBlank(cityName)) {
            response = this.httpClient.get(this.buildAutocompleteUrl(CITY_AUTOCOMPLETE_URL, CITY_API_KEY_TOKEN, CITY_QUERY_PARAMS, cityName));
        }
        return this.mapResponseToCityArray(response);
    }

    private buildAutocompleteUrl(baseUrl: string, accessToken: string, query: string, cityName: string | null): string {
        const city = cityName ? cityName : '';
        const queryParams = query.replace('{city}', city);
        return `${baseUrl}${accessToken}${queryParams}`;
    }

    private mapResponseToCityArray(response: Observable<any>): City[] {
        let cityArray: City[] = [];
        response.subscribe((cities) => {
            cities.forEach((data: Object) => {
                const city = plainToInstance(City, data);
                if (city.type === 'city') {
                  cityArray.push(city);
                }
            })
        });
        return cityArray;
    }

    private isNotBlank(str: string | null): boolean {
        return !!str && str.trim().length > 0;
    }
}
