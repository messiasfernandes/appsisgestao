import { Marca } from './../../model/marca';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SelectItem } from 'primeng/api';
import { TipoProduto } from 'src/app/enumerado/tipoproduto';
import { Produto } from 'src/app/model/produto';
import { Subgrupo } from 'src/app/model/subgrupo';

@Component({
  selector: 'app-produtocadastro',
  templateUrl: './produtocadastro.component.html',
  styleUrls: ['./produtocadastro.component.css']
})
export class ProdutocadastroComponent {
  produto = new Produto()
  marca =new Marca()
  subgrupo = new Subgrupo()
  valoresEnum = Object.values(TipoProduto);
  pictureImageTxt = 'Escolha uma imagem';
  url: string = '';
  tipoproduto: SelectItem[] = [];
   tipo! :TipoProduto;
  constructor(){

  }

  salvar(form: NgForm){}
 showMarca(){

 }
 showSubgrupo(){

 }
 upLoad(){

}
}
