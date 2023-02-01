import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CountriesPageComponent } from './countries-page/countries-page.component';
import { ListModule } from '../shared/list/list.module';
import { CountriesListItemComponent } from './countries-list-item/countries-list-item.component';
import { ResourceService } from '../shared/api/resource.service';
import { CountryModel } from './api/country.model';
import { CountriesService } from './api/countries.service';

@NgModule({
  declarations: [CountriesPageComponent, CountriesListItemComponent],
  imports: [CommonModule, ListModule],
  providers: [
    CountriesService,
    { provide: ResourceService<CountryModel>, useExisting: CountriesService },
  ],
})
export class CountriesModule {}
