import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { InterfazBoleto } from 'src/app/models/BoletoInterface';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/home/productos/dialog-component/dialog.component';
import { HttpClient } from '@angular/common/http';
import { ProductService } from 'src/app/services/product-service.service';
import { EditDialogComponent } from './edit-dialog/edit-dialog.component';
import { NboletoComponent } from './nboleto/nboleto.component';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss'],
})
export class ProductosComponent implements OnInit, AfterViewInit {
  dataSource!: MatTableDataSource<InterfazBoleto>;

  displayedColumns: string[] = [
    'Nombre',
    'NumeroBoleto',
    'Precio',
    'Disponibilidad',
    'Accions',
  ];

  pageNumber: number = 1;
  pageSize: number = 5;
  data: InterfazBoleto[] = [];

  constructor(
    public dialog: MatDialog,
    private http: HttpClient,
    private productService: ProductService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getAllProducts();
  }

  ngAfterViewInit() {}

  todoCero() {
    console.log('Todo a cero');
  }

  generarProducto() {
    const dialogRef = this.dialog.open(NboletoComponent, {});
    console.log('Producto nuevo');

    dialogRef.afterClosed().subscribe((result) => {
      console.log('Diálogo cerrado', result);
      this.getAllProducts();
      window.location.reload();
    });
  }

  cargaMasiva() {
    console.log('Carga masiva');
    this.generateView();
  }

  editBoleto(row: InterfazBoleto) {
    const modal = this.dialog.open(EditDialogComponent, { data: row });
    console.log('Editar boleto');

    modal.afterClosed().subscribe((result) => {
      console.log('Diálogo cerrado', result);
      this.getAllProducts();
      // window.location.reload();
    });
  }

  generateView() {
    const modal=this.dialog.open(DialogComponent, {});

    modal.afterClosed().subscribe(result => {
      console.log('Diálogo cerrado', result);
      this.getAllProducts();
      // window.location.reload();
    });
  }

  getAllProducts() {

    Swal.fire({
      title: 'Cargando datos...',
      html: 'Cargados Correctamente...',
      allowEscapeKey: false,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
      timer: 2000,
    });
    this.productService.getAll().subscribe({
      next: (res: any) => {
        if (res.length === 0) {
          Swal.fire({
            icon: "warning",
            title: "No hay datos dentro de la tabla",
             text: "En estos momento no hay boleto"
        })
        } else {
          this.data = res;
          console.log(res);
          Swal.close();
        }
      },
      error: (err: any) => {
        console.log('ERROR OBTENIENDO LOS DATOS', err);
      },
      complete: () => {},
    });
  }


  searchAndEditProduct(numero: string) {
    if (numero.trim() !== '') {
      this.productService.getAll().subscribe((boletos: any) => {
        const boleto = (boletos as InterfazBoleto[]).find(boleto => boleto.numero.toString() === numero);
        if (boleto) {
          this.editBoleto(boleto);
        } else {
          alert("Boleto no encontrado, prueba a buscar el boleto por el número ")
        }
      });
    }
  }



}
