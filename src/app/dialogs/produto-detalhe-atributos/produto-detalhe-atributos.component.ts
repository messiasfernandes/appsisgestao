import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Atributo } from 'src/app/model/atributo';
import { ProdutoDetalhe } from 'src/app/model/produtodetalhe';
import { ErrohandlerService } from 'src/app/services/errohandler.service';

@Component({
  selector: 'app-produto-detalhe-atributos',
  templateUrl: './produto-detalhe-atributos.component.html',
  styleUrls: ['./produto-detalhe-atributos.component.css']
})
export class ProdutoDetalheAtributosComponent {
  public produtoDetlhe = new ProdutoDetalhe();
  public atributo = new Atributo();

  constructor(
    private messageService: MessageService,
    public ref: DynamicDialogRef,
    private errorHandler: ErrohandlerService,

    public config: DynamicDialogConfig,

  ) {
    if (this.config.data && this.config.data.objetoOriginal != null) {
      this.produtoDetlhe = this.config.data.objetoOriginal;


    }
  }
  remover(index: number) {
    this.produtoDetlhe.atributos.splice(index, 1);
  }
  selecionarProduto() {
    this.ref.close(this.produtoDetlhe);
  }
  addAtributo() {
    this.produtoDetlhe.atributos.push(this.atributo);
    this.atributo = new Atributo();
  }
}
