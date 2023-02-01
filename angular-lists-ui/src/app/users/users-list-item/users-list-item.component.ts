import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { UserModel } from '../api/user.model';

@Component({
  selector: 'app-users-list-item',
  templateUrl: './users-list-item.component.html',
  styleUrls: ['./users-list-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersListItemComponent {
  @Input() user?: UserModel;
}
