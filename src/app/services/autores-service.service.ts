import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environment';
import { AutorInterface } from '../autores/autor-interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AutoresServiceService {
  constructor(private http: HttpClient) {}

  getAll() {
    const opciones = {
      headers: new HttpHeaders({
        accept: 'text/plain',
      }),
    };
    return this.http.get(environment.URLServer + 'users');
  }

  update(autor: AutorInterface) {
    const opciones = {
      headers: new HttpHeaders({
        accept: 'text/plain',
        'Content-Type': 'application/json',
      }),
    };
    return this.http.put(
      environment.URLServer + `users/` + autor.id,
      autor,
      opciones
    );
  }

  delete(autor: AutorInterface) {
    const opciones = {
      headers: new HttpHeaders({
        accept: 'text/plain',
      }),
    };
    return this.http.delete(
      environment.URLServer + 'users/' + autor.id,
      opciones
    );
  }

  createAuthors(data: AutorInterface) {
    const opciones = {
      headers: new HttpHeaders({
        accept: 'text/plain',
        'Content-Type': 'application/json',
      }),
    };
    return this.http.post(environment.URLServer + 'users', data, opciones);
  }
  searchAuthors(email: string): Observable<AutorInterface> {
    const opciones = {
      headers: new HttpHeaders({
        accept: 'text/plain',
      }),
    };
    return this.http.get<AutorInterface>(
      environment.URLServer + 'users?email=' + email,
      opciones
    );
  }

}
