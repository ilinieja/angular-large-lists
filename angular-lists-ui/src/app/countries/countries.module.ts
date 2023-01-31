import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CountriesPageComponent } from './countries-page/countries-page.component';
import { CountriesListComponent } from './countries-list/countries-list.component';
import { ListModule } from '../shared/list/list.module';

@NgModule({
  declarations: [CountriesPageComponent, CountriesListComponent],
  imports: [CommonModule, ListModule],
})
export class CountriesModule {}
