import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, of } from 'rxjs';

import {
  GetParams,
  ResourceService,
} from 'src/app/shared/api/resource.service';

import { AggregatedPaymentModel, PAYMENT_STATUSES } from './payment.model';
import { PaymentsService } from './payments.service';

@Injectable({
  providedIn: 'root',
})
export class AggregatedPaymentsService extends ResourceService<AggregatedPaymentModel> {
  constructor(private readonly paymentsService: PaymentsService) {
    super();
  }

  /** Not implemented */
  override create(resource: Partial<AggregatedPaymentModel>) {
    return of(resource as AggregatedPaymentModel);
  }

  /** Returns payments grouped and counted by status. */
  override get(params?: GetParams) {
    return this.paymentsService.get(params).pipe(
      map((payments) => {
        const statusCounts: { [status: string]: number } = {};

        for (let payment of payments) {
          if (statusCounts[payment.status]) {
            statusCounts[payment.status]++;
          } else {
            statusCounts[payment.status] = 1;
          }
        }

        return Object.entries(statusCounts).map(
          (statusCount) =>
            new AggregatedPaymentModel({
              id: statusCount[0],
              status: PAYMENT_STATUSES[statusCount[0]] ?? statusCount[0],
              count: statusCount[1],
            })
        );
      })
    );
  }

  override getById(id: string) {
    return this.get().pipe(
      map((payments) => payments.find((payment) => payment.id === id))
    );
  }

  /** Not implemented */
  override update(resource: Partial<AggregatedPaymentModel>) {
    return of(resource as AggregatedPaymentModel);
  }

  /** Not implemented */
  override delete(id: string) {
    return of();
  }
}
