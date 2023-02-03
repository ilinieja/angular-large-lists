import { ResourceModel } from 'src/app/shared/api/resource.model';

export class UserModel extends ResourceModel<UserModel> {
  firstName!: string;
  lastName!: string;
  email!: string;
  avatarUrl!: string | null;
}
