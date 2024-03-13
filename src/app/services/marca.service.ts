import { Injectable } from '@angular/core';
import { Filtro } from '../model/filtro';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Marca } from '../model/marca';
import { config } from '../config/ini';

@Injectable({
  providedIn: 'root'
})
export class MarcaService {
  constructor(private http: HttpClient) {}

  pesquisar(filtro: Filtro): Observable<Marca> {
    const headers = new HttpHeaders().append(
      'Content-Type',
      'application/json'
    );
    let params = new HttpParams()
      .set('page', filtro.pagina.toString())
      .set('size', filtro.itensPorPagina.toString());

    if (filtro.parametro) {
      params = params.set('parametro', filtro.parametro);
    }
    const response = this.http.get<Marca>(`${config.baseurl}marcas`, {
      headers,
      params,
    });

    return response;
  }
  detalhar(id: number): Observable<Marca> {
    return this.http.get<Marca>(`${config.baseurl}marcas/${id}`);
  }
  salvar(objeto: Marca): Observable<Marca> {
    const headers = new HttpHeaders().append(
      'Content-Type',
      'application/json'
    );
    const resposta = this.http.post<Marca>(
      `${config.baseurl}marcas`,
      objeto,
      { headers }
    );
    return resposta;
  }
  editar(objeto: Marca): Observable<any> {
    const headers = new HttpHeaders().append(
      'Content-Type',
      'application/json'
    );

    return this.http.put<Marca>(
      `${config.baseurl}marcas/${objeto.id}`,
      objeto,
      { headers, observe: 'response' }
    );
  }
  excluir(id: number): Observable<any> {
    return this.http.delete(`${config.baseurl}marcas/${id}`);
  }
}
