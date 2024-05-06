import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { PostInterface } from './post-interface';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DialogpostComponent } from 'src/app/post/dialogpost/dialogpost.component';
import { MatDialog } from '@angular/material/dialog';
import { MostrardialogComponent } from './mostrardialog/mostrardialog.component';
import { PostServiceService } from '../services/post-service.service';
import { EditDialogComponent } from '../home/productos/edit-dialog/edit-dialog.component';
import { EditardialogComponent } from './editardialog/editardialog.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent {
  displayedColumns: string[] = ['title', 'fechadepublicacion', 'editar'];
  dataSource: MatTableDataSource<PostInterface>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  pageNumber: number = 1;
  pageSize = 5;

  post: PostInterface[] = [];

  total: number = this.post.length;
  dialogRef: any;

  constructor(
    private PostServiceService: PostServiceService,
    public dialog: MatDialog,
    private PostService: PostServiceService
  ) {
    this.dataSource = new MatTableDataSource(this.post);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  llenarPosts() {
    Swal.fire({
      title: 'Cargando datos...',
      text: 'Porfavor espere...',
      allowEscapeKey: false,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
      timer: 2000,
    });
    this.PostServiceService.getData().subscribe({
      next: (res: any) => {
        if (res.length === 0) {
          Swal.fire({
              icon: "warning",
              title: "No hay datos dentro de la tabla",
               text: "En estos momento no hay ninguna publicación"
          })

        } else {
          this.post = res;
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

  ngOnInit(): void {
    this.llenarPosts();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  showRow(row: PostInterface) {
    this.MostrarView(row);
  }

  editRow(row: PostInterface) {
    this.EditarView(row);
    console.log('Editar');
  }

  borrarPost(row: PostInterface) {
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
        this.PostServiceService.deleteData(row).subscribe({
          next: (res: any) => {
            console.log(res);
            console.log('borrado');
            Swal.close();
            Swal.fire({
              title: 'Exito',
              text: 'La publicación se ha eliminado',
              icon: 'success',
              timer: 2000,
            });
            this.llenarPosts();
          },
          error: (err) => {
            console.log('ERROR OBTENIENDO LOS DATOS', err);
            Swal.fire({
              title: 'Algo ha fallado',
              text: 'No se ha podido eliminar la publicación',
              icon: 'error',
              timer: 3000,
            });
          },
          complete: () => {},
        });
      }
    });
  }

  nuevaPublicacion() {
    console.log('nuevaPublicación');
    this.GenerateView();
  }

  GenerateView() {
    const modal = this.dialog.open(DialogpostComponent);
    modal.afterClosed().subscribe((result) => {
      this.llenarPosts();
    });
  }

  MostrarView(row: PostInterface) {
    const modal = this.dialog.open(MostrardialogComponent, { data: row });
  }

  EditarView(row: PostInterface) {
    const modal = this.dialog.open(EditardialogComponent, { data: row });
    modal.afterClosed().subscribe((result) => {
      this.llenarPosts();
    });
  }
  searchAndEditPost(title: string) {
    if (title.trim() !== '') {
      this.PostService.getAll().subscribe((authors: any) => {
        const author = (authors as PostInterface[]).find(author => author.title === title);
        if (author) {
          this.editRow(author);
        } else {
          alert("Post no encontrado")
        }
      });
    }
  }



}
