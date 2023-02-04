import { ChangeDetectionStrategy, Component } from '@angular/core';

import { ResourceService } from 'src/app/shared/resource/resource.service';

import { CountriesService } from '../countries.service';
import { CountryModel } from '../countries.model';

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
