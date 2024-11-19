// Importar el decorador NgModule y otros módulos necesarios desde Angular.
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Importar el módulo de enrutamiento de autenticación.
import { AutentificacionRoutingModule } from './autentificacion-routing.module';

// Importar el componente de inicio de sesión.
import { InicioSesionComponent } from './components/inicio-sesion/inicio-sesion.component';

// Importar componentes de Angular Material para formularios y elementos de UI.
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar'; // Importar MatSnackBarModule
import { ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

// Decorador NgModule que define la configuración del módulo.
@NgModule({
  // Declarar los componentes que pertenecen a este módulo.
  declarations: [
    InicioSesionComponent, // Componente para el inicio de sesión.
  ],
  // Importar otros módulos necesarios para el funcionamiento del módulo.
  imports: [
    CommonModule, // Módulo común de Angular con directivas básicas.
    AutentificacionRoutingModule, // Módulo de enrutamiento específico de autenticación.
    MatFormFieldModule, // Módulo de campo de formulario de Angular Material.
    MatInputModule, // Módulo de entrada de Angular Material.
    MatButtonModule, // Módulo de botones de Angular Material.
    MatSnackBarModule, // Módulo de notificaciones de Angular Material.
    ReactiveFormsModule, // Módulo de formularios reactivos de Angular.
    MatProgressSpinnerModule, // Módulo de spinners de progreso de Angular Material.
  ],
  // Exportar también el componente de inicio de sesión si es necesario en otros módulos.
  exports: [
    InicioSesionComponent
  ]
})
// Exportar la clase del módulo de autenticación.
export class AutentificacionModule { }
