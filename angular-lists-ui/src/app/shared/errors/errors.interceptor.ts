import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, retry, timer } from 'rxjs';
import { catchError } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EMPTY } from 'rxjs';
import { NGXLogger } from 'ngx-logger';

/**
 * Handles HTTP errors.
 * Does several retries, then shows snackbar and logs error.
 */
@Injectable()
export class ErrorsInterceptor implements HttpInterceptor {
  constructor(
    private readonly snackBar: MatSnackBar,
    private readonly logger: NGXLogger
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      retry({
        count: 3,
        delay: (_, retryCount) => timer(retryCount * 1000),
      }),
      catchError((error: Error) => {
        this.logger.error(error);
        this.snackBar.open('Oops, there was a server error', 'Eh');

        return EMPTY;
      })
    );
  }
}
