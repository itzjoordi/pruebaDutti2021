import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ShipsDetailsComponent } from './ships-details/ships-details.component';
import { ShipsDialogComponent } from './ships-dialog/ships-dialog.component';
import { ShipsRoutingModule } from './ships-routing.module';
import { ShipsComponent } from './ships.component';

@NgModule({
  declarations: [ShipsComponent, ShipsDetailsComponent, ShipsDialogComponent],
  imports: [
    CommonModule,
    ShipsRoutingModule,
    MatCardModule,
    MatDialogModule,
    MatButtonModule,
    MatPaginatorModule,
  ],
})
export class ShipsModule {}
