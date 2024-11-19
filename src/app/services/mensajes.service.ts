// Importar decoradores y módulos necesarios desde Angular core.
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

// Decorador Injectable que define que este servicio se proporciona en la raíz del módulo.
@Injectable({
  providedIn: 'root'
})
// Definición de la clase MensajesService que gestionará las operaciones relacionadas con los mensajes.
export class MensajesService {
  // URL base de la API.
  private apiUrl = 'http://localhost/api-actualizada2/public/index.php';


  // Constructor que inyecta el servicio HttpClient.
  constructor(private http: HttpClient) {}

  // Método privado para obtener los headers con el token JWT.
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token'); // Obtén el token del almacenamiento local.
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`, // Incluir el token en los headers.
      'Content-Type': 'application/json' // Especificar el tipo de contenido.
    });
  }

  // Método para obtener los mensajes de la bandeja de entrada.
  getBandejaEntrada(): Observable<any> {
    return this.http.get(`${this.apiUrl}?resource=bandejaEntrada`, { headers: this.getHeaders() });
  }

  // Método para obtener los mensajes de la bandeja de salida.
  getBandejaSalida(): Observable<any> {
    return this.http.get(`${this.apiUrl}?resource=bandejaSalida`, { headers: this.getHeaders() });
  }

  // Método para obtener los mensajes de la bandeja de salida.
  getBorradores(): Observable<any> {
    return this.http.get(`${this.apiUrl}?resource=borradores`, { headers: this.getHeaders() });
  }

  // Método para obtener los mensajes favoritos.
  getFavoritos(): Observable<any> {
    return this.http.get(`${this.apiUrl}?resource=favoritos`, { headers: this.getHeaders() });
  }

  // Método para obtener los mensajes en la papelera.
  getPapelera(): Observable<any> {
    return this.http.get(`${this.apiUrl}?resource=papelera`, { headers: this.getHeaders() });
  }

  // Método para enviar un mensaje.
  enviarMensaje(receptormail: string, mensaje: string, esBorrador: boolean): Observable<any> {
    const body = { receptormail, mensaje, esBorrador }; // Datos a enviar en el cuerpo de la solicitud.
    return this.http.post(`${this.apiUrl}?resource=mensajes`, body, { headers: this.getHeaders() });
  }

  deleteMensaje(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}?resource=mensajes&id=${id}`, { headers: this.getHeaders() });
}


// Método para actualizar un mensaje.
updateMensaje(
  id: number,
  mensaje: string,
  favoritoEmisor?: number,
  favoritoReceptor?: number,
  papeleraEmisor?: number,
  papeleraReceptor?: number
): Observable<any> {
  // Cuerpo de la solicitud con los campos necesarios.
  const body: any = { mensaje };
  
  // Solo agrega los campos si tienen un valor definido.
  if (favoritoEmisor !== undefined) body.favoritoEmisor = favoritoEmisor;
  if (favoritoReceptor !== undefined) body.favoritoReceptor = favoritoReceptor;
  if (papeleraEmisor !== undefined) body.papeleraEmisor = papeleraEmisor;
  if (papeleraReceptor !== undefined) body.papeleraReceptor = papeleraReceptor;

  // Realiza la solicitud HTTP PUT.
  return this.http.put(
    `${this.apiUrl}?resource=mensajes&id=${id}`, 
    body, 
    { headers: this.getHeaders() }
  );
}

}
