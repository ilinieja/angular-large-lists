import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { ApiResourceService } from 'src/app/shared/api/api-resource.service';
import { environment } from 'src/environments/environment';

import { UserModel } from './user.model';

export const usersApiUrl = `${environment.apiUrl}/users`;

@Injectable({
  providedIn: 'root',
})
export class UsersService extends ApiResourceService<UserModel> {
  constructor(private http: HttpClient) {
    super(http, UserModel, usersApiUrl);
  }
}
