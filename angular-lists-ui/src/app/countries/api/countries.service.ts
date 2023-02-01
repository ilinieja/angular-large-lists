import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

import {
  ResourceService,
  GetParams,
} from 'src/app/shared/api/resource.service';
import {
  removeDuplicatesByField,
  sortByField,
} from 'src/app/shared/utils/utils';
import { environment } from 'src/environments/environment';

import { CountryModel } from './country.model';

export const countriesApiUrl = `${environment.apiUrl}/countries`;

@Injectable()
export class CountriesService extends ResourceService<CountryModel> {
  constructor(private http: HttpClient) {
    super(http, CountryModel, countriesApiUrl);
  }

  override get({ query }: GetParams = {}) {
    return super.get().pipe(
      map((countries) => {
        const normalizesCountries = sortByField(
          removeDuplicatesByField(countries, 'code'),
          (a, b) => a.name.localeCompare(b.name)
        );

        return query
          ? normalizesCountries.filter((country) =>
              countryMatchesQuery(country, query)
            )
          : normalizesCountries;
      })
    );
  }
}

function countryMatchesQuery(country: CountryModel, query: string) {
  return (
    country.name.toLocaleLowerCase().includes(query.toLocaleLowerCase()) ||
    country.code.toLocaleLowerCase() === query.toLocaleLowerCase()
  );
}
