import { Injectable } from '@angular/core';
import { LoginRequest } from './loginRequest';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError, BehaviorSubject} from 'rxjs';
import { User } from '../user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  currentUserLoginOn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  currentUserData: BehaviorSubject<User> = new BehaviorSubject<User>({id:0, email:''});

  constructor( private router:Router, private http: HttpClient) { }

  login (email:string, password:string):Observable<any>{


    return this.http.get( 'https://viveiro-back20230712113858.azurewebsites.net/api/users/authenticate?email='+email +'&password='+password);
  }

  private handleError(error:HttpErrorResponse){

    if(error.status===0){
      console.error('Se ha producido un error', error.error);

    }
    else{
      console.error('Backend devuelve código de estado', error.status,error.error);
    }
    return throwError(()=> new Error('Algo falló , intente de nuevo'));
  }
}
