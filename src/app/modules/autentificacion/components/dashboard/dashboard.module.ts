// Importar el decorador NgModule y otros módulos necesarios desde Angular.
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Importar módulos específicos del proyecto.
import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from 'src/app/modules/shared/shared.module';

// Importar componentes que serán utilizados en el módulo.
import { DashboardComponent } from './dashboard.component';
import { InicioComponent } from 'src/app/modules/inicio/pages/inicio/inicio.component';

// Decorador NgModule que define la configuración del módulo.
@NgModule({
  // Declarar los componentes que pertenecen a este módulo.
  declarations: [
    DashboardComponent, // Componente del tablero principal.
    InicioComponent // Componente de la página de inicio.
  ],
  // Importar otros módulos necesarios para el funcionamiento del módulo.
  imports: [
    CommonModule, // Módulo común de Angular con directivas básicas.
    DashboardRoutingModule, // Módulo de enrutamiento específico del tablero.
    SharedModule // Módulo compartido que contiene componentes y servicios reutilizables.
  ]
})
// Exportar la clase del módulo para que pueda ser utilizada en otras partes de la aplicación.
export class DashboardModule { }

