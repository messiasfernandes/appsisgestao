import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Filtro } from '../model/filtro';
import { Observable } from 'rxjs/internal/Observable';
import { Subgrupo } from '../model/subgrupo';
import { config } from '../config/ini';

@Injectable({
  providedIn: 'root'
})
export class SubgrupoService {
  constructor(private http: HttpClient) {

  }
  pesquisar(filtro: Filtro): Observable<Subgrupo> {

    const headers = new HttpHeaders().append(
      'Content-Type',
      'application/json'
    );
    let params = new HttpParams()
      .set('page', filtro.pagina.toString())
      .set('size', filtro.itensPorPagina.toString())


    if (filtro.parametro) {
      params = params.set('parametro', filtro.parametro);
    }
    const response = this.http.get<Subgrupo>(`${config.baseurl}subgrupos`, {
      headers,
      params,
    });
    console.log(response)
    return response;
  }
}
