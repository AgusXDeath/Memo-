import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ModalAgregarGrupoComponent } from './modal-agregar-grupo/modal-agregar-grupo.component';

@Component({
  selector: 'app-tabla-grupos',
  templateUrl: './tabla-grupos.component.html',
  styleUrls: ['./tabla-grupos.component.css']
})
export class TablaGruposComponent implements OnInit {
  grupos = new MatTableDataSource<any>([]);
  selectedGrupo: any = { idGrupo: null, descripcion: '' };
  loading = false;  // Nueva variable para el estado de carga

  constructor(private apiService: UsuariosService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadGrupos();
  }

  loadGrupos() {
    this.loading = true;  // Activa el spinner al iniciar la carga de datos
    this.apiService.getGrupos().subscribe(grupos => {
      this.apiService.getUsuarios().subscribe(usuarios => {
        this.grupos.data = grupos.map(grupo => {
          const cantidadUsuarios = usuarios.filter(u => u.idGrupo === grupo.idGrupo).length;
          return { ...grupo, cantidadUsuarios };
        });
        this.loading = false;  // Desactiva el spinner una vez que los datos se cargan
      });
    }, error => {
      console.error('Error al cargar grupos:', error);
      this.loading = false;  // Asegúrate de desactivar el spinner en caso de error
    });
  }

  openCreateForm(): void {
    const dialogRef = this.dialog.open(ModalAgregarGrupoComponent, {
      width: '300px',
      data: { descripcion: '' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const nuevoGrupo = { descripcion: result };
        this.createGrupo(nuevoGrupo);
      }
    });
  }

  openEditForm(grupo: any): void {
    const dialogRef = this.dialog.open(ModalAgregarGrupoComponent, {
      width: '300px',
      data: { descripcion: grupo.descripcion }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const grupoActualizado = { descripcion: result };
        this.updateGrupo(grupo.idGrupo, grupoActualizado);
      }
    });
  }

  createGrupo(grupo: any) {
    this.loading = true;
    this.apiService.createGrupo(grupo).subscribe(response => {
      console.log('Grupo creado:', response);
      this.loadGrupos();
    }, error => {
      console.error('Error al crear grupo:', error);
      this.loading = false;
    });
  }

  updateGrupo(id: number, grupo: any) {
    this.loading = true;
    this.apiService.updateGrupo(id, grupo).subscribe(response => {
      console.log('Grupo actualizado:', response);
      this.loadGrupos();
    }, error => {
      console.error('Error al actualizar grupo:', error);
      this.loading = false;
    });
  }

  deleteGrupo(id: number) {
    this.loading = true;
    this.apiService.deleteGrupo(id).subscribe(response => {
      console.log('Grupo eliminado:', response);
      this.loadGrupos();
    }, error => {
      console.error('Error al eliminar grupo:', error);
      this.loading = false;
    });
  }
}
