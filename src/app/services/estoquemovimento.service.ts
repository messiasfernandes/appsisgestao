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
      .set('tipo', filtro.operacao ? filtro.operacao : Operacao.Entrada); // Verifica se filtro.operacao é definido

      // Convertendo data de início para string no formato YYYY-MM-DD
 // Convertendo data de fim para string no formato YYYY-MM-DD

// Aqui você pode usar dataInicioStr e dataFimStr para enviar para a API
//console.log("Data de início como string: " + dataInicioStr);
  ///console.log("Data de fim como string: " + dataFimStr);

    if (filtro.parametro) {
      params = params.set('parametro', filtro.parametro);
    }
    if (filtro.datanicio) {
      let dataInicioStr: string = filtro.datanicio.toISOString().split('T')[0];
      params = params.set('datanicio', dataInicioStr);
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


}
