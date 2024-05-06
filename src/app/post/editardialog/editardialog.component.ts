import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PostInterface } from '../post-interface';
import { PostServiceService } from '../../services/post-service.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-editardialog',
  templateUrl: './editardialog.component.html',
  styleUrls: ['./editardialog.component.scss']
})
export class EditardialogComponent {


  publicacionForm!: FormGroup;
  titulo: string = this.data.title;
  contenido: string = this.data.contentt;
  fechaPublicacion: string = this.data.fechadepublicacion;
  autor: string = this.data.autor;



 constructor(
  private dialogRef: MatDialogRef<EditardialogComponent>,
  private _formBuilder: FormBuilder,
  private PostServiceService: PostServiceService,

  @Inject(MAT_DIALOG_DATA) public data: PostInterface
  ){
  this.publicacionForm = this._formBuilder.group({
    titulo: [data.title ||'', Validators.required],
    contenido: [ data.contentt||'', Validators.required],
    fechaPublicacion: [ data.fechadepublicacion||'', Validators.required],
    autor: [data.autor||'', Validators.required]
  });
}

onSubmit(
  title: string,
  contentt: string,
  fechaPublicacion: string,
  autor: string
){
  const editpost: PostInterface ={
    id: this.data.id,
    title: this.titulo,
    contentt: this.contenido,
    autor:this.autor,
    fechadepublicacion: this.fechaPublicacion,
    img:  this.data.img
  };


  Swal.fire({
    title: 'Quieres actualizar los datos?',
    showDenyButton: true,
    showCancelButton: true,
    confirmButtonText: 'Actualizar',
    denyButtonText: `No actualizar`,
  }).then((result) => {
    if (result.isConfirmed) {
    Swal.fire({
      title: 'Actualizando...',
      html: 'Actualizado Correctamente...',
      allowEscapeKey: false,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });
  this.PostServiceService.UpdateData(editpost).subscribe({
    next: (res: any) =>{
      console.log('Post actualizado correctamente');
      Swal.close();
      this.dialogRef.close();
    },
    error: (err) =>{
      console.log('ERROR OBTENIEDO LOS DATOS', err);
    },
    complete: () => {},
  });
  Swal.fire('Guardado!', '', 'success');
} else if (result.isDenied) {
  Swal.fire('Los cambios no se han guardado', '', 'info');
}
});
}



 closeDialog(): void {
   this.dialogRef.close();

 }
}
