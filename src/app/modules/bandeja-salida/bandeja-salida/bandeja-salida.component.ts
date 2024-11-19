// Importar decoradores y módulos necesarios desde Angular core.
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MensajesService } from 'src/app/services/mensajes.service';

// Definir una interfaz para representar la estructura de un mensaje.
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

// Definir el componente BandejaSalida y sus metadatos.
@Component({
  selector: 'app-bandeja-salida',
  templateUrl: './bandeja-salida.component.html',
  styleUrls: ['./bandeja-salida.component.css']
})
export class BandejaSalidaComponent implements OnInit {
  mensajes = new MatTableDataSource<Mensaje>(); // Array para almacenar los mensajes.
  displayedColumns: string[] = ['emisor', 'receptor', 'mensaje', 'acciones']; // Columnas que se mostrarán en la tabla.
   isLoading= true;

  // Constructor que inyecta el servicio de mensajes.
  constructor(private mensajesService: MensajesService) { }

  // Método del ciclo de vida de Angular que se ejecuta al inicializar el componente.
  ngOnInit(): void {
    this.getMensajesBandejaSalida(); // Llamar al método para obtener mensajes al inicializar.
  }

  getMensajesBandejaSalida(): void {
    this.isLoading =true
    this.mensajesService.getBandejaSalida().subscribe(
      (data: Mensaje[]) => {
        console.log('Mensajes recibidos:', data); // Verifica la respuesta
        this.mensajes.data = data; // Asignar los datos recibidos al array de mensajes.
     this.isLoading = false;},
      
      (error) => {
        console.error('Error al obtener los mensajes de la bandeja de salida:', error); // Manejar errores al obtener los mensajes.
        this.isLoading =false;
      }
    );
  }
// Método para actualizar solo el contenido del mensaje.
updateMensajeContenido(mensaje: Mensaje, nuevoContenido: string): void {
  if (mensaje.idMensajes) { // Asegurarse de que el id no sea undefined
    this.mensajesService.updateMensaje(
      mensaje.idMensajes, 
      nuevoContenido, 
      mensaje.favoritoEmisor,  // Usamos favoritoEmisor en lugar de estadoFavorito
      mensaje.favoritoReceptor, // Usamos favoritoReceptor
      mensaje.papeleraEmisor,   // Usamos papeleraEmisor
      mensaje.papeleraReceptor  // Usamos papeleraReceptor
    ).subscribe(
      (updatedMensaje: Mensaje) => {
        const index = this.mensajes.data.findIndex(m => m.idMensajes === mensaje.idMensajes); // Encontrar el índice del mensaje actualizado.
        if (index !== -1) {
          this.mensajes.data[index] = updatedMensaje; // Actualizar el mensaje en el array.
        }
      },
      (error) => {
        console.error('Error al actualizar el contenido del mensaje:', error); // Manejar errores al actualizar el mensaje.
      }
    );
  }
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
          console.log('Respuesta de la API:', updatedMensaje); // Muestra lo que devuelve el servidor
          const index = this.mensajes.data.findIndex(m => m.idMensajes === mensaje.idMensajes);
          if (index !== -1) {
            this.mensajes.data[index] = updatedMensaje; // Actualiza el mensaje en el array
          }
          this.getMensajesBandejaSalida(); // Vuelve a obtener los mensajes
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
