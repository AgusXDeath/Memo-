import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BorradoresRoutingModule } from './borradores-routing.module';
import { BorradoresComponent } from './borradores/borradores.component';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
  declarations: [
    BorradoresComponent
  ],
  imports: [
    CommonModule,
    BorradoresRoutingModule,
    MatButtonModule,
    MatTableModule,
    MatToolbarModule
  ]
})
export class BorradoresModule { }
