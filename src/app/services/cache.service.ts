import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { share, take } from 'rxjs/operators';

/**
 * Time (in minutes) to save each request response on cache
 */
const MINUTS = 5;

@Injectable({
  providedIn: 'root',
})
export class CacheService {
  cache: Observable<any>[] = [];

  constructor() {}

  cachePipe() {
    return <T>(source: Observable<T>) => {
      return source.pipe(
        share({
          connector: () => new ReplaySubject(1, MINUTS * 60 * 1000),
          resetOnError: false,
          resetOnComplete: false,
          resetOnRefCountZero: false,
        }),
        take(1)
      );
    };
  }
}
