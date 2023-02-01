import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { ResourceService } from 'src/app/shared/api/resource.service';
import { environment } from 'src/environments/environment';

import { PaymentModel } from './payment.model';

export const paymentsApiUrl = `${environment.apiUrl}/payments`;

@Injectable({
  providedIn: 'root',
})
export class PaymentsService extends ResourceService<PaymentModel> {
  constructor(private http: HttpClient) {
    super(http, PaymentModel, paymentsApiUrl);
  }
}
