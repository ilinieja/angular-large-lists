import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { CrudService } from 'src/app/shared/api/crud.service';
import { environment } from 'src/environments/environment';

import { CountryModel } from './country.model';

export const countriesApiUrl = `${environment.apiUrl}/countries`;

@Injectable({
  providedIn: 'root',
})
export class CountriesService extends CrudService<CountryModel> {
  constructor(private http: HttpClient) {
    super(http, CountryModel, countriesApiUrl);
  }
}
