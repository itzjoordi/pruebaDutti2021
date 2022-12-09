import { Component, OnInit } from '@angular/core';
import { ShipsService } from 'src/app/pages/principal/services/ships.service';

@Component({
  selector: 'app-ships',
  templateUrl: './ships.component.html',
  styleUrls: ['./ships.component.scss'],
})
export class ShipsComponent implements OnInit {
  public dataList: any = [];

  constructor(private shipsService: ShipsService) {
    console.log('ships');
  }

  ngOnInit(): void {
    this.shipsService.getShips().subscribe((ships) => {
      this.dataList = ships;
      console.log('SHIPS -->', this.dataList.results);
    });
  }
}
