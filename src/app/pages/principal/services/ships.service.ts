import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CacheService } from 'src/app/services/cache.service';
import { environment } from 'src/environments/environment';
import { StarShipCollection } from '../interfaces/starship-collection.interface';
import { StarShip } from '../interfaces/starship.interface';

@Injectable({
  providedIn: 'root',
})
export class ShipsService {
  constructor(private http: HttpClient, private cache: CacheService) {}

  get(page: number): Observable<StarShipCollection> {
    if (!this.cache.cache[`$page-${page}`]) {
      const endpoint = `${environment.swapiAPI}?page=${page}`;
      this.cache.cache[`$page-${page}`] = this.http
        .get<StarShipCollection>(endpoint)
        .pipe(this.cache.cachePipe());
    }
    return this.cache.cache[`$page-${page}`];
  }

  setAdditionalData(starShip: StarShip): StarShip {
    starShip.id = parseInt(starShip.url.split('/').at(-2), 0);
    starShip.imageUrl = `${environment.imagesAPI}${starShip.id}.jpg`;
    return starShip;
  }
}
