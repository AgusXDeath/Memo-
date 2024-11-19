// Importar decoradores y módulos necesarios desde Angular core.
import { Component, OnInit } from '@angular/core';
import { MensajesService } from 'src/app/services/mensajes.service';

// Definición de la interfaz para un mensaje.
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

// Definir el componente Papelera y sus metadatos.
@Component({
  selector: 'app-papelera',
  templateUrl: './papelera.component.html',
  styleUrls: ['./papelera.component.css']
})
export class PapeleraComponent implements OnInit {
  mensajes: Mensaje[] = []; // Array para almacenar los mensajes.
  displayedColumns: string[] = ['emisorMail', 'receptorMail', 'mensaje', 'acciones']; // Columnas que se mostrarán en la tabla.
  isLoading = true;

  // Constructor que inyecta el servicio de mensajes.
  constructor(private mensajesService: MensajesService) {}

  // Método del ciclo de vida de Angular que se ejecuta al inicializar el componente.
  ngOnInit(): void {
    this.getMensajesPapelera(); // Llamar al método para obtener mensajes al inicializar.
  }

  // Método para obtener mensajes de la papelera desde el servicio.
  getMensajesPapelera(): void {
    this.isLoading = true;
    this.mensajesService.getPapelera().subscribe(
      (data: Mensaje[]) => {
        this.mensajes = data; // Asignar los datos recibidos al array de mensajes.
      
      this.isLoading = false;
      },
      (error) => {
        console.error('Error al obtener los mensajes de la papelera:', error); // Manejar errores al obtener los mensajes.
        this.isLoading = false; // Desactivar el cargador de datos.
      }
    );
  }
// Método para eliminar un mensaje de la papelera.
deleteMensaje(idMensajes: number): void {
  this.mensajesService.deleteMensaje(idMensajes).subscribe(
    (response) => {
      // Mensaje de confirmación
      console.log(response.message); 
      
      // Actualiza la lista de mensajes localmente tras la eliminación
      this.mensajes = this.mensajes.filter(mensaje => mensaje.idMensajes !== idMensajes);
    },
    (error) => {
      console.error('Error al eliminar el mensaje:', error); // Manejar errores al eliminar el mensaje
    }
  );
}

 // Método para alternar el estado de papelera de un mensaje.
toggleEstadoPapelera(mensaje: Mensaje): void {
  if (mensaje.idMensajes) {
    
    const nuevoPapeleraEmisor = 0; // Establecer papeleraEmisor a 1
    const nuevoPapeleraReceptor = 0; // Establecer papeleraReceptor a 0
    console.log('Nuevo estado papelera:', nuevoPapeleraEmisor, nuevoPapeleraReceptor); // Log del nuevo estado

    // Actualiza los valores localmente antes de la llamada a la API
    mensaje.papeleraEmisor = nuevoPapeleraEmisor;
    mensaje.papeleraReceptor = nuevoPapeleraReceptor;

    // Llamada a la API para actualizar el mensaje con los nuevos valores
    this.mensajesService.updateMensaje(
      mensaje.idMensajes, 
      mensaje.mensaje, 
      mensaje.favoritoEmisor, 
      mensaje.favoritoReceptor, 
      nuevoPapeleraEmisor, 
      nuevoPapeleraReceptor
    ).subscribe(
      (updatedMensaje: any) => {
        console.log('Respuesta de la API:', updatedMensaje); // Muestra la respuesta de la API
        const index = this.mensajes.findIndex(m => m.idMensajes === mensaje.idMensajes);
        if (index !== -1) {
          this.mensajes[index] = updatedMensaje; // Actualiza el mensaje en el array
        }
        this.getMensajesPapelera(); // Actualiza la lista de mensajes en la papelera
      },
      (error) => {
        console.error('Error al actualizar el estadoPapelera del mensaje:', error); // Maneja el error si lo hay
      }
    );
  } else {
    console.error('ID del mensaje es undefined'); // Maneja el caso donde el ID es undefined
  }
}

}
