import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject, takeUntil } from 'rxjs';
import { ShipsService } from 'src/app/pages/principal/services/ships.service';
import { StarShipCollection } from '../../interfaces/starship-collection.interface';
import { StarShip } from '../../interfaces/starship.interface';

@Component({
  selector: 'app-ships',
  templateUrl: './ships.component.html',
  styleUrls: ['./ships.component.scss'],
})
export class ShipsComponent implements OnInit, OnDestroy {
  /**
   * Contains the list of StarShips
   */
  dataList: BehaviorSubject<StarShip[]> = new BehaviorSubject<StarShip[]>([]);
  dataList$: Observable<StarShip[]> = this.dataList.asObservable();

  /**
   * Pagination starting values
   */
  pageIndex = 0;
  totalItems = 0;

  /**
   * Observable to avoid calls to API when component has been destroyed
   */
  private destroy$: Subject<void> = new Subject<void>();

  constructor(private shipsService: ShipsService, private router: Router) {}

  ngOnInit(): void {
    this.getStarShips(this.pageIndex);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getStarShips(page: number): void {
    this.shipsService
      .get(page + 1)
      .pipe(takeUntil(this.destroy$))
      .subscribe((response: StarShipCollection) => {
        const starships = response.results
          ? response.results.map((starShip: StarShip) => {
              return this.shipsService.setAdditionalData(starShip);
            })
          : [];
        if (response.results) {
          this.totalItems = response.count;
          this.dataList.next(starships);
        }
      });
  }

  getPaginatorData(event: MatPaginator) {
    this.getStarShips(event.pageIndex);
  }

  trackByShips(index: number, ship: StarShip): number {
    if (ship.id) {
      return ship.id;
    }
    return 0;
  }
}
