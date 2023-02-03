import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { AggregatedPaymentsService } from './aggregated-payments.service';
import { AggregatedPaymentModel } from './payment.model';

import paymentsResponse from './testing/payments-response.json';
import aggregatedPayments from './testing/aggregated-payments.json';
import filteredPayments from './testing/filtered-payments.json';
import { paymentsApiUrl } from './payments.service';

describe('AggregatedPaymentsService', () => {
  let httpController: HttpTestingController;
  let service: AggregatedPaymentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    httpController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(AggregatedPaymentsService);
  });

  it('should aggregate payments response', () => {
    service.get().subscribe((res) => {
      expect(res).toEqual(
        aggregatedPayments.map((payment) => new AggregatedPaymentModel(payment))
      );
    });

    const req = httpController.expectOne({
      method: 'GET',
      url: `${paymentsApiUrl}`,
    });
    req.flush(paymentsResponse);
  });

  it('should filter payments response if query provided', () => {
    service.get({ query: ' wR ' }).subscribe((res) => {
      expect(res).toEqual(
        filteredPayments.map((payment) => new AggregatedPaymentModel(payment))
      );
    });

    const req = httpController.expectOne({
      method: 'GET',
      url: `${paymentsApiUrl}`,
    });
    req.flush(paymentsResponse);
  });
});
