import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavModule } from './shared/nav/nav.module';
import { HttpClientModule } from '@angular/common/http';
import { CountriesModule } from './countries/countries.module';
import { UsersModule } from './users/users.module';
import { PaymentsModule } from './payments/payments.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NavModule,
    HttpClientModule,
    CountriesModule,
    UsersModule,
    PaymentsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
