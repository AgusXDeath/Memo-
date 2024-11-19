import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UsuariosService } from 'src/app/services/usuarios.service'; // Importa tu servicio

@Component({
  selector: 'app-modal-agregar-usuario',
  templateUrl: './modal-agregar-usuario.component.html',
  styleUrls: ['./modal-agregar-usuario.component.css']
})
export class ModalAgregarUsuarioComponent implements OnInit {
  nombreUsuario: string;
  mail: string;
  clave: string;
  idGrupo: number;
  grupos: any[] = [];  // Aquí almacenaremos los grupos

  constructor(
    public dialogRef: MatDialogRef<ModalAgregarUsuarioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private usuarioService: UsuariosService  // Inyecta el servicio para obtener los grupos
  ) {
    this.nombreUsuario = data.nombreUsuario || '';
    this.mail = data.mail || '';
    this.clave = data.clave || '';
    this.idGrupo = data.idGrupo || null;
  }

  ngOnInit(): void {
    this.loadGrupos();  // Carga los grupos al inicializar el componente
  }

  loadGrupos(): void {
    this.usuarioService.getGrupos().subscribe(data => {
      this.grupos = data;  // Asigna los grupos obtenidos a la variable 'grupos'
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.nombreUsuario.trim() && this.mail.trim() && this.clave.trim() && this.idGrupo) {
      const usuario = {
        nombreUsuario: this.nombreUsuario,
        mail: this.mail,
        clave: this.clave,
        idgrupo: this.idGrupo
      };
      this.dialogRef.close(usuario);
    }
  }
}