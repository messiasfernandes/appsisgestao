import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { Estoquemovimentacao } from 'src/app/model/estoquemovimentacao';
import { Filtro } from 'src/app/model/filtro';
import { Produto } from 'src/app/model/produto';
import { ProdutoService } from 'src/app/services/produto.service';

@Component({
  selector: 'app-estoquemovimento-dialog',
  templateUrl: './estoquemovimento-dialog.component.html',
  styleUrls: ['./estoquemovimento-dialog.component.css']
})
export class EstoquemovimentoDialogComponent implements OnInit{
  produtos : any[]=[]
  produto  = new Produto()
  produtofiltro = new  Filtro()
  totalRegistros=0;
  movitencao = new Estoquemovimentacao()
  constructor( private produtoService: ProdutoService){

  }
  ngOnInit(): void {
     this.buscar();
  }
  aciionarMovimento(){

  }
  listarProdutos(evento:any){
    console.log(evento.query);
  this.produtofiltro.parametro = evento.query;
  this.produtoService.pesquisar(this.produtofiltro).subscribe(
    (reposta: any)=>{
      this.produtos =reposta;
    }
  )

  }
  buscar(pagina: number= 0):void{
    this.produtofiltro.pagina = pagina;
    this.produtoService
      .pesquisar(this.produtofiltro)


      .subscribe((dados: any) => {
        console.log(dados.content);
        console.log(dados.totalPages)
console.log(dados.totalElements)
console.log(dados.size)
        this.produtos = dados.content;
        this.totalRegistros = dados.totalElements;
        console.log(this.produtos)
      });
      console.log(this.produtos)
   }
   aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event!.first! / event!.rows!;
    this.buscar(pagina);
  }
}
