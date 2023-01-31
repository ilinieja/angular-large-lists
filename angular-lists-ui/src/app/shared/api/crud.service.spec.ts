import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';

import { CrudService } from './crud.service';
import { ResourceModel } from './resource.model';
import { Injectable } from '@angular/core';

const apiUrl = 'host/mock';
class MockModel extends ResourceModel<MockModel> {
  name!: string;
}
const mockModelEntity1 = new MockModel({ id: 'testId1', name: 'testName3' });
const mockModelEntity2 = new MockModel({ id: 'testId2', name: 'testName3' });
const mockModelEntity3 = new MockModel({ id: 'testId3', name: 'testName3' });

@Injectable()
class MockService extends CrudService<MockModel> {
  constructor(private http: HttpClient) {
    super(http, MockModel, apiUrl);
  }
}

describe('CrudService', () => {
  let service: MockService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MockService],
    });
    service = TestBed.inject(MockService);
    httpController = TestBed.inject(HttpTestingController);
  });

  describe('create', () => {
    it('should make POST request with serialized entity', () => {
      service.create(mockModelEntity1).subscribe((res) => {
        expect(res).toEqual(mockModelEntity1);
      });

      const req = httpController.expectOne({
        method: 'POST',
        url: `${apiUrl}`,
      });

      req.flush(mockModelEntity1.serialize());
    });
  });

  describe('get', () => {
    it('should make GET request and return deserialized entities', () => {
      const response = [mockModelEntity1, mockModelEntity2, mockModelEntity3];

      service.get().subscribe((res) => {
        expect(res).toEqual(response);
      });

      const req = httpController.expectOne({
        method: 'GET',
        url: `${apiUrl}`,
      });

      req.flush(response.map((entity) => entity.serialize()));
    });
  });

  describe('getById', () => {
    it('should make GET request to id and return deserialized entity', () => {
      const id = mockModelEntity1.id!;
      service.getById(id).subscribe((res) => {
        expect(res).toEqual(mockModelEntity1);
      });

      const req = httpController.expectOne({
        method: 'GET',
        url: `${apiUrl}/${id}`,
      });

      req.flush(mockModelEntity1.serialize());
    });
  });

  describe('update', () => {
    it('should make PUT request to id and return deserialized entity', () => {
      service.update(mockModelEntity1).subscribe((res) => {
        expect(res).toEqual(mockModelEntity1);
      });

      const req = httpController.expectOne({
        method: 'PUT',
        url: `${apiUrl}/${mockModelEntity1.id}`,
      });

      req.flush(mockModelEntity1.serialize());
    });
  });

  describe('delete', () => {
    it('should make DELETE request to id and return nothing', () => {
      service.delete(mockModelEntity1.id!).subscribe((res) => {
        expect(res).toBeNull();
      });

      const req = httpController.expectOne({
        method: 'DELETE',
        url: `${apiUrl}/${mockModelEntity1.id}`,
      });

      req.flush(null);
    });
  });
});
