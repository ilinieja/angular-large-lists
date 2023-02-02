import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentsPageComponent } from './payments-page/payments-page.component';
import { ListModule } from '../shared/resource-list/resource-list.module';
import { PaymentsListItemComponent } from './payments-list-item/payments-list-item.component';

@NgModule({
  declarations: [PaymentsPageComponent, PaymentsListItemComponent],
  imports: [CommonModule, ListModule],
})
export class PaymentsModule {}
