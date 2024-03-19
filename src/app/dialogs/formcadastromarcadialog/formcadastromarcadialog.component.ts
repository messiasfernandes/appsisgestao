import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError } from 'rxjs/internal/operators/catchError';
import { Marca } from 'src/app/model/marca';
import { ErrohandlerService } from 'src/app/services/errohandler.service';
import { MarcaService } from 'src/app/services/marca.service';

@Component({
  selector: 'app-formcadastromarcadialog',
  templateUrl: './formcadastromarcadialog.component.html',
  styleUrls: ['./formcadastromarcadialog.component.css']
})
export class FormcadastromarcadialogComponent {
  public marca = new Marca();
  constructor(
    private marcaService: MarcaService,
    private messageService: MessageService,
    public ref: DynamicDialogRef,
    private errorHandler: ErrohandlerService,

    public config: DynamicDialogConfig
  ) {

    if (this.config.data && this.config.data.objetoOriginal != null) {
      this.marca = this.config.data.objetoOriginal;
    }
  }

  salvar(form: NgForm) {
    let erroOcorrido= false;
    if (this.marca.id != null) {

     this.marcaService
       .editar(this.marca)
       .pipe(
         catchError((erro: any) => {
           return throwError(() => this.errorHandler.erroHandler(erro));
         })
       )
       .subscribe((response: Marca) => {
             console.log(response)
      {
           this.messageService.add({
             severity: 'info',
             detail: 'subcategoria editado com sucesso!',
           });
          // form.reset();
         this.selecionarMarca()
         }
       });
     }else
     this.marcaService.salvar(this.marca)
     .pipe(
       catchError((erro: any) => {
         erroOcorrido = true;
         this.errorHandler.erroHandler(erro);
         return throwError(() => erro);
       })
     )
     .subscribe(() => {
       if (!erroOcorrido) {
         this.messageService.add({
           severity: 'success',
           detail: 'Subcategoria salva com sucesso!',
         });

       }
     });;
    // form.reset();
     this.ref.close();
   }
   selecionarMarca() {
    this.ref.close(this.marca);
  }

}
