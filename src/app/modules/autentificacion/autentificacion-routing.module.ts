// Importar el decorador NgModule y otros módulos necesarios desde Angular.
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Importar el componente de inicio de sesión que se usará en las rutas.
import { InicioSesionComponent } from './components/inicio-sesion/inicio-sesion.component';

// Definir las rutas del módulo y el componente asociado a cada ruta.
const routes: Routes = [
  { 
    path: "", component: InicioSesionComponent // Ruta raíz que carga el componente de inicio de sesión.
  },
  { 
    path: "inicio-sesion", component: InicioSesionComponent // Ruta para "inicio-sesion" que carga el mismo componente.
  }
];

// Decorador NgModule que define la configuración del módulo de enrutamiento.
@NgModule({
  imports: [RouterModule.forChild(routes)], // Importar las rutas definidas en este módulo.
  exports: [RouterModule] // Exportar RouterModule para que esté disponible en otros módulos.
})
// Exportar la clase del módulo de enrutamiento de autenticación.
export class AutentificacionRoutingModule { }
