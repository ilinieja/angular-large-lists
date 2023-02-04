import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { LoggerTestingModule } from 'ngx-logger/testing';
import { MatSnackBar } from '@angular/material/snack-bar';

import { ErrorsInterceptor } from './errors.interceptor';

describe('ErrorsInterceptor', () => {
  const url = 'testUrl';
  const response = { id: 'testId1', name: 'testName1' };

  let matSnackBarMock: jasmine.SpyObj<MatSnackBar>;
  let httpController: HttpTestingController;
  let interceptor: ErrorsInterceptor;
  let http: HttpClient;

  function expectHttpErrorWithDelay(delay: number = 0) {
    tick(delay);
    httpController
      .expectOne({
        method: 'GET',
        url: url,
      })
      .error(new ProgressEvent('error'));
  }

  beforeEach(() => {
    matSnackBarMock = jasmine.createSpyObj<MatSnackBar>('matSnackBarMock', [
      'open',
    ]);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, LoggerTestingModule],
      providers: [
        ErrorsInterceptor,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: ErrorsInterceptor,
          multi: true,
        },
        {
          provide: MatSnackBar,
          useValue: matSnackBarMock,
        },
      ],
    });

    interceptor = TestBed.inject(ErrorsInterceptor);
    httpController = TestBed.inject(HttpTestingController);
    http = TestBed.inject(HttpClient);
  });

  it('should pass success response as-is', fakeAsync(() => {
    http.get(url).subscribe((res) => {
      expect(res).toEqual(response);
    });

    httpController
      .expectOne({
        method: 'GET',
        url: url,
      })
      .flush(response);
  }));

  it('should retry request after 1, 2 and 3 secs', fakeAsync(() => {
    http.get(url).subscribe();

    expectHttpErrorWithDelay(0);
    expectHttpErrorWithDelay(1000);
    expectHttpErrorWithDelay(2000);
    expectHttpErrorWithDelay(3000);

    // To silence 'no expectations' warning.
    expect(true).toBe(true);
  }));

  it('should open snackbar after all requests failed', fakeAsync(() => {
    http.get(url).subscribe();

    expectHttpErrorWithDelay(0);
    expectHttpErrorWithDelay(1000);
    expectHttpErrorWithDelay(2000);
    expectHttpErrorWithDelay(3000);
    expect(matSnackBarMock.open).toHaveBeenCalledTimes(1);
  }));
});
