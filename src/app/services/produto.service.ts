import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Filtro } from '../model/filtro';
import { config } from '../config/ini';
import { Observable } from 'rxjs';
import { Produto } from '../model/produto';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  constructor(private http: HttpClient) { }

  pesquisar(filtro: Filtro): Promise<any> {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/json');
    let params = new HttpParams()
      .set('page', filtro.pagina.toString())
      .set('size', filtro.itensPorPagina.toString())


    if (filtro.parametro) {
      params = params.set('parametro', filtro.parametro);
    }
    return this.http
      .get<any>(`${config.baseurl}produtos?`, { headers, params })
      .toPromise()
      .then((response: any) => {
        var produtosreposta = response.content;
        const resultado = {
          produtosreposta,
          total: response['totalElements'],
        };

        return resultado;
      });
  }
  detalhar(id: number): Observable<Produto> {
    return this.http.get<Produto>(`${config.baseurl}produtos/${id}`);
  }
  salvar(objeto: Produto): Observable<Produto> {
    const headers = new HttpHeaders().append(
      'Content-Type',
      'application/json'
    );
    const resposta = this.http.post<Produto>(
      `${config.baseurl}produtos`,
      objeto,
      { headers }
    );
    return resposta;
  }
  editar(objeto: Produto): Observable<any> {
    const headers = new HttpHeaders().append(
      'Content-Type',
      'application/json'
    );

    return this.http.put<Produto>(
      `${config.baseurl}produtos`,
      objeto,
      { headers, observe: 'response' }
    );
  }
  excluir(id: number): Observable<any> {
    return this.http.delete(`${config.baseurl}produtos/${id}`);
  }
}
