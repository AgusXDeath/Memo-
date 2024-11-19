// Importar decoradores y módulos necesarios desde Angular core.
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Importar los componentes y guardias que se usarán en las rutas.
import { InicioSesionComponent } from './modules/autentificacion/components/inicio-sesion/inicio-sesion.component';
import { AuthGuard } from './modules/guards/auth.guard';

// Definir las rutas de la aplicación.
const routes: Routes = [
  {
    path: "", redirectTo: "inicio-sesion", pathMatch: 'full' // Redirigir la ruta raíz a la ruta de inicio de sesión.
  },
  {
    path: "", component: InicioSesionComponent // Ruta para el componente de inicio de sesión.
  },
  {
    path: "dashboard",
    loadChildren: () => import('./modules/autentificacion/components/dashboard/dashboard.module').then(m => m.DashboardModule),
    canActivate: [AuthGuard] // Ruta para cargar el módulo del dashboard (comentada la guardia de autenticación).
  },
  {
    path: "**", redirectTo: "inicio-sesion", pathMatch: 'full' // Redirigir cualquier otra ruta a la ruta de inicio de sesión.
  }
];

// Decorador NgModule que define la configuración del módulo de enrutamiento.
@NgModule({
  imports: [RouterModule.forRoot(routes)], // Importar las rutas definidas en este módulo.
  exports: [RouterModule] // Exportar RouterModule para que esté disponible en otros módulos.
})
// Exportar la clase del módulo de enrutamiento de la aplicación.
export class AppRoutingModule { }
