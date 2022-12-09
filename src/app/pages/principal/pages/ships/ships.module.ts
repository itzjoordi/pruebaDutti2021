import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ShipsDetailsComponent } from './ships-details/ships-details.component';
import { ShipsRoutingModule } from './ships-routing.module';
import { ShipsComponent } from './ships.component';

@NgModule({
  declarations: [ShipsComponent, ShipsDetailsComponent],
  imports: [CommonModule, ShipsRoutingModule],
})
export class ShipsModule {}
