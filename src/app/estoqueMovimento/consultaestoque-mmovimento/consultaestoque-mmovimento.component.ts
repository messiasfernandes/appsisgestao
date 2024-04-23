import { Operacao } from '../../enumerado/opercao';
import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent, SelectItem } from 'primeng/api';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { Table } from 'primeng/table/table';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError } from 'rxjs/internal/operators/catchError';

import { Movimentacaofiltro } from 'src/app/model/movimentacaofiltro';
import { ErrohandlerService } from 'src/app/services/errohandler.service';
import { EstoquemovimentoService } from 'src/app/services/estoquemovimento.service';
import { FormdialogService } from 'src/app/services/formdialog.service';


@Component({
  selector: 'app-consultaestoque-mmovimento',
  templateUrl: './consultaestoque-mmovimento.component.html',
  styleUrls: ['./consultaestoque-mmovimento.component.css']
})
export class ConsultaestoqueMmovimentoComponent  {

  movimentacaoes: any[] = [];
   ref: DynamicDialogRef;
  totalRegistros: number=0
  datInicio: Date
  dataFim : Date

  opercoes: SelectItem[] = [];

  filtro = new Movimentacaofiltro()
  constructor(private estoqueMovimentoservice : EstoquemovimentoService,
    private erroService: ErrohandlerService,
    private fomrdiaLogService: FormdialogService
  ){
    this.opercoes = Object.keys(Operacao).map((key) => ({
      label: Operacao[key],
      value: key,
    }));
  }
  adionarMOvimentacao(){
    this.ref =  this.fomrdiaLogService.showMovimentacoes();
    this.ref .onClose.subscribe(() => {

      this.buscar();
    });
  }

  buscar(pagina: number= 0):void{
    this.filtro.pagina = pagina;

    this.estoqueMovimentoservice

      .pesquisar(this.filtro)
      .pipe(
        catchError((erro: any) => {
          return throwError(() => this.erroService.erroHandler(erro));
        })
      )
      .subscribe((dados: any) => {
        console.log(dados.content);
        this.movimentacaoes = dados.content;
        this.totalRegistros = dados.totalElements;

      });

   }
   aoMudarPagina(event: LazyLoadEvent) {

    const pagina = event!.first! / event!.rows!;
    console.log('pagina'+ pagina)
    this.buscar(pagina);
  }



}
