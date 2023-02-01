import { ChangeDetectionStrategy, Component } from '@angular/core';

import { ResourceService } from 'src/app/shared/api/resource.service';

import { AggregatedPaymentsService } from '../api/aggregated-payments.service';
import { AggregatedPaymentModel } from '../api/payment.model';

@Component({
  selector: 'app-payments-page',
  templateUrl: './payments-page.component.html',
  styleUrls: ['../../shared/styles/page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: ResourceService<AggregatedPaymentModel>,
      useExisting: AggregatedPaymentsService,
    },
  ],
})
export class PaymentsPageComponent {}
