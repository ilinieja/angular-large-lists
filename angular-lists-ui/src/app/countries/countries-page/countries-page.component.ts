import { ChangeDetectionStrategy, Component } from '@angular/core';

import { ResourceService } from 'src/app/shared/api/resource.service';

import { CountriesService } from '../api/countries.service';
import { CountryModel } from '../api/country.model';

@Component({
  selector: 'app-countries-page',
  templateUrl: './countries-page.component.html',
  styleUrls: ['../../shared/styles/page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: ResourceService<CountryModel>,
      useExisting: CountriesService,
    },
  ],
})
export class CountriesPageComponent {}
