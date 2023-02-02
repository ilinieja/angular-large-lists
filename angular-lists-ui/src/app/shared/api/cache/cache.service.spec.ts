import { TestBed } from '@angular/core/testing';

import { CacheService } from './cache.service';

describe('CacheService', () => {
  const startTime = Date.now();
  let service: CacheService;

  beforeEach(() => {
    jasmine.clock().install();
    jasmine.clock().mockDate(new Date(startTime));

    TestBed.configureTestingModule({});
    service = TestBed.inject(CacheService);
  });

  afterEach(() => {
    jasmine.clock().uninstall();
  });

  it("should return value from cache when it's not expired", () => {
    const key = 'cacheKey';
    const value = { someField: '12' };
    service.set(key, value, 60);

    // Not enough ms to expire.
    jasmine.clock().tick(30 * 1000);

    expect(service.get(key)).toEqual(value);
  });

  it('should return null when cache entry is expired', () => {
    const key = 'cacheKey';
    const value = { someField: '12' };
    service.set(key, value, 60);

    // Enough ms to expire.
    jasmine.clock().tick(70 * 1000);

    expect(service.get(key)).toBe(null);
  });

  it('should return null right away when no TTL specified for entry', () => {
    const key = 'cacheKey';
    const value = { someField: '12' };
    service.set(key, value);

    expect(service.get(key)).toBe(null);
  });
});
