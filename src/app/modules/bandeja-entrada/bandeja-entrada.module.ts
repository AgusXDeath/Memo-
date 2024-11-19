import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BandejaEntradaRoutingModule } from './bandeja-entrada-routing.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BandejaEntradaRoutingModule,
    MatToolbarModule,
    MatButtonModule
 
  ]
})
export class BandejaEntradaModule { }
