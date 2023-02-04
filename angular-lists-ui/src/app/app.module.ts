import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatTabsModule } from '@angular/material/tabs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {
  MatSnackBarModule,
  MAT_SNACK_BAR_DEFAULT_OPTIONS,
} from '@angular/material/snack-bar';
import { LoggerModule, NgxLoggerLevel } from 'ngx-logger';

import { environment } from 'src/environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CountriesModule } from './countries/countries.module';
import { UsersModule } from './users/users.module';
import { PaymentsModule } from './payments/payments.module';
import { CacheInterceptor } from './shared/cache/cache.interceptor';
import { ErrorsInterceptor } from './shared/errors/errors.interceptor';
import { GlobalErrorHandler } from './shared/errors/global-error-handler';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CountriesModule,
    UsersModule,
    PaymentsModule,
    MatTabsModule,
    MatSnackBarModule,
    LoggerModule.forRoot({
      // Log everything in dev and only errors in prod.
      level: environment.production
        ? NgxLoggerLevel.ERROR
        : NgxLoggerLevel.TRACE,
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CacheInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorsInterceptor,
      multi: true,
    },
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandler,
    },
    {
      provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
      useValue: { duration: 3000 },
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
