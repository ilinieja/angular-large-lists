import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Serializable } from '../interfaces/serializable.interface';
import { CACHE_TTL_HEADER } from '../cache/cache.interceptor';

import { ResourceModel } from './resource.model';
import { ResourceService, GetParams } from './resource.service';

const DEFAULT_CACHE_TTL_SEC = 60 * 5; // 5 mins

/**
 * Provides default implementations for API operations over CRUD-resource.
 * Has 5-min cache enabled for GET requests.
 */
export abstract class ApiResourceService<
  T extends ResourceModel<T>
> extends ResourceService<T> {
  constructor(
    private httpClient: HttpClient,
    private tConstructor: { new (m: Partial<T>, ...args: unknown[]): T },
    protected apiUrl: string,
    protected cacheTtlSec = DEFAULT_CACHE_TTL_SEC
  ) {
    super();
  }

  create(resource: Partial<T> & Serializable): Observable<T> {
    return this.httpClient
      .post<T>(`${this.apiUrl}`, resource.serialize())
      .pipe(map((result) => new this.tConstructor(result)));
  }

  get(params?: GetParams): Observable<T[]> {
    return this.httpClient
      .get<T[]>(`${this.apiUrl}`, {
        headers: { [CACHE_TTL_HEADER]: `${this.cacheTtlSec}` },
      })
      .pipe(map((result) => result.map((i) => new this.tConstructor(i))));
  }

  getById(id: string): Observable<T> {
    return this.httpClient
      .get<T>(`${this.apiUrl}/${id}`)
      .pipe(map((result) => new this.tConstructor(result)));
  }

  update(resource: Partial<T> & Serializable): Observable<T> {
    return this.httpClient
      .put<T>(`${this.apiUrl}/${resource.id}`, resource.serialize())
      .pipe(map((result) => new this.tConstructor(result)));
  }

  delete(id: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiUrl}/${id}`);
  }
}
