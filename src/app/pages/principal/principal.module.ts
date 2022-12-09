import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HeaderModule } from 'src/app/components/header/header.module';
import { PrincipalRoutingModule } from './principal-routing.module';
import { PrincipalComponent } from './principal.component';

@NgModule({
  declarations: [PrincipalComponent],
  imports: [CommonModule, PrincipalRoutingModule, HeaderModule],
})
export class PrincipalModule {}
