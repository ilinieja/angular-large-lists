import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CountryModel } from '../countries.model';

@Component({
  selector: 'app-countries-list-item',
  templateUrl: './countries-list-item.component.html',
  styleUrls: ['./countries-list-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountriesListItemComponent {
  @Input() country?: CountryModel;
}
