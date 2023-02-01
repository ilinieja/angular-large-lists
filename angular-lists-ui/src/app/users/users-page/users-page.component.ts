import { ChangeDetectionStrategy, Component } from '@angular/core';

import { ResourceService } from 'src/app/shared/api/resource.service';

import { UserModel } from '../api/user.model';
import { UsersService } from '../api/users.service';

@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrls: ['../../shared/styles/page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: ResourceService<UserModel>,
      useExisting: UsersService,
    },
  ],
})
export class UsersPageComponent {}
