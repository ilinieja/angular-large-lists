import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavModule } from './shared/nav/nav.module';

export const imports = [
  BrowserModule,
  AppRoutingModule,
  BrowserAnimationsModule,
  NavModule,
];
@NgModule({
  declarations: [AppComponent],
  imports,
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
