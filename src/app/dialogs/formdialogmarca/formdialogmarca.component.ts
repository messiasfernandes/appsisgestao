import { Component, ViewChild } from '@angular/core';
import { ConfirmationService, LazyLoadEvent, MessageService } from 'primeng/api';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError } from 'rxjs/internal/operators/catchError';
import { Filtro } from 'src/app/model/filtro';
import { Marca } from 'src/app/model/marca';
import { ErrohandlerService } from 'src/app/services/errohandler.service';
import { FormdialogService } from 'src/app/services/formdialog.service';
import { MarcaService } from 'src/app/services/marca.service';

@Component({
  selector: 'app-formdialogmarca',
  templateUrl: './formdialogmarca.component.html',
  styleUrls: ['./formdialogmarca.component.css']
})
export class FormdialogmarcaComponent {
  public marca = new Marca();
  @ViewChild('tabela') grid: any;
   public marcafiltro= new Filtro();
  public marcas: any[] = [];
  public totalRegistros = 0;
  constructor(
    public ref: DynamicDialogRef,
    private marcaService: MarcaService,
   private erroService :ErrohandlerService,
   private formDiaologService: FormdialogService,
   private confirmacao: ConfirmationService,
   private messageService: MessageService
  ) {}
  selecionarMarca(marca: any) {
    console.log(marca);
    this.ref.close(marca);
  }
  buscar(pagina: number = 0): void {
    this.marcafiltro.pagina = pagina;
    this.marcaService
      .pesquisar(this.marcafiltro)
       .pipe(
          catchError((erro: any) => {
             return throwError(() => this.erroService.erroHandler(erro));
           })
           )
      .subscribe((dados: any) => {
        console.log(dados.content);
        this.marcas = dados.content;
''
        this.totalRegistros = dados.totalElements;
      });
  }
  showMarca() {
    this.formDiaologService.cadastroMarcaiadialog();
  }
  async editaMarca(marca: any) {
    this.formDiaologService.showdialogMarcaEdit(marca);

  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event!.first! / event!.rows!;
    this.buscar(pagina);
  }
}
