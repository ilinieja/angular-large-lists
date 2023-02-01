import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

import { CrudService } from 'src/app/shared/api/crud.service';
import {
  removeDuplicatesByField,
  sortByField,
} from 'src/app/shared/utils/utils';
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

  override get() {
    return super
      .get()
      .pipe(
        map((countries) =>
          sortByField(removeDuplicatesByField(countries, 'code'), (a, b) =>
            a.name.localeCompare(b.name)
          )
        )
      );
  }
}