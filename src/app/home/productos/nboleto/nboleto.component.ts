import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { InterfazBoleto } from 'src/app/models/BoletoInterface';
import { PostInterface } from 'src/app/post/post-interface';
import { ProductService } from 'src/app/services/product-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nboleto',
  templateUrl: './nboleto.component.html',
  styleUrls: ['./nboleto.component.scss'],
})
export class NboletoComponent {
  publicacionForm!: FormGroup;

  nombre!: string;
  numero!: string;
  serie!: string;
  fraccion!: string;
  precio!: string;
  disponibilidad!: string;

  constructor(
    private dialogRef: MatDialogRef<NboletoComponent>,
    private http: HttpClient,
    private productService: ProductService,
    private _formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: InterfazBoleto
  ) {
    this.publicacionForm = this._formBuilder.group({
      nombre: ['', Validators.required],
      numero: ['', Validators.required],
      serie: ['', Validators.required],
      fraccion: ['', Validators.required],
      precio: ['', Validators.required],
      disponibilidad: ['', Validators.required],
    });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  onSubmit(
    nombre: string,
    numero: string,
    serie: string,
    fraccion: string,
    precio: string,
    disponibilidad: string
  ) {
    const boleto: InterfazBoleto = {
      id: 0,
      nombre: this.nombre,
      numero: this.numero,
      serie: parseInt(this.serie),
      fraccion: parseInt(this.fraccion),
      precio: parseInt(this.precio),
      disponibilidad: parseInt(this.disponibilidad),
    };

    Swal.fire({
      title: 'Se va a generar un nuevo boleto',
      text: 'Asegúrese de que los datos son correctos',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Crear',
    }).then((result) => {
      if (result.isConfirmed) {
        this.productService.register(boleto).subscribe({
          next: (res: any) => {
            console.log(res);
            Swal.fire({
              title: 'Exito',
              text: 'El boleto se ha creado corrrectamente',
              icon: 'success',
              timer: 3000,
            });
            this.dialogRef.close();
          },
          error: (err) => {
            console.log('ERROR OBTENIENDO LOS DATOS', err);
            Swal.fire({
              title: 'Algo ha fallado',
              text: 'No se ha podido crear el boleto, revise los datos',
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
