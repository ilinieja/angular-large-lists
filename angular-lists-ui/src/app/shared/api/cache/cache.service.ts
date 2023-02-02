import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

type CacheValue = any;

export interface CacheEntry {
  expiresIn: Date | null;
  value: CacheValue;
}

/**
 * Handles storing and getting values from in-memory cache.
 * Tracks entries TTL (drops old on get).
 */
@Injectable({
  providedIn: 'root',
})
export class CacheService {
  private cache = new Map<string, CacheEntry>();

  /**
   * Stores entry in cache if TTL provided.
   * Does not store without TTL.
   */
  set(key: string, value: CacheValue, ttlSec: number | null = null) {
    if (!ttlSec) {
      return;
    }

    const expiresIn = new Date();
    expiresIn.setSeconds(expiresIn.getSeconds() + ttlSec);
    this.cache.set(key, { expiresIn, value });
  }

  /** Returns cache entry if it's present and not expired. */
  get(key: string): CacheValue | null {
    const cacheEntry = this.cache.get(key);

    if (!cacheEntry) {
      return null;
    }

    const { expiresIn, value } = cacheEntry;
    const now = new Date();

    if (expiresIn && expiresIn.getTime() < now.getTime()) {
      this.cache.delete(key);
      return null;
    }

    return value;
  }
}
