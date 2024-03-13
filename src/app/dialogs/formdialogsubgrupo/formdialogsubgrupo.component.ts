import { Component } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError } from 'rxjs/internal/operators/catchError';
import { Filtro } from 'src/app/model/filtro';
import { Subgrupo } from 'src/app/model/subgrupo';
import { ErrohandlerService } from 'src/app/services/errohandler.service';
import { SubgrupoService } from 'src/app/services/subgrupo.service';

@Component({
  selector: 'app-formdialogsubgrupo',
  templateUrl: './formdialogsubgrupo.component.html',
  styleUrls: ['./formdialogsubgrupo.component.css']
})
export class FormdialogsubgrupoComponent {
  public subgrupoFiltro = new Filtro();
  public subGrupo = new Subgrupo();
  public subgrupos: any[] = [];
  public totalRegistros = 0;
  constructor(
    public ref: DynamicDialogRef,
    private subrgrupoService: SubgrupoService,
    private errorHandler: ErrohandlerService,
  ) {}
  selecionarSubgrupo(subgrupo: any) {
    console.log(subgrupo);
    this.ref.close(subgrupo);
  }
  buscar(pagina: number = 0): void {
    this.subgrupoFiltro.pagina = pagina;
    this.subrgrupoService
      .pesquisar(this.subgrupoFiltro)
       .pipe(
            catchError((erro: any) => {
             return throwError(() => this.errorHandler.erroHandler(erro));
           })
          )
      .subscribe((dados: any) => {
        console.log(dados.content);
        this.subgrupos = dados.content;

        this.totalRegistros = dados.totalElements;
      });
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event!.first! / event!.rows!;
    this.buscar(pagina);
  }
}
