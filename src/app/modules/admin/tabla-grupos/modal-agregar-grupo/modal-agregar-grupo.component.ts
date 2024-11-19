import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-agregar-grupo',
  templateUrl: './modal-agregar-grupo.component.html',
  styleUrls: ['./modal-agregar-grupo.component.css']
})
export class ModalAgregarGrupoComponent {
  descripcion: string;

  constructor(
    public dialogRef: MatDialogRef<ModalAgregarGrupoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.descripcion = data.descripcion || '';  // Inicializa la descripción si se pasa
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.descripcion.trim()) {
      this.dialogRef.close(this.descripcion);  // Devuelve la descripción al componente padre
    }
  }
}