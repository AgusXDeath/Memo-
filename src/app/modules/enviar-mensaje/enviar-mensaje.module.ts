import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';

import { EnviarMensajeRoutingModule } from './enviar-mensaje-routing.module';
import { EnviarMensajeComponent } from './enviar-mensaje/enviar-mensaje.component';


@NgModule({
  declarations: [
    EnviarMensajeComponent
  ],
  imports: [
    CommonModule,
    EnviarMensajeRoutingModule,
    FormsModule,
    MatTooltipModule
  ]
})
export class EnviarMensajeModule { }
