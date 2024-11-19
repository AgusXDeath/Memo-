import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-modal-agregar-grupofunciones',
  templateUrl: './modal-agregar-grupofunciones.component.html',
  styleUrls: ['./modal-agregar-grupofunciones.component.css']
})
export class ModalAgregarGrupofuncionesComponent implements OnInit {
  grupoFuncionesForm: FormGroup;
  grupos: any[] = [];
  funciones: any[] = [];

  constructor(
    private fb: FormBuilder,
    private usuariosService: UsuariosService,
    public dialogRef: MatDialogRef<ModalAgregarGrupofuncionesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.grupoFuncionesForm = this.fb.group({
      idGrupo: [null, Validators.required],
      idFuncion: [null, Validators.required],
      ver: [false],
      insertar: [false],
      modificar: [false],
      borrar: [false]
    });
  }

  ngOnInit(): void {
    // Cargar grupos y funciones
    this.usuariosService.getGrupos().subscribe(grupos => this.grupos = grupos);
    this.usuariosService.getFunciones().subscribe(funciones => {
      this.funciones = funciones;
      if (this.data) {
        this.grupoFuncionesForm.patchValue({
          idGrupo: this.data.idGrupo,
          idFuncion: this.data.idFunciones,
          ver: this.data.ver === 'si', // Cambiado a 'si'
          insertar: this.data.insertar === 'si', // Cambiado a 'si'
          modificar: this.data.modificar === 'si', // Cambiado a 'si'
          borrar: this.data.borrar === 'si' // Cambiado a 'si'
        });
      }
    });
  }

  onSubmit(): void {
    if (this.grupoFuncionesForm.valid) {
      const formData = { ...this.grupoFuncionesForm.value };
      formData.ver = formData.ver ? 'si' : 'no'; // Convertir a 'si' o 'no'
      formData.insertar = formData.insertar ? 'si' : 'no'; // Convertir a 'si' o 'no'
      formData.modificar = formData.modificar ? 'si' : 'no'; // Convertir a 'si' o 'no'
      formData.borrar = formData.borrar ? 'si' : 'no'; // Convertir a 'si' o 'no'

      if (this.data) {
        this.usuariosService.updateGrupoFuncion(this.data.idGruposFunciones, formData).subscribe(() => {
          this.dialogRef.close(true);
        });
      } else {
        this.usuariosService.createGrupoFuncion(formData).subscribe(() => {
          this.dialogRef.close(true);
        });
      }
    }
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
