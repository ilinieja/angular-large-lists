import { ResourceModel } from 'src/app/shared/api/resource.model';

export class PaymentModel extends ResourceModel<PaymentModel> {
  status!: string;
  receiver!: string;
  internalFieldA!: string;
  xYZRandomField!: string;
}
