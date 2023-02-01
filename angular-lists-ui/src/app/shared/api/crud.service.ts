import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ResourceModel } from './resource.model';

export interface GetParams {
  query: string;
}

export abstract class CrudService<T extends ResourceModel<T>> {
  constructor(
    private httpClient: HttpClient,
    private tConstructor: { new (m: Partial<T>, ...args: unknown[]): T },
    protected apiUrl: string
  ) {}

  create(resource: Partial<T> & { serialize: () => T }): Observable<T> {
    return this.httpClient
      .post<T>(`${this.apiUrl}`, resource.serialize())
      .pipe(map((result) => new this.tConstructor(result)));
  }

  get(params?: GetParams): Observable<T[]> {
    return this.httpClient
      .get<T[]>(`${this.apiUrl}`)
      .pipe(map((result) => result.map((i) => new this.tConstructor(i))));
  }

  getById(id: string): Observable<T> {
    return this.httpClient
      .get<T>(`${this.apiUrl}/${id}`)
      .pipe(map((result) => new this.tConstructor(result)));
  }

  update(resource: Partial<T> & { serialize: () => T }): Observable<T> {
    return this.httpClient
      .put<T>(`${this.apiUrl}/${resource.id}`, resource.serialize())
      .pipe(map((result) => new this.tConstructor(result)));
  }

  delete(id: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiUrl}/${id}`);
  }
}
