import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StarShip } from '../../../interfaces/starship.interface';
import { ShipsDialogComponent } from '../ships-dialog/ships-dialog.component';

@Component({
  selector: 'ships-details',
  templateUrl: './ships-details.component.html',
  styleUrls: ['./ships-details.component.scss'],
})
export class ShipsDetailsComponent {
  @Input() starShip: StarShip;

  constructor(private dialog: MatDialog) {}

  openDialog() {
    this.dialog.open(ShipsDialogComponent, {
      width: '40vw',
      data: this.starShip,
    });
  }
}
