import { ChangeDetectionStrategy, Component } from '@angular/core';
import { map, shareReplay, startWith } from 'rxjs';

import { CountriesService } from '../api/countries.service';

@Component({
  selector: 'app-countries-list',
  templateUrl: './countries-list.component.html',
  styleUrls: ['./countries-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountriesListComponent {
  readonly countries = this.countriesService.get().pipe(shareReplay(1));

  readonly countriesLoading = this.countries.pipe(
    map(Boolean),
    startWith(true)
  );

  constructor(private readonly countriesService: CountriesService) {}
}
