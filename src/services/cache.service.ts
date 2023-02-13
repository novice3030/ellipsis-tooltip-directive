import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CacheService {
  private cache = new Map<string, number>();

  getCache(key: string) {
    return this.cache.get(key);
  }

  addToCache(key: string, value: number) {
    this.cache.set(key, value);
  }
}
