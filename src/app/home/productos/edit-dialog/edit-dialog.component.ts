import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { InterfazBoleto } from 'src/app/models/BoletoInterface';
import { ProductService } from 'src/app/services/product-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.scss'],
})
export class EditDialogComponent {
  publicacionForm!: FormGroup;

  nombre: string = this.data.nombre;
  numero: string = this.data.numero;
  serie: number = this.data.serie;
  fraccion: number = this.data.fraccion;
  precio: number = this.data.precio;
  disponibilidad: number = this.data.disponibilidad;

  constructor(
    private dialogRef: MatDialogRef<EditDialogComponent>,
    private http: HttpClient,
    private productService: ProductService,
    private _formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: InterfazBoleto
  ) {
    this.publicacionForm = this._formBuilder.group({
      nombre: [data.nombre, Validators.required],
      numero: [data.numero, Validators.required],
      serie: [data.serie, Validators.required],
      fraccion: [data.fraccion, Validators.required],
      precio: [data.precio, Validators.required],
      disponibilidad: [data.disponibilidad, Validators.required],
    });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  onSubmit(
    nombre: string,
    numero: string,
    serie: number,
    fraccion: number,
    precio: number,
    disponibilidad: number
  ) {
    const boleto: InterfazBoleto = {
      id: this.data.id,
      nombre: this.nombre,
      numero: this.numero,
      serie: this.serie,
      fraccion: this.fraccion,
      precio: this.precio,
      disponibilidad: this.disponibilidad,
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

    this.productService.update(boleto).subscribe({
      next: (res: any) => {
        console.log('Producto actualizado correctamente');
        Swal.close();
        this.dialogRef.close();
      },
      error: (err) => {
        console.log('ERROR OBTENIENDO LOS DATOS', err);
      },
      complete: () => {},
    });
    Swal.fire('Guardado!', '', 'success');
      } else if (result.isDenied) {
        Swal.fire('Los cambios no se han guardado', '', 'info');
      }
    });
  }

  borrarBoleto() {

    Swal.fire({
      title: '¿Deseas borrar esto?',
      text: "¡Este cambio no es reversible!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Borrar de todos modos'
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
        this.productService.delete(this.data).subscribe({
          next: (res: any) => {
            console.log(res);
            console.log('borrado');
            Swal.close();
            Swal.fire({
              title: 'Exito',
              text: 'El boleto se ha eliminado',
              icon: 'success',
              timer: 2000,
            });
            this.dialogRef.close();
          },
          error: (err) => {
            console.log('ERROR OBTENIENDO LOS DATOS', err);
            Swal.fire({
              title: 'Algo ha fallado',
              text: 'No se ha podido eliminar el boleto',
              icon: 'error',
              timer: 3000,
            });
          },
          complete: () => {},
        });
      }
    })
  }

}
