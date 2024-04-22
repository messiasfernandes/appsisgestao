import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent, SelectItem } from 'primeng/api';
import { windowToggle } from 'rxjs';
import { Operacao } from 'src/app/enumerado/opercao';
import { Estoquemovimentacao } from 'src/app/model/estoquemovimentacao';
import { Filtro } from 'src/app/model/filtro';
import { ItemMovimentacao } from 'src/app/model/item-movimentacao';
import { Produto } from 'src/app/model/produto';
import { ProdutoService } from 'src/app/services/produto.service';

@Component({
  selector: 'app-estoquemovimento-dialog',
  templateUrl: './estoquemovimento-dialog.component.html',
  styleUrls: ['./estoquemovimento-dialog.component.css'],
})
export class EstoquemovimentoDialogComponent implements OnInit {
  produtos: any[] = [];

  produtofiltro = new Filtro();
  totalRegistros = 0;
   item = new ItemMovimentacao()
  movitencao = new Estoquemovimentacao();
  opercoes: SelectItem[] = [];
  constructor(private produtoService: ProdutoService) {
    this.opercoes = Object.keys(Operacao).map((key) => ({
      label: Operacao[key],
      value: key,
    }));
  }
  ngOnInit(): void {}
  adicionarMovimento() {

   console.log(this.item.produto.nome)

   this.movitencao.items.push(this.item)
   console.log(this.movitencao.items)
    this.item = new ItemMovimentacao()
  }
  listarProdutos(evento: any) {
    console.log(evento.query);
    this.produtofiltro.parametro = evento.query;
    this.produtofiltro.pagina = 0;
    console.log(this.produtofiltro.parametro)
    this.produtoService.pesquisar(this.produtofiltro).subscribe(( resposta:any)=>{
      this.produtos= resposta.content;
      this.totalRegistros= resposta.totalElements;

    })

  }
}
