import {
  HTTP_INTERCEPTORS,
  HttpClient,
  HttpResponse,
} from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import {
  CacheInterceptor,
  CACHE_REFRESH_HEADER,
  CACHE_TTL_HEADER,
} from './cache.interceptor';
import { CacheService } from './cache.service';

describe('CacheInterceptor', () => {
  const mockCacheService = jasmine.createSpyObj<CacheService>(
    'mockCacheService',
    ['get', 'set']
  );
  const url = 'testUrl';
  const response = [
    { id: 'testId1', name: 'testName1' },
    { id: 'testId2', name: 'testName2' },
    { id: 'testId3', name: 'testName3' },
  ];

  let httpController: HttpTestingController;
  let interceptor: CacheInterceptor;
  let http: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        CacheInterceptor,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: CacheInterceptor,
          multi: true,
        },
        { provide: CacheService, useValue: mockCacheService },
      ],
    });

    interceptor = TestBed.inject(CacheInterceptor);
    httpController = TestBed.inject(HttpTestingController);
    http = TestBed.inject(HttpClient);
  });

  it('should send request if cache not hit', () => {
    mockCacheService.get.and.returnValue(null);
    http.get(url).subscribe((res) => {
      expect(res).toBe(response);
    });

    const req = httpController.expectOne({
      method: 'GET',
      url: url,
    });
    req.flush(response);
  });

  it('should set response into cache with TTL provided in header', () => {
    mockCacheService.get.and.returnValue(null);
    http
      .get(url, { headers: { [CACHE_TTL_HEADER]: '600' } })
      .subscribe((res) => {
        expect(mockCacheService.set).toHaveBeenCalledWith(
          url,
          new HttpResponse({ url, status: 200, body: res }),
          600
        );
      });

    const req = httpController.expectOne({
      method: 'GET',
      url: 'testUrl',
    });
    req.flush(response);
  });

  it('should not send request if cache hit', () => {
    mockCacheService.get.and.returnValue(
      new HttpResponse({ url, status: 200, body: response })
    );
    http.get(url).subscribe((res) => {
      expect(res).toEqual(response);
    });

    httpController.expectNone(url);
  });

  it('should send request if cache hit but refresh header provided', () => {
    mockCacheService.get.and.returnValue(
      new HttpResponse({
        url,
        status: 200,
        // Different from HTTP response.
        body: [...response, { id: 'testId4', name: 'testName4' }],
      })
    );
    http
      .get(url, { headers: { [CACHE_REFRESH_HEADER]: 'true' } })
      .subscribe((res) => {
        expect(res).toEqual(response);
      });

    const req = httpController.expectOne({
      method: 'GET',
      url: 'testUrl',
    });
    req.flush(response);
  });
});
