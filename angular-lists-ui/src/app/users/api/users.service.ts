import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { CrudService } from 'src/app/shared/api/crud.service';
import { environment } from 'src/environments/environment';

import { UserModel } from './user.model';

export const usersApiUrl = `${environment.apiUrl}/users`;

@Injectable({
  providedIn: 'root',
})
export class UsersService extends CrudService<UserModel> {
  constructor(private http: HttpClient) {
    super(http, UserModel, usersApiUrl);
  }
}
