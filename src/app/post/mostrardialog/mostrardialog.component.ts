import { Component, Inject } from '@angular/core';
import { PostInterface } from '../post-interface';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-mostrardialog',
  templateUrl: './mostrardialog.component.html',
  styleUrls: ['./mostrardialog.component.scss']
})
export class MostrardialogComponent {

  publicacionForm!: FormGroup;


 constructor(
  private dialogRef: MatDialogRef<MostrardialogComponent>,
  private _formBuilder: FormBuilder,
  @Inject(MAT_DIALOG_DATA) public data: PostInterface
  ){
  this.publicacionForm = this._formBuilder.group({
    titulo: [data.title ||'', Validators.required],
    contenido: [ data.contentt||'', Validators.required],
    fechaPublicacion: [ data.fechadepublicacion||'', Validators.required],
    autor: [data.autor||'', Validators.required]
  });
}




 closeDialog(): void {
   this.dialogRef.close();
 }

}
