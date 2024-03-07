import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Filtro } from '../model/filtro';
import { config } from '../config/ini';

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
    //  .set('sort', 'nomeproduto');

    if (filtro.paramentro) {
      params = params.set('paramentro', filtro.paramentro);
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
    ///   console.log(resultado)
        return resultado;
      });
  }
}
