import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environment';
import { InterfazBoleto } from '../models/BoletoInterface';


@Injectable({
  providedIn: 'root'
})
export class ProductService{

  constructor(private http: HttpClient) { }

  getAll() {
    const opciones = {
      headers: new HttpHeaders({
        'accept':'text/plain'
      }),
    };
    return this.http.get(environment.URLServer + 'products');
  }

  delete(boleto: InterfazBoleto){
    const opciones = {
      headers: new HttpHeaders({
        'accept':'text/plain'
      }),
    };
    return this.http.delete(environment.URLServer + 'products/' + boleto.id, opciones)
  }
  register(boleto: InterfazBoleto) {
    const opciones = {
      headers: new HttpHeaders({
        'accept':'text/plain',
        'Content-Type':'application/json'
      }),
    };
    return this.http.post(environment.URLServer + 'products', boleto, opciones);
  }

  update(boleto: InterfazBoleto){
    const opciones = {
    headers: new HttpHeaders({
      'accept':'text/plain',
      'Content-Type': 'application/json',
    }),
  };
  return this.http.put(environment.URLServer + `products/` + boleto.id, boleto, opciones);
  }


  searchProducts(boleto: InterfazBoleto) {
    const opciones = {
      headers: new HttpHeaders({
        accept: 'text/plain',
      }),
    };
    return this.http.get<InterfazBoleto>(
      environment.URLServer + 'products/' + boleto.id,
      opciones
    );
  }

}
