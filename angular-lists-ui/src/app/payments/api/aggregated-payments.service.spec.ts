import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { AggregatedPaymentsService } from './aggregated-payments.service';

describe('AggregatedPaymentsService', () => {
  let service: AggregatedPaymentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(AggregatedPaymentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
