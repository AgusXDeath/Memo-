import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FavoritosRoutingModule } from './favoritos-routing.module';
import { FavoritosComponent } from './favoritos/favoritos.component';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    FavoritosComponent
  ],
  imports: [
    CommonModule,
    FavoritosRoutingModule,
    MatButtonModule,
    MatTableModule,
    MatToolbarModule,
    MatIconModule
  ]
})
export class FavoritosModule { }
