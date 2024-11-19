// Importar decorador Injectable desde Angular core.
import { Injectable } from '@angular/core';

// Decorador Injectable que define que este servicio se proporciona en la raíz del módulo.
@Injectable({
  providedIn: 'root'
})
// Definición de la clase AuthService que gestionará la autenticación.
export class AuthService {
  // Método para verificar si el usuario está autenticado.
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token'); // Devuelve true si existe un token en el almacenamiento local, de lo contrario, false.
  }

  // Método para almacenar el token en el localStorage.
  setToken(token: string): void {
    localStorage.setItem('token', token); // Almacenar el token en el almacenamiento local.
  }

  // Método para eliminar el token del localStorage (cerrar sesión).
  logout(): void {
    localStorage.removeItem('token'); // Eliminar el token del almacenamiento local.
  }

  // Constructor de la clase.
  constructor() { }
}
