import { ErrohandlerService } from './../../services/errohandler.service';
import { Component, ViewChild } from '@angular/core';
import { ConfirmationService, LazyLoadEvent, MessageService } from 'primeng/api';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError } from 'rxjs/internal/operators/catchError';
import { Filtro } from 'src/app/model/filtro';
import { ProdutoService } from 'src/app/services/produto.service';

@Component({
  selector: 'app-produtolista',
  templateUrl: './produtolista.component.html',
  styleUrls: ['./produtolista.component.css']
})
export class ProdutolistaComponent {
  produtofiltro = new Filtro()
  produtos: any[] = [];
  totalRegistros = 0;


  @ViewChild('tabela') grid: any;
  constructor(private produtoService: ProdutoService,
    private erroService: ErrohandlerService,
    private confirmacao: ConfirmationService,
    private messageService: MessageService) { }

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
  excluir(produto: any) {
    this.produtoService.excluir(produto.id)
      .pipe(
        catchError((erro: any) => {
          return throwError(() => this.erroService.erroHandler(erro));
        })
      )
      .subscribe(() => {
        this.buscar();
        this.grid.first = 0;
        this.messageService.add({
          severity: 'success',
          detail: ' Excluida com sucesso!',
        });
      });
  }
  confirmarExclusao(produto: any) {
    this.confirmacao.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
        this.excluir(produto);
      },
    });
  }
}


