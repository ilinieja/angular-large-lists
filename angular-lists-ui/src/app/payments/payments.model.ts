import { ResourceModel } from 'src/app/shared/resource/resource.model';

export class PaymentModel extends ResourceModel<PaymentModel> {
  status!: string;
  receiver!: string;
  internalFieldA!: string;
  xYZRandomField!: string;
}

/** Represents payments grouped and counted by status.  */
export class AggregatedPaymentModel extends ResourceModel<AggregatedPaymentModel> {
  status!: string;
  count!: number;
}

export const PAYMENT_STATUSES: { [key: string]: string } = {
  wrong_payslip: 'Wrong Payslip',
  wrong_address: 'Wrong Address',
  delivery_error: 'Delivery Error',
  successful: 'Successful',
  declined: 'Declined',
};
