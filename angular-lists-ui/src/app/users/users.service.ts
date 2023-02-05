import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

import { ApiResourceService } from 'src/app/shared/resource/api-resource.service';
import { GetParams } from 'src/app/shared/resource/resource.service';
import { normalizeQuery } from 'src/app/shared/utils/utils';
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

  override get({ query }: GetParams = {}) {
    return super.get().pipe(
      map((users) => {
        return query
          ? users.filter((user) => userMatchesQuery(user, query))
          : users;
      })
    );
  }
}

function userMatchesQuery(user: UserModel, query: string) {
  const normalizedQuery = normalizeQuery(query);

  return (
    user.firstName.toLocaleLowerCase().includes(normalizedQuery) ||
    user.lastName.toLocaleLowerCase().includes(normalizedQuery) ||
    user.email.toLocaleLowerCase().includes(normalizedQuery)
  );
}
