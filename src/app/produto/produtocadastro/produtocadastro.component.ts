import { DialogService } from 'primeng/dynamicdialog';
import { ProdutoDetalhe } from './../../model/produtodetalhe';
import { ErrohandlerService } from './../../services/errohandler.service';
import { FotoProdutoService } from './../../services/fotoproduto.service';
import { Marca } from './../../model/marca';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MessageService, SelectItem } from 'primeng/api';
import { TipoProduto } from 'src/app/enumerado/tipoproduto';
import { Produto } from 'src/app/model/produto';
import { Subgrupo } from 'src/app/model/subgrupo';
import { ProdutoService } from 'src/app/services/produto.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError } from 'rxjs/internal/operators/catchError';
import { GeradoreanService } from 'src/app/services/geradorean.service';
import { Unidademedida } from 'src/app/enumerado/unidademedida';
import { FormdialogService } from 'src/app/services/formdialog.service';
import { Componente } from 'src/app/model/componente';

@Component({
  selector: 'app-produtocadastro',
  templateUrl: './produtocadastro.component.html',
  styleUrls: ['./produtocadastro.component.css'],
})
export class ProdutocadastroComponent implements OnInit {
  produto = new Produto();
  marca = new Marca();
  bloqueiaboatao = false;
  subgrupo = new Subgrupo();
  valoresEnum = Object.values(TipoProduto);
  pictureImageTxt = 'Escolha uma imagem';
  url: string = '';
  produtoDetalhe = new ProdutoDetalhe()
  tipoproduto: SelectItem[] = [];
  unidadmedidas: SelectItem[] = [];
  componente = new Componente();
  constructor(
    private fotoProdutoService: FotoProdutoService,
    private produtoService: ProdutoService,
    private errorHandler: ErrohandlerService,
    private idParametro: ActivatedRoute,
    private messageService: MessageService,
    private router: Router,
    private formDialog: FormdialogService,
    private gerarEa13Service: GeradoreanService
  ) {
    this.tipoproduto = Object.keys(TipoProduto).map((key) => ({
      label: TipoProduto[key],
      value: key,
    }));

    this.unidadmedidas = Object.keys(Unidademedida).map((key) => ({
      label: Unidademedida[key],
      value: key,
    }));
  }
  ngOnInit(): void {
    let codigoproduto = this.idParametro.snapshot.params['id'];

    if (codigoproduto) {
      console.log(codigoproduto);

      this.carregarProduto(codigoproduto);
    }
  }
  carregarProduto(codigoproduto: number) {
    this.produtoService.detalhar(codigoproduto).subscribe((data) => {
      console.log(data);
      if (data.subgrupo != null) {
        this.subgrupo = data.subgrupo;
      }
      if (data.marca != null) {
        this.marca = data.marca;
      }else{

      }
      if (data.produtoDetalhe.length > 0) {
      }

      this.produto = data;
      console.log(this.produto);
      this.getbuscarfoto(this.produto.imagem);
    });
  }

  salvar(form: NgForm) {
  // const propriedadesRemover: string[] = ['marca', 'subgrupo', 'preco', 'situacao', 'nome', 'produtoDetalhe'];

    // Remover propriedades de cada objeto no array
 //   this.produtoService.removerPropriedades(this.produto.componentes, propriedadesRemover);
 //  if(this.marca.id != null){

    this.produto.marca = this.marca
  // }

    this.produto.subgrupo = this.subgrupo
    console.log(this.produto)
    if (this.produto.id != null) {
      this.editarProduto();
    } else {
      this.salvarNovoProduto();

      // Exibir o array após a remoção das propriedades
      console.log(this.produto.componentes);
    }
    form.reset();
    this.router.navigate(['/produtos']);
  }
  removerLinha(index: number) {
    this.produto.produtoDetalhe.splice(index, 1);
  }

