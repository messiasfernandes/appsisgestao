import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Filtro } from '../model/filtro';
import { config } from '../config/ini';
import { Observable } from 'rxjs';
import { Produto } from '../model/produto';
import { Componente } from '../model/componente';
import { Produtocomponte } from '../model/produtocomponte';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  constructor(private http: HttpClient) { }


  pesquisar(filtro: Filtro): Observable<Produto> {
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
    const response = this.http.get<Produto>(`${config.baseurl}produtos`, {
      headers,
      params,
    });

    return response;
  }

  pesquisarComponente(filtro: Filtro): Observable<Produto> {
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
    const response = this.http.get<Produto>(`${config.baseurl}produtos/componentes`, {
      headers,
      params,
    });

    return response;
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
  adiCionarComponente(produto: Produto, componente: Componente) {
   produto.preco.customedio = this.converterNaN(produto.preco.customedio);
    produto.preco.precocusto = this.converterNaN(produto.preco.precocusto);
    produto.preco.precovenda = this.converterNaN(produto.preco.precovenda);
    componente.subtotal = componente.qtde * componente.produto.preco.precovenda;
    console.log(componente.subtotal);
    produto.preco.precovenda += componente.subtotal; //componente.produto.precovenda * componente.qtde;
    produto.preco.precocusto += componente.produto.preco.precocusto * componente.qtde;
    produto.preco.customedio += componente.produto.preco.customedio * componente.qtde;

    // this.produto.componentes.push(this.componente)
    return componente;
  }
  converterNaN(valor: number) {
    console.log(valor);
    return isNaN(valor) ? 0 : valor;
  }
  removerComponente(index: number, produto: Produto) {
    produto.preco.customedio = this.converterNaN(produto.preco.customedio);
    produto.preco.precocusto = this.converterNaN(produto.preco.precocusto);
    produto.preco.precovenda = this.converterNaN(produto.preco.precovenda);
    console.log(
      produto.componentes[index].produto.preco.precovenda *
        produto.componentes[index].qtde
    );
    produto.preco.precovenda -=
      produto.componentes[index].produto.preco.precovenda *
      produto.componentes[index].qtde;

    produto.preco.precocusto -=
      produto.componentes[index].produto.preco.precocusto *
      produto.componentes[index].qtde;

    produto.preco.customedio -=
      produto.componentes[index].produto.preco.customedio *
      produto.componentes[index].qtde;

    produto.preco.customedio = this.converterNaN(produto.preco.customedio);
    produto.preco.precocusto = this.converterNaN(produto.preco.precocusto);
    produto.preco.precovenda = this.converterNaN(produto.preco.precovenda);
    return produto;
  }
  removerPropriedades(array: Componente[], props: string[]){
    array.forEach(obj => {
      for (let prop of props) {
        if (obj.produto.hasOwnProperty(prop)) {
          delete obj.produto[prop as keyof Produtocomponte]; // Usando keyof para garantir a tipagem correta
        }
      }
    });

  }
}
