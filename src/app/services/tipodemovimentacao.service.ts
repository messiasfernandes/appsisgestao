import { Tipodemovimentacao } from './../model/tipodemovimentacao';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { config } from '../config/ini';

@Injectable({
  providedIn: 'root'
})
export class TipodemovimentacaoService {

  constructor(private http: HttpClient) {

  }

  pesquisar():Observable<Tipodemovimentacao>{

    const headers = new HttpHeaders().append(
      'Content-Type',
      'application/json'
    );

    const response = this.http.get<Tipodemovimentacao>(`${config.baseurl}tipodemovimentacoes`, {
      headers,

    });
    console.log(response)
    return response;

  }




}