  async showMarca() {
    try {
      this.marca = await this.formDialog.openMarcaProdutoDiagoialog();
      console.log('Subgrupo Selecionado:', this.marca);
      // Agora você pode usar o subgrupoSelecionado como necessário.
    } catch (error) {
      console.log('Operação cancelada ou ocorreu um erro.');
    }

  }
  async showSubgrupo() {
    try {
      this.subgrupo = await this.formDialog.openSubgrupoDialog();
      console.log('Subgrupo Selecionado:', this.subgrupo);
      // Agora você pode usar o subgrupoSelecionado como necessário.
    } catch (error) {
      console.log('Operação cancelada ou ocorreu um erro.');
    }
  }

  upLoad() {
    let input = document.createElement('input');
    input.type = 'file';
    input.onchange = (_) => {
      let arquivo: any = Array.from(input.files as any);
      const formadata = new FormData();
      formadata.append('arquivo', arquivo[0]);

      if (this.produto.imagem) {
        // this.arquivoService.removerArquivo(this.produto.imagem);
      }

      this.produto.imagem = arquivo[0].name;
      this.url = this.fotoProdutoService.capitpurarImagem(arquivo);

      this.fotoProdutoService.upload(formadata).subscribe((resposta) => {
        console.log(resposta);

        this.url = this.getbuscarfoto(this.produto.imagem);
        /// this.produto.imagemproduto = resposta.nomeArquivo;
      });

      ///  this.getbuscarfoto(this.produtoVariacao.imagemPrncipal);
    };
    input.click();
  }

  getbuscarfoto(image: string) {
    console.log(image);
    if (image) {
      this.url = this.fotoProdutoService.buscarfoto(image);
    } else {
      ///  this.url = '/assets/no-image-icon.jpg';
    }
    return this.url;
  }
  private editarProduto() {
    this.produtoService
      .editar(this.produto)
      .pipe(
        catchError((erro: any) => {
          return throwError(() => this.errorHandler.erroHandler(erro));
        })
      ).subscribe((response: HttpResponse<any>) => {
        const statusCode = response.status;
        if (statusCode === 200) {
          this.mostrarMensagem('Produto editado com sucesso!', 'info');
        }

      });

  }
  private salvarNovoProduto() {
    this.produtoService.salvar(this.produto).pipe(
      catchError((erro: any) => {
        return throwError(() => this.errorHandler.erroHandler(erro));
      })
    ).subscribe();
    this.mostrarMensagem('Produto salvo com sucesso!', 'success');
  }

  private mostrarMensagem(mensagem: string, severidade: string) {

    this.messageService.add({ severity: severidade, detail: mensagem });
  }
  gerarEan13() {
    this.gerarEa13Service.GerarEn13().subscribe((codigoean: any) => {
      console.log(codigoean.codigoEan13 + 'meu codigo');
      this.produtoDetalhe.codigobarras = codigoean.codigoEan13;
    });
  }
  addProdutoDetalhe() {
    if (this.produtoDetalhe.codigobarras.length <= 0) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'campo nao ser vazio'
      });
    } else {
      this.produto.produtoDetalhe.push(this.produtoDetalhe)
      this.produtoDetalhe = new ProdutoDetalhe()

    }

  }

  removerCompnente(index: number) {
    this.diminuirVarlor(index);
    this.produto.componentes.splice(index, 1);
  }
  diminuirVarlor(index: number) {
    this.produto = this.produtoService.removerComponente(index, this.produto);
  }
  showLIstaProduto() {
    this.formDialog.showdialog(this.componente)
    this.bloqueiaboatao = true;
  }

  addComponete() {
    if (this.componente.qtde <= 0) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'qtde não pdoe ser menor que zero ou igual a 0',
      });
    } else {
      this.produto.componentes.push(
        this.produtoService.adiCionarComponente(this.produto, this.componente)
      );
      console.log(this.produto)
      this.componente = new Componente();
      this.bloqueiaboatao = false;
    }
  }

  async showEditaorAddAtributo(indice: number, produtoDetlhe: any) {
    const editedProdutoSku = await this.formDialog.showdialogProdutoSkuEditar(
      produtoDetlhe
    );




    this.produto.produtoDetalhe[indice]= editedProdutoSku;

    console.log(this.produto.produtoDetalhe[indice].atributos);
  }

}
