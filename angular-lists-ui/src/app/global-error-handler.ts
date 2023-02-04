import { ErrorHandler, Injectable, NgZone } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NGXLogger } from 'ngx-logger';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor(
    private readonly snackBar: MatSnackBar,
    private readonly logger: NGXLogger,
    private zone: NgZone
  ) {}

  handleError(error: unknown): void {
    /**
     *  We're outside Angular zone here and snackbar needs CD.
     *  Put it back into Angular zone manually.
     */
    this.zone.run(() => {
      this.snackBar.open('Oops, there was an error', 'Ah');
    });
    this.logger.fatal(error);
  }
}
