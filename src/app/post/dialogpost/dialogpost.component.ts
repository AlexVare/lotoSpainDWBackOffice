import { Component, Inject, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostInterface } from '../post-interface';
import { PostServiceService } from '../../services/post-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dialogpost',
  templateUrl: './dialogpost.component.html',
  styleUrls: ['./dialogpost.component.scss'],
})
export class DialogpostComponent {
  publicacionForm!: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<DialogpostComponent>,
    private _formBuilder: FormBuilder,
    private PostServiceService: PostServiceService,
    @Inject(MAT_DIALOG_DATA) public data: PostInterface
  ) {
    this.publicacionForm = this._formBuilder.group({
      titulo: ['', Validators.required],
      contenido: ['', Validators.required],
      fechaPublicacion: ['', Validators.required],
      autor: ['', Validators.required],
    });
  }

  onSubmit() {
    const nuevaPublicacion: PostInterface = {
      id: 0,
      title: this.publicacionForm.value.titulo,
      contentt: this.publicacionForm.value.contenido,
      autor: this.publicacionForm.value.autor,
      fechadepublicacion:
        this.publicacionForm.value.fechaPublicacion.toLocaleDateString('es-ES'),
      img: 'xl',
    };
    console.log(nuevaPublicacion);
    Swal.fire({
      title: 'Se va a generar una nueva publicación',
      text: 'Compruebe que los datos son correctos',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Crear',
    }).then((result) => {
      if (result.isConfirmed) {

    this.crearPost(nuevaPublicacion);
      }
  })
  }

  crearPost(dls: PostInterface) {
    this.PostServiceService.PostData(dls).subscribe({
      next: (res: any) => {
        Swal.fire({
          title: 'Exito',
          text: 'La publicación se ha creado correctamente',
          icon: 'success',
          timer: 2000,
        });
        this.dialogRef.close();
        console.log(res);
      },
      error: (err: any) => {
        console.log('ERROR OBTENIENDO LOS DATOS', err);
        Swal.fire({
          title: 'Algo ha fallado',
          text: 'No se ha podido crear la publicación',
          icon: 'error',
          timer: 3000,
        });
      },
      complete: () => {},
    });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
