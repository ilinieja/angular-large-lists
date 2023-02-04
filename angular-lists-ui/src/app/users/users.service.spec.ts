import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { usersApiUrl, UsersService } from './users.service';
import { UserModel } from './users.model';

import usersResponse from './testing/users-response.json';
import filteredUsers from './testing/filtered-users.json';

describe('UsersService', () => {
  let httpController: HttpTestingController;
  let service: UsersService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    httpController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(UsersService);
  });

  it('should return users response without modifications', () => {
    service.get().subscribe((res) => {
      expect(res).toEqual(usersResponse.map((user) => new UserModel(user)));
    });

    const req = httpController.expectOne({
      method: 'GET',
      url: `${usersApiUrl}`,
    });
    req.flush(usersResponse);
  });

  it('should filter users response if query provided', () => {
    service.get({ query: ' jOhN ' }).subscribe((res) => {
      expect(res).toEqual(filteredUsers.map((user) => new UserModel(user)));
    });

    const req = httpController.expectOne({
      method: 'GET',
      url: `${usersApiUrl}`,
    });
    req.flush(usersResponse);
  });
});
