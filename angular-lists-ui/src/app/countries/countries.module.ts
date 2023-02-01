import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CountriesPageComponent } from './countries-page/countries-page.component';
import { ListModule } from '../shared/list/list.module';
import { CountriesListItemComponent } from './countries-list-item/countries-list-item.component';

@NgModule({
  declarations: [CountriesPageComponent, CountriesListItemComponent],
  imports: [CommonModule, ListModule],
})
export class CountriesModule {}
