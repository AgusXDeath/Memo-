// Importar el módulo HttpClient desde Angular para realizar solicitudes HTTP.
import { HttpClient } from '@angular/common/http';
// Importar el decorador Injectable desde Angular core.
import { Injectable } from '@angular/core';
// Importar la interfaz Menu (definida en otro archivo).
import { Menu } from '../interfaces/menu';
// Importar el módulo Observable desde RxJS para trabajar con datos asíncronos.
import { Observable } from 'rxjs';

// Decorador Injectable que define que este servicio se proporciona en la raíz del módulo.
@Injectable({
  providedIn: 'root'
})
// Definición de la clase MenuService que gestionará las operaciones relacionadas con el menú.
export class MenuService {
  // Constructor que inyecta el servicio HttpClient.
  constructor(private http: HttpClient) { }

  // Método para obtener el menú desde un archivo JSON.
  getMenu(): Observable<Menu[]> {
    // Realizar una solicitud HTTP GET para obtener los datos del menú.
    return this.http.get<Menu[]>('./assets/data/menu.json');
  }
}
