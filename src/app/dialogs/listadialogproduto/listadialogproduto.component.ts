import { Component } from '@angular/core';
import { LazyLoadEvent, MessageService } from 'primeng/api';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError } from 'rxjs/internal/operators/catchError';
import { Filtro } from 'src/app/model/filtro';
import { Produto } from 'src/app/model/produto';
import { ErrohandlerService } from 'src/app/services/errohandler.service';
import { ProdutoService } from 'src/app/services/produto.service';

@Component({
  selector: 'app-listadialogproduto',
  templateUrl: './listadialogproduto.component.html',
  styleUrls: ['./listadialogproduto.component.css']
})
export class ListadialogprodutoComponent {
  produtos:any=[]
  produto= new Produto()
  produtofiltro = new Filtro();
  totalRegistros=0;
  ngOnInit(): void {
    this.buscar()
  }
 constructor( private serviceProduto: ProdutoService,
  private messageService: MessageService,
  private erroService: ErrohandlerService,
  public ref: DynamicDialogRef,){

 }
 buscar(pagina: number= 0):void{
  this.produtofiltro.pagina = pagina;
  this.serviceProduto
    .pesquisarComponente(this.produtofiltro)
    .pipe(
      catchError((erro: any) => {
        return throwError(() => this.erroService.erroHandler(erro));
      })
    )
    .subscribe((dados: any) => {
      console.log(dados.content);
      this.produtos = dados.content;

      this.totalRegistros = dados.totalElements;
    });
    console.log(this.produtos)
 }
 aoMudarPagina(event: LazyLoadEvent) {
  const pagina = event!.first! / event!.rows!;
  this.buscar(pagina);
}
 selecionarProduto(produto: any){
console.log(produto)

 this.ref.close(produto);
 }
}
