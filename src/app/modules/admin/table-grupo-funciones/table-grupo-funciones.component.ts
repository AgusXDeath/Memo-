import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ModalAgregarGrupofuncionesComponent } from './modal-agregar-grupofunciones/modal-agregar-grupofunciones.component';

@Component({
  selector: 'app-table-grupo-funciones',
  templateUrl: './table-grupo-funciones.component.html',
  styleUrls: ['./table-grupo-funciones.component.css']
})
export class TablaGruposFuncionesComponent implements OnInit {

  gruposFunciones = new MatTableDataSource<any>([]);
  funcionesMap: { [key: number]: string } = {}; // Mapa para almacenar descripciones de funciones
  isLoading = true;  // Variable para gestionar el estado de carg
  

  constructor(private gruposFuncionesService: UsuariosService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadGruposFunciones();
    this.loadFunciones(); // Cargar las funciones
  }

  loadGruposFunciones(): void {
    this.isLoading = true; // Mostrar el spinner al iniciar la carga
    this.gruposFuncionesService.getGrupoFunciones().subscribe(
      (gruposFunciones) => {
        this.gruposFunciones.data = gruposFunciones;
        this.isLoading = false; // Ocultar el spinner al finalizar la carga
      },
      (error) => {
        console.error('Error al cargar grupos funciones:', error);
        this.isLoading = false; // Ocultar el spinner en caso de error
      }
    );
  }

  loadFunciones(): void {
    this.gruposFuncionesService.getFunciones().subscribe(
      (funciones) => {
        this.funcionesMap = {};
        funciones.forEach(funcion => {
          this.funcionesMap[funcion.idFuncion] = funcion.descripcion;
        });
      },
      (error) => {
        console.error('Error al cargar funciones:', error);
      }
    );
  }


  openCreateForm(): void {
    const dialogRef = this.dialog.open(ModalAgregarGrupofuncionesComponent, {
      width: '300px',
      data: { idGrupo: null, idFunciones: null, ver: false, insertar: false, modificar: false, borrar: false }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.createGrupoFuncion(result);
      }
    });
  }

  openEditForm(grupoFuncion: any): void {
    console.log('Datos que se pasan al modal:', grupoFuncion); // Verifica qué datos estás pasando
    const dialogRef = this.dialog.open(ModalAgregarGrupofuncionesComponent, {
      width: '300px',
      data: {
        idGruposFunciones: grupoFuncion.idGruposFunciones,
        idGrupo: grupoFuncion.idGrupo,
        idFunciones: grupoFuncion.idFunciones,
        ver: this.convertirStringABoolean(grupoFuncion.ver), // Convertir string a boolean
        insertar: this.convertirStringABoolean(grupoFuncion.insertar),
        modificar: this.convertirStringABoolean(grupoFuncion.modificar),
        borrar: this.convertirStringABoolean(grupoFuncion.borrar)
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.updateGrupoFuncion(grupoFuncion.idGruposFunciones, result);
      }
    });
  }

  createGrupoFuncion(grupoFuncion: any): void {
    this.gruposFuncionesService.createGrupoFuncion(grupoFuncion).subscribe(() => {
      this.loadGruposFunciones(); // Recargar la tabla después de crear
    }, error => {
      console.error('Error al crear grupo función:', error); // Manejo de errores al crear
    });
  }

  updateGrupoFuncion(id: number, grupoFuncion: any): void {
    this.gruposFuncionesService.updateGrupoFuncion(id, grupoFuncion).subscribe(() => {
      this.loadGruposFunciones(); // Recargar la tabla después de actualizar
    }, error => {
      console.error('Error al actualizar grupo función:', error); // Manejo de errores al actualizar
    });
  }

  deleteGrupoFuncion(id: number): void {
    this.gruposFuncionesService.deleteGrupoFuncion(id).subscribe(() => {
      this.loadGruposFunciones(); // Recargar la tabla después de eliminar
    }, error => {
      console.error('Error al eliminar grupo función:', error); // Manejo de errores al eliminar
    });
  }

  // Función para obtener la descripción de la función por ID
  getFuncionDescripcion(idFuncion: number | null): string {
    if (idFuncion === null || idFuncion === undefined) {
      console.warn('El registro tiene idFuncion null o undefined');
      return 'Sin descripción';
    }

    return this.funcionesMap[idFuncion] || 'Sin descripción'; // Devuelve la descripción o 'Sin descripción'
  }

  // Nuevas funciones para manejar la conversión
  convertirStringABoolean(valor: string): boolean {
    return valor === 'si'; // Convierte 'si' a true, cualquier otra cosa a false
  }
}