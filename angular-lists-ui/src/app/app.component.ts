import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * Displays root router outlet and navigation.
 * Navigation is better be moved to separate component as it grows.
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {}
