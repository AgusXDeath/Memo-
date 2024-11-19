// src/app/components/borradores/borradores.component.ts

import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MensajesService } from 'src/app/services/mensajes.service';

interface Mensaje {
  emisorMail: string;
  receptorMail: string;
  mensaje: string;
  favoritoEmisor: number;
  favoritoReceptor: number;
  papeleraEmisor: number;
  papeleraReceptor: number;
  idMensajes: number;
}

@Component({
  selector: 'app-borradores',
  templateUrl: './borradores.component.html',
  styleUrls: ['./borradores.component.css']
})
export class BorradoresComponent implements OnInit {
  mensajes = new MatTableDataSource<Mensaje>();
  displayedColumns: string[] = ['emisor', 'receptor', 'mensaje', 'acciones'];
  isLoading =true;

  constructor(private mensajesService: MensajesService) { }

  ngOnInit(): void {
    this.getBorradores();
  }

  getBorradores(): void {
    this.isLoading = true; 
    this.mensajesService.getBorradores().subscribe(
      (data: Mensaje[]) => {
        console.log('Borradores recibidos:', data);
        this.mensajes.data = data;
      this.isLoading =false;
      },
      (error) => {
        console.error('Error al obtener los borradores:', error);
        this.isLoading = false;
      }
    );
  }

  updateMensajeContenido(mensaje: Mensaje, nuevoContenido: string): void {
    if (mensaje.idMensajes) {
      this.mensajesService.updateMensaje(
        mensaje.idMensajes, 
        nuevoContenido, 
        mensaje.favoritoEmisor, 
        mensaje.favoritoReceptor, 
        mensaje.papeleraEmisor, 
        mensaje.papeleraReceptor
      ).subscribe(
        (updatedMensaje: Mensaje) => {
          const index = this.mensajes.data.findIndex(m => m.idMensajes === mensaje.idMensajes);
          if (index !== -1) {
            this.mensajes.data[index] = updatedMensaje;
          }
        },
        (error) => {
          console.error('Error al actualizar el contenido del mensaje:', error);
        }
      );
    }
  }

  /* toggleEstadoFavorito(mensaje: Mensaje): void {
    if (mensaje.idMensajes) {
      const nuevoFavoritoEmisor = mensaje.favoritoEmisor === 1 ? 0 : 1;
      const nuevoFavoritoReceptor = mensaje.favoritoReceptor === 1 ? 0 : 1;

      mensaje.favoritoEmisor = nuevoFavoritoEmisor;
      mensaje.favoritoReceptor = nuevoFavoritoReceptor;

      this.mensajesService.updateMensaje(
        mensaje.idMensajes, 
        mensaje.mensaje, 
        mensaje.favoritoEmisor, 
        mensaje.favoritoReceptor, 
        mensaje.papeleraEmisor, 
        mensaje.papeleraReceptor
      ).subscribe(
        (updatedMensaje: any) => {
          const index = this.mensajes.data.findIndex(m => m.idMensajes === mensaje.idMensajes);
          if (index !== -1) {
            this.mensajes.data[index] = updatedMensaje;
          }
        },
        (error) => {
          console.error('Error al actualizar el estadoFavorito del mensaje:', error);
        }
      );
    } else {
      console.error('ID del mensaje es undefined');
    }
  } */

  toggleEstadoPapelera(mensaje: Mensaje): void {
    if (mensaje.idMensajes) {
      const nuevoEstadoPapelera = 1;

      mensaje.papeleraEmisor = 1;
      mensaje.papeleraReceptor = 0;

      this.mensajesService.updateMensaje(
        mensaje.idMensajes, 
        mensaje.mensaje, 
        mensaje.favoritoEmisor, 
        mensaje.favoritoReceptor, 
        mensaje.papeleraEmisor, 
        mensaje.papeleraReceptor
      ).subscribe(
        (updatedMensaje: any) => {
          const index = this.mensajes.data.findIndex(m => m.idMensajes === mensaje.idMensajes);
          if (index !== -1) {
            this.mensajes.data[index] = updatedMensaje;
          }
          this.getBorradores();
        },
        (error) => {
          console.error('Error al actualizar el estadoPapelera del mensaje:', error);
        }
      );
    } else {
      console.error('ID del mensaje es undefined');
    }
  }
}