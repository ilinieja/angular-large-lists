import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { countriesApiUrl, CountriesService } from './countries.service';
import { CountryModel } from './country.model';

import countriesResponse from './testing/countries-response.json';
import normalizedCountries from './testing/normalized-countries.json';
import filteredCountries from './testing/filtered-countries.json';

describe('CountriesService', () => {
  let httpController: HttpTestingController;
  let service: CountriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    httpController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(CountriesService);
  });

  it('should normalize countries response', () => {
    service.get().subscribe((res) => {
      expect(res).toEqual(
        normalizedCountries.map((country) => new CountryModel(country))
      );
    });

    const req = httpController.expectOne({
      method: 'GET',
      url: `${countriesApiUrl}`,
    });
    req.flush(countriesResponse);
  });

  it('should filter countries response if query provided', () => {
    service.get({ query: ' aR ' }).subscribe((res) => {
      expect(res).toEqual(
        filteredCountries.map((country) => new CountryModel(country))
      );
    });

    const req = httpController.expectOne({
      method: 'GET',
      url: `${countriesApiUrl}`,
    });
    req.flush(countriesResponse);
  });
});
