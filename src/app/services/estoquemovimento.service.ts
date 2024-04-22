import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Estoquemovimentacao } from '../model/estoquemovimentacao';
import { config } from '../config/ini';
import { Observable } from 'rxjs/internal/Observable';
import { Filtro } from '../model/filtro';
import { Operacao } from '../enumerado/opercao';
import { Data } from '@angular/router';
import { SelectItem } from 'primeng/api';
import { Movimentacaofiltro } from '../model/movimentacaofiltro';

@Injectable({
  providedIn: 'root'
})
export class EstoquemovimentoService {

  constructor(private http: HttpClient) { }

  pesquisar(filtro: Movimentacaofiltro): Observable<Estoquemovimentacao> {
    const headers = new HttpHeaders().append(
      'Content-Type',
      'application/json'
    );

    let params = new HttpParams()
      .set('page', filtro.pagina.toString())
      .set('size', filtro.itensPorPagina.toString())
      .set('tipo', filtro.operacao ? filtro.operacao : '');
      // Verifica se filtro.operacao é definido


    if (filtro.parametro) {
      params = params.set('parametro', filtro.parametro);
    }
    if (filtro.datanicio) {
      let dataInicioStr: string = filtro.datanicio.toISOString().split('T')[0];
      params = params.set('datainicio', dataInicioStr);
    }
    if (filtro.datafim) {
      let dataFimStr: string =filtro.datafim.toISOString().split('T')[0];
      console.log(filtro.datafim.toDateString())
      params = params.set('datafim', dataFimStr);

    }

    const response = this.http.get<Estoquemovimentacao>(`${config.baseurl}movimentacoesestoque`, {
      headers,
      params,
    });

    return response;
}
salvar(objeto: Estoquemovimentacao): Observable<Estoquemovimentacao> {
  const headers = new HttpHeaders().append(
    'Content-Type',
    'application/json'
  );
  const resposta = this.http.post<Estoquemovimentacao>(
    `${config.baseurl}movimentacoesestoque`,
    objeto,
    { headers }
  );
  return resposta;
}

}
