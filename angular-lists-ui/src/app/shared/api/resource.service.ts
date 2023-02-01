import { Observable } from 'rxjs';

import { ResourceModel } from './resource.model';

export interface GetParams {
  query?: string;
}

/**
 * Abstract class for a service working with a CRUD-resource.
 */
export abstract class ResourceService<T extends ResourceModel<T>> {
  abstract create(resource: Partial<T>): Observable<T>;

  abstract get(params?: GetParams): Observable<T[]>;

  abstract getById(id: string): Observable<T | undefined>;

  abstract update(resource: Partial<T>): Observable<T>;

  abstract delete(id: string): Observable<void>;
}
