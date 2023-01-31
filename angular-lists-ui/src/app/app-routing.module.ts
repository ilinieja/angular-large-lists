import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CountriesPageComponent } from './countries/countries-page/countries-page.component';
import { PaymentsPageComponent } from './payments/payments-page/payments-page.component';
import { UsersPageComponent } from './users/users-page/users-page.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'users',
    pathMatch: 'full',
  },
  {
    path: 'users',
    component: UsersPageComponent,
  },
  {
    path: 'countries',
    component: CountriesPageComponent,
  },
  {
    path: 'payments',
    component: PaymentsPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
