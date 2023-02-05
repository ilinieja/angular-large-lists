import { ChangeDetectionStrategy, Component } from '@angular/core';

import { SelectionsService } from 'src/app/selections/selections.service';
import { ResourceService } from 'src/app/shared/resource/resource.service';

import { UserModel } from '../user.model';
import { UsersService } from '../users.service';

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
export class UsersPageComponent {
  listControl = this.selectionsService.usersControl;

  constructor(private readonly selectionsService: SelectionsService) {}
}
