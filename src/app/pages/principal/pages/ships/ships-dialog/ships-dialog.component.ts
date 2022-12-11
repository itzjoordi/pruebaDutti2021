import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StarShip } from '../../../interfaces/starship.interface';

@Component({
  selector: 'app-ships-dialog',
  templateUrl: './ships-dialog.component.html',
  styleUrls: ['./ships-dialog.component.scss'],
})
export class ShipsDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: StarShip) {}
}
