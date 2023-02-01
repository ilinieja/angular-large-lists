import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BehaviorSubject, map, shareReplay, startWith, switchMap } from 'rxjs';

import { CountriesService } from '../api/countries.service';

@Component({
  selector: 'app-countries-list',
  templateUrl: './countries-list.component.html',
  styleUrls: ['./countries-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountriesListComponent {
  readonly searchQuery = new BehaviorSubject<string>('');

  readonly countries = this.searchQuery.pipe(
    switchMap((query) => this.countriesService.get({ query })),
    shareReplay(1)
  );

  readonly countriesLoading = this.countries.pipe(
    map(Boolean),
    startWith(true)
  );

  constructor(private readonly countriesService: CountriesService) {}

  onSearchChange(query: string) {
    this.searchQuery.next(query);
  }
}
