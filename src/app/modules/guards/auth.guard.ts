// Importar decoradores y módulos necesarios desde Angular core.
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

// Importar el servicio de autenticación.
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

// Decorador Injectable que define que este servicio se proporciona en la raíz del módulo.
@Injectable({
  providedIn: 'root'
})
// Definición de la clase AuthGuard que implementa la interfaz CanActivate.
export class AuthGuard implements CanActivate {
  // Constructor que inyecta el servicio de autenticación y el enrutador.
  constructor(private authService: AuthService, private router: Router) { }

  // Método canActivate que determina si una ruta puede ser activada.
  canActivate(): boolean {
    // Verificar si el usuario está autenticado.
    if (this.authService.isLoggedIn()) {
      return true; // Permitir el acceso si el usuario está autenticado.
    } else {
      this.router.navigate(['/inicio-sesion']); // Redirigir a la página de inicio de sesión si el usuario no está autenticado.
      return false; // Denegar el acceso.
    }
  }
}
