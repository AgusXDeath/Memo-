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
  idMensajes: number; // Cambiado a idMensajes
}


@Component({
  selector: 'app-bandeja-entrada',
  templateUrl: './bandeja-entrada.component.html',
  styleUrls: ['./bandeja-entrada.component.css']
})
export class BandejaEntradaComponent implements OnInit {
  mensajes = new MatTableDataSource<Mensaje>();
  displayedColumns: string[] = ['emisorMail', 'receptorMail', 'mensaje', 'acciones'];

  isLoading = true;  // Variable para gestionar el estado de carga

  constructor(private mensajesService: MensajesService) {}

  ngOnInit(): void {
    this.getMensajes();
  }

  private getMensajes(): void {
    this.isLoading = true;  // Mostrar spinner al iniciar la carga de datos
    this.mensajesService.getBandejaEntrada().subscribe(
      (data: Mensaje[]) => {
        console.log('Mensajes recibidos:', data);
        this.mensajes.data = data;
        this.isLoading = false;  // Ocultar spinner al terminar la carga
         },
      (error) => {
        console.error('Error al obtener mensajes', error);
        this.isLoading = false;  // Ocultar spinner al terminar la carga
      }
    );
  }

  toggleEstadoFavorito(mensaje: Mensaje): void {
    console.log('Cambiar estado favorito para el mensaje ID:', mensaje.idMensajes); // Log del ID
    if (mensaje.idMensajes) {
      // Establecer favoritoEmisor a 1 y favoritoReceptor a 0
      const nuevoFavoritoEmisor = mensaje.favoritoEmisor === 1 ? 0 : 1;
      const nuevoFavoritoReceptor = mensaje.favoritoReceptor === 1 ? 0 : 1;
      
// Actualizar los valores en el objeto mensaje
mensaje.favoritoEmisor = nuevoFavoritoEmisor;
mensaje.favoritoReceptor = nuevoFavoritoReceptor;

console.log('Nuevo Favorito Emisor:', mensaje.favoritoEmisor); // Log del nuevo estado
console.log('Nuevo Favorito Receptor:', mensaje.favoritoReceptor); // Log del nuevo estado

      
      this.mensajesService.updateMensaje(
        mensaje.idMensajes, 
        mensaje.mensaje, 
        mensaje.favoritoEmisor, 
        mensaje.favoritoReceptor, 
        mensaje.papeleraEmisor, 
        mensaje.papeleraReceptor
      ).subscribe(
        (updatedMensaje: any) => {
          console.log('Respuesta de la API:', updatedMensaje); // Verifica la respuesta de la API
          const index = this.mensajes.data.findIndex(m => m.idMensajes === mensaje.idMensajes);
          if (index !== -1) {
            this.mensajes.data[index] = updatedMensaje; // Actualiza el mensaje en el array
          }
        },
        (error) => {
          console.error('Error al actualizar el estadoFavorito del mensaje:', error);
        }
      );
    } else {
      console.error('ID del mensaje es undefined'); // Manejar el caso donde el ID es undefined
    }
  }
  
  toggleEstadoPapelera(mensaje: Mensaje): void {
    if (mensaje.idMensajes) {
      
      const nuevoEstadoPapelera = 1; // Establecer siempre a 1
      console.log('Nuevo estado papelera:', nuevoEstadoPapelera); // Log del nuevo estado
      console.log('Tipo de nuevo estado papelera:', typeof nuevoEstadoPapelera); // Log del tipo del nuevo estado
  
      // Establecer papeleraEmisor a 1 y papeleraReceptor a 0
      mensaje.papeleraEmisor = 0; 
      mensaje.papeleraReceptor = 1; 

  
      this.mensajesService.updateMensaje(
        mensaje.idMensajes, 
        mensaje.mensaje, 
        mensaje.favoritoEmisor, 
        mensaje.favoritoReceptor, 
        mensaje.papeleraEmisor, 
        mensaje.papeleraReceptor
      ).subscribe(
        (updatedMensaje: any) => {
          console.log('Respuesta de la API:', updatedMensaje); // Muestra lo que devuelve el servidor
          const index = this.mensajes.data.findIndex(m => m.idMensajes === mensaje.idMensajes);
          if (index !== -1) {
            this.mensajes.data[index] = updatedMensaje; // Actualiza el mensaje en el array
          }
          this.getMensajes(); // Vuelve a obtener los mensajes
        },
        (error) => {
          console.error('Error al actualizar el estadoPapelera del mensaje:', error);
        }
      );
    } else {
      console.error('ID del mensaje es undefined'); // Manejar el caso donde el ID es undefined
    }
  }
}
