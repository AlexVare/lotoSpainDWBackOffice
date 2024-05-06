import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated: boolean;
  userState$: any;

  constructor() {
    this.isAuthenticated = this.getAuthToken();
  }

  public getAuthToken(): boolean {
    const token = localStorage.getItem('Token');
    return !!token; // Utilizamos el operador !! para convertir el valor en un booleano
  }

  // Método público para verificar si el usuario está autenticado
  public isLoggedIn(): boolean {
    return this.isAuthenticated;
  }


}
