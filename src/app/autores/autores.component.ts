import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { AutorInterface } from './autor-interface';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { DialogAutoresComponent } from './dialog-autores/dialog-autores.component';
import { AutoresServiceService } from '../services/autores-service.service';
import { EditDialogAutoresComponent } from './edit-dialog.autores/edit-dialog.autores.component';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-autores',
  templateUrl: './autores.component.html',
  styleUrls: ['./autores.component.scss'],
})
export class AutoresComponent implements OnInit, AfterViewInit {
  dataSource: MatTableDataSource<AutorInterface>;
  displayedColumns: string[] = [
    'Nombre',
    'Apellidos',
    'Correo',
    'Estatus',
    'Contraseña',
    'Editar',
  ];

  pageNumber = 1;
  pageSize = 5;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  author: AutorInterface[] = [];

  total: number = 0;
  data: any;
  dialogRef: any;

  constructor(
    private dialog: MatDialog,
    private autoresService: AutoresServiceService
  ) {
    this.dataSource = new MatTableDataSource(this.author);
  }

  ngOnInit(): void {
    this.readAutores();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  readAutores() {
    Swal.fire({
      title: 'Leyendo...',
      html: 'Lectura Completada',
      allowEscapeKey: false,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
      timer: 2000,
    });
    this.autoresService.getAll().subscribe({
      next: (res: any) => {
        if (res.length == '') {
          Swal.fire({
            icon: 'warning',
            title: 'No hay datos dentro de la tabla',
            text: 'En estos momento no hay autores',
          });
        } else {
          this.author = res;
          console.log(res);
          Swal.close();
        }
      },
      error: (err: any) => {
        console.error('Error al mostrar los datos', err);
      },
      complete: () => {},
    });

    console.log(this.author);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  showAuthor(autor: AutorInterface) {
    this.showRow(autor);
  }

  showRow(row: AutorInterface) {
    console.log('Mostrar', row);
  }

  editRow(row: AutorInterface) {

    const modal = this.dialog.open(EditDialogAutoresComponent, { data: row });
    console.log('Editar autor');

    modal.afterClosed().subscribe((result) => {
      console.log('Autor actualizado:', result);
      this.readAutores();
    });
  }

  deleteRow(row: AutorInterface) {
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

        this.autoresService.delete(row).subscribe({
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
            this.readAutores();
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

  nuevoAutor() {
    const newAuthor: AutorInterface = {
      id: 0,
      name: '',
      email: '',
      lastname: '',
      password: '',
      showPassword: false,
    };
    this.GenerateView(newAuthor);
  }

  GenerateView(row: AutorInterface) {
    const modal = this.dialog.open(DialogAutoresComponent, { data: row });

    modal.afterClosed().subscribe((result) => {
      console.log('Autor creado:', result);
      this.readAutores();
    });
  }

  getAllAuthors() {
    this.autoresService.getAll().subscribe({
      next: (res: any) => {
        this.data = res;
        console.log(res);
      },
      error: (err: any) => {
        console.log('Error obteniendo los autores', err);
      },
      complete: () => {},
    });
  }
  searchAndEditAuthor(email: string) {
    if (email.trim() !== '') {
      this.autoresService.getAll().subscribe((authors: any) => {
        const author = (authors as AutorInterface[]).find(author => author.email === email);
        if (author) {
          this.editRow(author);
        } else {
          console.log('Autor no encontrado');
        }
      });
    }
  }




  MostrarOcultarPassword(author: AutorInterface) {
    author.showPassword = !author.showPassword;
  }
}
