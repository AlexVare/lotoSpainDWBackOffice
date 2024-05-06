import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AutorInterface } from '../autor-interface';
import { AutoresServiceService } from 'src/app/services/autores-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-dialog.autores',
  templateUrl: './edit-dialog.autores.component.html',
  styleUrls: ['./edit-dialog.autores.component.scss'],
})
export class EditDialogAutoresComponent {
  autorForm!: FormGroup;

  nombre: string;
  apellidos: string;
  email: string;
  password: string;

  constructor(
    private dialogRef: MatDialogRef<EditDialogAutoresComponent>,
    private http: HttpClient,
    private AutoresService: AutoresServiceService,
    @Inject(MAT_DIALOG_DATA) public data: AutorInterface,
    private _formBuilder: FormBuilder
  ) {
    this.nombre = this.data.name;
    this.apellidos = this.data.lastname;
    this.email = this.data.email;
    this.password =this.data.password;

    this.autorForm = this._formBuilder.group({
      nombre: [this.nombre, Validators.required],
      apellidos: [this.apellidos, Validators.required],
      email: [this.email, Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit(name: string, lastname: string, email: string, password:string) {
    const autor: AutorInterface = {
      id: this.data.id,
      name: name,
      lastname: lastname,
      email: email,
      password: password,
      showPassword: false
    };

    console.log(autor);

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
      /* Read more about isConfirmed, isDenied below */
        this.AutoresService.update(autor).subscribe({
          next: (res: any) => {
            console.log('Autor actualizado correctamente');
            Swal.close();
            this.dialogRef.close();
          },
          error: (err: any) => {
            console.log('Error al actualizar el autor', err);
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

  confirmCambios() {}

  borrarAutor() {
    Swal.fire({
      title: '¿Deseas borrar esto?',
      text: '¡Este cambio no es reversible!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Borrar de todos modos',
    }).then((result) => {
      if (result.isConfirmed) {
      Swal.fire({
        title: 'Borrando...',
        html: 'Borrado Correctamente...',
        allowEscapeKey: false,
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });
        this.AutoresService.delete(this.data).subscribe({
          next: (res: any) => {
            console.log(res);
            console.log('borrado');
            Swal.close();
            Swal.fire({
              title: 'Exito',
              text: 'El autor se ha eliminado',
              icon: 'success',
              timer: 2000,
            });
            this.dialogRef.close();
          },
          error: (err) => {
            console.log('ERROR OBTENIENDO LOS DATOS', err);
            Swal.fire({
              title: 'Algo ha fallado',
              text: 'No se ha podido eliminar el autor',
              icon: 'error',
              timer: 3000,
            });
          },
          complete: () => {},
        });
      }
    });
  }
}
