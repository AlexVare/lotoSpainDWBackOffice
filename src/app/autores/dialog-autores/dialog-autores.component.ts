import { Component, Inject, ViewChild } from '@angular/core';
import { AutorInterface } from '../autor-interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AutoresServiceService } from 'src/app/services/autores-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dialog-autores',
  templateUrl: './dialog-autores.component.html',
  styleUrls: ['./dialog-autores.component.scss'],
})
export class DialogAutoresComponent {
  autorForm!: FormGroup;

  nombre: string = this.data.name;
  apellidos: string = this.data.lastname;
  id: number = this.data.id;
  email: string = this.data.email;
  password: string = this.data.password;
  //disponibilidad : boolean = this.data.disponibilidad;

  constructor(
    private dialogRef: MatDialogRef<DialogAutoresComponent>,
    private _formBuilder: FormBuilder,
    private AutoresServiceService : AutoresServiceService,
    @Inject(MAT_DIALOG_DATA) public data: AutorInterface
  ) {
    this.autorForm = this._formBuilder.group({
      nombre: [data.name || '', Validators.required],
      email: [data.email || '', Validators.required],
      apellidos: [data.lastname || '', Validators.required],
      password: [data.password || ''],
    });

  }

  onSubmit() {
    if (this.autorForm.valid) {
      const nuevoAutor: AutorInterface = {
        name: this.autorForm.value.nombre,
        email: this.autorForm.value.email,
        id: 0,
        lastname: this.autorForm.value.apellidos,
        password: this.autorForm.value.password,
        showPassword: false
      };

      console.log(nuevoAutor);
      Swal.fire({
        title: 'Se va a generar un nuevo autor',
        text: 'Compruebe que los datos son correctos',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Crear',
      }).then((result) => {
      this.crearAutor(nuevoAutor);
      })

    }
  }



  crearAutor(dls:AutorInterface){
    this.AutoresServiceService.createAuthors(dls).subscribe({
      next: (res: any) => {
        console.log(res);
        Swal.fire({
          title: 'Exito',
          text: 'El autor se ha creado correctamente',
          icon: 'success',
          timer: 2000,
        });
        this.dialogRef.close();
      },
      error:(err: any)=> {
      console.error('Error al registrar el usuario', err);
      Swal.fire({
        title: 'Algo ha fallado',
        text: 'No se ha podido crear el autor',
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
