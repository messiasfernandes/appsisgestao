import { ItemMovimentacao } from './../../model/item-movimentacao';
import { EstoquemovimentoService } from 'src/app/services/estoquemovimento.service';
import { map } from 'rxjs/internal/operators/map';
import { TipodemovimentacaoService } from './../../services/tipodemovimentacao.service';
import { Tipodemovimentacao } from './../../model/tipodemovimentacao';
import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent, MessageService, SelectItem } from 'primeng/api';
import { catchError, throwError, windowToggle } from 'rxjs';
import { Operacao } from 'src/app/enumerado/opercao';
import { Estoquemovimentacao } from 'src/app/model/estoquemovimentacao';
import { Filtro } from 'src/app/model/filtro';

import { Produto } from 'src/app/model/produto';
import { ProdutoService } from 'src/app/services/produto.service';
import { ErrohandlerService } from 'src/app/services/errohandler.service';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-estoquemovimento-dialog',
  templateUrl: './estoquemovimento-dialog.component.html',
  styleUrls: ['./estoquemovimento-dialog.component.css'],
})
export class EstoquemovimentoDialogComponent implements OnInit {
  produtos: any[] = [];
 // tiposdeMovivmentacoes: any[] = []
  produtofiltro = new Filtro();
  totalRegistros = 0;
  item = new ItemMovimentacao()
  movitencao = new Estoquemovimentacao();
  tiposdeMovivmentacoes: SelectItem[] = [];
  constructor(private produtoService: ProdutoService,
    private tipomovimentacaosService: TipodemovimentacaoService,
    private estoqueMovimentoService: EstoquemovimentoService,
    private errorHandler: ErrohandlerService,
    private messageService: MessageService,
    private ref: DynamicDialogRef
  ) {
   // this.opercoes = Object.keys(Operacao).map((key) => ({
    //  label: Operacao[key],
   //   value: key,
  //  }));
  }
  ngOnInit(): void {
    this.listaTipoMoviementacao()
  }
  adicionarMovimento() {

    console.log(this.item.produto)

    this.movitencao.items.push(this.item)

    console.log(this.movitencao.items)
    this.item = new ItemMovimentacao()
  }
  listaTipoMoviementacao() {
    this.tipomovimentacaosService.pesquisar().subscribe(
      (resposta: any) =>
        this.tiposdeMovivmentacoes = resposta.map((t: Tipodemovimentacao) => ({ label: t.descricao, value: t.id })))




  }

  listarProdutos(evento: any) {

    console.log(evento.query);
    this.produtofiltro.parametro = evento.query;
    this.produtofiltro.pagina = 0;
    console.log(this.produtofiltro.parametro)
    this.produtoService.pesquisar(this.produtofiltro).subscribe((resposta: any) => {

      this.produtos = resposta.content;

      this.totalRegistros = resposta.totalElements;

    })

   //this.removerPropriedades(this.produtos, valoresParaRemover);

   console.log(this.produtos)
  }

  salvarMovimentaceos() {
 /// this.movitencao.tipoMovimentacaoEstoque= this.tiposdeMovivmentacoes[0]
    let valoresParaRemover = ['marca', 'subgrupo', 'situacao'];
    this.removerPropriedades(this.movitencao.items, valoresParaRemover)
   console.log(this.movitencao)
   this.estoqueMovimentoService.salvar(this.movitencao).pipe(
    catchError((erro: any) => {
      return throwError(() => this.errorHandler.erroHandler(erro));
    })
  ).subscribe();

  this.messageService.add({
    severity: 'success',
    detail: 'Produto salvo com sucesso!',
  });
  this.fecharForm()

  }
  fecharForm(){
    this.ref.close()
  }
  removerPropriedades(array: ItemMovimentacao[], props: string[]){
    array.forEach(obj => {
      for (let prop of props) {
        if (obj.produto.hasOwnProperty(prop)) {
          delete obj.produto[prop as keyof ItemMovimentacao]; // Usando keyof para garantir a tipagem correta
        }
      }
    });
  }
}
