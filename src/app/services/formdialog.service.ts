import { ProdutoDetalhe } from './../model/produtodetalhe';
import { FormcadastromarcadialogComponent } from './../dialogs/formcadastromarcadialog/formcadastromarcadialog.component';
import { Injectable } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Marca } from '../model/marca';
import { FormdialogmarcaComponent } from '../dialogs/formdialogmarca/formdialogmarca.component';
import { Subgrupo } from '../model/subgrupo';
import { FormdialogsubgrupoComponent } from '../dialogs/formdialogsubgrupo/formdialogsubgrupo.component';
import { Produto } from '../model/produto';
import { ListadialogprodutoComponent } from '../dialogs/listadialogproduto/listadialogproduto.component';
import { Componente } from '../model/componente';
import { Produtocomponte } from '../model/produtocomponte';
import { Atributo } from '../model/atributo';
import { ProdutoDetalheAtributosComponent } from '../dialogs/produto-detalhe-atributos/produto-detalhe-atributos.component';
import { EstoquemovimentoDialogComponent } from '../dialogs/estoquemovimento-dialog/estoquemovimento-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class FormdialogService {
  private ref: DynamicDialogRef;
  constructor(public dialogService: DialogService) { }
  async openSubgrupoDialog(): Promise<Subgrupo> {
    return new Promise<Subgrupo>((resolve, reject) => {
      const sub = new Subgrupo();

      const ref = this.dialogService.open(FormdialogsubgrupoComponent, {
        header: 'Lista de SubCategorias',
        width: '55%',
        modal: true,
        styleClass: "{'960px': '70vw'}",
        contentStyle: { overflow: 'hidden' },
        resizable: false,
        baseZIndex: 10000,
      });

      ref.onClose.subscribe((subgrupo: Subgrupo) => {
        if (subgrupo) {
          console.log(subgrupo);
          resolve(subgrupo);
        } else {
          reject(); // ou resolve(null) se preferir
        }
      });
    });
  }
  async openMarcaProdutoDiagoialog(): Promise<Marca> {
    return new Promise<Marca>((resolve, reject) => {


      const ref = this.dialogService.open(FormdialogmarcaComponent, {
        header: 'Lista de Marcas',
        width: '50%',
        modal: true,
        styleClass: "{'460px': '70vw'}",
        contentStyle: { overflow: 'hidden' },
        resizable: false,
        baseZIndex: 10000,
      });

      ref.onClose.subscribe((marca: Marca) => {
        if (marca) {
          console.log(marca);
          resolve(marca);
        } else {
          reject(); // ou resolve(null) se preferir
        }
      });
    });
  }
  cadastroMarcaiadialog() {

    this.ref = this.dialogService.open(FormcadastromarcadialogComponent, {
      header: ' Adicionar Marca',
      width: '40%', modal: true,
      //   maximizable: true,

      //  styleClass: "{'960px': '70vw'}",
      //      contentStyle: { 'max-height': '800px', overflow: 'auto' },

      // resizable: false,

      // baseZIndex: 10000,
      // style:"width:55vw!important; height:70% !important; top:25% !important; left: 30% !important;"
    });
    this.ref.onClose.subscribe((marca: Marca) => {
      if (marca) {
        this.addMarca(marca)
      }
    });

  }
  addMarca(marca: Marca) {
    return marca
  }

  async showdialogMarcaEdit(marca: any): Promise<Marca> {
    return new Promise<Marca>((resolve, reject) => {
      this.ref = this.dialogService.open(FormcadastromarcadialogComponent, {
        data: {
          objetoOriginal: marca
        },
        modal: true,
        header: 'Editar Marca',
        width: '70%'
      });

      this.ref.onClose.subscribe((objetoEditado: Marca) => {
        if (objetoEditado) {
          console.log(objetoEditado);
          resolve(objetoEditado);
        } else {
          reject(); // ou resolve(null) se preferir
        }
      });


    });
  }
   showMovimentacoes() {
    return this.dialogService.open(EstoquemovimentoDialogComponent, {
      header: "Adicionar Movimentações",
      width: "70%",
      resizable: false,
      modal:true
    });
  }

  showdialog(componente: Componente) {
    this.ref = this.dialogService.open(ListadialogprodutoComponent, {
      header: 'Lista de Produtos',
      width: '60%', modal: true,

      styleClass: "{'960px': '70vw'}",
      contentStyle: { 'max-height': '1000px', overflow: 'auto' },

      resizable: false,

      baseZIndex: 10000,
      // style:"width:55vw!important; height:70% !important; top:25% !important; left: 30% !important;"
    });
    this.ref.onClose.subscribe((produto: Produto) => {
      if (produto) {
        componente.produto = produto;

        // this.bloqueiaboatao = true;
      }
    });
  }

  async showdialogProdutoSkuEditar(produtoDetelhe: any): Promise<ProdutoDetalhe> {
    return new Promise<ProdutoDetalhe>((resolve, reject) => {
      this.ref = this.dialogService.open(ProdutoDetalheAtributosComponent, {
        data: {
          objetoOriginal: produtoDetelhe
        },
        modal: true,
        header: 'Atributos',
        width: '55%',
        closable: false
      });

      this.ref.onClose.subscribe((objetoEditado: ProdutoDetalhe) => {
        if (objetoEditado) {
          console.log(objetoEditado);
          resolve(objetoEditado);
        } else {
          reject(); // ou resolve(null) se preferir
        }
      });


    });
  }


}
