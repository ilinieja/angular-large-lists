import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListModule } from '../shared/resource-list/resource-list.module';

import { UsersPageComponent } from './users-page/users-page.component';
import { UsersListItemComponent } from './users-list-item/users-list-item.component';

@NgModule({
  declarations: [UsersPageComponent, UsersListItemComponent],
  imports: [CommonModule, ListModule],
})
export class UsersModule {}
