import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { CacheService } from './cache.service';

/** Set to force-refresh UI cache. */
export const CACHE_REFRESH_HEADER = 'x-ui-cache-refresh';

/**
 * Defines TTL for UI cache entries.
 * Value is in SEC.
 */
export const CACHE_TTL_HEADER = 'x-ui-cache-ttl';

@Injectable()
export class CacheInterceptor implements HttpInterceptor {
  constructor(private cacheService: CacheService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (req.method !== 'GET') {
      return next.handle(req);
    }

    if (req.headers.get(CACHE_REFRESH_HEADER)) {
      return this.sendRequest(req, next);
    }

    const cachedResponse = this.cacheService.get(req.url);
    return cachedResponse ? of(cachedResponse) : this.sendRequest(req, next);
  }

  sendRequest(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      tap((response) => {
        if (response instanceof HttpResponse) {
          const ttlHeaderValue = req.headers.get(CACHE_TTL_HEADER);
          const ttlSec = ttlHeaderValue ? Number(ttlHeaderValue) : null;
          this.cacheService.set(req.url, response, ttlSec);
        }
      })
    );
  }
}
