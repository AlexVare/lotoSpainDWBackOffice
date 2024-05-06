import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environment';
import { PostInterface } from '../post/post-interface';

@Injectable({
  providedIn: 'root'
})
export class PostServiceService {

  constructor(private http: HttpClient) { }


  getData(){
    const opciones = {
      headers: new HttpHeaders({
        'accept':'text/plain'
      }),
    }
    return this.http.get(environment.URLServer + 'posts');
  }


  PostData(data:PostInterface){

    const opciones = {
      headers: new HttpHeaders({
        'accept':'text/plain',
        'Content-Type':'application/json'
      }),
    }
    return this.http.post(environment.URLServer + 'posts',data,opciones);
  }


  UpdateData(data:PostInterface){

    const opciones = {
      headers: new HttpHeaders({
        'accept':'*/*',
        'Content-Type':'application/json'
      }),
    }
    return this.http.put(environment.URLServer + 'posts/'+ data.id,data,opciones);
  }

  deleteData(data:PostInterface){

    const opciones = {
      headers: new HttpHeaders({
        'accept':'*/*',
      }),

    }
    return this.http.delete(environment.URLServer + 'posts/'+data.id,opciones);

  }


  getAll() {
    const opciones = {
      headers: new HttpHeaders({
        accept: 'text/plain',
      }),
    };
    return this.http.get(environment.URLServer + 'posts');
  }

  searchPost(title: string): Observable<PostInterface> {
    const opciones = {
      headers: new HttpHeaders({
        accept: 'text/plain',
      }),
    };
    return this.http.get<PostInterface>(
      environment.URLServer + 'posts?name=' + title,
      opciones
    );
  }



}
