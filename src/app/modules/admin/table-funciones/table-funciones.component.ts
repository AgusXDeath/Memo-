import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service'; // Aquí puedes cambiar el nombre si usas otro servicio
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ModalAgregarFuncionComponent } from './modal-agregar-funciones/modal-agregar-funciones.component';

@Component({
  selector: 'app-table-funciones',
  templateUrl: './table-funciones.component.html',
  styleUrls: ['./table-funciones.component.css']
})

export class TablaFuncionesComponent implements OnInit {
  // Fuente de datos para la tabla de funciones
  funciones = new MatTableDataSource<any>([]);
  selectedFuncion: any = { idFuncion: null, descripcion: '' };  // Función seleccionada
  isLoading = true;  // Variable para gestionar el estado de carga

  // Inyecta el servicio de funciones (puede ser el mismo que usas para los grupos si es multiuso) y MatDialog
  constructor(private apiService: UsuariosService, public dialog: MatDialog) {}

  // Cargar funciones al iniciar el componente
  ngOnInit(): void {
    this.loadFunciones();
  }

  // Cargar las funciones
  loadFunciones() {
    this.isLoading = true;  // Mostrar spinner al iniciar la carga de datos
    this.apiService.getFunciones().subscribe(funciones => {
      console.log('Funciones:', funciones); // Log de las funciones
      this.funciones.data = funciones;
      this.isLoading = false;  // Ocultar spinner al terminar la carga
    }, error => {
      console.error('Error al cargar funciones:', error);
      this.isLoading = false;  // Ocultar spinner al terminar la carga
    });
  }

  // Abrir modal para agregar una nueva función
  openCreateForm(): void {
    const dialogRef = this.dialog.open(ModalAgregarFuncionComponent, {
      width: '300px',
      data: { descripcion: '' }  // Modal vacío para agregar una nueva función
    });

    // Suscribirse al cierre del modal y agregar la nueva función si hay datos
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const nuevaFuncion = { descripcion: result };
        this.createFuncion(nuevaFuncion);
      }
    });
  }

  // Abrir modal para editar una función existente
  openEditForm(funcion: any): void {
    const dialogRef = this.dialog.open(ModalAgregarFuncionComponent, {
      width: '300px',
      data: { descripcion: funcion.descripcion }  // Modal con datos de la función a editar
    });

    // Suscribirse al cierre del modal y actualizar la función si hay cambios
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const funcionActualizada = { descripcion: result };
        this.updateFuncion(funcion.idFuncion, funcionActualizada);
      }
    });
  }

  // Método para crear una nueva función
  createFuncion(funcion: any) {
    this.apiService.createFuncion(funcion).subscribe(response => {
      console.log('Función creada:', response);
      this.loadFunciones();  // Recargar la tabla después de crear la función
    }, error => {
      console.error('Error al crear función:', error);
    });
  }

  // Método para actualizar una función existente
  updateFuncion(id: number, funcion: any) {
    this.apiService.updateFuncion(id, funcion).subscribe(response => {
      console.log('Función actualizada:', response);
      this.loadFunciones();  // Recargar la tabla después de actualizar la función
    }, error => {
      console.error('Error al actualizar función:', error);
    });
  }

  // Método para eliminar una función
  deleteFuncion(id: number) {
    this.apiService.deleteFuncion(id).subscribe(response => {
      console.log('Función eliminada:', response);
      this.loadFunciones();  // Recargar la tabla después de eliminar la función
    }, error => {
      console.error('Error al eliminar función:', error);
    });
  }
}