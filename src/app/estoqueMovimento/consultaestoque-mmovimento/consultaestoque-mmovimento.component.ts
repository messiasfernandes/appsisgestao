import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent, TreeNode } from 'primeng/api';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError } from 'rxjs/internal/operators/catchError';
import { Filtro } from 'src/app/model/filtro';
import { ErrohandlerService } from 'src/app/services/errohandler.service';
import { ProdutoService } from 'src/app/services/produto.service';

@Component({
  selector: 'app-consultaestoque-mmovimento',
  templateUrl: './consultaestoque-mmovimento.component.html',
  styleUrls: ['./consultaestoque-mmovimento.component.css']
})
export class ConsultaestoqueMmovimentoComponent implements OnInit {
  produtos: TreeNode[] = [];
  cols: any[];
  totalRegistros=0
  produtofiltro = new Filtro()
  constructor(private produtoService: ProdutoService,
    private erroService: ErrohandlerService,
  ){}
  ngOnInit(): void {
    this.cols = [
      { field: 'nome', header: 'Nome' },
      { field: 'size', header: 'Size' },
      { field: 'type', header: 'Type' }

  ];
  this.buscar();
  }
  buscar(pagina: number= 0):void{
    this.produtofiltro.pagina = pagina;
    this.produtoService
      .pesquisar(this.produtofiltro)
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

}
