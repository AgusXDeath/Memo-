// Importar decoradores y módulos necesarios desde Angular core y router.
import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Importar componentes específicos que se utilizarán en las rutas.
import { DashboardComponent } from './dashboard.component';
import { InicioComponent } from 'src/app/modules/inicio/pages/inicio/inicio.component';
import { TablaUsuariosComponent } from 'src/app/modules/admin/tabla-usuarios/tabla-usuarios.component';
import { TablaGruposComponent } from 'src/app/modules/admin/tabla-grupos/tabla-grupos.component';
import { TablaGruposFuncionesComponent } from 'src/app/modules/admin/table-grupo-funciones/table-grupo-funciones.component';
import { TablaFuncionesComponent } from 'src/app/modules/admin/table-funciones/table-funciones.component';
import { FavoritosComponent } from 'src/app/modules/favoritos/favoritos/favoritos.component';
import { BorradoresComponent } from 'src/app/modules/borradores/borradores/borradores.component';
import { BandejaSalidaComponent } from 'src/app/modules/bandeja-salida/bandeja-salida/bandeja-salida.component';
import { BandejaEntradaComponent } from 'src/app/modules/bandeja-entrada/bandeja-entrada/bandeja-entrada.component';
import { EnviarMensajeComponent } from 'src/app/modules/enviar-mensaje/enviar-mensaje/enviar-mensaje.component';
import { PapeleraComponent } from 'src/app/modules/papelera/papelera/papelera.component';

// Definir las rutas del módulo y los componentes asociados a cada ruta.
const routes: Routes = [
  { 
    path: "", component: DashboardComponent, children: [
      { path: "", component: InicioComponent }, // Ruta para la página de inicio.
      { path: "usuarios", component: TablaUsuariosComponent }, // Ruta para la tabla de usuarios.
      { path: "grupos", component: TablaGruposComponent }, // Ruta para la tabla de grupos.
      { path: "grupofunciones", component: TablaGruposFuncionesComponent }, // Ruta para la tabla de funciones de grupo.
      { path: "funciones", component: TablaFuncionesComponent }, // Ruta para la tabla de funciones.
      { path: "bandejaDeEntrada", component: BandejaEntradaComponent }, // Ruta para la bandeja de entrada.
      { path: "bandejaDeSalida", component: BandejaSalidaComponent }, // Ruta para la bandeja de salida.
      { path: "borradores", component: BorradoresComponent }, // Ruta para los borradores.
      { path: "favoritos", component: FavoritosComponent }, // Ruta para los favoritos.
      { path: "enviarMensaje", component: EnviarMensajeComponent }, // Ruta para enviar mensajes.
      { path: "papelera", component: PapeleraComponent } // Nueva ruta para la papelera.
    ]
  }
];

// Decorador NgModule para configurar el módulo de enrutamiento.
@NgModule({
  imports: [RouterModule.forChild(routes)], // Importar las rutas definidas.
  exports: [RouterModule] // Exportar RouterModule para que esté disponible en otros módulos.
})
export class DashboardRoutingModule { }
