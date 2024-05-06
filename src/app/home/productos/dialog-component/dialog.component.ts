import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { InterfazBoleto } from 'src/app/models/BoletoInterface';
import { ProductService } from 'src/app/services/product-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent {
  constructor(
    private dialogRef: MatDialogRef<DialogComponent>,
    private http: HttpClient,
    private productService: ProductService
  ) {}
  @ViewChild('fileInput', { static: false }) fileInput!: ElementRef;
  dataSource!: MatTableDataSource<InterfazBoleto>;
  displayedColumns: string[] = [
    'Foto',
    'Nombre',
    'NumeroBoleto',
    'Precio',
    'Disponibilidad',
  ];
  pageNumber: number = 1;
  pageSize: number = 4;
  data!: any[];
  selectedFile!: File;
  fileData: any[] = [];
  lista: InterfazBoleto[] = [];

  downloadFile(): void {
    const fileUrl = '../../../../assets/excel/Ejemplo_importacion_loterias.csv';

    const element = document.createElement('a');
    element.setAttribute('href', fileUrl);
    element.setAttribute('download', '');

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  }

  archivoTexto: string = '';

  leerArchivo(event: Event): void {
    const input = event.target as HTMLInputElement;
    const archivo =
      input.files && input.files.length > 0 ? input.files[0] : null;

    if (archivo) {
      const lector = new FileReader();
      lector.onload = () => {
        this.archivoTexto = lector.result as string;
        console.log(this.archivoTexto);
        this.divideArray(this.archivoTexto);
      };
      lector.readAsText(archivo);
    }
  }
  divideArray(texto: string) {
    var arrayLineas: string[] = texto.split('\n');
    console.log(arrayLineas);
    for (var i = 1; i < arrayLineas.length - 1; i++) {
      var linea: string[] = arrayLineas[i].split(',');
      console.log(linea);
      console.log(linea[5]);
      var nuevoElemento: InterfazBoleto = {
        id: 0,
        nombre: linea[0],
        numero: linea[1],
        serie: parseInt(linea[2]),
        fraccion: parseInt(linea[3]),
        precio: parseInt(linea[4]),
        disponibilidad: parseInt(linea[5]),
      };
      this.lista.push(nuevoElemento);
    }
  }
  uploadProduct() {
    console.log('productos subidos');
    Swal.fire({
      title: 'Se van a generar varios boletos',
      text: 'Esta accion creará los boletos proporcionados por el documento',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Crear',
    }).then((result) => {
      if (result.isConfirmed) {
        for (var i = 0; i < this.lista.length; i++) {
          this.productService.register(this.lista[i]).subscribe({
            next: (res: any) => {
              console.log(res);
              if(i==this.lista.length){
                Swal.fire({
                  title: 'Exito',
                  text: 'Se han generado todos los boletos',
                  icon: 'success',
                  timer: 2000,
                });
              }
            },
            error: (err) => {
              console.log('ERROR OBTENIENDO LOS DATOS', err);
              Swal.fire({
                title: 'Algo ha fallado',
                text: 'No se ha podido crear todos los boletos',
                icon: 'error',
                timer: 3000,
              });
            },
            complete: () => {},
          });
          console.log(this.lista[i]);
        }
        this.lista = [];
        this.dialogRef.close();
      }
    });
  }
}
