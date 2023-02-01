import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { ResourceService } from 'src/app/shared/api/resource.service';
import { environment } from 'src/environments/environment';

import { UserModel } from './user.model';

export const usersApiUrl = `${environment.apiUrl}/users`;

@Injectable({
  providedIn: 'root',
})
export class UsersService extends ResourceService<UserModel> {
  constructor(private http: HttpClient) {
    super(http, UserModel, usersApiUrl);
  }
}
