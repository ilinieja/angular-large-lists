import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { AggregatedPaymentModel } from '../payments.model';

@Component({
  selector: 'app-payments-list-item',
  templateUrl: './payments-list-item.component.html',
  styleUrls: ['./payments-list-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaymentsListItemComponent {
  @Input() payment?: AggregatedPaymentModel;
}
