import { Component, OnDestroy, OnInit } from '@angular/core';
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
  dataListAccum: StarShip[] = [];

  /**
   * Pagination starting values
   */
  pageIndex = 1;
  totalItems = 0;
  requestedSize = 10;

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
      .get(page)
      .pipe(takeUntil(this.destroy$))
      .subscribe((response: StarShipCollection) => {
        const starships = response.results
          ? response.results.map((starShip: StarShip) => {
              return this.shipsService.setAdditionalData(starShip);
            })
          : [];
        if (response.results) {
          this.dataListAccum = [...this.dataListAccum, ...starships];
          this.totalItems = response.count;
          this.dataList.next(this.dataListAccum);
        }
      });
  }

  onScrollShips(): void {
    const element: HTMLElement = document.getElementById('starShipList');
    if (element) {
      const scrollHeight = element.scrollHeight;
      const scrollTop = element.scrollTop;
      const clientHeight = element.clientHeight;
      if (this.loadMoreData(scrollHeight, scrollTop, clientHeight)) {
        console.log(this.pageIndex);
        this.getStarShips(++this.pageIndex);
        console.log(this.pageIndex);
      }
    }
  }

  trackByShips(index: number, ship: StarShip): number {
    if (ship.id) {
      return ship.id;
    }
    return 0;
  }

  private loadMoreData(
    scrollHeight: number,
    scrollTop: number,
    clientHeight: number
  ): boolean {
    const retrievedResults = this.pageIndex * this.requestedSize;
    const hasMoreData: boolean = retrievedResults <= this.totalItems;
    if (scrollHeight - scrollTop <= clientHeight && hasMoreData) {
      return true;
    }
    return false;
  }
}
