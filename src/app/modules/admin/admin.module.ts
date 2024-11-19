import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';

// Componentes
import { TablaUsuariosComponent } from './tabla-usuarios/tabla-usuarios.component';
import { TablaGruposComponent } from './tabla-grupos/tabla-grupos.component';
import { TablaFuncionesComponent } from './table-funciones/table-funciones.component';
import { TablaGruposFuncionesComponent } from './table-grupo-funciones/table-grupo-funciones.component';

import { AdminComponent } from './admin/admin.component';
import { ModalAgregarGrupoComponent } from './tabla-grupos/modal-agregar-grupo/modal-agregar-grupo.component';
import { ModalAgregarUsuarioComponent } from './tabla-usuarios/modal-agregar-usuario/modal-agregar-usuario.component';
import { ModalAgregarFuncionComponent } from './table-funciones/modal-agregar-funciones/modal-agregar-funciones.component';
import { ModalAgregarGrupofuncionesComponent } from './table-grupo-funciones/modal-agregar-grupofunciones/modal-agregar-grupofunciones.component';



// Angular Material Modules
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCheckboxModule } from '@angular/material/checkbox'; // Importar MatCheckboxModule}



// Formularios
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    TablaUsuariosComponent,
    TablaGruposComponent,
    TablaFuncionesComponent,
    TablaGruposFuncionesComponent,
    AdminComponent,
    ModalAgregarGrupoComponent,
    ModalAgregarUsuarioComponent,
    ModalAgregarFuncionComponent,
    ModalAgregarGrupofuncionesComponent
    
    
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    
    // Módulos de Angular Material
    MatTableModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,  // Este es necesario para mat-form-field
    MatButtonModule,
    MatSelectModule,
    MatDialogModule,
    MatToolbarModule,
    MatCheckboxModule,
    

    // Formularios
    FormsModule,  // Necesario para ngModel
    ReactiveFormsModule 
  ]
})
export class AdminModule { }